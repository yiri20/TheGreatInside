# Roster Expansion 125 — Held-Candidate Evidence-Deepening Audit (DRAFT)

**Status: AUDIT / EVIDENCE RECOVERY ONLY.** No trait scores assigned or
changed, no candidate confidence touched, nothing added to the production
roster, no candidate file modified. This closes out the third audit in the
series — see
[`roster-expansion-125-selection-closure-audit-DRAFT.md`](roster-expansion-125-selection-closure-audit-DRAFT.md)
for how the 14 were identified and why they were kept provisionally rather
than swapped.

**Method note (compliance with the anti-tuning rule)**: every source
recommendation below was chosen by asking "what serious, independent
account of this person's life exists that this file didn't cite" — by life
period and source type (memoir, correspondence, scholarly biography,
institutional archive) — never by looking at which of the 34 attribute
slots were empty or low and searching for evidence to fill that slot. I did
not open any candidate file's numeric `score`/`confidence` values for this
purpose; where a number appears below (e.g. "0.505 vs 0.55") it is
reproduced only from the existing `holdReason` text already written by the
prior session, to explain why a hold happened, never to target new
research. Full compliance confirmation in §15.

---

## 1. Exact 14 held provisional candidates

Re-derived mechanically this session (not from prior prose): cross-checked
the closure audit's final-30 slugs against `data-pipeline/candidates/*.json`
status fields directly.

1. Saladin
2. Golda Meir
3. Al-Biruni
4. Sun Yat-sen
5. Chien-Shiung Wu
6. Junko Tabei
7. José Martí
8. Gabriel García Márquez
9. Kwame Nkrumah
10. Miriam Makeba
11. Desmond Tutu
12. Naguib Mahfouz
13. Ibn Battuta
14. Simone de Beauvoir

All 14 confirmed `status: "held"`. (Pelé and Madam C.J. Walker, the two
severe cases, are excluded here — already recommended for removal in the
prior closure audit and not part of this task's 14.)

## 2. Prior coverage/hold summary

| Candidate | Sources (count/type) | Rows scored /34 | Research session/date | High-level hold reason |
|---|---|---|---|---|
| Saladin | 3 (wikipedia, institution, archive — Baha ad-Din's contemporary biography) | 20 | 2026-08-15, "third-batch diversity pick" | Confidence ceiling after 2 remediation rounds; batch leaned on general encyclopedic knowledge across many unfamiliar regions rather than deep per-person primary-source work |
| Golda Meir | 3 (wikipedia, her own 1973 memoir *My Life*, institution) | 19 | 2026-08-15, "session 7 source-first workflow" | Genuine source-first pass citing her memoir, but didn't surface enough additional dated episodes to clear the confidence/coverage floor |
| Al-Biruni | 3 (wikipedia, institution, archive — his own *Kitab al-Hind*) | 21 | 2026-08-15, "third-batch diversity pick" | Same batch-wide confidence-ceiling pattern as Saladin |
| Sun Yat-sen | 3 (wikipedia, 2 named biographies — Sharman 1934, Schiffrin, institution) | 19 | 2026-08-15, "session 7 source-first workflow" | Source-first pass citing real biographies, but personal working style/decision process still thin in the literature consulted |
| Chien-Shiung Wu | 2 (wikipedia, institution) | 20 | 2026-08-15, "session 6 corrected research depth" | Two genuine research rounds; record documents scientific achievement far more thoroughly than personal/interpersonal behavior |
| Junko Tabei | 2 (wikipedia, institution) | 21 | 2026-08-15, "third-batch diversity pick" | Same batch-wide confidence-ceiling pattern |
| José Martí | 3 (wikipedia, institution, archive — his own collected writings) | 18 | 2026-08-15, "session 7 source-first workflow" | Strong core rows from his extreme final act and party founding, but *coverage* specifically fell short — evidence clustered on lower-weight attributes |
| Gabriel García Márquez | 3 (wikipedia, archive — his own memoir *Living to Tell the Tale*, award body) | 20 | 2026-08-15, "second-batch diversity pick" | Own note: research drew mainly on secondary summary "rather than his own memoir... in depth" |
| Kwame Nkrumah | 2 (wikipedia, archive — his own 1957 autobiography) | 21 | 2026-08-15, "third-batch diversity pick" | Same batch-wide confidence-ceiling pattern; later authoritarian turn explicitly and correctly NOT scored (outcome-not-read-backward rule) |
| Miriam Makeba | 2 (wikipedia, institution) | 20 | 2026-08-15, "second-batch diversity pick" | Covers public career/activism well, little on personal working style; own note flags her unread memoir *Makeba: My Story* |
| Desmond Tutu | 2 (wikipedia, award body) | 21 | 2026-08-15, "third-batch diversity pick" | Same batch-wide confidence-ceiling pattern |
| Naguib Mahfouz | 2 (wikipedia, award body) | 20 | 2026-08-15, "third-batch diversity pick" | Same batch-wide confidence-ceiling pattern |
| Ibn Battuta | 2 (wikipedia, archive — his own dictated *Rihla*) | 21 | 2026-08-16 to 2026-08-19, "session 11" | SS76 scoring-integrity re-audit: some rows had been reclassified upward to cross the threshold and were correctly reverted; the *Rihla*'s own acknowledged embellishment risk in later passages is a separate, genuine caveat |
| Simone de Beauvoir | 3 (wikipedia, archive — her own 4-volume memoir, archive — published correspondence) | 21 | 2026-08-16 to 2026-08-19, "session 11" | Same SS76 re-audit as Ibn Battuta — reclassified rows reverted, not an evidence shortage |

No numeric score/confidence values are reproduced beyond what each file's
own `holdReason` text already stated.

## 3. Prior-research-depth classification (A–E)

| Candidate | Class | Why |
|---|---|---|
| Saladin | A/B | Excellent primary source (Baha ad-Din) already identified but likely lightly mined; era genre (chronicle) genuinely limits private-behavior texture too |
| Golda Meir | A | Own memoir cited but under-mined — a 400+-page autobiography yielding only 19 rationale lines |
| Al-Biruni | A/C | *Kitab al-Hind* cited but only its preface/structure mined; his broader ~146-work bibliography is otherwise untapped; genre (medieval scholarly output) is inherently thin on private/interpersonal material |
| Sun Yat-sen | A/B | Two real biographies cited but described as yielding thin personal-working-style detail; his own writings (e.g. his account of the 1896 London kidnapping) not separately drawn on |
| Chien-Shiung Wu | C | Domain-narrow: the surviving record is overwhelmingly about her experimental-physics achievement, not personal life — an honest, disclosed pattern in the file itself |
| Junko Tabei | A | Only 2 generic sources; a dedicated English-translated memoir/biography (see §4) was never consulted at all |
| José Martí | A | His own "collected writings" cited as one line item, but his real corpus runs to ~28 volumes — barely mined |
| Gabriel García Márquez | A | The file's own hold reason admits the memoir it cites "in depth" wasn't actually used in depth |
| Kwame Nkrumah | A | His own autobiography was used, but only to 21/34 rows — a full autobiography under-mined, not absent |
| Miriam Makeba | A | Same pattern — her own memoir exists and is explicitly flagged as unread in the file's own hold reason |
| Desmond Tutu | A | No memoir or dedicated biography cited at all, despite Tutu having authored his own book about the exact events being scored (the TRC) |
| Naguib Mahfouz | A | No memoir/biography/interview collection cited despite an extensive documented interview record existing |
| Ibn Battuta | D | Genuinely historiographically difficult: the sole viable source is a single retrospective, scribe-mediated dictation with an acknowledged embellishment risk, and no independent witness corroborates most personal episodes |
| Simone de Beauvoir | A (mislabeled as a shortage) | The SS76 revert was a scoring-integrity correction, not evidence thinness — her actual source base (4-volume memoir + published correspondence) is the richest of all 14 and was very lightly mined (21 rationale lines from thousands of pages) |

## 4. Evidence-deepening findings (by life period / source type — not by attribute)

For each candidate, additional serious sources identified and, where I was
not already highly confident, spot-verified this session (see §15):

- **Saladin**: deeper mining of Baha ad-Din ibn Shaddad's full biography
  (already cited but likely only lightly drawn on); cross-reference against
  Ibn al-Athir's chronicle and the Crusader-side account by William of
  Tyre for corroboration; Anne-Marie Eddé's modern scholarly biography
  *Saladin* (Harvard, English translation 2011) synthesizes exactly this
  cross-source comparison.
- **Golda Meir**: a full close-read of *My Life* itself (currently
  under-used, not absent), plus Francine Klagsbrun's *Lioness: Golda Meir
  and the Nation of Israel* (2017), a modern biography drawing on
  additional archival material beyond her own memoir.
- **Al-Biruni**: deeper mining of *Kitab al-Hind* beyond its preface, plus
  his other major surviving works (the astronomical *Mas'udic Canon*, the
  *Chronology of Ancient Nations*) for episodes revealing patron
  relationships and career transitions, which is where his existing rows
  already draw what little personal texture exists.
- **Sun Yat-sen**: his own account of the 1896 London kidnapping
  ("Kidnapped in London," already alluded to but not separately drawn on)
  and Marie-Claire Bergère's *Sun Yat-sen* (Stanford, English translation
  1998), generally regarded as the standard modern biography, alongside
  the two already-cited works.
- **Chien-Shiung Wu**: a dedicated full-length biography (e.g. Tsai-Chien
  Chiang's *Madame Wu Chien-Shiung: The First Lady of Physics Research*)
  for family-life and mentorship material beyond the Atomic Heritage
  Foundation profile currently relied on — the domain-narrow pattern is
  real, but this is the specific place to test whether it's absolute or
  just under-searched.
- **Junko Tabei**: *Honouring High Places: The Mountain Life of Junko
  Tabei* (Rocky Mountain Books, 2017, translated by Yumiko Hiraki and
  Rieko Holtved) — **verified this session**: an English translation
  compiled directly from Tabei's own Japanese memoirs, not previously
  consulted at all. This is likely the single highest-value untapped
  source in the entire 14.
- **José Martí**: deeper mining of his own collected works (currently one
  generic archive line item covering an ~28-volume corpus) plus Alfred J.
  López's *José Martí: A Revolutionary Life* (2014), a modern
  English-language biography synthesizing that corpus.
- **Gabriel García Márquez**: the file's own admission that *Living to
  Tell the Tale* wasn't actually mined in depth is the clearest, most
  actionable finding in this whole set — a genuine close reading of the
  already-cited memoir, plus Gerald Martin's *Gabriel García Márquez: A
  Life* (2008), the widely-regarded definitive biography (14 years of
  interviews with Márquez and his circle).
- **Kwame Nkrumah**: deeper mining of his own 1957 autobiography beyond
  its current use, plus Basil Davidson's *Black Star: A View of the Life
  and Times of Kwame Nkrumah* (1973) and David Birmingham's *Kwame
  Nkrumah: The Father of African Nationalism* for independent
  (non-self-authored) corroboration.
- **Miriam Makeba**: her own memoir *Makeba: My Story* (1988, with James
  Hall) — flagged by name in the file's own hold reason as the obvious
  next step and never consulted.
- **Desmond Tutu**: his own *No Future Without Forgiveness* (1999), his
  first-person account of chairing the Truth and Reconciliation
  Commission — the single most relevant possible source for exactly the
  episodes already being scored, and currently entirely absent — plus John
  Allen's *Rabble-Rouser for Peace: The Authorized Biography of Desmond
  Tutu* (2006).
- **Naguib Mahfouz**: Rasheed El-Enany's *Naguib Mahfouz: The Pursuit of
  Meaning* (Routledge, 2004) — **verified this session** — plus published
  collections of Mahfouz's own extensive interviews (he was interviewed
  prolifically across his life and after the Nobel).
- **Ibn Battuta**: Ross E. Dunn's *The Adventures of Ibn Battuta: A Muslim
  Traveler of the 14th Century* (1986), a scholarly work that
  cross-references the *Rihla*'s claims against independent historical
  records (Delhi Sultanate chronicles, Maldivian and Chinese sources) to
  identify which specific episodes are externally corroborated versus
  uncorroborated — directly useful for converting some rows from
  `inference` to a properly-earned `strong_inference`/`documented` without
  inventing anything, and for being honest about which parts of the *Rihla*
  aren't recoverable this way.
- **Simone de Beauvoir**: a genuine close reading of the already-cited
  4-volume memoir and published correspondence (currently very lightly
  mined at 21 rationale lines from thousands of pages), plus an
  independent, non-self-authored biography for the multi-instance
  corroboration SS76 specifically requires — Deirdre Bair's *Simone de
  Beauvoir: A Biography* (1990), based on extensive original interviews
  with de Beauvoir herself and her circle.

## 5. RECOVERABLE / POSSIBLY RECOVERABLE / STRUCTURALLY THIN / DEFER

| Candidate | Classification |
|---|---|
| Saladin | RECOVERABLE |
| Golda Meir | RECOVERABLE |
| Sun Yat-sen | RECOVERABLE |
| Junko Tabei | RECOVERABLE (strongest case — a dedicated, previously-untapped memoir-derived biography exists) |
| José Martí | RECOVERABLE |
| Gabriel García Márquez | RECOVERABLE |
| Kwame Nkrumah | RECOVERABLE |
| Miriam Makeba | RECOVERABLE |
| Desmond Tutu | RECOVERABLE |
| Naguib Mahfouz | RECOVERABLE |
| Simone de Beauvoir | RECOVERABLE (a scoring-integrity revert, not a genuine evidence shortage — the underlying corpus is arguably the richest of the 14) |
| Al-Biruni | POSSIBLY RECOVERABLE (genre-level domain-narrowness may not fully lift even with more sources) |
| Chien-Shiung Wu | POSSIBLY RECOVERABLE (same domain-narrow caveat) |
| Ibn Battuta | POSSIBLY RECOVERABLE (single-witness historiographic ceiling — Dunn's cross-referencing can help specific rows but can't manufacture a second witness to most of his personal life) |

**11 RECOVERABLE, 3 POSSIBLY RECOVERABLE, 0 STRUCTURALLY THIN, 0 DEFER.**

## 6. Candidates that should be removed from primary 30

**None**, based on this audit. No candidate in the 14 classified as
STRUCTURALLY THIN or DEFER — the two severe cases (Pelé, Madam C.J. Walker)
were already handled in the prior closure audit and are outside this
task's 14. This is a materially better result than the prior audit could
have shown, because it was working from confidence-floor numbers alone;
looking at the underlying source material shows the shortfall is
overwhelmingly a *research-depth* problem (thin mining of sources that
already exist, several explicitly self-flagged in the old files) rather
than an *evidence-availability* problem.

## 7. Recommended alternate replacements

**None triggered.** Per §5, no candidate here qualifies for the §5(prompt)
STRUCTURALLY THIN/DEFER comparison step, so no swap against the 10
alternates is justified by this audit. The 3 POSSIBLY RECOVERABLE names
(Al-Biruni, Chien-Shiung Wu, Ibn Battuta) are the ones to watch — if their
evidence-pack pass (§13) doesn't move them, *that* would be the trigger for
a future §5-style alternates comparison, not this audit's finding.

## 8. Fresh-candidate evidence-feasibility results (the 16 with no prior file)

**What READY means, made explicit (this was implicit before — corrected
here per review)**: READY FOR FIRST BLIND SCORE does **not** mean accepted,
promoted, or predicted to score highly. It means only that the readily
identifiable evidentiary landscape for this person is rich and
multi-sourced enough that normal Protocol v1 first-scoring research (which
already involves per-person searching as a matter of course) can proceed
without a *separate, front-loaded* evidence-pack phase first. NEEDS
EVIDENCE PACK FIRST means the opposite judgment call: a specific,
named structural risk (a compressed lifespan, a single source genre, a
policy-only textual record) makes it worth deliberately assembling and
checking the evidence *before* any score is attempted, rather than
discovering the same risk mid-scoring. Neither label says anything about
the eventual score — a READY candidate can still land anywhere from a
strong pass to an honest hold, exactly like the 14 in §1-§7 above.

Applying the same real standard (behavior-rich, multi-source, multi-domain
evidence — not "a biography exists") rather than the pre-screen heuristic
used in the first audit:

| Candidate | Classification | Why |
|---|---|---|
| José Rizal | READY FOR FIRST BLIND SCORE | Own novels, extensive personal correspondence (thousands of preserved letters), trial record, multiple substantive biographies (Austin Coates 1968) |
| Lee Kuan Yew | READY FOR FIRST BLIND SCORE | Own two-volume memoir, extensive recorded interviews, multiple substantive biographies |
| Shirin Ebadi | READY FOR FIRST BLIND SCORE | Own memoir *Iran Awakening*, documented specific legal casework, extensive interviews (living-person evidence discipline applies) |
| Edward Said | READY FOR FIRST BLIND SCORE | Own memoir *Out of Place*, extensive interviews, substantial secondary scholarship |
| Babur | READY FOR FIRST BLIND SCORE | The *Baburnama* — one of the most candid first-person autobiographies in the entire pool, comparable to Martí/García Márquez in density |
| Ravi Shankar | READY FOR FIRST BLIND SCORE | Own two autobiographical books, 70-year documented public career, well-covered relationships |
| Deng Xiaoping | READY FOR FIRST BLIND SCORE | Ezra Vogel's ~900-page definitive biography alone is exceptionally rich; his own repeated purge/rehabilitation cycle is well-documented behavioral material |
| Bob Marley | READY FOR FIRST BLIND SCORE | Timothy White's *Catch a Fire* (standard biography), extensive interviews, documented specific episodes (1976 assassination attempt, One Love Peace Concert) |
| Sebastião Salgado | READY FOR FIRST BLIND SCORE | Extensive own interviews, the feature-length first-person documentary *The Salt of the Earth*, a well-documented mid-career crisis/pivot episode |
| Haile Selassie | READY FOR FIRST BLIND SCORE, with a flag | His own memoir is state-curated, a court-authored-record genre caveat — but 44 years of independent foreign-press coverage and diplomatic accounts are separately available and should be prioritized alongside the memoir, not the memoir alone. **Not** one of the 4 NEEDS-EVIDENCE-PACK names below — the independent-source path here is already well identified, which is exactly what distinguishes "READY, with a flag" from "NEEDS EVIDENCE PACK FIRST." |
| Stephen Hawking | READY FOR FIRST BLIND SCORE | Own bestselling memoir, ex-wife's own published memoir, 40+ years of interviews, a uniquely well-documented long-term adaptation arc |
| Ratan Tata | READY FOR FIRST BLIND SCORE | Extensive press record, a documented and extensively covered boardroom conflict (the 2016-17 Tata-Mistry dispute) giving real conflict/decisiveness texture beyond hagiography, at least one dedicated biography (*Ratan Tata: A Life*, Thomas Mathew) |
| Raden Ajeng Kartini | NEEDS EVIDENCE PACK FIRST | Her own published letters are genuinely rich and personal, but she died at 25 — real risk that sustained-career-type attributes (the taxonomy leans on multi-decade behavior) won't reach coverage even with good source depth; worth a dedicated pass before assuming this clears easily |
| Akbar the Great | NEEDS EVIDENCE PACK FIRST — **reasoning corrected this session** | The *Akbarnama* (written by his own official, Abul Fazl, to glorify him) carries a genuine genre bias toward public deeds over private behavior. The original draft of this audit stated that independent, non-court sources "needed to be identified" as if none were known — **that was wrong, and is corrected here rather than quietly smoothed over**: Antonio Monserrate's *Commentary* (a Jesuit priest who lived at Akbar's court for two years, 1580-1582, tutored his son, and accompanied him on the 1581 Kabul campaign) is a real, well-documented, independent eyewitness source — verified this session (Library of Congress catalog record, Internet Archive full text, first published 1914 by the Asiatic Society of Bengal). The classification stays NEEDS EVIDENCE PACK FIRST — not because no independent source exists, but because neither the *Akbarnama* nor Monserrate has actually been mined yet, and the point of the pack is to do that mining (specifically checking whether Monserrate's account, written by an outside observer with no reason to flatter Akbar, contains real behavioral texture) before any score is attempted. |
| Ashoka the Great | NEEDS EVIDENCE PACK FIRST | His Edicts are public policy/religious proclamations — the only genuine primary source, and structurally thin on private behavioral texture; worth one dedicated pass (Romila Thapar's scholarship contextualizes but may not add new personal facts) before treating this as more than a CAUTION case |
| Baruch Spinoza | NEEDS EVIDENCE PACK FIRST | Real primary correspondence exists (~50 surviving letters) plus two near-contemporary accounts (Lucas, Colerus), but volume is much thinner than a modern memoir; Steven Nadler's *Spinoza: A Life* (1999) is the standard modern reconstruction and should be the first stop |

**12 READY FOR FIRST BLIND SCORE, 4 NEEDS EVIDENCE PACK FIRST, 0 UNSUITABLE.**
The 4 NEEDS-EVIDENCE-PACK names, stated once here without ambiguity so no
other table row's cross-reference can be misread as a fifth: **Raden
Ajeng Kartini, Akbar the Great, Ashoka the Great, and Baruch Spinoza.**
No other candidate on this page — including Haile Selassie, whose row
above names a related but distinct court-authored-source caveat — is part
of this set.

## 9. REVISED primary 30

**Unchanged from the prior closure audit's final 30.** Nothing in this
evidence audit surfaced a reason to remove or swap anyone — all 14 held
candidates are RECOVERABLE or POSSIBLY RECOVERABLE (§5), and none of the 16
fresh candidates came back UNSUITABLE (§8). The 4 fresh names flagged
NEEDS EVIDENCE PACK FIRST (Kartini, Akbar, Ashoka, Spinoza) stay in the 30
but should not receive a first blind score until their evidence pack (§13)
is done — same discipline now applied consistently to both fresh and held
names.

## 10. REVISED alternates 10

**Unchanged from the prior closure audit's 10** (Chief Joseph, Suleiman
the Magnificent, Anwar Sadat [CAUTION: prior held file], Corazon Aquino,
Hannah Arendt, Miguel de Cervantes, Norman Borlaug, Roald Amundsen
[CAUTION: prior held file, severe shortfall], Ho Chi Minh, Sukarno) — no
trigger from §7 to change this list.

## 11. Number genuinely READY FOR BLIND SCORING

**12** — the fresh candidates in §8 with no evidence-pack prerequisite:
Rizal, Lee Kuan Yew, Shirin Ebadi, Edward Said, Babur, Ravi Shankar, Deng
Xiaoping, Bob Marley, Sebastião Salgado, Haile Selassie, Stephen Hawking,
Ratan Tata.

## 12. Number requiring evidence-pack work first

**18** — the 14 held candidates (§1) plus the 4 fresh NEEDS-EVIDENCE-PACK
candidates (Kartini, Akbar, Ashoka, Spinoza).

## 13. Recommended evidence-pack batches

- **Batch 1 — deepen existing rich-but-under-mined sources (11, highest
  confidence of success)**: Saladin, Golda Meir, Sun Yat-sen, José Martí,
  Gabriel García Márquez, Kwame Nkrumah, Miriam Makeba, Desmond Tutu,
  Naguib Mahfouz, Simone de Beauvoir, Junko Tabei. Work = a genuine close
  read of the memoir/primary source each file already cites (several
  explicitly under-used, per §4) plus the one named additional biography
  each.
- **Batch 2 — domain-narrow / historiographically harder (3, real but
  bounded upside)**: Al-Biruni, Chien-Shiung Wu, Ibn Battuta. Work = the
  specific additional sources in §4 (Al-Biruni's other works, a Wu
  biography, Dunn's *Rihla* cross-referencing) — go in expecting a
  partial, not complete, lift.
- **Batch 3 — first-time evidence pack for fresh candidates (4, before any
  first score)**: Kartini, Akbar the Great, Ashoka the Great, Baruch
  Spinoza. Work = establish whether a genuine 18-attribute,
  multi-domain-behavior corpus exists at all before running a first blind
  score, using the sources named in §8 — for Akbar specifically, Antonio
  Monserrate's independent eyewitness *Commentary* (§8's corrected entry)
  should be the first source mined, not a second pass over the *Akbarnama*
  alone.

## 14. Recommended future blind-scoring batches (once evidence packs land)

- **Round 1 — no prerequisite, can run now**: the 12 READY names from §11,
  split into 2 batches of 6 for manageable session size.
- **Round 2 — after evidence-pack Batch 1 completes**: the 11 names there,
  each getting exactly one fresh `eligibility_v2` run per the frozen
  protocol (never iterated toward passing).
- **Round 3 — after evidence-pack Batches 2 and 3 complete**: the
  remaining 7 (Al-Biruni, Chien-Shiung Wu, Ibn Battuta, Kartini, Akbar,
  Ashoka, Spinoza) — run last, and only for whichever of these the pack
  actually turned up enough for; a real, honest possibility that 1-2 stay
  held or move to rejected/deferred even after this pass, which is a
  correct outcome, not a failure of process.

## 15. Confirmation: no score-targeted evidence gathering occurred

- No candidate file's numeric `score` values were viewed or used to decide
  what to search for. Where a numeric confidence/coverage figure appears
  in this document (§2), it is copied verbatim from the file's own
  pre-existing `holdReason` text, used only to explain why a hold
  happened — never as a target to search toward.
- Every source recommendation in §4/§8 was generated by asking "what
  serious independent account of this person's *life* exists, organized
  by *life period and source type*" — memoir, correspondence, scholarly
  biography, institutional archive — matching this task's own worked
  example ("X biography early career conflict collaboration letters"),
  never "evidence that X was adaptable" or any other attribute-shaped
  query.
- I did not run a new trait score, did not touch `rows`, `computedEligibility`,
  or `holdReason` on any of the 14 files, and did not create or edit any
  `data-pipeline/candidates/*.json` file this session.
- The 3 source titles I was not already highly confident about (Tabei's
  translated memoir, the Tata biography landscape, El-Enany's Mahfouz
  study) were spot-verified by title/author/year only — not searched by
  attribute.

## 16. Final verdict

**EVIDENCE DEEPENING REQUIRED** — but a materially better-scoped one than
the prior audit's verdict implied. This audit did not find any of the 14
to be dead weight: 11 are RECOVERABLE with clearly identified, already-real
sources (several of which — Tutu's own TRC memoir, Makeba's own memoir,
García Márquez's own under-mined memoir — are almost embarrassingly
obvious misses from the original one-session batch research), and only 3
carry a genuine, bounded historiographical ceiling (POSSIBLY RECOVERABLE).
Combined with 4 fresh candidates needing a first-time evidence pack before
any score, **18 of the 30 primary candidates need defined evidence work
before a blind score is attempted; 12 do not and could be scored now.**
Once Batches 1-3 (§13) are done and Round 2-3 scoring (§14) actually runs
(a step this audit deliberately does not take), the primary 30 should be
revisited once more — not because the selection was wrong, but because
this is exactly the sequencing the frozen protocol already specifies:
evidence before score, and score before eligibility, never the reverse.

Nothing in this document assigns, implies, or targets a trait score for
any candidate.
