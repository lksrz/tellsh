# tellsh-model-enc

Model bundle for tellsh's optional hybrid fallback (see HYBRID.md in the tellsh repository).
Build: `python3 scripts/hybrid/export_encoder.py --gather --out hybrid/package/tellsh-model-enc && node scripts/hybrid/fetch_model.js --manifest hybrid/package/tellsh-model-enc`.
Base model: intfloat/multilingual-e5-small (MIT), vocabulary pruned to Polish+English pieces, bottom 6 layers, fine-tuned on tellsh data.
Runtime: `onnxruntime-node` (or `onnxruntime-web`) must be installed next to tellsh.
