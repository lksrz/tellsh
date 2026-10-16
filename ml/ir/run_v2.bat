@echo off
REM v2 round on the GPU box (aic-wfs-pc): main H8 generator on targets v2, dev/test predictions, then k-fold mining runs.
REM Rerunning resumes (train.py --resume; kfold.py skips finished folds). Copy back build\ir\runs\h8v2\{preds_dev,preds_test,log}.jsonl
REM and build\ir\runs\kfold_v2\fold*\preds_heldout.jsonl, then on the Mac: kfold_mine.mjs --v v2, make_negatives, make_candidates.
cd /d D:\tellsh-ir\tellsh
set PY=D:\tellsh-ir\venv\Scripts\python
set TA=--max-epochs 12 --patience 3 --label-smoothing 0.1 --dropout 0.1 --wd 0.01 --batch 128 --lr 3e-4 --enc-lr 1e-4 --workers 2 --amp fp16
%PY% ml\ir\train.py --targets build\ir\targets\v2 --out build\ir\runs\h8v2 %TA% --resume
if errorlevel 1 exit /b 1
%PY% ml\ir\eval.py --ckpt build\ir\runs\h8v2\best.pt --targets build\ir\targets\v2 --data build\ir\dataset\v2 --split dev --no-node --preds-out build\ir\runs\h8v2\preds_dev.jsonl
if errorlevel 1 exit /b 1
%PY% ml\ir\eval.py --ckpt build\ir\runs\h8v2\best.pt --targets build\ir\targets\v2 --data build\ir\dataset\v2 --split test --no-node --preds-out build\ir\runs\h8v2\preds_test.jsonl
if errorlevel 1 exit /b 1
echo H8V2DONE
%PY% ml\ir\kfold.py --v v2 --k 3 --out build\ir\runs\kfold_v2 -- %TA%
if errorlevel 1 exit /b 1
echo ALLDONE
