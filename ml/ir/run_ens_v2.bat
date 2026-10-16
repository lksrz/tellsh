@echo off
REM Ensemble-agreement inputs on the GPU box: dev/test predictions of each k-fold v2 model (score_combined.mjs --dev-agree/--test-agree).
REM Existing preds files are skipped, so rerunning resumes. Copy back build\ir\runs\kfold_v2\fold*\preds_{dev,test}.jsonl.
cd /d D:\tellsh-ir\tellsh
set PY=D:\tellsh-ir\venv\Scripts\python
for %%k in (0 1 2) do (
  for %%s in (dev test) do (
    if not exist build\ir\runs\kfold_v2\fold%%k\preds_%%s.jsonl (
      %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v2\fold%%k\best.pt --targets build\ir\targets\v2 --data build\ir\dataset\v2 --split %%s --no-node --preds-out build\ir\runs\kfold_v2\fold%%k\preds_%%s.jsonl
      if errorlevel 1 exit /b 1
    )
  )
)
echo ENSDONE
