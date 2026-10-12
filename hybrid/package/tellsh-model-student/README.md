# tellsh-model-student

Optional fallback model for [tellsh](https://github.com/lksrz/tellsh). It is a 3-layer encoder distilled from a LoRA-tuned
teacher. tellsh uses it only when its linear cascade's confidence is below 0.6, and never turns one of the cascade's
rejections into an answer.

    npm i -g tellsh onnxruntime-node tellsh-model-student

When this package or `onnxruntime-node` is missing, tellsh runs with the cascade alone. Set `TELLSH_HYBRID=0` (or pass
`--no-hybrid`) to turn the student off. You can also point `TELLSH_STUDENT_DIR` at an unpacked bundle, or place the
bundle in `~/.cache/tellsh/stu-v1`.
