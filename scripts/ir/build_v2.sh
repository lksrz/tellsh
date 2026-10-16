#!/usr/bin/env bash
# Build the v2 IR dataset end to end: convert generator dirs -> relabel overlay -> dedup -> targets -> k-fold.
#
#   scripts/ir/build_v2.sh [--partial] [--name NAME] [--rewrite]
#
# --rewrite (default for --name v3*): dedup writes build/ir/dataset/<NAME>base, then gold_rewrite.mjs applies the
# deterministic gold rules to every split and the train-only LLM adjudication overlay (ADJ/KFOLD below) and
# writes build/ir/dataset/<NAME>; targets + k-fold are built from that.
#
# A generator dir is complete when every planned call has an ok usage line (usage.jsonl vs plan.json).
# Complete dirs are converted in place when converted.jsonl is missing or older than items.jsonl.
# Incomplete dirs are skipped, unless --partial: then items.jsonl is snapshotted into <dir>_partial/
# (the running generator's dir is never written) and converted there; default name becomes v2pre.
# Re-running is incremental: only stale conversions are redone.
set -euo pipefail
cd "$(dirname "$0")/../.."

PARTIAL=0; NAME=""; REWRITE=""
while [ $# -gt 0 ]; do
  case "$1" in
    --partial) PARTIAL=1 ;;
    --name) NAME="$2"; shift ;;
    --rewrite) REWRITE=1 ;;
    *) echo "unknown arg $1" >&2; exit 2 ;;
  esac
  shift
done
[ -n "$NAME" ] || { [ $PARTIAL = 1 ] && NAME=v2pre || NAME=v2; }
[ -n "$REWRITE" ] || case "$NAME" in v3*) REWRITE=1 ;; *) REWRITE=0 ;; esac
# train-only adjudications (never dev/test) and the k-fold preds they judged
ADJ=build/ir/adjudicate/v2_kfold/adjudications.jsonl
KFOLD=build/ir/verifier/v2/kfold.jsonl

# generator dirs, in priority order (first wins on exact duplicates)
SOURCES=(
  "build/ir/gen/haiku100k"
  "build/ir/grok/run10k"
  "build/ir/gen/haiku_v2_smoke"
  "build/ir/grok/g46_v2_20k"
  "build/ir/gen/haiku_v2_200k"
)

complete() {  # planned calls all have an ok usage line
  node -e '
    const fs = require("fs"), d = process.argv[1];
    const plan = JSON.parse(fs.readFileSync(d + "/plan.json", "utf8")).plan.length;
    const ok = new Set(fs.readFileSync(d + "/usage.jsonl", "utf8").split("\n").filter(Boolean)
      .map((l) => JSON.parse(l)).filter((u) => u.ok).map((u) => u.call));
    console.error(`${d}: ${ok.size}/${plan} calls done`);
    process.exit(ok.size >= plan ? 0 : 1);' "$1"
}

convert() {  # convert dir if converted.jsonl is missing or older than items.jsonl
  local d="$1"
  if [ -f "$d/converted.jsonl" ] && [ "$d/converted.jsonl" -nt "$d/items.jsonl" ]; then
    echo "$d: converted.jsonl up to date"
  else
    node scripts/ir/convert.mjs "$d" --examples 0 | head -1
  fi
}

INPUTS=()
for d in "${SOURCES[@]}"; do
  [ -f "$d/items.jsonl" ] || { echo "$d: no items.jsonl, skipped"; continue; }
  if complete "$d"; then
    convert "$d"; INPUTS+=("$d/converted.jsonl")
  elif [ $PARTIAL = 1 ]; then
    p="${d}_partial"; mkdir -p "$p"
    # snapshot only whole lines (the generator may be mid-write)
    if ! [ -f "$p/items.jsonl" ] || [ "$d/items.jsonl" -nt "$p/items.jsonl" ]; then
      node -e 'const fs=require("fs");const s=fs.readFileSync(process.argv[1],"utf8");fs.writeFileSync(process.argv[2],s.slice(0,s.lastIndexOf("\n")+1));' "$d/items.jsonl" "$p/items.jsonl"
    fi
    convert "$p"; INPUTS+=("$p/converted.jsonl")
  else
    echo "$d: incomplete, skipped (use --partial)"
  fi
done

node scripts/ir/apply_relabel.mjs
DNAME="$NAME"; [ $REWRITE = 1 ] && DNAME="${NAME}base"
node scripts/ir/dedup.mjs --name "$DNAME" --cap 80 --near 0.8 --overlay build/ir/relabel/v1_overlay.jsonl "${INPUTS[@]}" >/dev/null
if [ $REWRITE = 1 ]; then
  node scripts/ir/gold_rewrite.mjs --in "build/ir/dataset/$DNAME" --out "build/ir/dataset/$NAME" --adj "$ADJ" --kfold "$KFOLD" >/dev/null
  echo "gold rewrite: build/ir/dataset/$NAME/stats.json (gold_rewrite), lint: build/ir/dataset/$NAME/lint.jsonl"
fi
echo "dataset: build/ir/dataset/$NAME/stats.json"
node scripts/ir/export_targets.mjs --data "build/ir/dataset/$NAME" --out "build/ir/targets/$NAME" | tail -3
node scripts/ir/kfold_split.mjs --v "$NAME" --k 3
