@echo off
REM v4 round on the GPU box (aic-wfs-pc): H8 generator + T50 ternary arm on targets v4, n-best (K=8) dev/test predictions, k-fold mining runs,
REM then n-best dev/test predictions of each fold model (ensemble agreement). Rerunning resumes / skips finished outputs.
REM Copy back build\ir\runs\h8v4\*_nb8.jsonl, build\ir\runs\kfold_v4\fold*\{preds_heldout,preds_dev_nb8,preds_test_nb8}.jsonl.
cd /d D:\tellsh-ir\tellsh
set PY=D:\tellsh-ir\venv\Scripts\python
set TA=--max-epochs 12 --patience 3 --label-smoothing 0.1 --dropout 0.1 --wd 0.01 --batch 128 --lr 3e-4 --enc-lr 1e-4 --workers 2 --amp fp16
set EV=--targets build\ir\targets\v4 --data build\ir\dataset\v4 --no-node --nbest 8 --batch 32
%PY% ml\ir\train.py --targets build\ir\targets\v4 --out build\ir\runs\h8v4 %TA% --resume
if errorlevel 1 exit /b 1
for %%s in (dev test) do (
  if not exist build\ir\runs\h8v4\preds_%%s_nb8.jsonl (
    %PY% ml\ir\eval.py --ckpt build\ir\runs\h8v4\best.pt %EV% --split %%s --preds-out build\ir\runs\h8v4\preds_%%s_nb8.jsonl
    if errorlevel 1 exit /b 1
  )
)
echo H8V4DONE
%PY% ml\ir\train.py --arm T50 --targets build\ir\targets\v4 --out build\ir\runs\t50v4 --max-epochs 20 --patience 4 --label-smoothing 0.1 --dropout 0.1 --wd 0.01 --batch 128 --lr 3e-4 --enc-lr 3e-4 --workers 2 --amp fp16 --resume
if errorlevel 1 exit /b 1
for %%s in (dev test) do (
  if not exist build\ir\runs\t50v4\preds_%%s_nb8.jsonl (
    %PY% ml\ir\eval.py --ckpt build\ir\runs\t50v4\best.pt %EV% --split %%s --preds-out build\ir\runs\t50v4\preds_%%s_nb8.jsonl
    if errorlevel 1 exit /b 1
  )
)
echo T50V4DONE
%PY% ml\ir\kfold.py --v v4 --k 3 --out build\ir\runs\kfold_v4 -- %TA%
if errorlevel 1 exit /b 1
for %%k in (0 1 2) do (
  for %%s in (dev test) do (
    if not exist build\ir\runs\kfold_v4\fold%%k\preds_%%s_nb8.jsonl (
      %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v4\fold%%k\best.pt %EV% --split %%s --preds-out build\ir\runs\kfold_v4\fold%%k\preds_%%s_nb8.jsonl
      if errorlevel 1 exit /b 1
    )
  )
)
echo ALLDONE
