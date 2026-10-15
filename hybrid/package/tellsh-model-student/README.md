# tellsh-model-student

Fallback model for [tellsh](https://github.com/lksrz/tellsh). It is a 3-layer encoder distilled from a LoRA-tuned
teacher. tellsh uses it only when its linear cascade's confidence is below 0.6, and never turns one of the cascade's
rejections into an answer.

Since 0.2.0 the bundle is `student.bin` (int8 weights with per-row scales, ~17 MB) plus `vocab.json` and `labels.json`,
run by tellsh's own pure-JS forward pass: no onnxruntime, no native code. tellsh >= 0.3.6 installs it as a regular
dependency, so `npm i -g tellsh` is enough. (0.1.x shipped an ONNX model for onnxruntime-node; tellsh >= 0.3.6 treats
such a bundle as missing.)

When the package is missing, tellsh runs with the cascade alone. Set `TELLSH_HYBRID=0` (or pass `--no-hybrid`) to turn
the student off. You can also point `TELLSH_STUDENT_DIR` at an unpacked bundle, or place the bundle in
`~/.cache/tellsh/stu-v2`. Build it with `node scripts/hybrid/export_student_js.js CKPT.safetensors OUT_DIR --vocab-from DIR`.
