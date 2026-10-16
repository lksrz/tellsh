#!/bin/bash
# Out-of-catalog stage-1 experiment on the PRIVATE real-usage rows (HYBRID.md, "Out-of-catalog rejection experiment").
# Trains an out-of-catalog model candidate (templates-model shaped) with the train-split out-of-catalog rows as __ooc__ (build/exp/NAME.bin) and sweeps
# the veto (p(__ooc__) floor x confidence ceiling of the vetoed answer) with scripts/real/eval_ooc.js --sweep. The candidate
# temporarily replaces model/model_ooc.bin (model/model_templates.bin is never touched); restored on exit. Needs ~6 GB free RAM; prints aggregates only.
#   scripts/real/ooc_experiment.sh NAME [REAL_CAP=120] [OOC_WEIGHT=0.5] [OOC_CAP_PER_GROUP=2]
set -e
ROOT=$(cd "$(dirname "$0")/../.." && pwd); cd "$ROOT"
N=${1:?usage: ooc_experiment.sh NAME [REAL_CAP] [OOC_WEIGHT] [OOC_CAP]}
export TELLSH_REAL_CAP=${2:-120} OMP_NUM_THREADS=4 MKL_NUM_THREADS=4 OPENBLAS_NUM_THREADS=4
mkdir -p build/exp
cp model/model_ooc.bin build/exp/orig_ooc.bin
trap 'cp build/exp/orig_ooc.bin model/model_ooc.bin' EXIT
if [ ! -f build/exp/$N.bin ]; then
  nice -n 10 node scripts/gen_data.js --ooc-weight=${3:-0.5} --ooc-cap=${4:-2}
  nice -n 10 python3 scripts/train.py --out build/exp/$N.bin
fi
cp build/exp/$N.bin model/model_ooc.bin
nice -n 10 node scripts/real/eval_ooc.js --sweep > build/exp/$N.sweep.json
echo "wrote build/exp/$N.sweep.json"
