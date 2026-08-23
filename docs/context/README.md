# Context manifest

What's active, what's authoritative, when to read it. The Context
Loading Matrix in `CLAUDE.md` is the fast version of this table — read
this file only if you need the full picture of the doc tree itself.

| Doc | Authoritative for | Read when |
|---|---|---|
| `CLAUDE.md` | Absolute invariants, task→context routing | Every session, first |
| `docs/context/CURRENT_STATE.md` | Current branch/roster/editorial/deployment facts | Every session, second |
| `docs/context/TESTING.md` | What to run per change type | Any session that changes code |
| `docs/adding-a-person.md` | Roster-addition procedure | Roster work |
| `docs/scoring-rubric-v1.md` | Evidence → trait-score methodology | Roster work (scoring) |
| `docs/workflows/roster-research.md` | Entry routing for roster tasks | Roster work, start here |
| `docs/checkpoints/roster.md` | Current roster numbers + protocol state | Roster work |
| `docs/editorial-content.md` | Editorial-content procedure + Writing Standard v1 | Editorial work |
| `docs/checkpoints/editorial.md` | Current editorial coverage numbers | Editorial work |
| `docs/deployment.md` | Deployment procedure, env vars, OAuth config | Deployment work |
| `docs/checkpoints/production.md` | Current production/domain/auth facts | Deployment work |
| `docs/troubleshooting.md` | Symptom → fix index | Any session hitting a known-shape bug |
| `docs/reference/matching.md` | Formulas: scoring/matching/calibration/greatness/eligibility | Matching/scoring/roster work |
| `docs/reference/localization.md` | i18n rules, EN/KO parity discipline | Any UI-copy or localization work |
| `docs/reference/architecture.md` | Directory map, design system, stack, safety rules | UI/product work, general orientation |
| `docs/reference/data-model.md` | `Person` type, roster storage, DB schema | Roster/editorial/data work |
| `docs/reference/directory-taxonomy.md` | People Directory filter taxonomy (profession/activity + personality/trait) | Directory filter/taxonomy work |
| `docs/quiz-structure.md` | Full 64-item quiz display-order inspection | Quiz-item-specific work only |
| `docs/archive/**` | Historical narrative, superseded decisions | Only to resolve a specific historical question |

## The one rule that matters most

**Do not recursively read `docs/` at session start.** Load only what the
Context Loading Matrix in `CLAUDE.md` names for the current task. Archive
is opt-in, never default.
