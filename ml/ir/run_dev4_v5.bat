@echo off
REM dev4 (fresh analysis set, build_final.mjs --name dev4) n-best predictions for every v5 model.
cd /d D:\tellsh-ir\tellsh
set PY=D:\tellsh-ir\venv\Scripts\python
set EV=--targets build\ir\targets\v5 --data build\ir\dataset\dev4 --data-file build\ir\targets\dev4\test.jsonl --gold-file build\ir\dataset\dev4\test.jsonl --no-node --nbest 8 --batch 32 --split test
if not exist build\ir\runs\t50v5\preds_dev4_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\t50v5\best.pt %EV% --preds-out build\ir\runs\t50v5\preds_dev4_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\t50wv5\preds_dev4_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\t50wv5\best.pt %EV% --preds-out build\ir\runs\t50wv5\preds_dev4_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\h8v5\preds_dev4_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\h8v5\best.pt %EV% --preds-out build\ir\runs\h8v5\preds_dev4_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\kfold_v5\fold0\preds_dev4_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold0\best.pt %EV% --preds-out build\ir\runs\kfold_v5\fold0\preds_dev4_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\kfold_v5\fold1\preds_dev4_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold1\best.pt %EV% --preds-out build\ir\runs\kfold_v5\fold1\preds_dev4_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\kfold_v5\fold2\preds_dev4_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold2\best.pt %EV% --preds-out build\ir\runs\kfold_v5\fold2\preds_dev4_nb8.jsonl
if errorlevel 1 exit /b 1
echo DEV4DONE
