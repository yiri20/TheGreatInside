# Frozen evidence reconstruction — Thomas Sankara (Session 16 audit)

## Reconstruction provenance and limitations

Same method and same limitation as `frozenEvidence.borges.md` — see that
file's "Reconstruction provenance and limitations" section for the full
statement; not repeated verbatim here. Source:
`data-pipeline/candidates/thomas-sankara.json` as committed at `22c77de`
(zero diff since — see `comparison.md`). Session 13's `provenance.notes`
states "a factual evidence ledger (12 distinct new/refined episodes) was
built and locked before any trait score was assigned"; that ledger was
never preserved as a standalone artifact. The 19 atomic facts below are
reconstructed entirely from the `rationale` text of the 16 locked rows.

## Sources (unchanged from the locked candidate file)

- `src_sankara_wikipedia` — English Wikipedia, "Thomas Sankara"
- `src_sankara_un_speech` — full primary text of his October 1984 UN
  General Assembly address
- `src_sankara_oau_speech` — full primary text of his 1987 OAU address,
  "A United Front Against the Debt"
- `src_sankara_biography` — historical accounts of his 1983-1987
  presidency, including quantified vaccination/literacy/tree-planting
  figures, personal austerity measures, and women's-rights/land-reform
  policies

## Reconstructed atomic episodes (flat, trait-agnostic)

| ID | Episode | Source(s) |
|---|---|---|
| S1 | Vaccination campaign reaching an estimated 2.5 million children in roughly two weeks; cut infant mortality from 208 to 145 per 1,000 within one year. | Biography (quantified) |
| S2 | National literacy rose from 13% (1983) to 73% (1987); over 350 communities built their own schools with their own labor. | Biography (quantified) |
| S3 | Over 10 million trees planted; a mandatory tree-planting policy explicitly tied to social-aid eligibility from 1985. | Biography (quantified) |
| S4 | Sold the government's Mercedes-Benz fleet in favor of the cheaper Renault 5 as the official ministerial car. | Biography |
| S5 | Capped his own presidential salary to the average civil-servant wage (~$450/month). | Biography |
| S6 | Publicly disclosed his full personal asset list. | Biography |
| S7 | October 1984 UN General Assembly address explicitly rejecting foreign-aid dependency. | UN speech (primary) |
| S8 | 1987 OAU address arguing African debt was a direct continuation of colonial control ("the same ones who used to manage our states and economies... indebted Africa"). | OAU speech (primary) |
| S9 | Domestic land reforms directly abolished the feudal privileges of traditional tribal chieftaincies. | Biography |
| S10 | A 500-unit housing program completed within three months. | Biography (quantified) |
| S11 | His surviving speeches (including the 1984 UN address) are widely cited by later historians as rhetorically forceful and credited with raising his international profile substantially. | Biography (reputational/citation-based, not a directly observed act) |
| S12 | Mandated that civil servants wear domestically-woven cotton fabric (Faso Dan Fani) rather than imported textiles, specifically to support local industry. | Biography |
| S13 | Established new institutional infrastructure — a Ministry of Family Development and the Women's Union of Burkina — in his first year specifically to support the women's-rights agenda. | Biography |
| S14 | A constitutional amendment requiring at least five women ministers in cabinet at all times. | Biography |
| S15 | Refused government chauffeurs and air-conditioned offices, sustained consistently throughout his tenure rather than as a one-off gesture. | Biography |
| S16 | Over 350 communities built their own schools with their own labor, as a deliberately participatory (not top-down) program design. | Biography (same underlying fact as part of S2, viewed through a process/design lens rather than the raw literacy-rate outcome) |
| S17 | Moved from a military career into national civilian governance and rapid multi-domain policy implementation within a short period. | Biography (the transition itself; no separate description of how he adapted) |
| S18 | Was a trained military pilot (professional specialization, not clearly a chosen-for-its-own-sake interest) and, separately, an accomplished amateur guitarist (a voluntary pursuit outside his political/military career). | Biography |
| S19 | Personally required detailed government asset declarations from ministers as part of his anti-corruption program, and itemized his own personal assets down to specific counted possessions. | Biography (S6 is the "disclosed his own list" half of this; S19 adds the "required it of ministers too" half) |

**Explicitly excluded from the ledger, per Session 13's own recorded
discipline (preserved unchanged here, not reconstructed as a scorable
episode)**: his 1987 assassination. Session 13's `risk_tolerance`
rationale explicitly states this row "is scored from those documented
actions themselves, not from his 1987 assassination, which is recorded
as biographical context only," citing `CLAUDE.md`'s Safety rule against
deriving a trait score from what was done TO a person. This audit
preserves that exclusion unchanged — the assassination is not treated as
an episode in the table above and was not used to score any Session 16
shadow row either.

19 atomic episodes reconstructed (close to Session 13's own stated count
of 12 "new/refined" episodes — the higher count here reflects that
Session 13's 12 figure describes episodes NEW to session 13, on top of
the 12 rows retained unchanged from session 12, while this reconstruction
draws every atomic fact out of all 16 final locked rows regardless of
which session first introduced it).

**SHADOW LOCKED as of this document's creation** — no episode added,
removed, or reworded after `shadowProfile.sankara.json` was built from it.
