@echo off
REM Final held-out test predictions (n-best K=8) for every v4 model: h8v4, t50v4 and the three kfold_v4 folds.
REM Needs build\ir\targets\final\test.jsonl (scripts/ir/build_final.mjs, v4 vocab). Existing outputs are skipped.
cd /d D:\tellsh-ir\tellsh
set PY=D:\tellsh-ir\venv\Scripts\python
set EV=--targets build\ir\targets\v4 --data build\ir\dataset\final --data-file build\ir\targets\final\test.jsonl --gold-file build\ir\dataset\final\test.jsonl --no-node --nbest 8 --batch 32 --split test
for %%m in (h8v4 t50v4 kfold_v4\fold0 kfold_v4\fold1 kfold_v4\fold2) do (
  if not exist build\ir\runs\%%m\preds_final_nb8.jsonl (
    %PY% ml\ir\eval.py --ckpt build\ir\runs\%%m\best.pt %EV% --preds-out build\ir\runs\%%m\preds_final_nb8.jsonl
    if errorlevel 1 exit /b 1
  )
)
echo FINALDONE
