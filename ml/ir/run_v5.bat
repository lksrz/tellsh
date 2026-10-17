@echo off
REM v5 round on the GPU box (aic-wfs-pc): T50 (main), wide T50, H8 and T50 k-fold models on targets v5, each followed by
REM n-best (K=8) predictions on v5 dev/test and on the held-out final set (v4 vocab = v5 actions). Reruns resume / skip outputs.
cd /d D:\tellsh-ir\tellsh
set PY=D:\tellsh-ir\venv\Scripts\python
set COMMON=--targets build\ir\targets\v5 --label-smoothing 0.1 --dropout 0.1 --wd 0.01 --batch 128 --lr 3e-4 --workers 2 --amp fp16 --resume
set T50=--arm T50 --max-epochs 20 --patience 4 --enc-lr 3e-4
set EV=--targets build\ir\targets\v5 --data build\ir\dataset\v5 --no-node --nbest 8 --batch 32
set FIN=--data-file build\ir\targets\final\test.jsonl --gold-file build\ir\dataset\final\test.jsonl
%PY% ml\ir\train.py %T50% --out build\ir\runs\t50v5 %COMMON%
if errorlevel 1 exit /b 1
if not exist build\ir\runs\t50v5\preds_dev_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\t50v5\best.pt %EV% --split dev --preds-out build\ir\runs\t50v5\preds_dev_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\t50v5\preds_test_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\t50v5\best.pt %EV% --split test --preds-out build\ir\runs\t50v5\preds_test_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\t50v5\preds_final_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\t50v5\best.pt %EV% %FIN% --split test --preds-out build\ir\runs\t50v5\preds_final_nb8.jsonl
if errorlevel 1 exit /b 1
echo DONE t50v5
%PY% ml\ir\train.py %T50% --enc-hidden 768 --enc-heads 12 --enc-ff 3072 --seed 2 --out build\ir\runs\t50wv5 %COMMON%
if errorlevel 1 exit /b 1
if not exist build\ir\runs\t50wv5\preds_dev_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\t50wv5\best.pt %EV% --split dev --preds-out build\ir\runs\t50wv5\preds_dev_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\t50wv5\preds_test_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\t50wv5\best.pt %EV% --split test --preds-out build\ir\runs\t50wv5\preds_test_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\t50wv5\preds_final_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\t50wv5\best.pt %EV% %FIN% --split test --preds-out build\ir\runs\t50wv5\preds_final_nb8.jsonl
if errorlevel 1 exit /b 1
echo DONE t50wv5
%PY% ml\ir\train.py --max-epochs 12 --patience 3 --enc-lr 1e-4 --out build\ir\runs\h8v5 %COMMON%
if errorlevel 1 exit /b 1
if not exist build\ir\runs\h8v5\preds_dev_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\h8v5\best.pt %EV% --split dev --preds-out build\ir\runs\h8v5\preds_dev_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\h8v5\preds_test_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\h8v5\best.pt %EV% --split test --preds-out build\ir\runs\h8v5\preds_test_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\h8v5\preds_final_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\h8v5\best.pt %EV% %FIN% --split test --preds-out build\ir\runs\h8v5\preds_final_nb8.jsonl
if errorlevel 1 exit /b 1
echo DONE h8v5
%PY% ml\ir\kfold.py --v v5 --k 3 --out build\ir\runs\kfold_v5 -- --arm T50 --max-epochs 20 --patience 4 --enc-lr 3e-4 --label-smoothing 0.1 --dropout 0.1 --wd 0.01 --batch 128 --lr 3e-4 --workers 2 --amp fp16
if errorlevel 1 exit /b 1
if not exist build\ir\runs\kfold_v5\fold0\preds_dev_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold0\best.pt %EV% --split dev --preds-out build\ir\runs\kfold_v5\fold0\preds_dev_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\kfold_v5\fold0\preds_test_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold0\best.pt %EV% --split test --preds-out build\ir\runs\kfold_v5\fold0\preds_test_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\kfold_v5\fold0\preds_final_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold0\best.pt %EV% %FIN% --split test --preds-out build\ir\runs\kfold_v5\fold0\preds_final_nb8.jsonl
if errorlevel 1 exit /b 1
echo DONE kfold_v5\fold0
if not exist build\ir\runs\kfold_v5\fold1\preds_dev_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold1\best.pt %EV% --split dev --preds-out build\ir\runs\kfold_v5\fold1\preds_dev_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\kfold_v5\fold1\preds_test_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold1\best.pt %EV% --split test --preds-out build\ir\runs\kfold_v5\fold1\preds_test_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\kfold_v5\fold1\preds_final_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold1\best.pt %EV% %FIN% --split test --preds-out build\ir\runs\kfold_v5\fold1\preds_final_nb8.jsonl
if errorlevel 1 exit /b 1
echo DONE kfold_v5\fold1
if not exist build\ir\runs\kfold_v5\fold2\preds_dev_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold2\best.pt %EV% --split dev --preds-out build\ir\runs\kfold_v5\fold2\preds_dev_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\kfold_v5\fold2\preds_test_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold2\best.pt %EV% --split test --preds-out build\ir\runs\kfold_v5\fold2\preds_test_nb8.jsonl
if errorlevel 1 exit /b 1
if not exist build\ir\runs\kfold_v5\fold2\preds_final_nb8.jsonl %PY% ml\ir\eval.py --ckpt build\ir\runs\kfold_v5\fold2\best.pt %EV% %FIN% --split test --preds-out build\ir\runs\kfold_v5\fold2\preds_final_nb8.jsonl
if errorlevel 1 exit /b 1
echo DONE kfold_v5\fold2
echo ALLDONE
