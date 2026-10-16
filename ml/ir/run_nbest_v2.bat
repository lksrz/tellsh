@echo off
REM N-best (beam K=8) predictions on the GPU box for gate-in-the-loop D routing (eval_pred.mjs / make_candidates.mjs /
REM score_combined.mjs pick the first gate-accepted hypothesis). h8v2 + each k-fold v2 model, v2 dev and test.
REM Existing *_nb8.jsonl files are skipped, so rerunning resumes. Copy back build\ir\runs\h8v2\preds_{dev,test}_nb8.jsonl
REM and build\ir\runs\kfold_v2\fold*\preds_{dev,test}_nb8.jsonl.
cd /d D:\tellsh-ir\tellsh
set PY=D:\tellsh-ir\venv\Scripts\python
for %%s in (dev test) do (
  if not exist build\ir\runs\h8v2\preds_%%s_nb8.jsonl (
    %PY% ml\ir\eval.py --ckpt build\ir\runs\h8v2\best.pt --targets build\ir\targets\v2 --data build\ir\dataset\v2 --split %%s --no-node --nbest 8 --batch 32 --preds-out build\ir\runs\h8v2\preds_%%s_nb8.jsonl
    if errorlevel 1 exit /b 1
  )
)
for %%k in (0 1 2) do (
  for %%s in (dev test) do (
    if not exist build\ir\runs\kfold_v2\fold%%k\preds_%%s_nb8.jsonl (
      %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v2\fold%%k\best.pt --targets build\ir\targets\v2 --data build\ir\dataset\v2 --split %%s --no-node --nbest 8 --batch 32 --preds-out build\ir\runs\kfold_v2\fold%%k\preds_%%s_nb8.jsonl
      if errorlevel 1 exit /b 1
    )
  )
)
echo NBDONE
