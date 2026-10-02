# Local model stack · 2026-10-02

**Internal.** Not on Pages.

Ollama defaults (thesis `scripts/local_llm.py`, MA12 env overrides):

| Role | Model |
|---|---|
| Primary | `qwen2.5:3b` |
| MA12 reverse / small second stack | `gemma2:2b` |
| MA15 matrix third leg | `phi3:mini` |

Removed from disk: `llama3.2:3b`, `llama3.2:1b`. Frozen benchmarks kept as `*_2026-10-01_llama.json` where applicable.

**Runs this date:** MA12 full battery (qwen/gemma), MA15 pilot (4 dyads), MA4c (rule gate + `C_warrant_on_halt`).

**Docs:** thesis `docs/experiments/LOCAL_LLM.md`, MA12 `RUN_2026-10-02.md`.
