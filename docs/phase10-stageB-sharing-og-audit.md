# Post-10D Stage B — Sharing UX & Open Graph Audit

**Status: Stage B v1 is FORMALLY CLOSED, human visual-approved (2026-08).**
This document is now a historical record of the audit and decision round
that preceded implementation — see `docs/phase10-provisional-checkpoint.md`'s
"Stage B record" for the full as-built/closure record (final architecture,
verification, files changed, production confirmation). Originally produced
overnight, autonomously, immediately after Post-10D Stage A (SEO & Locale
Foundation) was formally closed, committed (`719b91d`), pushed, and
verified live in production. The human decision round that followed
resolved every Section J question this document originally isolated
(those resolutions are recorded inline throughout — search for
"**APPROVED**"); a second, separate human visual-approval round then
reviewed the actual implementation's screenshots and approved it exactly
as built, with no further changes requested. Every technical claim below
is grounded in the actual repository as it existed when written — file
paths, function signatures, and behavior were read directly, not recalled
from memory or assumed. Where a claim depends on Next.js's own documented
behavior (not this repo's code), the specific doc page consulted
(Next.js 16.3.1, current as of 2026-08) is cited inline. **This document's
own "implementation sequence"/"Section J" framing below describes the
PRE-implementation plan — read `docs/phase10-provisional-checkpoint.md`'s
"Stage B record" for what was actually built, which followed this plan
closely but should be treated as the authoritative as-built record.**

**Scope discipline, stated up front:** this audit does not authorize any
implementation. Its job is to leave only genuinely subjective
product/design questions for a human — see Section J for the isolated
list. Everything else below is either a settled technical fact (grounded
in code or current Next.js docs) or a recommendation with explicit
reasoning, ready to implement once the Section J questions are answered.

---

## A. Current share-surface map

For each surface: should it get a Share action, is its URL inherently
public, does sharing expose user-derived data, should Web Share/copy-link
be offered, should it get route-specific OG, or should sharing be absent
entirely.

| Surface | URL | Share priority (APPROVED) | Public/static? | User-derived data? | Share UI? | OG image (v1 scope) |
|---|---|---|---|---|---|---|
| Results | `/{locale}/results?r=...` | **#1** | Yes, but content is derived from the `r` token | Yes — a specific computed result | **Yes** | Generic (dynamic deferred, Section E) |
| Compare | `/{locale}/compare/{slug}?r=...` | **#2** | Yes, same token mechanic as Results | Yes | **Yes** | Generic (dynamic deferred, Section E) |
| Person | `/{locale}/people/{slug}` | **#3** | Yes, static | No (canonical dataset, same for everyone) | **Yes** | **Person-specific, in v1 scope** |
| Landing | `/{locale}` | — | Yes, static | No | Not recommended | Generic |
| Saved Result | `/{locale}/account/results/{id}` | — | **No — owner-only, RLS-gated** | Yes, and gated | **No — must not gain a public Share action** | No |
| Account | `/{locale}/account` | — | No — owner-only | Yes | No | No |
| People directory | `/{locale}/people` | — | Yes, static | No | Not recommended (see below) | Already has generic-ish metadata from Stage A; no change needed |
| Quiz | `/{locale}/quiz` | — | Yes, static | No | Not recommended (redundant with Landing) | Already has Stage A metadata; no change needed |

**Reasoning per surface, beyond the table:**

- **Person** is the cleanest *technical* candidate in the entire product
  (this is an OG-architecture observation, not the approved Share
  priority — Person is priority #3 for the Share control itself, see
  above): the content is canonical dataset content (identical for every visitor,
  confirmed by `people/[slug]/page.tsx` reading only `SEED_PEOPLE` — no
  request-derived state at all), the route is already `●` SSG for all 70
  locale×person combinations, and there is zero privacy question (a
  person's trait profile is published, public content by design — the
  entire People explorer exists to make it browsable). This is also the
  one surface where a rich, dynamic, per-entity OG image is
  straightforward to build within Next's file-convention system with no
  workaround needed (Section E).
- **Results is the #1 priority share surface — APPROVED.** The
  original audit had flagged Person as the technically cleanest
  candidate; the approved product decision is that **Results is the
  core viral sharing moment for this product** ("share your quiz
  result" is the whole point of a personality-style quiz product, and
  Person's cleanliness is a technical convenience, not the actual
  product priority). Final approved priority: **1. Results, 2. Compare,
  3. Person.** This is the one surface where the privacy contract
  actually matters — see Section B — and where OG image generation
  hits a real Next.js architectural constraint (Section E) that Person
  does not; neither of those facts changes the priority decision, they
  just mean Results ships its Share *control* first while still using
  the *generic* OG preview image at first (Section E/D — this
  deliberate split is itself approved, not a compromise).
- **Compare is priority #2** — same token mechanic and privacy shape as
  Results, real but narrower audience than "my own result."
- **Person is priority #3 for the Share control itself**, even though
  it remains the technically simplest OG case (Section E) — OG image
  *scope* and Share-button *priority* are two different, independently
  decided axes; see the approved OG scope note in Section E.
- **Saved Result must never get a public Share action.** Confirmed from
  code, not assumed: `fetchSavedResult.ts` (`src/lib/results/
  fetchSavedResult.ts`) selects only `id, result_snapshot` from
  `user_profiles` — it does not even select `result_token` — and
  ownership is enforced entirely by the `user_profiles_own` RLS policy,
  meaning a non-owned or bare-visited `/account/results/{id}` URL
  resolves to the exact same generic "not found" state regardless of
  whether the id exists (Phase 10C's own documented, deliberate
  non-leak property — see `CLAUDE.md`'s Phase 10C section, "a
  non-owned row is indistinguishable from a nonexistent one"). Handing
  this URL to another person therefore does nothing useful for them —
  they will always see either the not-found state or (if signed out)
  the auth-required state, never the content. A Share button here would
  be actively misleading.
  - **Genuinely separate, NOT-in-scope observation for later**: if a
    signed-in user ever wants to share their *saved* result, the
    correct product shape would be a "Copy public link" action that
    reconstructs the equivalent `/results?r={token}` URL — but that
    requires the raw `result_token`, which the current `fetchSavedResult`
    query does not select. This would be a small, safe additive change
    (`select("id, result_snapshot, result_token")`) *if and when* that
    feature is ever wanted — flagged here for the record, not
    recommended for Stage B, and explicitly not started.
- **Account** — same reasoning as Saved Result, no ambiguity.
- **People directory** — sharing the bare directory URL is low-value
  (equivalent to sharing the homepage) and, more importantly, the
  directory's search/filter/sort state is **not synced to the URL at
  all** — confirmed by reading `PeopleDirectoryClient.tsx` (this
  session's own Stage A work): `query`/`era`/`region`/`sort` are plain
  `useState`, never a search param. This means there is currently no way
  to even construct a "share this filtered view" URL — a real
  prerequisite gap if filtered-directory sharing is ever wanted, noted
  here as a finding, not a Stage B recommendation.
- **Quiz** — sharing "come take this quiz" is a plausible marketing
  action, but it's functionally identical to sharing Landing (both just
  invite someone to the site with no personal content attached).
  Landing is the more natural, singular "invite" surface; a second,
  separate Share button on Quiz specifically would be redundant UI for
  no added value.

---

## B. Privacy contract

**What a `?r=...` token actually contains, read directly from
`src/core/quiz/serialize.ts`:** the quiz version string plus one
character per quiz question (a digit 1-7 for `likert7` items, a letter
encoding a choice option's index for everything else). That is
**literally all** it contains — no name, no email, no account id, no
IP, no timestamp. It is not tied to any account by the token itself;
Phase 9/10C's account-linking is a *separate* mechanism (a signed-in
browser's own pending-result queue, matched server-side against the
authenticated `auth.getUser()` call — never derivable from the token
string alone).

**What someone WITH the link can see, precisely** (from
`computeResultView`/`buildResultSet` and the Results page's own render
tree — `src/core/results/resultView.ts`, `app/[locale]/results/
page.tsx`): the full 34-trait scored profile (score + confidence + z for
every attribute), Greatness Potential score + band + primary/secondary
archetype, the signature trait, the strongest dual-edged trait, the
closest-matching historical/contemporary person + match percentage +
explanation, up to 7 category (facet) matches, up to 5 "more people
worth meeting," and a full trait-by-trait comparison against the closest
match (shared traits, where you differ, your advantage). **Compare**
(`/compare/{slug}?r=...`) additionally reveals the same shape of
comparison against a person the visitor did NOT necessarily choose to
be compared against by name (whoever the sharer picked when they
generated that link).

**What is NOT revealed by either link, confirmed by code inspection, not
assumption:** the visitor's real name, email, or any other account
identity (results are computed fresh from the token every time — `/
results/page.tsx` never reads `cookies()`/auth state to *render* the
result, only `SignInCta`'s own optional, clearly-scoped save flow does,
and that reads the *viewer's own* session, never the link-sharer's);
whether the original quiz-taker has an account at all; the exact
wall-clock time the quiz was taken (Results recomputes live and carries
no timestamp in the URL; Saved Result's snapshot does carry
`completedAt`, but Saved Result is never link-shareable per Section A).

**Disclosure copy — APPROVED (2026-08), still open to minor polish during
screenshot review, per the decision that recorded it:**

> **Results — EN:** "Anyone with this link can view this result."
> **Results — KO:** "이 링크를 가진 사람은 누구나 이 결과를 볼 수 있어요."
> **Compare — EN:** "Anyone with this link can view this comparison."
> **Compare — KO:** "이 링크를 가진 사람은 누구나 이 비교를 볼 수 있어요."

("this result" → "this comparison" is the only approved variation
between the two surfaces, per the decision — no other wording change.)
**Person needs no disclosure at all** — Person content is public
dataset content with no per-visitor computed data, so there is nothing
to disclose (consistent with Section A's reasoning for why Person never
needed a privacy question in the first place).

This single sentence covers the two things a person sharing a link
should actually know before doing so: (1) the link itself is the only
access control — no login required to view it, and (2) it doesn't
identify them personally by name/email to the viewer. Both are true
today regardless of whether Stage B ships anything — this is a
disclosure of EXISTING, already-shipped behavior (`/results` has never
required auth to view), not a new privacy posture Stage B would
introduce. A Share feature makes this fact more *operationally relevant*
(a user is now being actively invited to hand the link to someone), which
is the actual argument for surfacing the sentence near the Share
control, not for changing the underlying access model. **Per the
approved decision, this stays exactly this short — do not permanently
add a longer explanation about account/name linkage unless the UI
genuinely needs it during implementation.**

**Saved Result / Account remain owner-only and gain no public Share
action** — restated from Section A as the load-bearing privacy boundary
Stage B must not cross. This finding is unchanged by the priority/scope
decisions above.

---

## C. Share interaction architecture

Three approaches evaluated:

1. **Copy link only.** Simplest, works everywhere, no browser API
   dependency. Downside: on mobile, this is a strictly worse experience
   than a native share sheet (an extra "now paste this somewhere"
   step) for the majority of real-world sharing (messaging apps, not
   pasting a URL into a text field).
2. **Web Share API (`navigator.share`) first, copy-link fallback.**
   `navigator.share` is well-supported on mobile Safari and Chrome
   Android (opens the OS-native share sheet — Messages, WhatsApp,
   Instagram, etc. directly) but inconsistently supported on desktop
   (Chrome/Edge desktop support it in recent versions; Firefox desktop
   does not as of this writing; Safari desktop has partial support).
   The standard, well-established progressive-enhancement pattern for
   exactly this situation: check `typeof navigator.share === "function"`
   at render/click time, use it when present, fall back to writing the
   URL to the clipboard (`navigator.clipboard.writeText`) plus a visible
   confirmation state otherwise.
3. **Explicit separate Share and Copy Link controls,** always both
   visible. More UI surface/clutter for the common case (most visitors
   are on one device type at a time and only need one of the two
   affordances) — better suited to a product that specifically wants to
   advertise multiple distribution channels (e.g. a press/media page),
   not this product's shape.

**APPROVED (2026-08): option 2, one button, progressive enhancement.**
The decision explicitly confirmed this over option 3 ("do not expose
separate permanent 'Share' and 'Copy link' buttons unless implementation
evidence later proves one action is insufficient") — meaning a future
split into two controls is not precluded, but requires real evidence
from shipping option 2 first, not a preemptive design choice. Concretely:
- **One control** (`variant="quiet"`, matching this project's existing
  tertiary-action convention — see Section D).
- **Exact approved labels** (still open to minor polish "during
  screenshot review if they prove visually or linguistically awkward,"
  per the decision — not frozen the way the technical architecture is):

  | Surface | EN | KO |
  |---|---|---|
  | Results | Share result | 결과 공유 |
  | Compare | Share comparison | 비교 공유 |
  | Person | Share | 공유 |

- On click: try `navigator.share({ url, title })` if available (this
  covers "Web Share first"); if unavailable, or if the user's share
  sheet is dismissed without error, or if `navigator.share` itself
  isn't present, fall back to `navigator.clipboard.writeText(url)`.
- **Failure feedback, all paths must degrade gracefully, never
  silently:**
  - `navigator.share()` throwing `AbortError` (user dismissed the OS
    share sheet) is NOT a failure — it should be treated as a no-op,
    not shown as an error.
  - `navigator.clipboard.writeText()` can reject (permissions,
    non-secure context — moot in production since it's always HTTPS,
    but relevant if this is ever tested over plain HTTP) — needs a
    visible failure state, not a silent no-op.
  - Success (either path) needs a visible, accessible confirmation —
    this project's own established rule ("colour is never the only
    signal") means a brief text-state change ("Copied!" / a localized
    equivalent) is the right pattern, not a color-only checkmark or a
    toast that relies on animation alone. A `aria-live="polite"` region
    is the correct accessible-announcement mechanism so screen-reader
    users get the same confirmation sighted users do.
- **No icon dependency.** This product currently has zero icon
  library/glyph system beyond `ImpactBadge`'s own text-paired glyphs
  (confirmed by grep — no `lucide`/`heroicons`/svg-icon-set dependency
  in `package.json`). A plain text button ("Share" / "공유하기") is the
  lowest-risk, most consistent-with-existing-patterns choice, and
  avoids introducing a new visual-icon dependency this project has
  deliberately not needed so far. If a share/link glyph is wanted later
  that's a separate, small design decision, not a Stage B blocker.
- Runs correctly in local dev (`navigator.share`/`clipboard` require a
  secure context, but `localhost` is treated as secure by browsers, so
  this needs no dev-only special-casing).

---

## D. Exact UI placement audit

**Not yet approved — still requires screenshot review, per the product
decision round.** Priority, interaction model, labels, disclosure copy,
and OG scope are all now decided (see the sections above); exact
placement remains the one open Section-D-shaped question, to be
confirmed once the approved Share control actually exists to screenshot
in context. The ranked recommendations below stand as the audit's
technical/semantic reasoning for a human to confirm or override, not a
final layout decision.

No JSX changed by this audit — every claim below is grounded in the
actual current render tree, read directly from each page's source this
session.

### Results
Current CTA cluster (`app/[locale]/results/page.tsx`, inside the Closest
Match `Card`): `[View Profile] [Full Comparison] [Compare With {person}]`
— `primary` / `secondary` / `quiet` variants respectively, in a
`Cluster gap={3}`.

- **Option 1 (recommended): add `[Share]` as a 4th `quiet`-variant
  action in that same existing cluster.** Belongs there semantically —
  this cluster already IS "the actions you take on your result," and
  Share is exactly that kind of action, not a page-level utility.
  Reuses an established pattern instead of introducing a new one.
  Desktop: sits inline with the other three, wraps naturally via
  `Cluster`'s existing flex-wrap behavior at narrow widths (already
  proven — this cluster already handles 3 buttons responsively). Mobile:
  same wrap behavior, no new component needed.
- **Option 2: a standalone quiet action in the top hero region** (near
  the Greatness score / archetype note), separate from the Closest
  Match card. Semantically also defensible ("share the whole result,"
  not just the closest-match card specifically) but would introduce a
  net-new button into a region that is currently pure typography
  (`Display`/`Numeric`/`Text` only, no `Button` anywhere in that `Rail`
  today) — a bigger visual change for a marginal semantic gain over
  Option 1.

**Ranked: Option 1 over Option 2.**

### Compare
Current hero (`IdentityHero` block) has **no button cluster at all**
today — just name/occupation/era/lifespan/match%. `TargetSwitcher`
(a "compare with someone else instead" search control) renders much
later in the page, in its own dedicated section.

- **Option 1 (recommended): a standalone quiet Share action directly in
  the `IdentityHero` block**, as a new small element alongside the
  match% line. Keeps "share this specific comparison" visually anchored
  to the specific comparison being shown.
- **Option 2: place it next to `TargetSwitcher`.** Rejected as the
  primary choice — `TargetSwitcher` is a functionally different action
  (changes WHICH comparison you're looking at); placing Share
  immediately next to "pick a different person" risks the two being
  confused as related actions when they aren't.

**Ranked: Option 1 over Option 2.**

### Person
Current hero (`IdentityHero`, inside `people/[slug]/page.tsx`): Eyebrow
→ H1 name → lifespan → polity → `ConfidenceIndicator` → an optional
Wikipedia/Wikidata external-links row → `CompareCta` (a real `Button`,
`primary` or `secondary` depending on whether the visitor has a saved
result).

- **Option 1 (recommended): place Share as a peer action next to
  `CompareCta`**, in the same `Stack`, same visual weight class
  (`quiet` variant, since `CompareCta` already occupies the
  primary/secondary slot). Reasoning: Share and "Compare Yourself" are
  both primary, first-class actions a visitor takes on this profile —
  grouping them together in "the action row" the hero already
  establishes is the more legible hierarchy.
- **Option 2: group Share with the Wikipedia/Wikidata reference-links
  row.** Rejected as primary — that row is explicitly "external
  reference material," a different semantic category from "things you
  can do with this page as a first-class action," and burying Share
  among plain text links would under-emphasize it relative to its
  actual value.

**Ranked: Option 1 over Option 2.**

**Risk check, all three surfaces:** none of the recommended placements
introduce a new bordered/shadowed card, a gradient, or a decorative
icon — each is a single `variant="quiet"` text button added to an
*existing* button cluster or action row. This is the smallest possible
visual footprint and does not risk reviving the "SaaS/card-heavy"
pattern this project's own "Anti-AI-template" principle warns against.

---

## E. OG architecture audit

### The one load-bearing technical fact, verified against current Next.js docs (16.3.1, fetched live this session)

**A file-convention `opengraph-image.tsx` route receives ONLY `params`
(dynamic route segments) — never `searchParams`.** Confirmed directly
from Next's own API reference: "The default export function receives...
`params` (optional): A promise that resolves to an object containing the
dynamic route parameters." No `searchParams` prop exists in this
convention's signature, in any version. This means **a file-convention
OG route physically cannot read a page's `?r=...` query string** — the
concern the Stage B brief explicitly flagged not to assume away was
correct to flag; the assumption would have been wrong.

**What this means per surface:**
- **Person** (`people/[slug]/opengraph-image.tsx`) — no problem at all.
  `params.slug` is exactly what this file-convention was designed for
  (the docs' own worked example is literally `app/shop/[slug]/
  opengraph-image.tsx`). Fully static-parameter-driven, no query string
  ever needed.
- **Results/Compare** (token-derived content) — the file convention
  cannot receive `r`. Two real architectures were identified, and a
  decision between them is now made:

  1. **Generic, non-personalized OG — APPROVED for Stage B v1, both
     Results and Compare.** A single static image (or a small, finite
     set — e.g. one per locale) regardless of the token's content.
     Works perfectly within the file convention (a plain `results/
     opengraph-image.tsx`/`compare/[slug]/opengraph-image.tsx` with no
     token dependency at all). Zero engineering complexity, zero
     privacy surface (never renders any user-derived number), builds
     once at build time (static optimization — see below). **The
     approved product decision is explicit that Results/Compare are
     fully shareable in Stage B even though their first social preview
     uses this same generic TGI card, not a personalized one — this is
     intentional, not a compromise or an unfinished state**, for three
     stated reasons: sharing functionality and dynamic result previews
     are separate concerns; a dynamic preview amplifies visibility of
     user-derived result data to a wider, less-intentional audience
     than the sharer alone (anyone scrolling a feed or group chat sees
     the preview before anyone clicks); and third-party platforms cache
     previews, compounding any related caution. The added architectural
     complexity of option 2 was judged not justified for a first
     version.
  2. **A hand-built Route Handler** (e.g. `app/api/og/results/
     route.ts`), NOT the special file convention — a plain dynamic
     route that reads `request.nextUrl.searchParams.get("r")` directly
     (confirmed architecturally valid: the docs' own "Route Handlers"
     `ImageResponse` example is exactly this shape — a plain handler
     with full `Request` access), decodes/scores it server-side
     (reusing the exact same `decodeResultToken`/`computeResultView`
     pipeline `/results/page.tsx` already uses — no new logic), and
     returns a real `ImageResponse`. This URL would then be referenced
     from `generateMetadata`'s `openGraph.images` on the actual
     `/results` page (which DOES receive `searchParams`, since that's
     an ordinary page-level `generateMetadata`, not the special OG file
     convention). Real engineering cost (a new route, real per-request
     rendering unless cached), technically sound, but **explicitly
     DEFERRED — not part of the first Stage B implementation, for
     either Results or Compare.** Recorded here as a deliberate,
     approved scope boundary (see Section E's closing note below and
     Section J), not an unfinished defect to fix later out of
     obligation — a genuinely fresh, separate decision is required
     before this is ever built, covering exactly which fields (closest
     match, match %, Signature Trait, Greatness score) a dynamic
     preview may show and how third-party caching affects that choice.

  **Privacy nuance worth stating precisely, preserved from the original
  audit (still accurate, informs but does not override the scope
  decision above):** option 2 would not create a NEW disclosure —
  anyone who already has the `?r=...` link can see everything the OG
  image would show by simply clicking the link today. The OG image
  would be a *preview* of already-accessible content, not an additional
  leak channel. The approved caution is about *amplified, less-intentional
  visibility* (a feed/group-chat audience versus the direct link
  recipient), not a hard privacy blocker — this is exactly the reasoning
  captured in the three stated deferral reasons above.

  **Caching nuance, a real finding, preserved for whenever option 2 is
  eventually revisited:** unlike a Saved Result snapshot (deliberately
  frozen, per Phase 10C), a *live* `/results?r=...` computation is NOT
  pinned — it recomputes against whatever taxonomy/matching/calibration
  is current at request time, by the same design Phase 10C's whole
  historical-fidelity work exists to work around for the *saved* case.
  A per-token OG image built the same way would inherit that same "can
  drift if the algorithm changes" property. An aggressive
  `Cache-Control: immutable` header would be WRONG for such an endpoint
  (a social platform could cache a since-outdated preview indefinitely);
  a moderate, explicit `max-age` (on the order of a day) would be the
  technically correct choice, whenever this is built — not "cache
  forever," and not "no cache" either.
- **Compare OG** — identical architectural finding and identical
  approved v1 scope (generic only, dynamic explicitly deferred).

### Generic fallback OG — content APPROVED, visual treatment still needs screenshot review

**Visual direction — APPROVED as a design brief, not yet a final layout
(the decision is explicit that "the exact visual treatment still
requires screenshot review before final approval"):**

- **Avoid:** gradient blobs, glassmorphism, bento/card composition, pill
  badges, fake data/statistics, generic SaaS/social-card styling — the
  exact same list this project's existing "Anti-AI-template /
  human-authored design principle" (`CLAUDE.md`) already names as tells
  to avoid everywhere else on the site; OG work gets no exception.
- **Prefer:** strong typography, the warm paper-like background already
  established site-wide, the restrained single purple accent (never a
  gradient), a TGI wordmark, and minimal content — consistent with this
  product's whole editorial/publication visual identity, not a separate
  "social media" style invented just for share cards.

- **Universal, not per-locale** is the simplest correct default (a
  locale-specific fallback OG image would need real translated design
  work for marginal benefit at this stage — the generic card's job is
  brand recognition, which doesn't require localized copy the way a
  page's own metadata description does). A locale-aware VERSION is not
  precluded later, just not necessary for a v1.
- **Dimensions:** `1200×630` — the documented, universal standard
  (Open Graph's own recommended size, and Next's own `size` default
  matches it exactly in every code example fetched this session).
- **Content:** site name + the one-line proposition already used in
  `meta.landing.description` (Stage A's own EN/KO copy) — reusing
  existing, already-approved product language rather than inventing new
  marketing copy.
- **Where generated/stored:** `app/opengraph-image.tsx` at the true
  root (outside `/[locale]/*`, mirroring `app/(default)/layout.tsx`'s
  scope from Stage A) OR `app/[locale]/opengraph-image.tsx` if a
  locale-aware version is wanted later — both are valid Next.js
  locations; the root-level placement is simpler and sufficient for a
  universal card. Statically generated at build time (confirmed by the
  docs: "By default, generated images are statically optimized...
  unless they use Request-time APIs" — a generic card with no dynamic
  input qualifies automatically).

### Person OG — content hierarchy APPROVED, in Stage B v1 scope
**APPROVED content, exactly as decided:** person name, localized
occupation/domain or a compact identity line, era/lifespan where
appropriate, and The Great Inside branding — matching, not exceeding,
what the original audit had already identified as safe:
- **Safe to expose (already public dataset content):** person's display
  name (localized via `personDisplayName`), primary occupation
  (`occupation.{id}`, already localized), era label, The Great Inside
  branding/site name.
- **Probably acceptable, minor editorial judgment:** a very short
  descriptor line (e.g. lifespan, or one impact-domain chip) — genuinely
  a content-hierarchy taste call, see Section H. **Approved as
  in-scope** ("era/lifespan where appropriate") — exact inclusion per
  person is still a minor editorial call during implementation, not a
  blocker.
- **Should avoid:** any confidence/evidence-quality metadata
  (`overallProfileConfidence` is presentation metadata for *this
  product's own UI*, not branding-appropriate marketing copy for a
  social preview); any trait score (a specific attribute score rendered
  out of context in a share card risks looking like a claim/ranking
  rather than the "location on a dimension, not a rating" framing this
  project insists on everywhere else it appears — reusing that number
  outside its normal `ScoreBar`/`TraitCard` context would be a real
  regression of that discipline).
- **No portrait dependency — required, not optional, restated in the
  approved decision itself ("Do not make Person OG quality depend on
  portrait availability").** Confirmed via
  `grep -n "portrait: {"` across both seed files (same check Phase
  10D-2 already used): **exactly 1 of 35 people** (Leonardo da Vinci)
  has a populated `portrait` field at all. Building a portrait-dependent
  OG design would produce a visually broken/inconsistent card for 34 of
  35 people. A purely typographic card (name + occupation/era + site
  branding, no image asset) is therefore not just the conservative
  choice, it's the only choice that doesn't need its own separate
  fallback-design decision for the 97% of the roster with no portrait.

### Compare OG — generic-only in v1, same analysis as Results
Dynamic Compare OG is explicitly DEFERRED, same as Results (see above);
Compare's own OG preview uses the generic TGI card in Stage B v1. If a
dynamic version is ever built later, the same generic-vs-dynamic
tradeoff and same caching nuance as Results apply.

---

## F. Social crawler / token safety — proven from code, not assumed

**Determined: a GET to `/results?r=...` (or `/compare/[slug]?r=...`)
causes zero server-side persistence, auth mutation, or Supabase write.**
Traced every component that route renders:
- `app/[locale]/results/page.tsx` itself is a Server Component that
  calls `decodeResultToken`/`computeResultView` (pure functions, no
  I/O) and renders. It imports no Supabase client of any kind — grep
  confirms zero `@lib/supabase/*` import in this file.
- `SaveLastResult.tsx` (`"use client"`) only writes to `window.
  localStorage` inside a `useEffect` — this requires a real browser
  executing JavaScript. Virtually every social/messaging link-preview
  crawler (Facebook, Slack, Discord, iMessage, Twitter/X, etc.) fetches
  the raw HTML via a plain HTTP GET and does **not** execute
  JavaScript — this is extremely well-established crawler behavior, not
  an assumption specific to this project. Even in the hypothetical case
  of a JS-executing crawler, this effect is scoped to the REQUESTING
  client's own local storage, never a server or shared-state write.
- `SignInCta.tsx` (`"use client"`) only calls Supabase from the
  **browser** client (`@lib/supabase/client`, never the server client),
  and only after resolving the *viewer's own* auth state via
  `supabase.auth.getUser()` (a read) — any actual save requires an
  explicit signed-in click, never happens automatically on render, and
  a crawler (no cookies, no session, typically no JS execution at all)
  never reaches that code path.

**No BLOCKER found.** This is a genuine, code-verified finding, not an
assumption — the exact discipline the brief asked for.

---

## G. Deterministic OG rendering constraints

**`ImageResponse` (`next/og`) hard limits, confirmed from current Next.js
docs:**
- Maximum **500KB total bundle size** — includes JSX, CSS, fonts,
  images, everything the render touches.
- Only `.ttf`, `.otf`, `.woff` font formats (NOT `.woff2` — a real,
  easy-to-miss constraint since `.woff2` is what `next/font/google`
  self-hosts for the main site).
- Only flexbox + a CSS subset (Satori's engine) — no CSS grid.
- Default runtime: Node.js (no `edge` runtime requirement found in this
  project's `next.config.mjs`, and nothing about the OG use case forces
  edge — Vercel supports both for this feature).

**The real, load-bearing finding for Korean text specifically:**
measured directly against this project's own last production build —
the self-hosted `Noto_Serif_KR` font (`next/font/google`, used for the
main site's Korean headings) ships as **124 separate `.woff2` chunk
files totaling ~3.28MB**, the largest single chunk ~48KB. This chunking
is `next/font/google`'s own automatic Unicode-range subsetting, designed
for browser-side `@font-face { unicode-range }` lazy-loading — it is
**architecturally incompatible with `ImageResponse`**, which needs ONE
complete font buffer supplied via `fonts: [{ data: ArrayBuffer }]`, not
a CSS mechanism, and only accepts `.ttf`/`.otf`/`.woff` besides (not the
`.woff2` these chunks actually are). **The existing self-hosted font
asset cannot be reused for OG images at all, in any form, without new
work.**

### Investigated Korean OG font strategy — a clean solution exists, no STOP condition triggered

The decision asked this to be investigated concretely, with an explicit
instruction to STOP and report if no clean solution exists rather than
invent a hack. **A clean, standard, well-established solution exists:
manually subsetting the same `Noto Serif KR` family already used
site-wide, down to only the glyphs this product's OG surfaces actually
need.** Checked against every stated requirement:

- **Preserves existing web typography — satisfied by construction.**
  This strategy does not touch `src/lib/fonts.ts` or anything the live
  site renders; it produces a SEPARATE, OG-only font asset, prepared
  once and read only by OG image code (matching the docs' own "doesn't
  depend on request data, read it once at module scope" pattern for
  custom fonts). The live site keeps using `next/font/google`'s
  self-hosted, browser-optimized delivery exactly as it does today —
  Stage B's OG work does not touch or replace that mechanism at all,
  it adds a second, independent, purpose-built asset next to it.
- **Same family, not a different font** — reusing `Noto Serif KR`
  specifically (rather than picking a different, unrelated Korean font
  "because it's easier to subset") keeps OG cards visually consistent
  with the site's own established editorial serif identity, which
  matters for the "restrained, editorial" visual direction (see the
  Generic OG section above) — a mismatched font family on the share
  card would itself be a small brand-consistency regression.
- **Source availability, confirmed general fact:** Google Fonts
  publishes the full, unsubsetted `.ttf`/`.otf` source for every font
  it distributes (including Noto Serif KR) in its own public font
  repository — this is the same upstream source `next/font/google`
  itself downloads from at build time, just before it performs its own
  browser-oriented chunking; the full source file is a normal,
  legitimately obtainable asset, not something that needs to be
  reverse-engineered from the already-chunked `.woff2` files this
  project currently ships.
- **Subsetting tool:** `fonttools`' `pyftsubset` (the standard, widely
  used, actively maintained tool for exactly this task — trims a font
  down to only the requested Unicode codepoints, output as `.ttf`/
  `.otf`, both formats `ImageResponse` accepts directly). This is an
  **offline, one-time asset-preparation step** — `fonttools` is a
  Python tool used only by whoever prepares the subset file; it is
  **not** a runtime dependency of the deployed Next.js application in
  any way, and introduces no new dependency in `package.json`. The
  output is a single static font file committed into the repository
  (e.g. `assets/og/NotoSerifKR-OG-Subset.ttf`), read via `fs.readFile`
  at module scope exactly like the docs' own "Custom fonts" example.
- **Exact, bounded glyph scope** (what makes this deterministic and
  small, not a guess): the Hangul syllables appearing in all 35
  `person.name.*` Korean values (`ko.ts`), the Hangul in the full
  closed set of `occupation.*` Korean values actually used across the
  current roster (Phase 8 already documented this as a closed set of
  ~45 keys), and the Hangul in whatever short generic Korean OG copy is
  finalized (the site tagline / "공유" label / similar — all already
  fixed, small strings), plus basic Latin/digits/punctuation for
  numbers and mixed EN/KO strings. This is a **closed, small,
  enumerable set** (on the order of a few hundred unique Hangul
  syllable blocks at most — nowhere near the ~11,172 syllables a
  general-purpose Korean font must cover), which is exactly why this
  subset is expected to land at low tens-of-KB to a modest low
  hundreds-of-KB, comfortably under the 500KB total `ImageResponse`
  budget — categorically different from the ~3.28MB full font, not
  merely "somewhat smaller."
- **Deterministic:** the subset is a fixed, versioned file — same
  output every time for the same input glyph list, no runtime
  generation, no network fetch at request time.
- **No generative AI:** a pure, mechanical glyph-extraction operation
  on an existing, already-licensed open font — nothing about this
  approach involves any model of any kind.

**Not yet executed — this is the approved technical direction for Stage
B implementation to follow, not a font file that already exists in the
repository.** Producing the actual subset file (identifying the exact
final glyph list from the approved OG copy, running `pyftsubset`,
committing the output, measuring its real size) is Stage B
implementation work, correctly out of scope for this audit/decision
update. **No STOP condition was triggered** — this is reported as a
clean, investigated, standard solution, not a hack.

**Satori's default (no custom font supplied) does not cover CJK glyphs**
— this is documented, widely-reported behavior of the underlying Satori
engine (the same renderer `next/og` uses): its bundled fallback is a
Latin-oriented sans font. An EN-only generic/Person OG card can ship
today using Satori's defaults or a small bundled Latin font; a KO
version of the same cards genuinely cannot render correctly without the
subsetted font work above.

**Long-name / line-wrapping:** the longest Korean person display name in
the current roster is "볼프강 아마데우스 모차르트" (Wolfgang Amadeus
Mozart, Korean form); the longest English canonical name actually
rendered anywhere is "Jalal ad-Din Muhammad Rumi" (Rumi's full English
form — English never overrides `canonicalName`, confirmed in
`i18n/index.ts`). Both are good, real (not synthetic) test cases for
any Person-OG line-wrap verification.

**No generative-AI dependency anywhere in this design** — every
recommendation above uses only `next/og`'s deterministic
JSX-to-image rendering over structured, already-known data (person
name, occupation, score numbers). Consistent with this project's "zero
generative AI calls" rule (`CLAUDE.md`, "The one rule") — an OG image is
presentation of already-computed data, not a new AI-generated artifact,
and no part of this audit proposes otherwise.

**Vercel compatibility:** `next/og`'s `ImageResponse` is a first-party
Vercel/Next.js feature (originally shipped as `@vercel/og`) with no
extra platform configuration needed on Vercel specifically — this
project's existing Vercel deployment (confirmed live and working since
Stage 10B) needs no new infrastructure to support it.

---

## H. Share-card content candidates (content hierarchy only, not visual polish)

**Generic/fallback card:** site name (`site.name`) as the dominant
element, the existing `meta.landing.description` one-liner beneath it.
Nothing else — this card's only job is brand recognition when a bare
domain or an un-specialized page gets shared.

**Person card:** person's display name (dominant), occupation + era as
a secondary line, "The Great Inside" as small branding (never dominant
— the person is the subject, not the product). No portrait (Section E).
No trait scores, no confidence indicator.

**Results card — Stage B v1 uses the generic card, APPROVED, per
Section E.** The content-hierarchy question below applies only to a
future, separately-decided dynamic Results OG — it is preserved here
for that future decision, not for anything Stage B v1 will build:
- **Safe to expose:** the fact that this is a Greatness Profile result
  from The Great Inside (site branding, generic "results exist" framing)
  — this alone is a legitimate, privacy-neutral card even with zero
  personalization (this IS the "generic OG" that Stage B v1 actually
  ships).
- **Probably acceptable, IF a per-token dynamic image is ever built
  later** (Section E option 2, explicitly deferred, not part of Stage B
  v1): the Greatness Potential score alone (already displayed as `N /
  100`, never a percentage, matching this project's own "not a
  probability" framing — the number is already a public-safe format
  wherever it appears) and/or the closest-match person's name. Both are
  things the token's OWNER presumably wants shown when they choose to
  share (that's the entire point of sharing a result) — the caution
  here is about a THIRD PARTY seeing more than they'd expect from a
  link preview, not about the number's format being unsafe in itself.
- **Should avoid, even if a dynamic Results OG is eventually built:**
  the full trait breakdown, the signature trait, dual-edged trait, or
  any comparison detail — a link *preview* showing this much detail
  starts to substitute for actually clicking through, and (more
  importantly) compounds the "third party sees this without the sharer
  necessarily having thought about exactly how much" concern.
  **Recommendation for that future decision: Greatness score +
  closest-match name is the practical ceiling** — the disclosure
  sentence from Section B should sit immediately next to whatever Share
  control exists specifically because of this amplification (a preview
  card is seen by MORE people than the sharer necessarily intends,
  including in group chats/social feeds, before anyone even clicks the
  link). **This entire bullet is explicitly recorded as future-decision
  material per the approved scope (Section E/Section J) — Stage B v1
  does not build any of it.**

**Compare card:** same ceiling logic as Results, same DEFERRED status —
Stage B v1 uses the generic card here too.

**Caching reminder carried over from Section E:** OG images are cached
by third-party platforms (Facebook/Slack/etc. cache link previews for
extended periods, sometimes requiring manual "scrape again" tools to
refresh) — this is exactly why a moderate, explicit `Cache-Control`
(not "forever," not "never") matters for anything token-derived, and
why a generic, non-personalized card is the safer default to ship
first regardless of what's technically possible.

---

## I. Test architecture — the exact automated plan, designed before any implementation

### Vitest candidates (pure logic, `src/lib`/`src/core`, matching this project's established test-location convention)
- **Share-surface eligibility** — a pure `canShare(routeKind)`-style
  lookup (Results/Compare/Person → true; Account/Saved-Result → false),
  analogous to `NOINDEX_FOLLOW`/`NOINDEX_NOFOLLOW` in `src/lib/seo.ts` —
  the single source of truth the Share-control component and the
  privacy-disclosure component both consult, so the two can never drift
  independently (mirrors how `localizedAlternates()` is Stage A's one
  shared canonical/hreflang authority).
- **Privacy disclosure copy selection** — once real i18n keys exist, a
  regression test (matching `translationCoverage("ko-KR") === 1`'s
  existing pattern) asserting full EN/KO coverage for every new
  disclosure/share-related key, same discipline as every prior
  localization stage in this project.
- **OG metadata/image URL construction** — pure functions building
  the `openGraph.images` URL for whichever architecture Section E's
  human decision lands on; if the Route Handler path is chosen for
  Results, a dedicated test asserting the built URL **never** embeds a
  result token in a form that could appear in unrelated metadata (e.g.
  a generic/other-page's metadata accidentally including a leftover
  token) — same "never leak a token where it doesn't belong" discipline
  Stage A's `seo.test.ts` already established for canonical/hreflang
  URLs.
- **Synthetic result data only** — every test exercising Results/
  Compare OG logic reuses the SAME synthetic-token discipline already
  established this session (`results.visual.spec.ts`'s committed
  `neutral`/`high`/etc. fixtures, generated via `encodeResultToken`) —
  never real user data, matching this project's oldest, most consistent
  privacy discipline.
- **Route privacy-contract regression guard** — a permanent test, same
  pattern as `SavedResultView.boundary.test.ts`'s import-grep approach,
  asserting `app/[locale]/results/page.tsx` and `app/[locale]/compare/
  [slug]/page.tsx` import zero `@lib/supabase/*` modules — locking
  Section F's crawler-safety finding as a structural guarantee, not
  just a one-time audit claim that could silently rot.

### Playwright candidates (`e2e/`, production-build harness, same discipline as every existing spec)
- Share control presence/absence per surface (visible on Results/
  Compare/Person, absent on Account/`/account/results/[id]` — including
  a dedicated **negative** test using the existing `savedResultPreview.
  tsx` static-fixture harness, explicitly asserting no share-control
  selector exists anywhere in its rendered output, so "no accidental
  Saved Result share CTA" is enforced, not just believed).
- `navigator.share` supported branch — mock/stub `navigator.share` in
  the test context (Playwright supports this via `page.addInitScript`)
  and assert it's invoked with the correct `{url, title}`.
- Unsupported branch — delete/stub `navigator.share` as undefined,
  assert the clipboard-copy fallback path fires instead.
- Successful clipboard write — assert the visible confirmation state
  appears (text change, not just a DOM attribute) and includes an
  `aria-live` region a screen reader would announce.
- Clipboard failure — force `navigator.clipboard.writeText` to reject,
  assert a visible failure state, never a silent no-op.
- EN/KO — confirm the Share button's own label and confirmation text
  are correctly localized (same `meta.*`-style coverage discipline).
- Mobile/desktop viewports — confirm the button doesn't introduce
  horizontal overflow or clipped text at 390/768/1280/1920px, reusing
  `assertNoHorizontalOverflow`/`assertNoClippedElements` from `e2e/
  utils/visualChecks.ts` exactly as every prior stage did.
- Query-token preservation — the Share control's constructed/copied URL
  must exactly match the current page's real URL including `?r=...`
  (trivial to get wrong if a share-URL builder function is written
  instead of just using `window.location.href` directly — a test should
  exist regardless of which approach implementation picks).
- No accidental Saved Result share CTA — see above, both a Vitest
  boundary guard and a Playwright DOM-absence assertion, matching this
  project's now-standard "assert the negative explicitly, don't just
  omit the positive" discipline.

### OG HTTP/image tests
- Correct `Content-Type` (`image/png`) on every OG image endpoint.
- Cache-Control header correctness — for the generic/Person static
  images (build-time optimized, long cache expected) vs. any
  token-derived dynamic endpoint (moderate, explicit max-age per
  Section E's caching finding — never "immutable" for anything
  recomputed from live state).
- EN/KO Person OG rendering — at minimum, a successful 200 + correct
  content-type + non-trivial byte size (a real regression guard against
  a silently-broken/empty image) for both locales; ideally paired with
  the actual rendered pixel output inspected once manually if a true
  visual check is wanted (this is the one sub-item that edges toward
  "needs a human eye," flagged lightly, not as a full blocker — see
  Section J).
- Person long-name rendering — Mozart (KO) and Rumi (EN full canonical
  form) specifically, the two concrete longest-name cases identified in
  Section G, asserted not to overflow/clip within the fixed 1200×630
  canvas.
- Generic fallback — confirm it renders successfully even for
  edge-case/malformed inputs (an unknown slug, a missing param) rather
  than ever 500ing.
- **No secret/user-token leakage in unrelated metadata** — a regression
  test hitting a Person or generic OG endpoint with an extraneous
  `?r=...` query string appended (simulating a stray/copy-pasted param)
  and asserting the returned image/metadata is byte-identical to the
  same request without it — proving these endpoints never accidentally
  consume or echo a token they weren't designed to read.

---

## J. Product/design decisions — RESOLVED (2026-08) vs. still open

Everything in this audit is resolved by code inspection and technical
reasoning, except the items below — a human decision round has since
resolved all but the genuinely visual ones, which correctly remain open
until there's something real to screenshot.

**RESOLVED by the approved decision round:**
1. ~~Exact placement of the Share control~~ — **still technically
   pending screenshot review** (Section D was not itself blessed line
   by line), but the *ranked recommendation* stands as the working plan
   pending that review, not a fully open question anymore.
2. ~~Button vs. quiet-link visual treatment~~ — **RESOLVED: `quiet`
   variant, one control**, per Section C's approved interaction model.
3. ~~Exact disclosure wording~~ — **RESOLVED**, exact EN/KO copy
   recorded in Section B, explicitly still open to "minor polish... if
   they prove visually or linguistically awkward" during screenshot
   review — not a wholesale open question anymore.
4. ~~How much Results data appears in a share preview~~ — **RESOLVED
   for Stage B v1: none — the generic card only.** The
   safe/probably-acceptable/avoid tiers in Section H remain as
   documentation for the SEPARATE, later dynamic-OG decision, not an
   open Stage B v1 question.
5. ~~Whether to build a dynamic, per-token Results/Compare OG image at
   all, vs. shipping only the generic/Person-only OG work first~~ —
   **RESOLVED: generic + Person only for Stage B v1; dynamic
   Results/Compare OG is explicitly DEFERRED** to its own later,
   separate decision (Section E). This was the single biggest open
   scope question and is now closed.

**STILL OPEN, correctly so — genuinely visual, needs something real to
review:**
6. **OG visual direction** (typography, color, exact layout within the
   1200×630 canvas) — Section E's generic-OG update records an approved
   *design brief* (avoid gradients/glassmorphism/bento/pills/fake data;
   prefer typography/warm paper/restrained purple/wordmark/minimal
   content), explicitly **not** a final layout — "the exact visual
   treatment still requires screenshot review before final approval,"
   per the decision itself.
7. **Whether a share/link glyph is wanted eventually** (Section C notes
   a plain-text button is the lowest-risk v1 choice) — a real but
   optional future design decision, not required for a functional v1,
   unchanged by this decision round.
8. **Exact Share-control placement, confirmed against real
   screenshots** — the Section D rankings are the working plan; final
   confirmation still needs the control to actually exist in context.

---

## Smallest defensible Stage B implementation sequence — IMPLEMENTED AS PLANNED

**This sequence was actually followed, in this order, and is now closed —
see `docs/phase10-provisional-checkpoint.md`'s "Stage B record" for the
as-built details (exact files, final measurements, test counts).** The
two axes were kept independent, exactly as planned below, and were not
conflated:
Share-control rollout priority is Results → Compare → Person (Section
A); OG image scope for v1 is generic + Person only, with Results/Compare
using the generic card at first (Section E) — Results is simultaneously
"ships its Share control first" and "gets a personalized OG image
later," and that combination is the explicitly intended shape, not a
contradiction.

1. **Generic fallback OG image** (`app/opengraph-image.tsx` or
   `app/[locale]/opengraph-image.tsx`, per Section E) — foundational:
   every other surface's preview inherits this by default until/unless
   it gets something more specific, so it is the natural first concrete
   asset regardless of which Share button ships first. Needs the
   Section J #6 screenshot review before being considered final, but
   can be built and iterated against real renders.
2. **Share control on Results** (priority #1, Section A) — Web
   Share/clipboard-fallback per Section C's approved architecture,
   approved EN/KO label ("Share result" / "결과 공유"), approved
   disclosure sentence placed near the control. Its OG preview is the
   generic card from step 1 at this point — expected and correct, not
   a gap.
3. **Share control on Compare** (priority #2) — same pattern as step 2,
   approved label ("Share comparison" / "비교 공유"), same disclosure
   pattern adapted to "comparison." Same generic-card OG preview.
4. **Person-specific deterministic OG image** (Section E, in v1 scope)
   — requires the Korean font subset (Section G's investigated
   strategy) to be actually produced first if Korean Person OG is
   wanted in the same pass; an EN-only Person OG could ship
   independently of the Korean font work if sequencing makes that
   useful, since Satori's default already handles Latin text.
5. **Share control on Person** (priority #3, Section A) — same
   architecture as steps 2-3, approved label ("Share" / "공유"), no
   disclosure needed (Section B). Lowest rollout priority despite being
   technically the simplest surface — deliberately last per the
   approved priority, not because it's harder.
6. **Explicitly NOT in this sequence, recorded as its own later
   decision:** dynamic, per-token Results/Compare OG (Section E option
   2) — requires a fresh scope decision on exactly which result fields
   may appear (closest match / match % / Signature Trait / Greatness
   score) and how third-party caching affects that choice, per the
   decision's own item 8.

Favicon, manifest, custom 404, and Privacy/Terms routes (Part 7's
reconnaissance findings from the overnight session) remain **separate
launch-readiness candidates, explicitly NOT Stage B scope** — do not
fold favicon work into this sequence just because it's also "missing
branding."
