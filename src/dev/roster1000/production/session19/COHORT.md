# Session 19 cohort — recorded BEFORE research begins

Recorded: 2026-08-20, roster-1000 session 19 (Launch Roster Expansion,
Production Batch 1). Starting roster: 90 people, 89 match-eligible
(verified live against `SEED_PEOPLE`, confirmed matching CLAUDE.md's
recorded expectation exactly). Protocol: `Roster Research & Scoring
Protocol v1`, frozen at session 18 close — reused as-is, not redesigned.

## Selection process

1. Enumerated the full existing corpus: 162 candidate files in
   `data-pipeline/candidates/` (55 `qa_passed`/committed, 107 `held`)
   plus the 90 live `SEED_PEOPLE`. Collision checks (slug + fuzzy name)
   run programmatically against both sets for every name considered.
2. Ran a live diversity audit of the current 90-person roster by region,
   era, occupation, and impact domain (see below) to find real gaps
   rather than guessing.
3. Selected candidates for individual research strength first, using
   diversity as a secondary consideration — no candidate was previewed
   for trait coverage or `eligibility_v2` likelihood before selection.

## Diversity audit findings (live roster, pre-session-19)

- **West Asia: 1 person (Rumi, medieval Iran) — the thinnest region in
  the roster, and the only West Asia figure is medieval with no modern
  representation at all.**
- Central Asia: 2 people (Genghis Khan, Ibn Sina), both medieval.
- North Africa: 3 people, mostly medieval (Ibn Khaldun, Maimonides) plus
  one 20th-century (Umm Kulthum).
- North America (25) and Western Europe (21) are heavily saturated —
  more than half the roster.
- Domain gaps: no dance/performing-arts figure at all; no
  entrepreneurial/business figure outside North America and Western
  Europe (Steve Jobs, Coco Chanel, Benjamin Franklin, Oprah Winfrey);
  architecture has zero live representation (Zaha Hadid and Antoni Gaudi
  exist only as prior-session `held` candidates, not live, and are
  excluded from re-selection per the "not already researched" rule).

## The five candidates

| Candidate | Wikidata QID | Region | Era (provisional) | Domain rationale |
|---|---|---|---|---|
| Mustafa Kemal Atatürk | Q5152 | west_asia | 20th_century | Closes the single largest regional gap (West Asia has no modern figure at all); founder of the Republic of Turkey, extensively documented in primary (his own speeches, the "Nutuk" address) and scholarly sources. |
| Aung San Suu Kyi | Q36740 | south_asia | contemporary | Adds a contemporary political/activist figure with an unusually well-documented, morally complex later career (house arrest years, then State Counsellor including the Rohingya-crisis response) — evidence-based, not diagnostic, per this project's existing Safety discipline. |
| Anna Pavlova | Q151874 | central_europe | 19th_century/20th_century (TBD from birth year 1881) | Fills a genuine zero-representation gap: no dance/performing-arts figure exists anywhere in the current 90-person roster. |
| Akio Morita | Q310845 | east_asia | 20th_century | Fills the entrepreneurial/business-domain gap outside North America and Western Europe; co-founder of Sony, extensive primary documentation (his own book "Made in Japan" plus corporate/business history). |
| Oscar Niemeyer | Q134165 | latin_america | 20th_century/contemporary (TBD, 1907-2012) | Fills the architecture-domain gap (zero live representation); unusually long, well-documented career including a politically consequential exile, own memoir "The Curves of Time." |

## Identity verification (completed before any research)

All 5 candidates verified live against `Special:EntityData/<QID>.json`
(English label + description), independently re-confirmed against a
second live fetch of the same entity, and checked for QID duplication
across the full corpus (grep across `data-pipeline/candidates/*.json`
and `src/data/people/*.ts` — zero hits for all 5 QIDs) and slug
collision (none of the 5 slugs exist as an existing candidate file or
live person). See each candidate's own directory for the per-candidate
identity confirmation.

## Explicit non-goals for this cohort selection

- No candidate was chosen because it seemed likely to pass
  `eligibility_v2`.
- No trait coverage was previewed before selection.
- Diversity was used as a selection consideration, not a rigid quota —
  none of the five was forced into a demographic slot; each was judged
  independently strong on research-depth grounds first.
