@echo off
REM v3 round on the GPU box (aic-wfs-pc): H8 generator on targets v3, n-best (K=8) dev/test predictions, k-fold mining runs,
REM then n-best dev/test predictions of each fold model (ensemble agreement). Rerunning resumes / skips finished outputs.
REM Copy back build\ir\runs\h8v3\*_nb8.jsonl, build\ir\runs\kfold_v3\fold*\{preds_heldout,preds_dev_nb8,preds_test_nb8}.jsonl.
cd /d D:\tellsh-ir\tellsh
set PY=D:\tellsh-ir\venv\Scripts\python
set TA=--max-epochs 12 --patience 3 --label-smoothing 0.1 --dropout 0.1 --wd 0.01 --batch 128 --lr 3e-4 --enc-lr 1e-4 --workers 2 --amp fp16
set EV=--targets build\ir\targets\v3 --data build\ir\dataset\v3 --no-node --nbest 8 --batch 32
%PY% ml\ir\train.py --targets build\ir\targets\v3 --out build\ir\runs\h8v3 %TA% --resume
if errorlevel 1 exit /b 1
for %%s in (dev test) do (
  if not exist build\ir\runs\h8v3\preds_%%s_nb8.jsonl (
    %PY% ml\ir\eval.py --ckpt build\ir\runs\h8v3\best.pt %EV% --split %%s --preds-out build\ir\runs\h8v3\preds_%%s_nb8.jsonl
    if errorlevel 1 exit /b 1
  )
)
echo H8V3DONE
%PY% ml\ir\kfold.py --v v3 --k 3 --out build\ir\runs\kfold_v3 -- %TA%
if errorlevel 1 exit /b 1
for %%k in (0 1 2) do (
  for %%s in (dev test) do (
    if not exist build\ir\runs\kfold_v3\fold%%k\preds_%%s_nb8.jsonl (
      %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v3\fold%%k\best.pt %EV% --split %%s --preds-out build\ir\runs\kfold_v3\fold%%k\preds_%%s_nb8.jsonl
      if errorlevel 1 exit /b 1
    )
  )
)
echo ALLDONE
