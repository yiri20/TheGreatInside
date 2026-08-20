# EVIDENCE CLASSIFICATION LOCKED

All four episode files in this directory —
`episodes.borges.json` (26 episodes), `episodes.sankara.json` (19
episodes), `episodes.fermi.json` (12 episodes), `episodes.baldwin.json`
(12 episodes) — were classified against the frozen `diagnosticRubric.md`
and are now locked as of this file's creation.

After this point:
- no A/B/C/D classification was changed;
- no redundancy (`redundantWith`) judgment was changed;
- no behavioral-context or structure tag was changed;
- no episode was relabeled based on any session-13-vs-session-15
  aggregate comparison computed afterward.

The only work that happened after this lock: running
`computeDiagnosticDensity.ts` (a pure, deterministic reader of these four
JSON files) to calculate group statistics, and writing `comparison.md`
and the checkpoint update from those calculated numbers.

**69 total episodes locked**: 26 (Borges) + 19 (Sankara) + 12 (Fermi) +
12 (Baldwin).
