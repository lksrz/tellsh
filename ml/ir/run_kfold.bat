@echo off
REM K-fold model-error mining on the GPU box (aic-wfs-pc). Trains one generator per fold of the TRAIN split and
REM predicts its held-out fold; rerunning skips finished folds and resumes an interrupted one (OUT\fold{k}\last.pt).
REM
REM Before (Mac):  node scripts/ir/kfold_split.mjs --v v1 --k 3
REM   copy to D:\tellsh-ir\tellsh\build\ir\targets\v1\: fold{0,1,2}_{train,heldout}.jsonl (+ dev.jsonl, vocab.json),
REM   plus ml\ir\*.py and hybrid\models\student\student.bin
REM After (Mac):   copy back build\ir\runs\kfold\fold{0,1,2}\preds_heldout.jsonl (+ log.jsonl), then
REM   node scripts/ir/kfold_mine.mjs --v v1 --k 3 --runs build/ir/runs/kfold      -> build/ir/verifier/v1/kfold.jsonl
REM     (y=1 accepted+correct positives, y=0 accepted-but-wrong negatives, per route P and D, with conf)
REM   per-fold report / accepted-wrong dump:
REM   node scripts/ir/eval_pred.mjs --preds build/ir/runs/kfold/fold0/preds_heldout.jsonl --data build/ir/dataset/v1/fold0_heldout.jsonl --out build/ir/runs/kfold/fold0/report.json --dump build/ir/runs/kfold/fold0/wrong.jsonl
REM
REM Usage: ml\ir\run_kfold.bat   (--amp fp16 is passed explicitly: the RTX 2080 Ti has no native bf16)
cd /d D:\tellsh-ir\tellsh
D:\tellsh-ir\venv\Scripts\python ml\ir\kfold.py --v v1 --k 3 --out build\ir\runs\kfold -- --max-epochs 12 --patience 3 --label-smoothing 0.1 --dropout 0.1 --wd 0.01 --batch 128 --lr 3e-4 --enc-lr 1e-4 --workers 2 --amp fp16
if errorlevel 1 exit /b 1
echo all folds done
