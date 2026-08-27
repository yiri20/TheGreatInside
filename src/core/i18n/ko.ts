import type { MessageKey } from "./en.js";

/**
 * PHASE 8K: `person.name.{slug}` is a free-form, per-person key namespace —
 * deliberately NOT added to `en.ts`/`MessageKey` (English display name is
 * always `Person.canonicalName`, so an English mirror entry would be pure,
 * driftable duplication of data `seed.ts`/`roster2.ts` already owns). This
 * template-literal type extends `ko`'s own type just enough to allow that
 * one additional key shape, still fully checked (no `any`/`as` at the
 * definition site below) — the SAME `tOptional(locale, key)` function used
 * for `historicalPolityKey` resolves these at the call site; see
 * `personDisplayName()` in `i18n/index.ts`.
 */
type PersonNameKey = `person.name.${string}`;

/**
 * Korean bundle.
 *
 * SCOPE NOTE (Phase 0): the structural layer — attribute names, impact labels,
 * interpretation templates, result copy, greatness bands, archetypes — is
 * translated here, because that is the layer the "locale never changes scoring"
 * invariant is tested against and the layer every generated sentence flows
 * through.
 *
 * PHASE 8 (2026-08): full localisation pass. All 64 `quiz_v2` prompts/options/
 * custom anchors, the development-guide corpus (34 attributes x 3 bands),
 * `helpsWhenKey`/`preservesKey`, `dontcopy.generic.*`/`dontcopy.tradeoff.*`,
 * and the 4 impact glyphs are now translated — see each section below.
 * Translation is semantic, not literal: every quiz item was checked against
 * the Evaluative Symmetry (CLAUDE.md) and Response-Anchor Symmetry rules
 * directly in Korean, not verified only in English then transliterated —
 * a literal rendering of an already-approved English item can still
 * reintroduce a good/bad or capable/incapable framing that the English
 * wording deliberately avoids, so each item was independently checked for
 * that risk in Korean. Quiz screen grouping (`quizScreens.ts`) reads
 * `en[q.promptKey]`'s length unconditionally, regardless of active locale —
 * confirmed by reading that file directly — so no Korean wording choice here
 * can affect which questions share a screen; the 53-screen structure is
 * identical in both locales by construction, not by any length-matching
 * discipline applied here.
 *
 * Templates keep {trait} / {person} placeholders. Korean word order differs, so
 * placeholders are positioned per-language rather than string-concatenated at
 * the call site — this is why interpolation happens on whole sentences.
 */
export const ko: Partial<Record<MessageKey, string>> & Partial<Record<PersonNameKey, string>> = {
  "attribute.curiosity": "호기심",
  "attribute.analytical_rigor": "분석적 엄밀성",
  "attribute.intuitive_synthesis": "직관적 통합",
  "attribute.systems_abstraction": "시스템적 사고",
  "attribute.independent_thinking": "독립적 사고",
  "attribute.creative_originality": "창의적 독창성",
  "attribute.experimentation": "실험 성향",
  "attribute.cross_domain_range": "분야 횡단성",
  "attribute.aesthetic_sensitivity": "미적 감각",
  "attribute.discipline": "자기 규율",
  "attribute.deep_focus": "몰입",
  "attribute.detail_orientation": "디테일 지향",
  "attribute.perfectionism": "완벽주의",
  "attribute.execution_speed": "실행 속도",
  "attribute.planning_orientation": "계획 지향",
  "attribute.persistence": "끈기",
  "attribute.adaptability": "적응력",
  "attribute.risk_tolerance": "위험 감수",
  "attribute.ambiguity_tolerance": "모호함 수용",
  "attribute.decisiveness": "결단력",
  "attribute.social_assertiveness": "사회적 적극성",
  "attribute.collaboration": "협업 성향",
  "attribute.leadership_drive": "주도 성향",
  "attribute.persuasiveness": "설득력",
  "attribute.conflict_tolerance": "갈등 감내",
  "attribute.mastery_orientation": "숙련 지향",
  "attribute.achievement_drive": "성취 욕구",
  "attribute.competitiveness": "경쟁 성향",
  "attribute.autonomy_need": "자율성 욕구",
  // PHASE 8K terminology revisions (human-approved), all presentation-only —
  // no scoring/taxonomy key changed, only these 4 display strings:
  //   impact_motivation: "영향력 동기" implied social power/authority
  //     ("영향력 있는 인물" = an influential/powerful figure); the construct
  //     (q29/q42/helps_when) is about wanting one's WORK to reach/affect
  //     people, not about personal clout. "영향 창출" (impact-creation)
  //     drops the power connotation.
  "attribute.impact_motivation": "영향 창출 동기",
  //   belief_updating: "신념 갱신" used "갱신," an administrative word
  //     (license/subscription renewal), not something said about a person
  //     changing their mind. "입장 수정" (revising one's position) matches
  //     q61/q40/q62's actual content (reopening/adjusting a settled stance).
  "attribute.belief_updating": "입장 수정 성향",
  "attribute.opportunity_sensing": "기회 감지",
  //   resourcefulness: "임기응변력" risked reading as ad-hoc cleverness/
  //     talking one's way through (a mild negative undertone in Korean),
  //     while the construct (q59/q60/q15c) is substituting/making do under
  //     resource constraint. "자원 활용 성향" tracks the actual quiz content.
  "attribute.resourcefulness": "자원 활용 성향",
  //   proactive_agency: "주도적 행동력" shared its "주도" root with
  //     leadership_drive's "주도 성향," a real naming collision (both
  //     visible together on real profile pages). "선제적" ("acting
  //     first/preemptively") is established Korean business usage for
  //     exactly this construct (acting before being asked/assigned) and
  //     doesn't overlap with leadership_drive's "directing a group" sense.
  "attribute.proactive_agency": "선제적 행동력",

  "facet.thinking": "사고",
  "facet.creativity": "창의성",
  "facet.work_style": "일하는 방식",
  "facet.resilience": "회복력",
  "facet.social": "관계",
  "facet.motivation": "동기",
  "facet.world_sense": "세상 감각",

  "facet.match.thinking": "사고 방식이 가장 가까운 인물",
  "facet.match.creativity": "창의성이 가장 가까운 인물",
  "facet.match.work_style": "일하는 방식이 가장 가까운 인물",
  "facet.match.resilience": "회복력이 가장 가까운 인물",
  "facet.match.social": "관계 방식이 가장 가까운 인물",
  "facet.match.motivation": "동기가 가장 가까운 인물",
  "facet.match.world_sense": "세상 감각이 가장 가까운 인물",

  "impact.advantage": "강점",
  "impact.dual_edged": "양날의 특성",
  "impact.risk": "위험 요소",
  "impact.neutral": "상황 의존적",

  "tpl.match_extremely_close": "{trait} 항목에서 두 프로필의 점수가 매우 비슷합니다.",
  "tpl.match_similar": "{trait} 수준이 서로 비슷하게 나타납니다.",
  "tpl.match_moderate_gap": "{trait} 항목에서는 어느 정도 차이가 있습니다.",
  "tpl.user_significantly_higher": "{trait} 항목에서 당신의 점수가 {person}보다 뚜렷하게 높습니다.",
  "tpl.person_significantly_higher": "{trait} 항목에서 {person}의 점수가 당신보다 뚜렷하게 높습니다.",
  "tpl.user_higher": "{trait} 항목에서 당신이 {person}보다 다소 높습니다.",
  "tpl.person_higher": "{trait} 항목에서 {person}이(가) 당신보다 다소 높습니다.",
  // PHASE 8 fix: was "{trait} 성향이", which duplicated for the 4
  // attributes whose Korean name already ends in "성향" (실험 성향/
  // 협업 성향/주도 성향/경쟁 성향— e.g. rendered "주도 성향 성향이 더
  // 뚜렷하게"), found live on the results page. "이(가)" attaches
  // directly to {trait} instead, reading correctly for all 34 attribute
  // names regardless of their own ending.
  "tpl.advantage_intro":
    "당신의 프로필은 {person}보다 {trait}이(가) 더 뚜렷하게 나타납니다. 이 성향이 요구되는 상황에서는 유리하게 작용할 수 있습니다.",
  // PHASE 8K polish: "낮다는 것이 ~을 뜻하지는 않습니다" was a noun-heavy
  // nominalization chain. "낮다고 해서 ~있는 것은 아닙니다" is the more
  // direct, natural spoken-register equivalent.
  "tpl.difference_not_deficiency":
    "차이는 부족함이 아닙니다. {trait} 항목에서 {person}보다 낮다고 해서, 반드시 메워야 할 격차가 있는 것은 아닙니다.",

  "result.profile_match.explainer":
    "프로필 일치도는 The Great Inside가 측정하는 특성들에서의 유사도를 나타냅니다. 심리 진단이나 미래의 성공에 대한 예측이 아닙니다.",
  "result.greatness.explainer":
    "Greatness Potential은 The Great Inside의 인물 데이터에서 나타난 패턴을 바탕으로 만든 참고용 프로필 점수입니다. 미래의 성공 가능성을 예측하는 지표는 아닙니다.",
  "result.greatness.how":
    "이 점수는 당신의 특성 패턴이 데이터셋에 나타나는 여러 성취 패턴들과 얼마나 가깝게 정렬되는지를 나타냅니다.",
  "result.match.how":
    "설문으로 산출된 당신의 특성 프로필을, 데이터베이스의 각 인물에게 동일한 기준으로 부여된 특성과 비교합니다. 근거가 더 확실한 특성일수록 비중이 커집니다.",
  "result.confidence.explainer":
    "이 프로필은 기록된 전기적 근거와 구조화된 해석을 바탕으로 작성되었으며, 본인이 직접 수행한 심리 검사 결과가 아닙니다.",
  "result.opposite.framing":
    "반대 프로필은 데이터베이스에서 당신과 측정된 패턴이 가장 다른 인물입니다. 평가가 아니라 탐색을 위한 결과입니다.",
  "result.distinctive":
    "당신의 프로필에는 비범한 인물들에게서 자주 나타나는 패턴이 여럿 포함되어 있지만, 그 조합 자체는 비교적 드뭅니다.",
  "result.unexpected.framing":
    "완전히 다른 분야에 있지만, 아래 특성들에서 두 프로필은 강하게 겹칩니다.",

  "label.greatness_potential": "Greatness Potential",
  "label.closest_match": "가장 가까운 인물",
  "label.unexpected_match": "의외의 인물",
  "label.opposite_profile": "반대 프로필",
  "label.signature_trait": "당신을 가장 잘 나타내는 특성",
  "label.dual_edged_trait": "가장 뚜렷한 양날의 특성",
  "label.you_both": "공통점",
  "label.where_you_differ": "가장 큰 차이",
  // Reworded Stage 10C-B (Phase 6.6), matching en.ts — "더 유리할 수 있는"
  // ("more advantageous") carried the same higher-is-better framing the
  // English fix removed.
  // PHASE 8K fix: "당신이 다르게 기여하는 지점" was unnatural Korean and
  // risked reintroducing higher-is-better framing on any future rewrite.
  // Brand-tone micro-pass (final Phase 8 pass, human-approved): "당신에게
  // 더 두드러지는 점" → "내 쪽이 더 두드러지는 점" — warmer, first-person
  // "내"(my) is a common, idiomatic Korean UX self-referential register
  // (cf. "내 정보"/"내 프로필"), not a grammatical inconsistency with the
  // second-person "당신의 프로필은..." body copy immediately below it
  // (tpl.advantage_intro) — headings and body text conventionally differ
  // in person/register in Korean product copy. Still states the same fact
  // (a trait more pronounced on the user's side) without
  // "장점"/"우위"/"뛰어나다"/"낫다" language.
  "label.your_advantage": "내 쪽이 더 두드러지는 점",
  // PHASE 8K: converged with compare.section.dont_copy on the same
  // non-prescriptive noun-phrase register (see that key below).
  "label.dont_copy": "그대로 따라갈 필요는 없는 점",
  "label.the_edge": "강점",
  "label.the_cost": "대가",
  "label.signature_trait.support": "당신의 프로필에서 가장 두드러지는 특성 중 하나입니다.",
  "label.you": "나",
  "label.profile_match": "프로필 일치도",
  "label.confidence": "프로필 신뢰도",

  "confidence.low": "근거 제한적",
  "confidence.moderate": "근거 보통",
  "confidence.high": "근거 충분",

  "greatness.band.uncommon_alignment": "흔치 않은 정렬",
  "greatness.band.emerging_pattern": "형성 중인 패턴",
  "greatness.band.strong_pattern": "뚜렷한 패턴",
  "greatness.band.high_alignment": "높은 정렬",
  "greatness.band.exceptional_alignment": "매우 높은 패턴 정렬",

  "archetype.creative_creator": "창작자형",
  "archetype.scientific_explorer": "탐구자형",
  "archetype.entrepreneurial_builder": "개척자형",
  "archetype.technical_innovator": "기술 혁신가형",
  "archetype.organizational_leader": "조직 리더형",
  "archetype.independent_creator": "독립 창작자형",
  "archetype.competitive_performer": "경쟁 수행자형",
  "archetype.scholarly_specialist": "심화 전문가형",
  "archetype.cross_disciplinary_generalist": "분야 횡단형",
  "archetype.social_influencer": "사회적 촉매형",

  "archetype_result.strong_match": "닮은 점이 많아요",
  "archetype_result.distinctive_profile": "독특한 프로필",
  "archetype_result.cross_field_match": "분야를 넘어선 일치",
  "archetype_result.balanced_profile": "균형형 프로필",
  "archetype_result.unusual_combination": "드문 조합",

  "archetype_result.strong_match.body": "가장 가까운 인물과 여러 성향에서 비슷한 패턴이 나타났습니다.",
  "archetype_result.distinctive_profile.body":
    "당신의 특성 조합은 이 데이터셋 안에서 비교적 드뭅니다 — 특정 인물과의 일치 여부와 별개로 그 자체로 주목할 만합니다.",
  "archetype_result.cross_field_match.body":
    "가장 가까운 인물은 예상과는 전혀 다른 분야에서 삶을 만들어간 사람입니다.",
  "archetype_result.balanced_profile.body":
    "당신의 특성은 하나의 뚜렷한 패턴으로 쏠리기보다 폭넓게 분포되어 있습니다.",
  "archetype_result.unusual_combination.body":
    "당신의 프로필은 이 데이터셋의 특정 인물에게 뚜렷하게 수렴하지 않습니다 — 그 자체로 흥미로운 결과입니다.",

  "site.name": "The Great Inside",
  "results.hero.title": "당신의 프로필",

  "footer.legal_nav_label": "법적 고지",
  "footer.privacy": "개인정보처리방침",
  "footer.terms": "이용약관",

  "auth.sign_in": "로그인",
  "auth.sign_out": "로그아웃",
  "auth.account": "계정",
  // 공용 인라인 로그인 CTA 라벨 (Phase 10C 프로덕션 E2E 이후) — /account의
  // 로그아웃 상태와 /account/results/[id]의 로그인 필요 상태에서 함께 사용.
  "auth.sign_in_with_google": "Google로 로그인",
  "locale_switcher.label": "언어 변경",

  // Reworded Stage 10C-B (Phase 6.6), matching en.ts — removed the
  // population-norm claim, kept the meaning natural in Korean rather than
  // translating the English fix literally.
  "results.signature_trait.explain":
    "이 특성의 기준점은 {refMean}입니다. 당신의 점수는 {score}로, 전체 프로필 중 가장 두드러지는 지점 중 하나입니다.",
  "results.signature_trait.not_inherently_positive":
    "이 특성이 두드러진다는 것 자체가 좋거나 나쁘다는 뜻은 아닙니다 — 어떤 상황이냐에 따라 완전히 달라집니다.",

  "results.dual_edged.powerful_when": "적절한 상황에서는 이 성향을 살리는 것이 실질적인 강점이 될 수 있습니다.",
  "results.dual_edged.watch_for": "맞지 않는 상황에서는 같은 성향이 오히려 불리하게 작용할 수 있습니다.",

  "results.comparison.reassurance":
    "차이는 부족함이 아닙니다 — 우열이 아니라, 서로 다른 방식으로 효과적인 두 가지 방법일 뿐입니다.",

  "results.invalid.title": "결과를 불러올 수 없습니다",
  "results.invalid.body":
    "링크가 불완전하거나, 이전 버전의 설문으로 생성된 결과일 수 있습니다. 최신 결과를 보려면 설문을 다시 진행해 주세요.",
  "results.invalid.cta": "설문 시작하기",

  "results.section.trait_profile": "특성 프로필",
  "results.section.trait_profile.intro":
    "The Great Inside가 측정하는 34가지 특성을 범주별로 모았습니다. 점수는 그 사람이 어떤 지점에 있는지를 나타낼 뿐, 백분율도 우열의 척도도 아닙니다.",
  "results.trait_profile.highlights": "가장 두드러지는 특성",
  "results.trait_profile.all": "전체 특성",

  "results.section.category_matches": "영역별 가장 가까운 인물",
  "results.section.top_matches": "함께 살펴볼 만한 인물들",
  "results.section.how_calculated": "결과는 어떻게 계산되나요",
  "results.section.comparison": "{person}와(과)의 비교",

  "results.comparison.user_higher": "당신이 더 높은 지점",
  "results.comparison.person_higher": "{person}이(가) 더 높은 지점",

  "results.unexpected.none.title": "이번엔 의외의 인물이 없습니다",
  // PHASE 8K fix: same "기능의 누락이 아니라" QA-language issue as
  // compare.learn.none, same fix.
  "results.unexpected.none.body":
    "놀라움을 줄 만큼 가까운 프로필은 결국 당신과 비슷한 세계에 속한 인물들이었습니다 — 그 자체로 자연스러운 결과입니다.",

  "results.method.toggle": "결과는 어떻게 계산되나요",
  "results.method.intro":
    "이 과정 어디에도 생성형 AI는 사용되지 않습니다. 아래의 모든 수치는 고정되고 재현 가능한 계산으로 산출됩니다.",
  "results.method.step1": "답변은 34가지 측정 특성에 대한 점수로 변환됩니다.",
  "results.method.step2": "이 특성 프로필은 데이터베이스의 각 인물에게 기록된 동일한 34가지 특성과 비교됩니다.",
  "results.method.step3":
    "유사도는 특성이 단순히 몇 개나 일치하는지가 아니라, 전체적인 패턴과 전반적인 수준, 편차의 정도를 함께 고려합니다.",
  "results.method.step4":
    "역사적 근거가 상대적으로 부족한 인물은 유사도가 중립 기준 쪽으로 조정되어, 근거가 얇은 프로필이 인위적으로 가깝게 나타나지 않도록 합니다.",
  "results.method.step5":
    "화면에 표시되는 유사도 값은 수천 개의 시뮬레이션 프로필을 기준으로 보정되어, 전체 범위에서 일관되게 읽히도록 되어 있습니다.",

  "results.cta.view_profile": "프로필 보기",
  "results.cta.full_comparison": "전체 비교 보기",
  "results.cta.retake": "설문 다시 하기",

  /* ---------------------------------- Phase 10C: save-to-account + history */
  "results.save_cta.title": "결과를 저장해두세요",
  "results.save_cta.body": "로그인하면 이 결과를 계정에 저장하고 나중에 다시 확인할 수 있습니다.",
  "results.save_cta.action": "Google로 로그인하고 결과 저장하기",
  "results.save_cta.saved": "계정에 저장되었습니다.",

  "account.title": "저장된 결과",
  "account.signed_out.title": "로그인하면 저장된 결과를 볼 수 있어요",
  "account.signed_out.body": "로그인하면 저장해 둔 결과가 이곳에 나타납니다.",
  "account.signed_out.action": "Google로 로그인하기",
  "account.empty.title": "아직 저장된 결과가 없어요",
  "account.empty.body": "설문을 완료하고 로그인하면 첫 결과가 이곳에 저장됩니다.",
  "account.list.completed_at": "{date} 완료",
  "account.list.view": "보기",
  "account.list.unavailable": "초기 결과라 다시 볼 수 없어요",
  "account.delete.button": "저장된 결과 모두 삭제",
  "account.delete.confirm": "계정에 저장된 모든 결과가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없어요.",
  "account.delete.confirm_action": "네, 모두 삭제할게요",
  "account.delete.cancel": "취소",
  "account.delete.success": "저장된 결과가 모두 삭제되었어요.",
  "account.delete.error": "결과를 삭제하는 중 문제가 발생했어요. 다시 시도해 주세요.",
  "account.back": "저장된 결과로 돌아가기",

  "account.results.not_found.title": "결과를 찾을 수 없어요",
  "account.results.not_found.body": "다른 계정의 결과이거나, 링크가 올바르지 않을 수 있습니다.",
  "account.results.unavailable.title": "이 저장된 결과는 볼 수 없어요",
  "account.results.unavailable.body":
    "이 결과는 전체 스냅샷을 저장하기 전에 저장되어 원래 그대로 다시 볼 수 없습니다. 최신 결과를 보려면 설문을 다시 진행해 주세요.",
  "account.results.cta.retake": "설문 다시 하기",

  // Phase 10C 프로덕션 E2E에서 발견/수정: 로그아웃 직후 등 로그인하지 않은
  // 상태에서는 이 문구를 보여줘야 함 — account.results.not_found.*는
  // "결과가 없거나 다른 계정 것"이라는 잘못된 인상을 줌.
  "account.results.auth_required.title": "로그인이 필요해요",
  "account.results.auth_required.body": "저장된 결과를 보려면 다시 로그인하세요.",

  // 아직 어디에도 렌더링되지 않음 — Phase 7의 compare.cta.from_results와
  // 같은 패턴("사용할 UI가 만들어지기 전에 문구부터 확정"). 상세 배경은
  // src/lib/results/pendingOwnResults.ts의 격리(quarantine) 저장소 설명 참고.
  "account.legacy_pending.notice":
    "이 결과는 지금의 저장 방식이 도입되기 전에 완료된 것이라, 그때와 완전히 동일하게 재현된다고 보장할 수 없습니다. 다만 결과가 덮어써지거나 삭제되지는 않았습니다.",

  "compare.cta.has_result": "이 인물과 나 비교하기",
  "compare.cta.no_result": "설문하고 비교하기",
  "compare.cta.from_results": "{person}와(과) 비교하기",

  "compare.hero.eyebrow": "나 × {person}",

  // compare.section.differ/learn reworded Phase 7 Stage 7B, matching
  // en.ts's semantic split — see that file's comment.
  // Brand-tone micro-pass (final Phase 8 pass, human-approved): "공통점"
  // → "닮은 점" (warmer, "points of resemblance" rather than the flatter
  // "shared points") and "성향이 다른 지점" → "달라도 괜찮아" ("it's okay
  // to be different" — states "difference is not deficiency" directly, as
  // a heading, rather than only in the reassurance line beneath it).
  "compare.section.share": "닮은 점",
  "compare.section.differ": "달라도 괜찮아",
  // PHASE 8K fix: "그들에게서" (from them, plural) read oddly on a
  // one-person comparison page. "배워볼 만한 점" drops the pronoun
  // entirely — natural Korean omits the referent when it's already the
  // page's whole subject.
  "compare.section.learn": "배워볼 만한 점",
  // PHASE 8K fix: converged with label.dont_copy on the same
  // non-prescriptive register — "안 되는 것" (must not) was stronger and
  // more directive than the Phase 7 "not a claim you should copy this"
  // philosophy actually intends.
  // Brand-tone micro-pass (final Phase 8 pass, human-approved): "그대로
  // 따라갈 필요는 없는 점" → "다 따라갈 필요는 없어" — warmer, casual
  // register matching compare.section.share/differ above. NOTE:
  // label.dont_copy (a separate, currently-unreferenced key — see that
  // key's own comment) was NOT changed to match, per instruction to change
  // only these named headings; the two keys are now stylistically
  // divergent (one casual, one formal-noun-phrase) — flagged, not fixed,
  // since re-converging them wasn't requested this pass.
  "compare.section.dont_copy": "다 따라갈 필요는 없어",
  // Phase 7 human-review Stage(Issue 4) — en.ts와 동일하게 "비교"에서
  // "유사도"로 변경: 이 값은 사용자와 대상 인물 간의 영역별 유사도(정렬 정도)이지,
  // 사용자의 해당 영역 능력 점수가 아닙니다.
  "compare.section.facets": "영역별 유사도",
  "compare.section.detailed": "특성별 상세 비교",

  "compare.facets.intro": "{person}와(과) 각 영역에서 얼마나 비슷한 성향을 보이는지를 나타냅니다 — 그 영역에서의 능력이나 우수함을 뜻하지 않습니다.",

  // PHASE 8K fix: "한 프로필 안의 상관관계는 인과관계가 아닙니다" was an
  // academic slogan (a direct "correlation is not causation" calque).
  // Rewritten in plain product Korean while preserving both required
  // meanings: no causal claim about {person}'s life, and no claim that
  // traits appearing together in one profile caused one another.
  "compare.learn.intro":
    "아래는 눈여겨볼 만한 차이점들입니다 — {person}의 삶이 실제로 이 특성 때문이었다는 뜻은 아니며, 한 프로필 안에서 함께 나타난다고 해서 서로 원인과 결과로 이어진다는 뜻도 아닙니다.",
  // PHASE 8K fix: "기능의 누락이 아니라 그 자체로 유효한 결과입니다" read
  // like QA/error-state copy. Matches the register already used elsewhere
  // for the same "this null result is normal" idea (see
  // archetype_result.unusual_combination.body's "그 자체로 흥미로운
  // 결과입니다" pattern).
  "compare.learn.none": "이번에는 특별히 배워볼 만한 점이 나타나지 않았습니다 — 그 자체로 자연스러운 결과입니다.",
  "compare.learn.target_score": "{person}의 프로필은 {trait}에서 눈에 띄게 높은 점수({score} / 100)를 보입니다.",
  "compare.learn.try": "시도해볼 것:",
  "compare.learn.watch_for": "알아둘 점:",

  // Phase 7 human-review Stage (Issue 1) — compare.learn.*의 비지시적
  // 대응 항목. selectWorthExploring(targetComparison.ts) 참고.
  "compare.explore.title": "살펴볼 만한 점",
  "compare.explore.intro": "뚜렷하게 더 나은 방향이라 할 수는 없지만, 눈여겨볼 만한 몇 가지 차이가 있습니다.",
  // compare.explore.note 단순화 (Phase 7 human-review Stage, Issue 1) —
  // en.ts와 동일하게 대상 인물이 더 높은 경우만 해당.
  "compare.explore.note": "{person}은(는) {trait}에서 당신보다 더 강한 성향을 보입니다 — 더 나은 방식이 아니라 다른 방식일 뿐입니다.",
  "compare.explore.helps_when_label": "도움이 될 수 있는 상황:",
  "compare.explore.preserves_label": "지금 방식이 지켜주는 것:",

  "compare.dontcopy.intro": "일치도가 높다고 해서 모든 것을 따라 하는 게 도움이 되는 건 아닙니다 — 주의할 지점을 알려드립니다.",
  "compare.dontcopy.none": "이 프로필에서 특별히 주의할 점은 나타나지 않았습니다.",
  "compare.dontcopy.low_confidence_note": "역사적 근거가 제한적입니다 — 더 신중하게 참고하세요.",

  "compare.switch.title": "다른 인물과 비교하기",
  "compare.switch.placeholder": "비교할 다른 인물 검색",
  "compare.switch.empty": "검색 결과와 일치하는 인물이 없습니다.",

  "compare.invalid.title": "{person}와(과) 나를 비교하려면 설문을 진행하세요",
  "compare.invalid.body": "먼저 결과가 필요합니다 — 몇 분이면 충분합니다.",
  "compare.invalid.cta": "설문 시작하기",

  "compare.person_not_found.title": "해당 인물을 찾을 수 없습니다",
  "compare.person_not_found.cta": "전체 인물 보기",

  "landing.eyebrow": "The Great Inside",
  "landing.title": "역사 속 누구와 생각이 닮았을까요?",
  "landing.subtitle":
    "생각하고, 만들고, 일하고, 결정을 내리는 방식에 대한 질문에 답해보세요. 당신의 프로필을 {count}명의 비범한 인물들과 비교해, 실제로 누구와 가장 닮았는지 보여드립니다.",
  "landing.cta_primary": "나와 닮은 인물 찾기",
  "landing.cta_secondary": "먼저 인물들 둘러보기",
  "landing.ai_disclaimer":
    "모든 결과는 당신의 답변으로부터 결정적으로 계산됩니다 — 점수 산출이나 매칭 과정에 생성형 AI는 사용되지 않습니다.",
  "landing.method.eyebrow": "작동 방식",

  "quiz.intro.eyebrow": "시작하기 전에",
  "quiz.intro.title": "솔직한 답변이면 충분합니다",
  "quiz.intro.body":
    "생각하는 방식, 만드는 방식, 일하는 방식, 좌절에 대처하는 방식, 사람을 대하는 방식, 주변 세상의 변화를 감지하고 행동하는 방식, 그리고 무엇이 당신을 움직이는지에 대한 질문입니다. 처음 떠오르는 대로 답해주세요 — 정답은 없으며, 어떤 선택도 좋고 나쁨으로 평가되지 않습니다.",
  "quiz.intro.privacy": "답변은 이 브라우저와 결과 링크 안에만 남습니다. 서버로 전송되거나 계정에 저장되지 않습니다.",
  "quiz.intro.start": "시작하기",
  "quiz.intro.meta": "{count}문항 · 약 10–15분 · 로그인 필요 없음",

  "quiz.progress": "{total}문항 중 {current}번째",
  "quiz.progress.range": "{total}문항 중 {from}–{to}번째",
  "quiz.progress.section": "{sectionTotal}개 섹션 중 {index}번째 · {name}",
  "quiz.nav.back": "이전",
  "quiz.nav.next": "다음",
  "quiz.nav.see_results": "결과 보기",
  "quiz.nav.required": "계속하려면 답변을 선택해 주세요.",
  "quiz.likert.disagree": "전혀 그렇지 않다",
  "quiz.likert.agree": "매우 그렇다",
  "quiz.likert.instruction": "두 설명 중 나에게 더 가까운 쪽을 선택하세요.",

  "quiz.resume.title": "이어서 진행하시겠어요?",
  "quiz.resume.body": "이전에 {total}문항 중 {count}문항에 답변하셨습니다.",
  "quiz.resume.continue": "이어서 하기",
  "quiz.resume.restart": "처음부터 다시",

  "quiz.stale.title": "지난 방문 이후 설문이 변경되었습니다",
  "quiz.stale.body": "정확한 결과를 위해 다시 시작해 주세요 — 몇 분이면 충분합니다.",
  "quiz.stale.restart": "최신 설문 시작하기",

  "quiz.section.s1_thinking": "생각하는 방식",
  "quiz.section.s2_ideas": "아이디어와 만들기",
  "quiz.section.s3_work": "일하는 방식",
  "quiz.section.s4_uncertainty": "불확실성과 좌절",
  "quiz.section.s5_people": "사람들",
  "quiz.section.s6_drive": "무엇이 당신을 움직이는가",

  "era.ancient": "고대",
  "era.medieval": "중세",
  "era.early_modern": "근세",
  "era.19th_century": "19세기",
  "era.20th_century": "20세기",
  "era.contemporary": "현대",

  "region.central_asia": "중앙아시아",
  "region.central_europe": "중앙유럽",
  "region.east_asia": "동아시아",
  "region.latin_america": "라틴아메리카",
  "region.north_africa": "북아프리카",
  "region.north_america": "북아메리카",
  "region.south_asia": "남아시아",
  "region.southern_europe": "남유럽",
  "region.sub_saharan_africa": "사하라 이남 아프리카",
  "region.west_asia": "서아시아",
  "region.western_europe": "서유럽",

  // ---------------------------------------------------------------------
  // PHASE 8: occupation labels (45 values — see the exact-count note on
  // the English side in en.ts). Short, standard professional titles, no
  // ambiguity risk at this length; "activist"/"political_activist" and
  // "environmentalist"/"conservationist" are each kept genuinely distinct
  // in Korean rather than collapsing to the same word.
  // ---------------------------------------------------------------------
  "occupation.activist": "활동가",
  "occupation.actor": "배우",
  "occupation.admiral": "제독",
  "occupation.anatomist": "해부학자",
  "occupation.animator": "애니메이터",
  "occupation.architect": "건축가",
  "occupation.artist": "예술가",
  "occupation.astronomer": "천문학자",
  "occupation.athlete": "운동선수",
  "occupation.chemist": "화학자",
  "occupation.composer": "작곡가",
  "occupation.computer_scientist": "컴퓨터 과학자",
  "occupation.conservationist": "자연보호 활동가",
  "occupation.crystallographer": "결정학자",
  "occupation.dancer": "무용가",
  "occupation.diplomat": "외교관",
  "occupation.editor": "편집자",
  "occupation.engineer": "공학자",
  "occupation.entertainer": "연예인",
  "occupation.entrepreneur": "사업가",
  "occupation.environmentalist": "환경운동가",
  "occupation.executive": "경영인",
  "occupation.explorer": "탐험가",
  "occupation.fashion_designer": "패션 디자이너",
  "occupation.film_director": "영화감독",
  "occupation.historian": "역사학자",
  "occupation.inventor": "발명가",
  "occupation.investor": "투자자",
  "occupation.jurist": "법학자",
  "occupation.lawyer": "변호사",
  "occupation.martial_artist": "무술가",
  "occupation.mathematician": "수학자",
  "occupation.media_executive": "미디어 경영인",
  "occupation.military_leader": "군사 지도자",
  "occupation.naturalist": "박물학자",
  "occupation.naval_commander": "해군 지휘관",
  "occupation.nurse": "간호사",
  "occupation.painter": "화가",
  "occupation.philosopher": "철학자",
  "occupation.physician": "의사",
  "occupation.physicist": "물리학자",
  "occupation.poet": "시인",
  "occupation.political_activist": "정치 활동가",
  "occupation.political_leader": "정치 지도자",
  "occupation.primatologist": "영장류학자",
  "occupation.product_designer": "제품 디자이너",
  "occupation.scholar": "학자",
  "occupation.scientist": "과학자",
  "occupation.singer": "가수",
  "occupation.statesman": "정치가",
  "occupation.strategist": "전략가",
  "occupation.teacher": "교사",
  "occupation.theologian": "신학자",
  "occupation.writer": "작가",

  // ---------------------------------------------------------------------
  // PHASE 8: impact-domain chip labels — all 15 ImpactDomain union values,
  // complete by construction (closed union).
  // ---------------------------------------------------------------------
  "impact_domain.scientific": "과학",
  "impact_domain.technological": "기술",
  "impact_domain.entrepreneurial": "창업",
  "impact_domain.cultural": "문화",
  "impact_domain.artistic": "예술",
  "impact_domain.literary": "문학",
  "impact_domain.athletic": "스포츠",
  "impact_domain.historical": "역사",
  "impact_domain.engineering": "공학",
  "impact_domain.medical": "의학",
  "impact_domain.educational": "교육",
  "impact_domain.social": "사회",
  "impact_domain.industrial": "산업",
  "impact_domain.innovation": "혁신",
  "impact_domain.wealth_creation": "부의 창출",

  "tag.administrator": "행정가",
  "tag.advocate": "옹호자",
  "tag.ascetic": "금욕주의자",
  "tag.career_changer": "커리어 전환",
  "tag.communicator": "커뮤니케이터",
  "tag.competitor": "경쟁자",
  "tag.conqueror": "정복자",
  "tag.craft_focused": "장인 정신",
  "tag.cross_disciplinary": "여러 분야를 넘나듦",
  "tag.detail_oriented": "디테일 중시",
  "tag.early_computing": "초기 컴퓨팅",
  "tag.endured_imprisonment": "수감 경험",
  "tag.explorer": "탐험가",
  "tag.field_researcher": "현장 연구자",
  "tag.founder": "창업자",
  "tag.generalist": "제너럴리스트",
  "tag.grassroots_organizer": "풀뿌리 조직가",
  "tag.independent": "독립적",
  "tag.innovator": "혁신가",
  "tag.intuitive": "직관적",
  "tag.late_recognition": "뒤늦은 인정",
  "tag.leader": "리더",
  "tag.low_risk": "낮은 위험 선호",
  "tag.mystic": "신비주의자",
  "tag.nobel_laureate": "노벨상 수상자",
  "tag.nonconformist": "비순응주의자",
  "tag.nonviolence": "비폭력",
  "tag.organizer": "조직가",
  "tag.overcame_adversity": "역경 극복",
  "tag.patient": "인내심",
  "tag.perfectionist": "완벽주의자",
  "tag.philosopher": "철학자",
  "tag.polymath": "박학다식",
  "tag.poor_business_sense": "사업 감각 부족",
  "tag.prodigy": "신동",
  "tag.product_leader": "프로덕트 리더",
  "tag.prolific": "다작",
  "tag.reconciliation": "화해",
  "tag.renaissance": "르네상스적",
  "tag.self_taught": "독학",
  "tag.specialist": "전문가",
  "tag.strategist": "전략가",
  "tag.sustained_excellence": "꾸준한 성취",
  "tag.systematic_thinker": "체계적 사고",
  "tag.theorist": "이론가",
  "tag.young_leader": "젊은 리더",

  "people.directory.title": "역사 속 인물 찾아보기",
  "people.directory.intro": "시대와 지역, 직업 분야, 성격 특성별로 살펴볼 수 있어요.",
  "people.directory.search_placeholder": "이름 또는 직업으로 검색",
  "people.directory.era_label": "시대",
  "people.directory.region_label": "지역",
  "people.directory.sort_label": "정렬",
  "people.directory.all": "전체",
  "people.directory.empty": "이 조건에 맞는 인물이 아직 없습니다.",
  "people.directory.count": "{count}명",
  "people.directory.count_filtered": "전체 {total}명 중 {count}명",
  "people.directory.results_heading": "결과",

  "people.directory.section.profession": "직업과 활동 분야",
  "people.directory.section.personality": "성격과 성향",
  "people.directory.profession_category.science_knowledge": "과학과 지식",
  "people.directory.profession_category.arts_culture": "예술과 문화",
  "people.directory.profession_category.leadership_society": "리더십과 사회",
  "people.directory.profession_category.building_discovery": "개척과 혁신",
  "people.directory.selected_label": "선택됨:",
  "people.directory.clear_all": "전체 해제",
  "people.directory.remove_filter": "{label} 필터 해제",
  "people.directory.section_selected_count": "{count}개 선택",

  "field.philosophy": "철학",
  "field.natural_science": "자연과학",
  "field.mathematics": "수학",
  "field.physics": "물리학",
  "field.engineering": "공학",
  "field.medicine": "의학",
  "field.environmental_science": "환경과학",
  "field.literature": "문학",
  "field.music": "음악",
  "field.art": "미술",
  "field.film": "영화",
  "field.design": "디자인",
  "field.politics": "정치",
  "field.civil_rights": "시민권 운동",
  "field.military": "군사",
  "field.education": "교육",
  "field.law": "법률",
  "field.social_reform": "사회 개혁",
  "field.business": "경영과 사업",
  "field.technology": "기술",
  "field.computing": "컴퓨터 과학",
  "field.sport": "스포츠",
  "field.exploration": "탐험",

  "sort.name_asc": "이름 (가나다순)",
  "sort.name_desc": "이름 (역순)",
  "sort.birth_year_asc": "출생 이른 순",
  "sort.birth_year_desc": "출생 늦은 순",
  "sort.confidence_desc": "근거가 충분한 순",

  "person.trait_constellation": "핵심 특성",
  "person.similar_people": "비슷한 인물",
  "person.opposite_profile": "반대 프로필",
  "person.sources": "출처",
  "person.back_to_people": "전체 인물 보기",
  "person.known_for": "주요 업적 분야",
  "person.no_similar_people": "아직 비교할 만한 프로필이 충분하지 않습니다.",
  "person.wikipedia_link": "위키백과",
  "person.wikidata_link": "위키데이터",
  "person.life_arc_heading": "삶의 궤적",
  "person.achievements_heading": "주요 업적",
  "person.moments_heading": "삶의 장면들",
  "person.turning_points_heading": "전환점",
  "person.complexities_heading": "복잡한 면모",
  "person.legacy_heading": "유산",
  "person.editorial.interpretation_label": "이것이 보여주는 것:",
  "person.similar_people.subtitle": "전체적인 프로필이 이 사람과 닮은 사람들이에요.",
  "person.opposite_profile.subtitle": "경쟁 상대가 아니라, 살펴볼 만한 다른 프로필 형태예요.",
  "person.match_context.banner": "퀴즈 결과에서 이 프로필과 특히 {trait} 부분에서 가까운 매치가 나와 이 페이지를 보고 있어요.",

  "polity.congress_poland": "회의 폴란드 (러시아 제국)",
  "polity.joseon_dynasty": "조선",
  "polity.ming_dynasty": "명나라",
  "polity.mamluk_sultanate": "맘루크 술탄국 (카이로)",
  "polity.samanid_empire": "사만 왕조 (부하라)",
  "polity.holy_roman_empire": "신성 로마 제국",
  "polity.british_raj": "영국령 인도 제국",
  "polity.roman_empire": "로마 제국",
  "polity.roman_republic": "로마 공화정",
  "polity.new_spain": "누에바에스파냐 부왕령",
  "polity.almohad_caliphate": "알모하드 칼리파국",
  "polity.ayyubid_sultanate": "아이유브 술탄국",
  "polity.heian_japan": "헤이안 시대 일본",
  "polity.abbasid_caliphate": "아바스 칼리파국 (바그다드)",
  "polity.seljuk_empire": "셀주크 제국 (페르시아)",
  "polity.ghaznavid_empire": "가즈나 왕조",
  "polity.fatimid_caliphate": "파티마 칼리파국 (카이로)",
  "polity.tang_dynasty": "당나라",

  "dontcopy.davinci.unfinished_work":
    "레오나르도는 많은 작품과 프로젝트를 미완성으로 남겼다고 전기적 기록들은 전합니다. 흥미로운 문제가 풀리면 곧장 다음으로 넘어가곤 했던 그 성향은, 그의 폭넓은 관심사를 키운 힘이자 동시에 많은 작품을 미완성으로 남긴 이유이기도 합니다.",
  "dontcopy.jobs.demandingness":
    "전기적 기록들은 잡스를 극도로 엄격했고 때로는 가혹하기까지 한 관리자로 묘사합니다. 그와 함께 일한 이들은 종종 그 개인적인 대가를 언급합니다. 높은 기준을 갖는 것과 그것을 가혹하게 전달하는 것은 서로 다른 문제입니다.",
  "dontcopy.miyazaki.exacting_standards":
    "전기적 기록들은 미야자키의 기준이 스튜디오와 본인의 건강에 부담을 줄 만큼 엄격했다고 전합니다. 그의 작품을 만들어낸 그 강도는 함께 일한 사람들에게 실질적인 대가로 이어지기도 했습니다.",
  "dontcopy.beethoven.volatility":
    "전기적 기록들은 베토벤의 기질을 변덕스럽고, 주변 사람들과 잦고 날카로운 갈등을 빚었다고 묘사합니다. 신념의 강도와 타인에 대한 변덕스러움은 함께 나타나더라도 같은 것은 아닙니다.",
  "dontcopy.gandhi.self_denial":
    "전기적 기록들은 간디가 단식을 포함한 극단적인 자기 절제를 실천했으며, 이는 때로 건강과 가까운 관계에 부담을 주었다고 전합니다. 신념을 지키는 규율과 그것을 표현하는 특정 방식은 같지 않습니다.",
  "dontcopy.tesla.commercialisation":
    "전기적 기록들은 테슬라가 자신의 발명을 지속 가능한 사업으로 옮기는 데 어려움을 겪었고, 상업적으로 자신의 작업에 대한 통제권을 반복해서 잃었다고 전합니다. 발명의 폭과 사업 실행력은 서로 다른 역량이며, 이 프로필은 그 격차가 실제로 어떤 대가를 치를 수 있는지를 보여줍니다.",
  "dontcopy.genghiskhan.ruthlessness":
    "전기적 기록들은 칭기즈 칸 휘하의 원정이 민간인에 대한 대규모 폭력을 수반했다고 전합니다. 전략적·조직적 역량은 그것이 어떤 목적에 쓰였는지와는 별개의 문제이며, 이 프로필은 후자를 정당화하는 것이 아닙니다.",

  // ---------------------------------------------------------------------
  // PHASE 8: quiz_v2 localisation (64 items). Prompts use a neutral,
  // subject-dropped declarative register ("~는 편이다") matching how
  // Korean self-report instruments are naturally phrased — not a literal
  // rendering of English "I'll.../I tend to...". Situational/forced-choice
  // scenario setups use polite "-습니다/-까요" register, matching the rest
  // of the product's UI voice; the self-report statements underneath keep
  // the plain declarative register consistently. Every item was checked
  // against Evaluative Symmetry / Response-Anchor Symmetry directly in
  // Korean — see the file-header note above.
  // ---------------------------------------------------------------------

  "quiz.q02.prompt": "절반쯤만 이해하고 있는 사안에 대해 판단을 내려야 합니다. 당신에게 더 가까운 방식은?",
  "quiz.q02.option.a": "요소를 나누고 근거를 정리해 논리적으로 결론을 낸다",
  "quiz.q02.option.b": "일단 묵혀두었다가, 자연스럽게 잡히는 감을 따른다",

  "quiz.q03.prompt": "무언가 잘못되었을 때, 눈앞의 원인보다는 그것을 만들어낸 근본 구조를 먼저 들여다보는 편이다.",
  "quiz.q04.prompt": "충분히 생각해서 정한 입장이라면, 주변 대부분이 반대해도 쉽게 바꾸지 않는다.",

  "quiz.q05.prompt": "관심 두지 않던 분야가 갑자기 당신이 신경 쓰는 일에 중요해졌습니다. 가장 먼저 하는 행동은?",
  "quiz.q05.option.a": "기회일 가능성을 알아차리고 곧바로 활용 방법을 찾기 시작한다",
  "quiz.q05.option.b": "가치가 있는지 판단하기 전에 먼저 좀 더 파고들어 본다",
  "quiz.q05.option.c": "그 연관성이 더 분명해질 때까지는 지금 하던 일에 집중을 유지한다",

  "quiz.q06.prompt": "내가 끌리는 아이디어는 대체로 다른 사람들이 아직 떠올리지 않은 것들이다.",

  "quiz.q07.prompt": "완전히 새로운 것을 시작할 때, 다음 중 더 답답하게 느껴지는 쪽은?",
  "quiz.q07.option.a": "계획만 너무 오래 세우다가 정작 아무것도 만들지 못하는 것",
  "quiz.q07.option.b": "너무 일찍 만들기 시작해서 절반을 다시 갈아엎어야 하는 것",

  "quiz.q08.prompt": "무언가가 보이고 들리고 느껴지는 방식은, 그것이 좋은지 판단하는 데 영향을 준다.",

  "quiz.q09.prompt": "관심 있는 일에 10년을 쓸 수 있다면, 어느 쪽이 더 끌리나요?",
  "quiz.q09.option.a": "여러 분야를 오가며 발견한 것들을 서로 연결한다",
  "quiz.q09.option.b": "거의 누구보다 한 가지를 깊이 파고든다",
  "quiz.q09.option.c": "그때그때 필요해 보이는 방향을 따라간다",

  "quiz.q10.prompt": "이미 검증된 방법을 다듬기보다는, 아무도 시도하지 않은 방식을 해보는 쪽을 선호한다.",

  "quiz.q11.prompt": "한번 하기로 한 일은, 그것에 대한 흥미가 오르내려도 진행 속도가 비교적 일정하게 유지되는 편이다.",

  "quiz.q12.prompt": "당신에게 중요한 일에서, 다음 중 더 신경 쓰이는 쪽은?",
  "quiz.q12.option.a": "충분히 다듬어지지 않은 상태로 결과물을 내놓는 것",
  "quiz.q12.option.b": "다듬는 데 너무 오래 매달려 진행이 멈춰버리는 것",

  "quiz.q13.prompt": "몰입이 필요한 작업을 할 때, 나는 대체로...",
  "quiz.q13.anchor.left": "자주 주의를 환기하며 다른 일로 전환한다",
  "quiz.q13.anchor.right": "오랜 시간 몰입 상태를 유지한다",

  "quiz.q14.prompt": "대부분의 사람이 알아채지 못하는 작은 불일치도 나에게는 눈에 밟히는 편이다.",

  "quiz.q15.prompt":
    "긴 프로젝트를 절반쯤 진행했는데, 믿고 있던 자원(예산, 인력, 시간, 도구)이 예상보다 훨씬 부족하다는 것을 알게 됐습니다. 어떻게 하나요?",
  "quiz.q15.option.a": "계속하기 전에 실제 수치에 맞춰 계획을 제대로 다시 세운다",
  "quiz.q15.option.b": "일단 계속 진행하면서 상황에 맞춰 그때그때 조정한다",
  "quiz.q15.option.c": "지금 실제로 남아 있는 것들로 최대한 가치를 뽑아낼 방법을 찾는다",

  "quiz.q16.prompt": "하나를 완벽하게 끝내는 것보다, 다섯 가지를 다소 부족해도 끝내놓는 쪽을 선호한다.",

  "quiz.q17.prompt": "몇 달을 쏟은 일이 예상치 못하게 실패했습니다. 다음으로 가장 할 법한 행동은?",
  "quiz.q17.option.a": "같은 목표를, 다른 방식으로 다시 시도한다",
  "quiz.q17.option.b": "거기서 배운 것을 가지고 완전히 새로운 방향으로 나아간다",
  "quiz.q17.option.c": "다시 움직이기 전에 왜 실패했는지부터 정확히 파악한다",
  "quiz.q17.option.d": "결정하기 전에 믿을 만한 사람들과 함께 이야기해본다",

  "quiz.q18.prompt": "얻을 수 있는 게 충분히 크다면, 실제로 잃을 가능성이 있어도 감수하는 편이다.",
  "quiz.q19.prompt": "무엇이 정답인지 아무도 알려줄 수 없는 일을 하는 것도 크게 불편하지 않다.",

  "quiz.q20.prompt": "정보가 충분하지 않은 상태에서 결정을 내려야 합니다. 당신에게 더 가까운 쪽은?",
  "quiz.q20.option.a": "일단 지금 결정하고, 필요하면 나중에 방향을 바로잡는다",
  "quiz.q20.option.b": "상황이 좀 더 뚜렷해질 때까지 기다린다",

  "quiz.q21.prompt": "예상대로 되지 않는 일이 있어도, 방향을 바꾸기로 결정하기 전까지 좀 더 오래 붙들고 있는 편이다.",

  "quiz.q22.prompt": "모르는 사람들 사이에 있을 때, 먼저 말을 꺼내는 편에 속한다.",

  "quiz.q23.prompt": "같은 일, 같은 결과라면, 어느 쪽을 선택하겠습니까?",
  "quiz.q23.option.a": "함께 일하기 좋은 팀과 함께 하는 것",
  "quiz.q23.option.b": "혼자서, 내 방식대로 하는 것",

  "quiz.q24.prompt": "그룹에 방향이 없을 때, 그 방향을 정하는 쪽에 서는 편이다.",

  "quiz.q25.prompt": "상급자가 아마도 틀렸을 것 같은 결정을 내렸습니다. 실제로는 어떻게 하나요?",
  "quiz.q25.option.a": "분위기가 불편해지더라도 직접 말한다",
  "quiz.q25.option.b": "대가가 크지 않다면 그냥 넘어간다",
  "quiz.q25.option.c": "따로 개인적으로 이야기해서 생각이 바뀌도록 설득한다",

  "quiz.q26.prompt": "한 번 설명하고 끝내기보다는, 표현 방식을 계속 다듬어가며 다시 설명하는 편이다.",

  "quiz.q28.prompt": "비슷한 위치의 누군가가 나보다 앞서 있다는 걸 알면, 그만큼 들이는 노력의 정도가 달라진다.",
  "quiz.q29.prompt":
    "그 일을 하면서 느끼는 흥미나 의미, 만족감이 주된 가치인 일보다는, 나를 넘어서는 영향을 남기는 일에 더 동기를 느낀다.",
  "quiz.q30.prompt": "남들이 기대하는 수준보다 스스로 더 높은 목표를 세우는 편이다.",

  "quiz.q31.prompt": "어려운 문제에 깊이 몰입해 있을 때, 왜 그런지 다 설명하기도 전에 다음에 할 일이 먼저 떠오르곤 한다.",
  "quiz.q32.prompt": "아무도 방법을 지시하지 않을 때, 가장 좋은 결과를 내는 편이다.",

  "quiz.q33.prompt": "혼자서도 프로젝트가 잘 진행되고 있을 때조차, 다른 사람들을 끌어들일 방법을 찾는 편이다.",
  "quiz.q34.prompt": "실제로 필요한 수준을 이미 넘어섰더라도, 그 기술을 계속 갈고닦는 편이다.",
  "quiz.q35.prompt": "겉보기에 서로 관계없어 보이는 분야의 아이디어들을 연결하는 데 끌린다.",

  "quiz.q37.prompt": "시작할 만큼 준비되었다면, 더 완성될 때까지 기다리기보다 다소 거칠어도 빨리 내놓는 쪽을 선호한다.",
  "quiz.q38.prompt": "지금 해야 할 일과 상관없어도, 흥미로운 곁가지가 보이면 따라가 보는 편이다.",
  "quiz.q39.prompt":
    "새로운 정보가 기존 방식의 설득력을 약화시키면, 지금 방식에 더 시간을 주기보다는 대체로 빨리 전환하는 편이다.",

  "quiz.q40.prompt":
    "이미 결론을 내리고 그에 따라 움직이기 시작한 일에 대해, 신뢰할 만한 새로운 근거가 반대되는 방향을 가리킵니다. 당신에게 더 가까운 쪽은?",
  "quiz.q40.option.a": "결론을 다시 열어두고, 새 근거가 타당하다면 방향을 조정한다",
  "quiz.q40.option.b": "이미 세운 판단에 견주어볼 하나의 근거로 받아들이고, 일단은 지금 방향을 유지한다",

  "quiz.q41.prompt": "결과물이 아직 다듬어지지 않았어도, 반응을 보려고 다른 사람에게 보여주는 편이다.",
  "quiz.q42.prompt": "결과물 자체의 완성도보다는, 그 일이 실제로 사람들에게 가닿아 변화를 일으키는지가 더 중요하다.",
  "quiz.q43.prompt": "아무도 요청하지 않아도, 그룹의 방향을 정하는 사람이 되고 싶다.",
  "quiz.q44.prompt": "중요하게 여기는 일에 대해 누군가 나와 생각이 다르면, 적극적으로 설득해서 내 관점 쪽으로 데려오려 하는 편이다.",
  "quiz.q45.prompt": "크게 실패할 수도 있지만 성과가 큰 쪽과, 안전하지만 성과가 소소한 쪽 중에서는 전자를 시도해보는 편이다.",

  "quiz.q46.prompt": "정말 새로운 것을 배울 때, 당신에게 더 가까운 방식은?",
  "quiz.q46.option.a": "구체적인 내용보다 먼저 전체를 관통하는 패턴부터 찾는다",
  "quiz.q46.option.b": "구체적인 사례부터 시작해서 하나씩 쌓아 올린다",

  "quiz.q47.prompt": "정말 몰입되는 일을 할 때, 당신에게 더 가까운 쪽은?",
  "quiz.q47.option.a": "한번 빠지면 시간 가는 줄 모르고 몰두한다",
  "quiz.q47.option.b": "다른 일의 흐름을 놓치지 않으려고 중간중간 스스로를 점검한다",

  "quiz.q48.prompt": "이미 요구 조건을 충족했더라도, 완전히 만족스럽게 느껴질 때까지 여러 번 다시 손보는 편이다.",
  "quiz.q49.prompt": "정답이 정말로 불분명할 때, 불확실함을 먼저 해소하기보다는 일단 계속 움직이는 편이다.",
  "quiz.q50.prompt": "아무도 기다리고 있지 않아도, 끝내지 못한 프로젝트는 계속 마음 한켠에 남아 있는 편이다.",
  "quiz.q51.prompt": "목표만이 아니라 접근 방식까지 스스로 정할 수 있을 때, 눈에 띄게 더 나은 결과를 낸다.",

  "quiz.q52.prompt": "공동 프로젝트를 하다가, 아무도 당신에게 맡기지 않은 진짜 문제를 발견했습니다. 더 가능성이 높은 행동은?",
  "quiz.q52.option.a": "누가 요청하기 전에 그냥 스스로 나서서 고친다",
  "quiz.q52.option.b": "결정하기 전에 먼저 그룹에 알린다",
  "quiz.q52.option.c": "모두를 위해 결정의 틀을 잡는 역할을 주도적으로 맡는다",

  "quiz.q53.prompt": "어떤 주장을 일단 믿고 나중에 반박이 나오면 살펴보기보다는, 처음부터 허점이 있는지 확인해보는 쪽을 선호한다.",
  "quiz.q54.prompt": "익숙한 일이라도, 시작하기 전에 순서를 미리 정해두는 것을 좋아한다.",
  "quiz.q55.prompt": "실력이 실제로 나아지고 있다면, 반복적인 연습도 개의치 않는다.",
  "quiz.q56.prompt": "짧게 여러 번 나눠서 하기보다는, 방해받지 않는 긴 시간 동안 몰입할 때 가장 좋은 결과가 나온다.",

  "quiz.q57.prompt": "주변에서 변화가 시작될 때, 나는 대체로...",
  "quiz.q57.anchor.left": "더 뚜렷한 신호를 기다린다",
  "quiz.q57.anchor.right": "이른 신호를 알아차린다",

  "quiz.q58.prompt": "주변에서 변화가 일어나도, 그것이 꽤 뚜렷해지기 전까지는 굳이 반응할 일로 여기지 않는 편이다.",
  "quiz.q59.prompt":
    "이상적인 도구나 자원이 없을 때, 원하는 조건을 갖추려고 멈추기보다는 당장 쓸 수 있는 대안으로 계속 진행하는 편이다.",
  "quiz.q60.prompt":
    "어떤 일에 이상적인 자원이 없을 때, 그럭저럭 쓸 만한 대안으로 타협하기보다는 대체로 그것을 확보하려고 애쓰는 편이다.",

  "quiz.q61.prompt": "이미 확고하게 근거가 충분하다고 느꼈던 입장에 반대되는 새로운 근거가 나타났을 때, 나는 대체로...",
  "quiz.q61.anchor.left": "더 강한 근거가 나올 때까지 기다린다",
  "quiz.q61.anchor.right": "비교적 선뜻 다시 열어본다",

  "quiz.q62.prompt":
    "일단 어떤 방향으로 하기로 정하면, 그 발상에 대한 비판만으로는 잘 흔들리지 않고, 틀렸다는 실질적인 증거가 나와야 생각을 바꾸는 편이다.",
  "quiz.q63.prompt":
    "결정을 내려야 하고 필요한 정보를 이미 대부분 갖고 있다면, 정보를 계속 모으기보다는 결단을 내리고 움직이는 쪽을 선호한다.",

  "quiz.q64.prompt": "일을 더 낫게 개선할 방법이 보이면, 공식적인 담당자를 먼저 거치기보다는 직접 나서서 행동하는 편이다.",
  "quiz.q65.prompt": "내 공식적인 책임 범위를 벗어난 일이라면, 직접 바꾸기보다는 담당자를 거쳐 처리하는 쪽을 대체로 선호한다.",

  "quiz.q66.prompt": "실질적으로 걸린 것이 없어도, 아는 사람들과의 가벼운 게임이나 시합에서 진짜 승부욕이 발동하는 편이다.",
  "quiz.q67.prompt": "한 가지 문제를 오래 깊이 파고들기보다는, 같은 주 안에도 성격이 전혀 다른 문제들 사이를 오가는 편이다.",

  // ---------------------------------------------------------------------
  // PHASE 8: impact glyphs — language-neutral by design (▲◇▼●), identical
  // to en.ts. Copied explicitly rather than left to fall back, so the
  // fallback audit reports zero for this bucket instead of an intentional-
  // but-unexplained gap.
  // ---------------------------------------------------------------------
  "impact.advantage.icon": "▲",
  "impact.dual_edged.icon": "◇",
  "impact.risk.icon": "▼",
  "impact.neutral.icon": "●",

  // ---------------------------------------------------------------------
  // PHASE 8: "What Not to Copy" generic + tradeoff content. `{trait}`
  // interpolations use the "은(는)"/"이(가)" bracket-both-forms convention
  // already established elsewhere in this file (see compare.explore.note)
  // to sidestep Korean particle allomorphy on a value the code substitutes
  // at render time. `dontcopy.tradeoff.*` items never name the trait
  // directly, matching en.ts's own pattern — the generic line right above
  // it (or the section heading) already names it, so the tradeoff sentence
  // only needs to describe the mechanism itself.
  // ---------------------------------------------------------------------

  "dontcopy.generic.risk":
    "{trait}은(는) {person}에게는 특히 위험 요소로 표시되어 있습니다 — 그대로 받아들이기 전에 이 인물의 이야기를 먼저 살펴보세요.",
  "dontcopy.generic.dual_edged":
    "{trait}은(는) {person}에게 양날의 특성입니다 — 상황에 따라 다르게 작용하므로, 그대로 따라 하는 것은 안전한 선택이 아닙니다.",
  "dontcopy.generic.extreme":
    "{trait}은(는) {person}에게서 극단적인 수준({score} / 100)으로 나타납니다 — 이런 극단은 숫자 하나로는 보이지 않는 실질적인 대가를 동반하는 경우가 많습니다.",
  "dontcopy.generic.shape_mismatch":
    "{trait}은(는) {person}에게서 유난히 높게 나타나는데, 이 특성은 대체로 낮을수록 도움이 되는 경우가 많습니다 — 이는 그 인물의 특수한 상황일 수 있으며, 따라야 할 본보기는 아닐 수 있습니다.",

  "dontcopy.tradeoff.achievement_drive":
    "스스로 기준을 높게 잡으면 좋은 성과로 이어질 수 있지만, 실제로 이룬 진전에도 좀처럼 만족하기 어려워질 수 있습니다.",
  "dontcopy.tradeoff.aesthetic_sensitivity":
    "보이고 들리고 느껴지는 방식에 예민하게 반응하면 더 나은 완성도로 이어질 수 있지만, 그럴 필요가 없는 결정까지 늦춰질 수 있습니다.",
  "dontcopy.tradeoff.ambiguity_tolerance":
    "정답이 불분명해도 편안하게 받아들이면 흐름을 계속 이어갈 수 있지만, 충분히 알기도 전에 행동에 나서게 될 수도 있습니다.",
  "dontcopy.tradeoff.analytical_rigor":
    "근거를 꼼꼼히 따지면 실질적인 결함을 일찍 발견할 수 있지만, 그렇게까지 확실할 필요가 없던 결정까지 늦어질 수 있습니다.",
  "dontcopy.tradeoff.autonomy_need":
    "스스로 방식을 정하려는 성향이 강하면 주인의식은 커질 수 있지만, 다른 사람들과의 조율은 더 어려워질 수 있습니다.",
  "dontcopy.tradeoff.creative_originality":
    "낯선 아이디어에 끌리는 성향은 새로운 방향을 열어줄 수 있지만, 이미 효과가 있는 것을 다듬는 데는 소홀해질 수 있습니다.",
  "dontcopy.tradeoff.cross_domain_range":
    "여러 분야를 폭넓게 오가면 남다른 연결을 만들어낼 수 있지만, 어느 한 분야를 꾸준히 깊이 파고들 시간은 줄어들 수 있습니다.",
  "dontcopy.tradeoff.curiosity":
    "폭넓은 관심사를 좇으면 뜻밖의 기회를 발견할 수 있지만, 마무리가 필요한 우선순위에서 주의가 흩어질 수 있습니다.",
  "dontcopy.tradeoff.decisiveness":
    "정보가 불완전해도 빠르게 결정을 내리면 일이 계속 진행될 수 있지만, 잘못된 판단을 일찍 바로잡을 여지는 줄어들 수 있습니다.",
  "dontcopy.tradeoff.deep_focus":
    "방해받지 않는 긴 몰입은 깊이 있는 결과로 이어질 수 있지만, 그 몰입 바깥에서 벌어지는 일을 놓치게 될 수도 있습니다.",
  "dontcopy.tradeoff.detail_orientation":
    "작은 불일치까지 세심하게 살피면 실질적인 문제를 발견할 수 있지만, 그 정도의 정밀함이 필요 없던 작업까지 느려질 수 있습니다.",
  "dontcopy.tradeoff.discipline":
    "꾸준하고 일관된 노력은 시간이 지날수록 쌓여 큰 효과를 낼 수 있지만, 상황이 정말로 방향 전환을 요구할 때는 오히려 바꾸기 어려워질 수 있습니다.",
  "dontcopy.tradeoff.execution_speed":
    "빠르게 내놓으면 추진력과 실질적인 피드백을 얻을 수 있지만, 상황이 실제로 필요로 했던 만큼의 완성도는 부족해질 수 있습니다.",
  "dontcopy.tradeoff.experimentation":
    "검증되지 않은 방식을 시도하면 더 나은 길을 발견할 수 있지만, 어느 한 방식이 자리 잡기도 전에 계속 방향이 바뀌는 혼란이 생길 수 있습니다.",
  "dontcopy.tradeoff.impact_motivation":
    "눈에 띄는 영향력에 강하게 이끌리면 야심 찬 성과로 이어질 수 있지만, 눈에 덜 띄어도 실제로 중요한 일의 가치는 과소평가될 수 있습니다.",
  "dontcopy.tradeoff.independent_thinking":
    "압박 속에서도 충분히 고민한 입장을 지키면 좋은 판단을 지켜낼 수 있지만, 다른 사람의 정말 타당한 지적을 놓치게 될 수도 있습니다.",
  "dontcopy.tradeoff.intuitive_synthesis":
    "빠른 패턴 인식은 쓸 만한 답에 더 일찍 도달하게 해주지만, 그 상황이 실제로 필요로 했던 검증 과정을 건너뛰게 만들 수도 있습니다.",
  "dontcopy.tradeoff.leadership_drive":
    "방향을 정하려는 강한 성향은 방향이 없는 그룹에는 도움이 되지만, 기여할 만한 것을 갖고 있던 다른 사람들의 자리를 밀어낼 수도 있습니다.",
  "dontcopy.tradeoff.mastery_orientation":
    "기술을 계속 갈고닦으면 도달할 수 있는 수준 자체를 끌어올릴 수 있지만, 실질적인 성과를 넘어선 지점까지 시간을 쏟게 될 수도 있습니다.",
  "dontcopy.tradeoff.opportunity_sensing":
    "이른 신호를 알아차리면 실질적인 선점 효과를 얻을 수 있지만, 끝내 뚜렷한 패턴으로 이어지지 않는 잡음에 반응하게 될 수도 있습니다.",
  "dontcopy.tradeoff.persistence":
    "다른 사람이라면 이미 방향을 바꿨을 지점을 넘어서까지 붙드는 것은 좋은 결과로 이어질 수 있지만, 애초에 될 가능성이 없던 일에 시간을 계속 쏟게 될 수도 있습니다.",
  "dontcopy.tradeoff.persuasiveness":
    "다른 사람을 설득하려는 강한 성향은 그룹의 의견을 더 빠르게 모으게 해주지만, 실제로 들어볼 가치가 있는 반대 의견을 밀어낼 수도 있습니다.",
  "dontcopy.tradeoff.planning_orientation":
    "시작하기 전에 계획을 세워두면 피할 수 있었던 실수를 막을 수 있지만, 먼저 움직이는 쪽이 유리한 상황에서는 오히려 시간을 잃을 수 있습니다.",
  "dontcopy.tradeoff.resourcefulness":
    "지금 있는 것으로 어떻게든 해내면 실제 제약 속에서도 일을 계속 진행할 수 있지만, 원래는 임시방편이었던 방법이 그대로 굳어져 버릴 수도 있습니다.",
  "dontcopy.tradeoff.social_assertiveness":
    "그룹 안에서 먼저 목소리를 내면 대화의 흐름을 이끌 수 있지만, 들어볼 가치가 있었을 조용한 의견을 밀어낼 수도 있습니다.",
  "dontcopy.tradeoff.systems_abstraction":
    "근본 구조에 초점을 맞추면 문제를 명확하게 정리할 수 있지만, 이 사례만이 실제로 갖고 있는 차이는 놓칠 수 있습니다.",

  // ---------------------------------------------------------------------
  // PHASE 8: development-guide corpus (34 attributes x 3 bands x
  // [2 experiments + 1 caution]). Same discipline as en.ts throughout:
  // "exp" entries are always framed as an experiment to try, never a fix
  // for a deficiency; "caution" entries always state the legitimate case
  // for the low/inconsistent/high pole, never "you are flawed". Checked
  // against the banned-words list directly in Korean (no "고쳐야
  // 합니다"/"약점입니다"-as-verdict/"~처럼 되어야" framing survived
  // translation) — a literal rendering risks reintroducing exactly this,
  // which is why each entry was authored to the same rhetorical structure
  // as its English source, not machine-translated word for word.
  // ---------------------------------------------------------------------

  "dev.curiosity.low.exp.1":
    "이번 주에 전혀 모르는 것 하나를 골라, 무엇이 있는지 알아본다는 것 외에는 다른 목적 없이 20분 동안 그냥 살펴보세요.",
  "dev.curiosity.low.exp.2":
    "\"어, 왜 저렇지?\" 하는 느낌이 스칠 때, 그냥 넘기지 말고 5분만 그 궁금증을 따라가 보세요.",
  "dev.curiosity.low.caution.1": "관심 범위가 좁은 것은 결함이 아닙니다 — 이미 선택한 곳에서 더 깊이 파고든다는 뜻일 수 있습니다.",
  "dev.curiosity.medium.exp.1":
    "매주 30분씩 평소 하던 것과 완전히 다른 무언가를 읽거나 탐색하는 시간을 따로 마련해보세요.",
  "dev.curiosity.medium.exp.2": "다음에 누군가 무언가를 설명해줄 때, 평소보다 \"왜?\"를 한 번 더 물어보세요.",
  "dev.curiosity.medium.caution.1":
    "호기심이 어떤 것에서도 깊이로 이어지지 않으면 넓지만 얕은 상태로 남을 수 있습니다 — 실제로 끝까지 해내는 무언가와 짝지어보세요.",
  "dev.curiosity.high.exp.1":
    "매듭짓는 연습을 해보세요: 쫓고 있는 질문 하나를 골라, 다음 질문으로 넘어가기 전에 멈출 지점을 미리 정해두세요.",
  "dev.curiosity.high.exp.2":
    "관심 범위를 의도적으로 활용해보세요 — 평소 눈여겨보던 분야의 아이디어를 지금 하는 일로 가져와 보세요.",
  "dev.curiosity.high.caution.1":
    "끊임없이 새로운 것을 좇는 성향은 마무리를 방해할 수 있습니다 — 프로젝트가 반쯤 끝난 채로 쌓여간다면, 그 대가가 드러나고 있는 것입니다.",

  "dev.analytical_rigor.low.exp.1": "다음 결정을 내리기 전에, 실제로 그 결정의 근거가 되는 두세 가지 증거를 적어보세요.",
  "dev.analytical_rigor.low.exp.2": "강하게 믿고 있는 생각 하나를 골라, 무엇이 있으면 그 생각이 바뀔지 10분 동안 적어보세요.",
  "dev.analytical_rigor.low.caution.1":
    "직관에 따라 빠르게 움직이는 것은 틀린 방식이 아닙니다 — 검증을 속도와 맞바꾸는 것일 뿐이며, 그 교환이 더 나을 때도 있습니다.",
  "dev.analytical_rigor.medium.exp.1": "어떤 결론(본인의 것이든 다른 사람의 것이든)을 받아들이기 전에, 가장 강력한 반론이 무엇일지 물어보세요.",
  "dev.analytical_rigor.medium.exp.2": "\"확인했기 때문에 확신한다\"와 \"느낌이 맞기 때문에 확신한다\"를 구분하는 연습을 해보세요.",
  "dev.analytical_rigor.medium.caution.1":
    "어떤 것에는 엄격하고 어떤 것에는 그렇지 않은 고르지 못한 엄밀함은, 객관적으로 보여도 실제로는 그저 관심을 따라간 것일 수 있습니다.",
  "dev.analytical_rigor.high.exp.1": "결정을 내리기 전 분석에 시간 제한을 두어, 철저함이 조용히 결정을 미루는 수단이 되지 않도록 하세요.",
  "dev.analytical_rigor.high.exp.2": "부담이 적은 사안에서, 평소보다 이르다고 느껴지는 시점에 \"이 정도면 충분하다\"는 답을 소리 내어 말해보세요.",
  "dev.analytical_rigor.high.caution.1":
    "지나치게 밀어붙이면 엄밀함은 마비가 됩니다 — 그럴 필요가 없는 결정에 끝없는 검증을 반복하게 됩니다.",

  "dev.intuitive_synthesis.low.exp.1":
    "다음에 막힐 때는, 분석하기 전에 첫 직감으로 빠르게 답해보고 나서 그것이 얼마나 맞는지 확인해보세요.",
  "dev.intuitive_synthesis.low.exp.2": "논리적인 추론 과정 없이 \"그냥 알았던\" 순간을 알아차리고, 그것을 가볍게 여기지 마세요.",
  "dev.intuitive_synthesis.low.caution.1":
    "직감보다 명시적인 추론에 기대는 것은 약점이 아닙니다 — 다만 직감을 신뢰하는 연습이 덜 될 뿐입니다.",
  "dev.intuitive_synthesis.medium.exp.1": "직감과 분석이 서로 다른 답을 낼 때, 하나를 고르기 전에 하루 동안 둘 다 곱씹어보세요.",
  "dev.intuitive_synthesis.medium.exp.2": "순간적인 판단을 소리 내어 설명해보세요 — 대개 근거는 이미 있었고, 다만 말로 하지 않았을 뿐입니다.",
  "dev.intuitive_synthesis.medium.caution.1":
    "두 방식을 일관성 없이 섞어 쓰면 어느 쪽도 다듬어지지 않을 수 있습니다 — 압박 속에서 실제로 어느 쪽을 믿는지 살펴보세요.",
  "dev.intuitive_synthesis.high.exp.1": "이번 달, 강하게 드는 직감 하나를 행동에 옮기기 전에 실제 근거에 비추어 검증해보세요.",
  "dev.intuitive_synthesis.high.exp.2": "다른 사람에게 결론을 설명할 때, 답만이 아니라 단계별 논리를 만들어보는 연습을 해보세요.",
  "dev.intuitive_synthesis.high.caution.1":
    "옳다는 느낌은 매우 설득력 있게 틀릴 수 있습니다 — 가장 확실하게 느껴지는 순간이 가장 알아채기 어려운 순간입니다.",

  "dev.systems_abstraction.low.exp.1":
    "다음에 무언가 잘못되면, 그 순간에 무슨 일이 있었는지뿐 아니라 어떤 패턴이나 구조가 그것을 만들어냈는지 물어보세요.",
  "dev.systems_abstraction.low.exp.2": "지금 다루고 있는 서로 다른 세 가지가 실제로 어떻게 연결되는지 그려보세요.",
  "dev.systems_abstraction.low.caution.1":
    "구체적인 것에 가까이 머무는 것은 한계가 아닙니다 — 전체 체계를 그려볼 때까지 기다리지 않고 더 빠르고 구체적으로 행동할 수 있다는 뜻일 수 있습니다.",
  "dev.systems_abstraction.medium.exp.1": "지금 다루는 문제에서 한 단계 물러나 보세요: 이 사례만이 아니라 전반적인 형태는 무엇인가요?",
  "dev.systems_abstraction.medium.exp.2": "잘 아는 체계 하나를, 완전히 다른 분야의 비유를 들어 설명해보세요.",
  "dev.systems_abstraction.medium.caution.1":
    "구체성으로 다시 내려오지 않는 추상화는, 그럴듯하게 들리지만 디테일 앞에서 무너지는 계획으로 남을 수 있습니다.",
  "dev.systems_abstraction.high.exp.1": "의지하고 있는 추상적인 모델 하나를, 지저분하고 현실적인 예외 사례에 대입해 검증해보세요.",
  "dev.systems_abstraction.high.exp.2": "구조가 아니라 구체적인 버전을 원하는 사람에게 자신의 프레임워크를 설명하는 연습을 해보세요.",
  "dev.systems_abstraction.high.caution.1":
    "지도가 더는 실제 지형과 맞지 않는다면, 구조를 먼저 보는 사고방식은 눈앞의 것을 놓칠 수 있습니다.",

  "dev.independent_thinking.low.exp.1":
    "다음에 그룹이 한쪽으로 기울 때, 다른 사람의 의견을 듣기 전에 자신의 생각을 먼저 조용히 적어보세요.",
  "dev.independent_thinking.low.exp.2": "자신의 분야에서 널리 받아들여지는 의견 하나를 골라, 10분 동안 진지하게 의문을 제기해보세요.",
  "dev.independent_thinking.low.caution.1":
    "집단의 의견을 무겁게 받아들이는 것은 결함이 아닙니다 — 더 빠른 합의와 비용이 큰 단독 실수를 줄이는 결과로 이어질 수 있습니다.",
  "dev.independent_thinking.medium.exp.1": "새로운 근거 때문이 아니라 그것을 누가 지지하는지 때문에 생각을 바꾸는 순간을 알아차려보세요.",
  "dev.independent_thinking.medium.exp.2": "이번 주, 사소한 일에서라도 반대 의견을 한 번 내보세요.",
  "dev.independent_thinking.medium.caution.1": "가끔씩만 드러나는 독립성은 원칙적이라기보다 일관성 없어 보일 수 있습니다.",
  "dev.independent_thinking.high.exp.1": "다수의 의견을 거부하기 전에, 먼저 그 의견을 최대한 설득력 있게 옹호해보세요.",
  "dev.independent_thinking.high.exp.2": "결정을 확정하기 전에, 반대할 가능성이 높은 사람 한 명을 적극적으로 찾아 의견을 들어보세요.",
  "dev.independent_thinking.high.caution.1": "반사적인 반대는, 전문성과 합의가 실제로 옳을 때 그 진짜 가치를 놓치게 만듭니다.",

  "dev.creative_originality.low.exp.1":
    "이미 효과가 있는 것을 하나 골라, 그 규칙 하나를 의도적으로 바꿔보고 무슨 일이 일어나는지 살펴보세요.",
  "dev.creative_originality.low.exp.2": "10분 타이머를 맞추고, 걸러내지 않고 한 아이디어에 대한 변형을 최대한 많이 만들어보세요.",
  "dev.creative_originality.low.caution.1":
    "정립된 형식 안에서 작업하는 것은 부족함이 아닙니다 — 이미 있는 것을 다듬는 것도 그 자체로 하나의 기술입니다.",
  "dev.creative_originality.medium.exp.1": "익숙하지만 서로 관련 없는 두 영역의 아이디어를 결합해보고 무엇이 만들어지는지 보세요.",
  "dev.creative_originality.medium.exp.2": "아직 준비되지 않은 느낌이 드는 거친 아이디어를 공유하고, 그 반응에서 무엇을 배우는지 지켜보세요.",
  "dev.creative_originality.medium.caution.1": "실제 문제와 무관하게 새로움 자체를 좇는 것은, 그 나름의 또 다른 공식이 될 수 있습니다.",
  "dev.creative_originality.high.exp.1": "이번 달 가장 독창적인 아이디어를 골라, 지루하고 현실적인 제약에 맞춰 검증해보세요.",
  "dev.creative_originality.high.exp.2": "새로운 변형을 또 시작하는 대신, 하나를 끝내서 내놓아보세요.",
  "dev.creative_originality.high.caution.1": "특이한 것에 강하게 끌리다 보면, 실제로 훌륭한 평범한 해법을 지나칠 수 있습니다.",

  "dev.experimentation.low.exp.1": "지금 고정된 것으로 여기고 있는 작은 가정 하나를 골라 이번 주에 시험해보세요.",
  "dev.experimentation.low.exp.2": "다듬기 전에, 가장 거친 형태의 버전부터 먼저 만들어보세요.",
  "dev.experimentation.low.caution.1": "행동하기 전에 신중하게 계획하는 것은 잘못이 아닙니다 — 많은 헛수고를 막아줄 수 있습니다.",
  "dev.experimentation.medium.exp.1": "실제로 확인할 명확한 전후 비교가 있는 실험 하나를 진행해보세요.",
  "dev.experimentation.medium.exp.2": "이미 잘하고 있는 일에 다른 방식을 시도해보고, 무엇을 배우는지 살펴보세요.",
  "dev.experimentation.medium.caution.1":
    "결과를 추적하지 않고 이것저것 시도하는 것은, 생산적으로 느껴지지만 실제로는 아무것도 가르쳐주지 않을 수 있습니다.",
  "dev.experimentation.high.exp.1": "다음 시험으로 넘어가는 대신, 실험 결과 하나를 실제 결정으로 이어질 때까지 끝까지 따라가 보세요.",
  "dev.experimentation.high.exp.2": "무엇을 보면 반복을 멈추고 끝났다고 부를 수 있을지 스스로 물어보세요.",
  "dev.experimentation.high.caution.1":
    "끊임없는 실험은 결정을 피하는 방법이 될 수 있습니다 — 아무것도 끝내거나 평가받을 필요가 없어지는 것입니다.",

  "dev.cross_domain_range.low.exp.1": "자신의 분야 밖에 있는 방법 하나를 골라, 지금 하는 일에 적용해보세요.",
  "dev.cross_domain_range.low.exp.2": "이번 주 한 시간을, 평소 다루던 영역과 전혀 다른 것을 읽는 데 써보세요.",
  "dev.cross_domain_range.low.caution.1": "한 분야에 깊이 머무는 것은 약점이 아닙니다 — 깊이는 그 자체로 진짜 강점입니다.",
  "dev.cross_domain_range.medium.exp.1": "한 영역의 문제가 이미 다른 곳에서 풀어본 문제와 닮았다는 것을 알아차려보세요.",
  "dev.cross_domain_range.medium.exp.2": "완전히 다른 분야의 사람에게 자신의 전문 분야를 설명해보고, 무엇이 통하는지 살펴보세요.",
  "dev.cross_domain_range.medium.caution.1":
    "어느 곳에서도 깊이 없이 여러 분야로 관심을 분산시키면, 진짜 전문가들보다 한 걸음 뒤처질 수 있습니다.",
  "dev.cross_domain_range.high.exp.1": "분야 하나를 골라, 새로운 분야를 더하기 전에 그것을 더 깊이 파는 데 전념해보세요.",
  "dev.cross_domain_range.high.exp.2": "분야를 넘나드는 비유가 실제로는 통찰이 아니라 오해를 낳고 있지는 않은지 알아차려보세요.",
  "dev.cross_domain_range.high.caution.1":
    "뒤따르는 실행 없는 폭넓음은 실제로는 아닌 전문성처럼 보일 수 있습니다 — 어디가 얕은지 스스로 솔직해질 필요가 있습니다.",

  "dev.aesthetic_sensitivity.low.exp.1":
    "다음에 무언가를 끝내면, 작동하는지만이 아니라 보이고 느껴지는 방식에도 5분을 더 써보세요.",
  "dev.aesthetic_sensitivity.low.exp.2": "감탄하는 것 하나를 골라, 구체적으로 무엇이 그것을 좋게 만드는지 짚어보세요.",
  "dev.aesthetic_sensitivity.low.caution.1":
    "형태보다 기능을 우선하는 것은 결함이 아닙니다 — 훌륭한 작업 중에는 오직 그것만으로 평가받는 경우도 많습니다.",
  "dev.aesthetic_sensitivity.medium.exp.1": "무언가를 완성했다고 부르기 전에, 그 겉모습이나 느낌에 대해 다른 사람의 의견을 들어보세요.",
  "dev.aesthetic_sensitivity.medium.exp.2": "평소 건너뛰던 작은 심미적 선택 하나를 알아차리고, 한 번은 의도적으로 신경 써서 골라보세요.",
  "dev.aesthetic_sensitivity.medium.caution.1": "심미적 요소에 대한 관심이 일관되지 않으면, 내용이 탄탄해도 부주의해 보일 수 있습니다.",
  "dev.aesthetic_sensitivity.high.exp.1": "시작하기 전에 확실한 마감 기한을 정해, 다듬는 작업에 분명한 끝을 두세요.",
  "dev.aesthetic_sensitivity.high.exp.2": "미적으로 완전히 만족스럽다고 느껴지기 전에 한 번 내놓아보고, 실제로 누군가 신경 쓰는지 살펴보세요.",
  "dev.aesthetic_sensitivity.high.caution.1": "수확체감 지점을 넘어서까지 완성도를 좇는 것은, 조용히 마무리를 피하는 방법이 될 수 있습니다.",

  "dev.discipline.low.exp.1": "작은 약속 하나를 골라, 예외 없이 일주일 동안 매일 같은 시간에 실행해보세요.",
  "dev.discipline.low.exp.2": "만들고 싶은 습관의 기준을 거의 건너뛰기 어려울 만큼 낮춰보고, 그것을 실제로 매일 해보세요.",
  "dev.discipline.low.caution.1":
    "느슨한 구조가 반드시 문제인 것은 아닙니다 — 그 순간에 실제로 필요한 것을 따를 여지가 더 많다는 뜻일 수 있습니다.",
  "dev.discipline.medium.exp.1": "지금 가장 중요한 습관 하나를 찾아, 2주 동안 지켜내 보세요.",
  "dev.discipline.medium.exp.2": "규율이 흐트러지는 날들을 살펴보고, 그날들이 다른 날과 무엇이 다른지 알아차려보세요.",
  "dev.discipline.medium.caution.1": "외부 압박이 있을 때만 나타나는 규율은, 스스로 지켜내는 규율과 같지 않습니다.",
  "dev.discipline.high.exp.1": "이번 주, 자신의 루틴을 일부러 한 번 깨보고 실제로 무엇이 잘못되는지 살펴보세요.",
  "dev.discipline.high.exp.2": "일부러 예외를 하나 계획해 넣어, 실제 방해가 있을 때 체계가 부서지지 않고 휘어지도록 해보세요.",
  "dev.discipline.high.caution.1":
    "경직된 규율은, 여전히 옳은 방식인지 재검토하는 대신 그저 루틴을 따르기만 하는 또 다른 형태의 회피가 될 수 있습니다.",

  "dev.deep_focus.low.exp.1": "알림을 모두 끄고 오직 한 가지 일만 하는 25분을 확보해보세요 — 다른 것은 허용하지 마세요.",
  "dev.deep_focus.low.exp.2": "무엇이 가장 먼저 집중을 깨뜨리는지 구체적으로 알아차리고, 내일은 그 한 가지만 없애보세요.",
  "dev.deep_focus.low.caution.1":
    "짧게 끊어서 일하는 것은 부족함이 아닙니다 — 재정비하고 컨디션을 유지할 자연스러운 휴식이 더 많다는 뜻일 수 있습니다.",
  "dev.deep_focus.medium.exp.1": "이번 주, 방해받지 않는 가장 긴 시간을 15분 늘려보세요.",
  "dev.deep_focus.medium.exp.2": "하루 중 특정 한 시간을, 매일 같은 시간에 몰입 전용으로 지켜보세요.",
  "dev.deep_focus.medium.caution.1":
    "일관되지 않은 몰입은, 최고의 결과가 반복 가능한 방식이 아니라 불안정한 조건에 의존하고 있다는 뜻일 수 있습니다.",
  "dev.deep_focus.high.exp.1": "긴 몰입 시간 동안, 몸 상태와 주변을 점검할 알람을 맞춰두세요.",
  "dev.deep_focus.high.exp.2": "늘 방해받을 때까지 밀어붙이는 대신, 깔끔하게 멈추는 지점을 만드는 연습을 해보세요.",
  "dev.deep_focus.high.caution.1":
    "오랜 시간 시간과 맥락을 놓치는 것은, 주변에서 벌어지는 일들 — 사람, 마감, 자신의 필요 — 을 놓치는 것을 뜻할 수 있습니다.",

  "dev.detail_orientation.low.exp.1": "무언가를 끝났다고 부르기 전에, 오직 작은 오류만을 찾는 검토를 한 번 따로 해보세요.",
  "dev.detail_orientation.low.exp.2": "반복되는 작업 하나를 골라, 그것을 위한 짧은 체크리스트를 만들어보세요.",
  "dev.detail_orientation.low.caution.1":
    "작은 디테일보다 큰 그림에 집중하는 것은 잘못이 아닙니다 — 실제로 가장 중요한 것에서 더 빠른 진전을 뜻할 수 있습니다.",
  "dev.detail_orientation.medium.exp.1": "어떤 종류의 디테일은 꾸준히 잡아내고 어떤 종류는 자꾸 놓치는지 알아차려보세요.",
  "dev.detail_orientation.medium.exp.2": "중요한 것이 나가기 전에, 다른 사람에게 세부 사항을 검토받아보세요.",
  "dev.detail_orientation.medium.caution.1":
    "디테일에 대한 관심이 일관되지 않으면, 늘 높거나 늘 낮은 경우보다 동료들에게 더 답답할 수 있습니다.",
  "dev.detail_orientation.high.exp.1": "더 다듬기 전에, 이 정도의 디테일이 이 사안에 실제로 중요한지 물어보세요.",
  "dev.detail_orientation.high.exp.2": "일부러 \"이 정도면 충분한\" 것을 내놓아보고, 그것이 실제로 문제를 일으켰는지 추적해보세요.",
  "dev.detail_orientation.high.caution.1":
    "모든 디테일을 좇는 것은, 추가된 정밀함이 더는 아무것도 바꾸지 못하는 지점을 넘어서까지 속도를 늦출 수 있습니다.",

  "dev.perfectionism.low.exp.1": "작업물 하나를 골라, 끝났다고 부르기 전에 의도적인 수정 작업을 한 번 거쳐보세요.",
  "dev.perfectionism.low.exp.2":
    "\"이 정도면 충분하다\"는 판단이 실제로 무언가를 비용으로 치르게 한 순간을 알아차리고, 어떤 기준이 도움이 되었을지 짚어보세요.",
  "dev.perfectionism.low.caution.1":
    "\"끝났다\"에 대해 느긋한 태도를 갖는 것은 결함이 아닙니다 — 대체로 더 많은 것을 실제로 완성하고 내놓게 됩니다.",
  "dev.perfectionism.medium.exp.1": "다시 수정하기 전에, 나아질 여지가 있는지가 아니라 구체적으로 무엇이 나아질지 물어보세요.",
  "dev.perfectionism.medium.exp.2": "다음 작업물에 대해 \"이 정도면 충분하다\"는 개인적인 기준을 미리 정하고, 그것을 지켜보세요.",
  "dev.perfectionism.medium.caution.1":
    "어떤 것에는 까다롭고 어떤 것에는 느슨한 일관되지 않은 기준은, 당신의 결과물에 의지하는 사람들을 혼란스럽게 할 수 있습니다.",
  "dev.perfectionism.high.exp.1": "끝없는 수정을 멈추기 위해, 시작하기 전에 확실한 마감 기한을 정해두세요.",
  "dev.perfectionism.high.exp.2": "90%만 완성된 상태로 하나를 내놓고, 실제로 무슨 일이 일어나는지 추적해보세요.",
  "dev.perfectionism.high.caution.1":
    "끝까지 밀어붙이면 완벽주의는 마무리를 늦추거나 막습니다 — 세상에 나오지 못한 작업은 누구에게도 도움이 되지 않습니다.",

  "dev.execution_speed.low.exp.1": "평소라면 고민만 했을 일 하나를 골라, 오늘 바로 해보세요.",
  "dev.execution_speed.low.exp.2": "정해진 기한이 없는 일에 임의로 마감을 정해두고, 스스로 그것을 지켜보세요.",
  "dev.execution_speed.low.caution.1": "신중하게 움직이는 것은 약점이 아닙니다 — 서두르다 저지르는 실수를 줄여주는 경우가 많습니다.",
  "dev.execution_speed.medium.exp.1": "다음 결정에서, 더 이상의 고민이 가치를 더하지 않는 지점을 알아차려보세요.",
  "dev.execution_speed.medium.exp.2": "이번 주 한 가지 일에 시간 제한을 두고, \"완료\" 여부와 상관없이 타이머가 끝나면 멈춰보세요.",
  "dev.execution_speed.medium.caution.1":
    "어떤 것에는 빠르고 어떤 것에는 느린 일관되지 않은 속도는, 당신에게 의지하는 사람들에게 두 극단 중 어느 쪽보다 예측하기 어려울 수 있습니다.",
  "dev.execution_speed.high.exp.1": "내놓기 전에, 고치기 쉬우면서도 비용이 큰 실수가 있는지 한 번 더 확인하는 검토를 해보세요.",
  "dev.execution_speed.high.exp.2":
    "\"단순해서 빠른 것\"과 \"중요한 일을 서두르고 있어서 빠른 것\"을 명확히 구분하는 연습을 해보세요.",
  "dev.execution_speed.high.caution.1":
    "품질 관리를 꾸준히 앞지르는 속도는 재작업을 만들어냅니다 — 때로는 전체적으로 더 느린 것이 실제로 더 빠릅니다.",

  "dev.planning_orientation.low.exp.1": "다음 프로젝트를 시작하기 전에, 첫 세 단계를 정리하는 데 20분을 써보세요.",
  "dev.planning_orientation.low.exp.2": "있을 법한 장애물 하나를 미리 적어두고, 그에 대한 대략적인 계획도 함께 적어보세요.",
  "dev.planning_orientation.low.caution.1":
    "그때그때 방법을 찾아가는 것은 결함이 아닙니다 — 실제로 벌어지는 일에 계속 반응할 수 있게 해줍니다.",
  "dev.planning_orientation.medium.exp.1":
    "어떤 종류의 일은 꼼꼼히 계획하고 어떤 것은 즉흥적으로 처리하는지, 그리고 그 구분이 의도적인지 살펴보세요.",
  "dev.planning_orientation.medium.exp.2": "평소라면 그냥 시작했을 일에 가벼운 계획을 세워보세요.",
  "dev.planning_orientation.medium.caution.1":
    "확고하지도 유연하지도 않은 계획은, 구조에 매여 있으면서도 그 진짜 이점은 얻지 못하게 할 수 있습니다.",
  "dev.planning_orientation.high.exp.1": "계획을 실행하기 전에, 무엇이 있으면 그 계획을 포기할지 미리 정해두세요.",
  "dev.planning_orientation.high.exp.2": "계획 없이 작은 일 하나를 일부러 시작해보고, 그 즉흥적인 과정에서 무엇을 배우는지 살펴보세요.",
  "dev.planning_orientation.high.caution.1":
    "지나친 계획은, 현실이 계획에 맞춰 가만히 있어주지 않을 때 특히 그 자체로 지연의 한 형태가 될 수 있습니다.",

  "dev.persistence.low.exp.1": "포기했던 것 하나를 골라, 다른 방식으로 한 번 더 진지하게 시도해보세요.",
  "dev.persistence.low.exp.2": "다음 좌절이 오면, 포기하기 전에 최소한의 노력 기준을 정해두세요.",
  "dev.persistence.low.caution.1": "효과가 없는 것을 놓아주는 것은 약점이 아닙니다 — 더 가능성 있는 곳으로 노력을 돌릴 자유를 줍니다.",
  "dev.persistence.medium.exp.1": "어떤 일을 그만두기 전에, 계속할 가치가 있으려면 구체적으로 무엇이 사실이어야 하는지 짚어보세요.",
  "dev.persistence.medium.exp.2": "오래 이어온 노력에서, 최종 결과만이 아니라 그 과정의 작은 성과들도 함께 기록해보세요.",
  "dev.persistence.medium.caution.1": "잘 되고 있을 때만 나타나는 끈기는, 실제 좌절 속에서 이어가는 끈기와는 다릅니다.",
  "dev.persistence.high.exp.1": "정말로 멈추고 방향을 바꾸게 될 구체적이고 미리 정해진 조건을 세워두세요.",
  "dev.persistence.high.exp.2": "이것이 여전히 추구할 가치가 있는지, 다른 사람에게 솔직하게 물어보세요.",
  "dev.persistence.high.caution.1":
    "진짜 신호가 사라진 지점을 넘어선 끈기는 매몰 비용이 됩니다 — 가장 알아채기 어려운 대가는 이미 치른 대가입니다.",

  "dev.adaptability.low.exp.1": "다음에 계획이 바뀌면, 반발하기 전에 하루 동안 새로운 버전을 따라가 보세요.",
  "dev.adaptability.low.exp.2": "익숙한 일에 일부러 다른 경로나 방법을 써보며 전환을 연습해보세요.",
  "dev.adaptability.low.caution.1":
    "방향을 유지하는 것은 결함이 아닙니다 — 특히 계획이 실제로 잘 작동하고 있을 때, 일관성에는 그 나름의 진짜 가치가 있습니다.",
  "dev.adaptability.medium.exp.1":
    "구체적으로 어떤 변화가 방해로 느껴지고 어떤 변화가 괜찮게 느껴지는지 알아차리고, 그 패턴이 살펴볼 가치가 있는지 생각해보세요.",
  "dev.adaptability.medium.exp.2": "새로운 정보가 들어왔을 때, 부담이 적은 일에서 그날 바로 방향을 전환해보는 연습을 해보세요.",
  "dev.adaptability.medium.caution.1":
    "이전 것을 끝내지 않고 방식을 바꾸면, 어느 것도 필요한 만큼 끝까지 이어지지 못할 수 있습니다.",
  "dev.adaptability.high.exp.1": "방향을 바꾸기 전에, 원래 계획이 실제로 실패한 것인지 아니면 그저 불편해진 것인지 물어보세요.",
  "dev.adaptability.high.exp.2": "일부러 하나를 골라, 바꾸고 싶은 충동에 특히 저항하며 그대로 유지해보세요.",
  "dev.adaptability.high.caution.1": "너무 쉽게 적응하면, 계획이 스스로를 증명할 만큼 충분히 오래 이어지지 못할 수 있습니다.",

  "dev.risk_tolerance.low.exp.1": "이번 주, 정말로 부담이 적은 작은 위험 하나를 감수해보고 그 느낌을 알아차려보세요.",
  "dev.risk_tolerance.low.exp.2": "망설이고 있는 일의 실제 최악의 상황이 무엇인지, 그리고 그것이 실제로 얼마나 회복 가능한지 짚어보세요.",
  "dev.risk_tolerance.low.caution.1": "신중함은 약점이 아닙니다 — 다른 곳의 더 큰 위험을 무너뜨릴 손실을 막아주는 경우가 많습니다.",
  "dev.risk_tolerance.medium.exp.1": "결정하기 전에, 실제 단점과 그것을 실제로 감당할 수 있는 능력을 적어보세요.",
  "dev.risk_tolerance.medium.exp.2": "실제 위험 판단이 아니라 습관 때문에 신중해지고 있는 곳 하나를 알아차려보세요.",
  "dev.risk_tolerance.medium.caution.1":
    "어떤 영역에서는 과감하고 어떤 영역에서는 신중한 일관되지 않은 위험 감수는, 어느 쪽이든 관리되지 않는 사각지대를 만들 수 있습니다.",
  "dev.risk_tolerance.high.exp.1": "결정을 내리기 전에, 잘됐을 때 얻는 것만이 아니라 잘못됐을 때 잃을 것을 명확히 짚어보세요.",
  "dev.risk_tolerance.high.exp.2": "다가오는 도전 하나를, 직감이 말하는 것보다 일부러 조금 더 작게 걸어보세요.",
  "dev.risk_tolerance.high.caution.1":
    "위험에 대한 높은 욕구는 회복할 수 없는 단 한 번의 손실 전까지는 잘 작동합니다 — 그 손실이 어떤 것일지 미리 아는 것이 좋습니다.",

  "dev.ambiguity_tolerance.low.exp.1": "다음에 무언가 불분명할 때, 해결을 서두르기 전에 하루 동안 그 불확실함과 함께 앉아 있어보세요.",
  "dev.ambiguity_tolerance.low.exp.2": "일부러 불완전한 지침으로 일을 시작해보고, 진행하면서 빈틈을 채워보세요.",
  "dev.ambiguity_tolerance.low.caution.1":
    "행동하기 전에 명확함을 원하는 것은 결함이 아닙니다 — 잘못된 가정 위에 세워진 헛수고를 막아주는 경우가 많습니다.",
  "dev.ambiguity_tolerance.medium.exp.1": "모호함이 불편하게 느껴지기 시작하는 구체적인 지점을 알아차리고, 그때 무엇을 하는지 살펴보세요.",
  "dev.ambiguity_tolerance.medium.exp.2": "이번 주, 평소라면 더 기다렸을 정보량으로 결정 하나를 내려보세요.",
  "dev.ambiguity_tolerance.medium.caution.1": "결정으로 이어지지 않는 모호함에 대한 편안함은, 어떤 것을 영영 미결 상태로 남겨둘 수 있습니다.",
  "dev.ambiguity_tolerance.high.exp.1": "모호함을 조용히 혼자 떠안는 대신, 동료들에게 명시적으로 이름 붙여 말해보는 연습을 해보세요.",
  "dev.ambiguity_tolerance.high.exp.2": "굳이 필요하지 않더라도 명확함을 구할 지점을 스스로 정해두세요.",
  "dev.ambiguity_tolerance.high.caution.1":
    "불분명한 상황에 대한 높은 관용은, 실제로 더 명확한 정의가 필요했던 일을 그대로 진행시킬 수 있습니다.",

  "dev.decisiveness.low.exp.1": "다음 결정에, 임의로라도 확실한 마감 기한을 정해두세요.",
  "dev.decisiveness.low.exp.2": "오늘, 부담이 적은 선택 하나를 60초 안에 내려보는 연습을 해보세요.",
  "dev.decisiveness.low.caution.1": "결정에 시간을 들이는 것은 약점이 아닙니다 — 더 잘 숙고된 선택으로 이어지는 경우가 많습니다.",
  "dev.decisiveness.medium.exp.1": "결정하기 전에, 실제로 답을 바꿀 단 하나의 정보가 무엇인지 짚어보세요.",
  "dev.decisiveness.medium.exp.2": "어떤 종류의 결정은 빠르게 내리고 어떤 것에는 멈칫하는지, 그리고 왜 그런지 알아차려보세요.",
  "dev.decisiveness.medium.caution.1":
    "어떤 판단에는 빠르고 어떤 판단에는 멈춰 있는 일관되지 않은 결단력은, 두 극단 중 어느 쪽보다 동료들에게 더 혼란스러울 수 있습니다.",
  "dev.decisiveness.high.exp.1": "확정하기 전에, 자신이 틀렸음을 보여줄 수 있는 한 가지를 짚어볼 만큼만 잠시 멈춰보세요.",
  "dev.decisiveness.high.exp.2": "이번 주, 직감이 지금 당장 답하고 싶어 하더라도 한 번은 \"생각해볼게요\"라고 말해보세요.",
  "dev.decisiveness.high.caution.1": "빠르게 결정하는 것은, 정말 중요한 정보가 도착하기도 전에 결정해버리는 것을 뜻할 수 있습니다.",

  "dev.social_assertiveness.low.exp.1": "이번 주 회의 하나에서, 평소보다 먼저 말을 꺼내보세요.",
  "dev.social_assertiveness.low.exp.2": "의견을 질문 형태로 감싸지 말고 직접적으로 말하는 연습을 해보세요.",
  "dev.social_assertiveness.low.caution.1":
    "물러서 있는 것은 약점이 아닙니다 — 다른 사람들에게 더 많은 여지를 주고, 답하기 전에 더 많이 듣는다는 뜻일 수 있습니다.",
  "dev.social_assertiveness.medium.exp.1": "물러섰던 상황 하나를 알아차리고, 무엇이 그렇게 만들었는지 짚어보세요.",
  "dev.social_assertiveness.medium.exp.2": "대화에서 평소 자연스럽게 느껴지는 것보다 조금 더 많은 공간을 차지해보는 연습을 해보세요.",
  "dev.social_assertiveness.medium.caution.1": "고르지 않게 나타나는 적극성은, 신중한 선택이라기보다 예측하기 어렵게 보일 수 있습니다.",
  "dev.social_assertiveness.high.exp.1": "일부러 잠시 멈추고 다른 사람에게 먼저 말할 기회를 건네는 연습을 해보세요.",
  "dev.social_assertiveness.high.exp.2": "물러서 있었다면 다른 사람의 더 나은 아이디어가 드러났을 회의 하나를 떠올려보세요.",
  "dev.social_assertiveness.high.caution.1": "강한 적극성은, 들어볼 가치가 있었던 조용한 목소리들을 밀어낼 수 있습니다.",

  "dev.collaboration.low.exp.1": "혼자 하던 작업 하나를, 끝나기 전에 다른 사람의 의견을 듣기 위해 가져가보세요.",
  "dev.collaboration.low.exp.2": "자신의 방식을 제안하기 전에, 다른 사람의 접근 방식에 대해 진짜 질문 하나를 던져보세요.",
  "dev.collaboration.low.caution.1":
    "독립적으로 일하는 것은 결함이 아닙니다 — 적절한 종류의 일에서는 더 빠른 진전과 더 명확한 책임 소재를 뜻할 수 있습니다.",
  "dev.collaboration.medium.exp.1": "혼자 하는 것이 기본값인 일 중, 다른 사람이 함께하면 실제로 도움이 될 만한 일 하나를 알아차려보세요.",
  "dev.collaboration.medium.exp.2": "프로젝트의 일부를 직접 다 하지 않고 다른 사람에게 넘겨보는 연습을 해보세요.",
  "dev.collaboration.medium.caution.1": "일관되지 않게 협업하는 것은, 명확하고 정해진 패턴보다 팀을 더 혼란스럽게 할 수 있습니다.",
  "dev.collaboration.high.exp.1": "일 하나를 골라, 누구도 끌어들이기 전에 처음부터 끝까지 일부러 혼자 해보세요.",
  "dev.collaboration.high.exp.2": "그룹에 맡겼지만 사실 자신이 명확하고 근거 있는 견해를 갖고 있던 결정 하나를 알아차려보세요.",
  "dev.collaboration.high.caution.1": "합의를 향한 강한 끌림은 결정을 늦추거나, 실제로 좋은 개인의 판단을 희석시킬 수 있습니다.",

  "dev.leadership_drive.low.exp.1": "이번 주, 작은 결정이나 일 하나를 처음부터 끝까지 자원해서 맡아보세요.",
  "dev.leadership_drive.low.exp.2": "선택지만 나열하지 말고, 명확한 추천을 제시하는 연습을 해보세요.",
  "dev.leadership_drive.low.caution.1":
    "이끌려 하지 않는 것은 약점이 아닙니다 — 더 집중할 수 있고 다른 사람을 관리하는 데 드는 부담이 줄어든다는 뜻일 수 있습니다.",
  "dev.leadership_drive.medium.exp.1": "아무도 방향을 잡지 않는 순간 하나를 알아차리고, 의도적으로 그 자리에 나서보세요.",
  "dev.leadership_drive.medium.exp.2": "작은 그룹 과제라도, 짧게라도 방향을 정해보는 연습을 해보세요.",
  "dev.leadership_drive.medium.caution.1":
    "편할 때만 이끄는 것은, 당신을 바라봐야 할지 말아야 할지 알아야 하는 사람들에게 일관성 없어 보일 수 있습니다.",
  "dev.leadership_drive.high.exp.1": "평소라면 자신이 맡았을 일에서, 일부러 물러나 다른 사람이 방향을 정하게 두는 연습을 해보세요.",
  "dev.leadership_drive.high.exp.2": "사람들이 원한다고 가정하기 전에, 이 일을 자신이 이끌기를 정말 원하는지 직접 물어보세요.",
  "dev.leadership_drive.high.caution.1":
    "무언가를 이끌려는 강한 성향은, 자신이 옳을 때조차 다른 사람들의 주인의식과 주도성을 밀어낼 수 있습니다.",

  "dev.persuasiveness.low.exp.1": "다음 제안을 하기 전에, 상대편의 가장 강력한 논리를 먼저 적어보세요.",
  "dev.persuasiveness.low.exp.2": "보충 설명을 덧붙이기 전에, 자신의 주장을 명확한 한 문장으로 말해보는 연습을 해보세요.",
  "dev.persuasiveness.low.caution.1":
    "설득을 밀어붙이지 않는 것은 약점이 아닙니다 — 당신의 \"예\"가 정말 \"예\"라는 신뢰로 이어질 수 있습니다.",
  "dev.persuasiveness.medium.exp.1": "논쟁할 만한 노력이 아깝게 느껴져서 말하지 않고 넘긴 좋은 지적 하나를 알아차려보세요.",
  "dev.persuasiveness.medium.exp.2": "지나치게 설명을 늘리지 않고, 자신의 주장을 명확하게 한 번만 말해보는 연습을 해보세요.",
  "dev.persuasiveness.medium.caution.1":
    "일관되지 않은 설득의 노력은, 그저 충분히 밀어붙이지 않았다는 이유만으로 좋은 아이디어가 받아들여지지 않게 만들 수 있습니다.",
  "dev.persuasiveness.high.exp.1": "다시 밀어붙이기 전에, 상대방이 실제로 더 많은 정보가 필요한 것인지 아니면 그저 더 많은 여지가 필요한 것인지 물어보세요.",
  "dev.persuasiveness.high.exp.2": "주장을 제시한 다음, 가장 강력한 반론을 명시적으로 초대하는 연습을 해보세요.",
  "dev.persuasiveness.high.caution.1":
    "강한 설득력은 이기지 말았어야 할 논쟁도 이기게 할 수 있습니다 — 설득력이 있다는 것과 옳다는 것은 다릅니다.",

  "dev.conflict_tolerance.low.exp.1": "이번 주, 그냥 넘기지 않고 작은 의견 차이 하나를 직접 이야기해보세요.",
  "dev.conflict_tolerance.low.exp.2": "부담이 적은 대화에서 가벼운 이의 제기를 소리 내어 말해보는 연습을 해보세요.",
  "dev.conflict_tolerance.low.caution.1":
    "갈등을 피하는 것은 약점이 아닙니다 — 관계와 자리를 실제로 계속 잘 굴러가게 하는 경우가 많습니다.",
  "dev.conflict_tolerance.medium.exp.1": "지금 피하고 있는 의견 차이 하나를 알아차리고, 실제로 무엇이 두려운지 짚어보세요.",
  "dev.conflict_tolerance.medium.exp.2": "이번 주 한 번, 실제 이의 제기를 차분하게 말해보세요.",
  "dev.conflict_tolerance.medium.caution.1":
    "갈등에 관여하려는 의지가 일관되지 않으면, 언제 실제로 반박할지 다른 사람들이 예측하기 어려울 수 있습니다.",
  "dev.conflict_tolerance.high.exp.1": "의견 차이에 관여하기 전에, 이번 것이 실제로 다룰 가치가 있는지 물어보세요.",
  "dev.conflict_tolerance.high.exp.2": "굳이 해결하려 하지 않고, 작은 의견 차이 하나를 일부러 그냥 넘겨보세요.",
  "dev.conflict_tolerance.high.caution.1": "갈등에 대한 높은 욕구는, 사소한 의견 차이를 불필요한 다툼으로 키울 수 있습니다.",

  "dev.mastery_orientation.low.exp.1": "이번 주, 기술 하나를 골라 오직 그것만 의도적으로 연습하는 데 20분을 집중해서 써보세요.",
  "dev.mastery_orientation.low.exp.2": "일반적인 피드백이 아니라, 개선하고 싶은 한 가지에 대한 구체적인 피드백을 요청해보세요.",
  "dev.mastery_orientation.low.caution.1":
    "모든 것에서 숙련을 좇지 않는 것은 결함이 아닙니다 — 깊이 다듬지 않아도 그저 유용한 것들과 폭넓음을 위한 여지를 남겨줍니다.",
  "dev.mastery_orientation.medium.exp.1": "한 영역을 골라, 다음 한 달 동안 구체적으로 추적하며 눈에 띄는 향상을 만들어보겠다고 다짐해보세요.",
  "dev.mastery_orientation.medium.exp.2": "구체적으로 무엇을 위해 최적화하고 있는지 살펴보세요 — 진짜 실력인가요, 아니면 그저 이미 잘하는 것에 대한 편안함인가요?",
  "dev.mastery_orientation.medium.caution.1":
    "숙련을 고르지 않게 좇으면, 편안한 영역에서는 깊은 실력을, 피하는 영역에서는 실질적인 공백을 만들 수 있습니다.",
  "dev.mastery_orientation.high.exp.1": "자신의 기술을 완전히 새로운 영역에 적용해, 다시 초보자가 되어보세요.",
  "dev.mastery_orientation.high.exp.2": "자신의 숙련 기준에 미치지 못한 상태로 무언가를 내놓아보는 연습을 해보세요.",
  "dev.mastery_orientation.high.caution.1": "숙련을 향한 강한 끌림은 완벽주의로 번지거나, 무언가를 끝났다고 부르기 어렵게 만들 수 있습니다.",

  "dev.achievement_drive.low.exp.1": "이번 주에 대해 구체적이고 명확한 목표 하나를 정하고, 달성했는지 추적해보세요.",
  "dev.achievement_drive.low.exp.2": "인정하지 않고 넘어간 최근의 성취 하나를 알아차리고, 실제로 그것을 인정해보세요.",
  "dev.achievement_drive.low.caution.1":
    "성취에 대해 느긋한 태도를 갖는 것은 결함이 아닙니다 — 번아웃이 줄고, 눈에 보이는 결과를 내지 않는 일들을 위한 여지가 더 많아질 수 있습니다.",
  "dev.achievement_drive.medium.exp.1": "당연히 원해야 한다고 생각해서가 아니라, 진짜로 자신의 것인 목표 하나를 정해보세요.",
  "dev.achievement_drive.medium.exp.2": "자신의 추진력이 꾸준히 나타나는지, 아니면 주로 외부의 인정 주변에서만 나타나는지 살펴보세요.",
  "dev.achievement_drive.medium.caution.1":
    "눈에 보이는 성과에 의존하는 성취 욕구는, 반드시 필요하지만 화려하지 않은 구간에서 무기력해질 수 있습니다.",
  "dev.achievement_drive.high.exp.1": "무언가를 끝낸 후, 곧바로 다음 목표로 넘어가지 않고 그 상태로 잠시 머물러보는 연습을 해보세요.",
  "dev.achievement_drive.high.exp.2": "지금 목표가 정말 자신의 것인지, 아니면 더 이상 살펴보지 않게 된 사다리의 다음 칸일 뿐인지 물어보세요.",
  "dev.achievement_drive.high.caution.1": "강한 성취 욕구는 확인 가능한 결과를 내지 않는 휴식, 관계, 목표를 밀어낼 수 있습니다.",

  "dev.competitiveness.low.exp.1": "이번 주, 다른 사람의 성과와 무관하게 스스로에게 자신만의 최고 기록을 세워보세요.",
  "dev.competitiveness.low.exp.2": "약간의 승부욕이 실제로 도움이 될 만한 상황 하나를 알아차리고, 그것을 활용해보세요.",
  "dev.competitiveness.low.caution.1":
    "다른 사람과 비교해 자신을 재지 않는 것은 약점이 아닙니다 — 더 진정한 협력과 덜 제로섬적인 사고로 이어질 수 있습니다.",
  "dev.competitiveness.medium.exp.1": "어떤 상황에서 승부욕이 드러나는지, 그리고 그 패턴이 자신에게 도움이 되는지 알아차려보세요.",
  "dev.competitiveness.medium.exp.2": "비교 하나를 판정이 아니라 정보로 다루는 연습을 해보세요.",
  "dev.competitiveness.medium.caution.1":
    "예측 없이 불쑥 나타나는 경쟁심은, 꾸준한 승부욕이나 아예 없는 것보다 동료들에게 더 방해가 될 수 있습니다.",
  "dev.competitiveness.high.exp.1": "이번 주, 자신과 무관한 다른 사람의 성취를 진심으로 축하해보는 연습을 해보세요.",
  "dev.competitiveness.high.exp.2": "지금 이 자리에서 정말 중요해서 경쟁하는 것인지, 아니면 습관 때문인지 물어보세요.",
  "dev.competitiveness.high.caution.1": "강한 경쟁심은, 아무도 실제로 경쟁하고 있지 않은 협력적인 상황조차 대립적으로 만들 수 있습니다.",

  "dev.autonomy_need.low.exp.1": "이번 주, 먼저 확인받지 않고 작은 결정 하나를 처음부터 끝까지 스스로 책임져보세요.",
  "dev.autonomy_need.low.exp.2": "실제로 명확한 의견이 있었는데 그냥 따랐던 순간 하나를 알아차려보세요.",
  "dev.autonomy_need.low.caution.1":
    "함께 방향을 정하는 것을 선호하는 것은 약점이 아닙니다 — 더 잘 맞춰진 결과와 더 적은 단독 위험을 뜻할 수 있습니다.",
  "dev.autonomy_need.medium.exp.1": "완전히 통제하고 싶은 일과 기꺼이 나눌 수 있는 일이 무엇인지, 그리고 그 구분이 의도적인지 알아차려보세요.",
  "dev.autonomy_need.medium.exp.2": "이번 주 특정한 일 하나에서 더 많은 재량을 요청해보는 연습을 해보세요.",
  "dev.autonomy_need.medium.caution.1":
    "일관되지 않은 자율성 욕구는, 언제 확인하고 언제 물러나야 할지 알고 싶어 하는 동료들을 혼란스럽게 할 수 있습니다.",
  "dev.autonomy_need.high.exp.1": "평소라면 그냥 혼자 결정했을 일에, 의견을 명시적으로 요청하는 연습을 해보세요.",
  "dev.autonomy_need.high.exp.2": "더 많은 구조나 관리가 실제로 방해가 아니라 도움이 되었을 순간 하나를 알아차려보세요.",
  "dev.autonomy_need.high.caution.1":
    "강한 독립성 욕구는, 도우려는 사람들에게조차 관리되거나 조율되기 어려운 방향으로 흐를 수 있습니다.",

  "dev.impact_motivation.low.exp.1": "작업물 하나를 골라, 그것이 실제로 누구에게 닿고 누구를 돕는지 구체적으로 추적해보세요.",
  "dev.impact_motivation.low.exp.2": "조용하게라도 자신의 작업이 누군가에게 의미 있었던 순간 하나를 알아차리고, 그것이 마음에 남게 해보세요.",
  "dev.impact_motivation.low.caution.1":
    "눈에 보이는 영향력이 필요하지 않은 것은 결함이 아닙니다 — 외부의 보상 없이도 그 자체로 기술에 더 집중한다는 뜻일 수 있습니다.",
  "dev.impact_motivation.medium.exp.1": "다음 프로젝트를 시작하기 전에, 그것이 구체적으로 누구를 위한 것인지 짚어보세요.",
  "dev.impact_motivation.medium.exp.2":
    "영향력에 대한 자신의 감각이 규모에 달려 있는지, 아니면 더 작은 그룹에 대한 깊이에 달려 있는지, 그리고 그것이 원하는 균형인지 살펴보세요.",
  "dev.impact_motivation.medium.caution.1":
    "눈에 보이는 도달 범위에 전적으로 의존하는 영향 창출 동기는, 조용해도 실제로 중요한 일의 가치를 과소평가할 수 있습니다.",
  "dev.impact_motivation.high.exp.1": "누구에게 닿을지에 대한 계획 없이, 질 좋은 작업 하나를 끝내보는 연습을 해보세요.",
  "dev.impact_motivation.high.exp.2": "더 깊이가 필요한 일에서, 깊이를 희생하면서까지 도달 범위를 좇고 있는 것은 아닌지 물어보세요.",
  "dev.impact_motivation.high.caution.1":
    "영향력에 대한 강한 끌림은, 더 느리고 깊은 작업이 더 중요할 때조차 가장 빠르게 확장되는 쪽으로 향하게 만들 수 있습니다.",

  // ------------------------------------- taxonomy_v1.1's 4 new attributes
  "dev.opportunity_sensing.low.exp.1":
    "이번 주 한 번, 어떤 것이 관련 없다고 판단하기 전에 5분을 들여 그것이 무엇의 이른 신호일 수 있는지 물어보세요.",
  "dev.opportunity_sensing.low.exp.2":
    "느슨하게 따르고 있는 것 하나를 골라, 평소보다 조금 더 자주 확인해보고 평소에는 그냥 지나쳤던 것이 무엇인지 알아차려보세요.",
  "dev.opportunity_sensing.low.caution.1":
    "행동하기 전에 패턴이 뚜렷해지기를 기다리는 것은 진짜 규율의 한 형태입니다 — 잡음을 좇지 않도록 지켜주는 것이지, 맹점이 아닙니다.",
  "dev.opportunity_sensing.medium.exp.1":
    "다음에 무언가가 관련 있을지도 모른다고 눈에 띄면, 즉시 행동하거나 즉시 넘기는 대신 적어두고 한 달 뒤에 다시 확인해보세요.",
  "dev.opportunity_sensing.medium.exp.2": "실제로 가까이 지켜보고 있는 세상의 영역이 무엇인지, 그리고 그것이 여전히 지켜봐야 할 올바른 대상인지 살펴보세요.",
  "dev.opportunity_sensing.medium.caution.1":
    "한 번에 너무 많은 느슨한 신호를 좇으면, 모든 것에 조금씩만 반응하고 어느 것에도 완전히 반응하지 못하게 될 수 있습니다.",
  "dev.opportunity_sensing.high.exp.1": "이른 신호에 따라 행동하기 전에, 그것이 진짜 패턴이 아니라 잡음이려면 무엇이 사실이어야 할지 물어보세요.",
  "dev.opportunity_sensing.high.exp.2":
    "최근 알아차린 약한 신호 하나를 골라, 그것이 실제로 얼마나 자주 맞아떨어지는지 가늠하기 위해 일부러 행동을 미뤄보세요.",
  "dev.opportunity_sensing.high.caution.1":
    "이른 신호에 빠르게 반응한다는 것은 때로 잡음에 반응한다는 뜻이기도 합니다 — 진짜 기회를 일찍 잡아내는 그 감각은 가짜 기회도 똑같이 잡아냅니다.",

  "dev.resourcefulness.low.exp.1":
    "다음에 첫 번째로 원하던 자원을 구할 수 없을 때, 기다릴지 결정하기 전에 대체 방안 세 가지를 10분 동안 적어보세요.",
  "dev.resourcefulness.low.exp.2": "늘 이상적인 조건을 기다리던 반복적인 일 하나를 골라, 지금 실제로 있는 것으로 한 번 해보세요.",
  "dev.resourcefulness.low.caution.1": "적절한 도구나 자원을 기다리는 것은 품질을 지켜줍니다 — 적응하지 못하는 것과는 다릅니다.",
  "dev.resourcefulness.medium.exp.1": "다음에 임시방편에 손을 뻗을 때, 그것이 정말 충분히 좋은 것인지 아니면 그저 편한 것인지 알아차려보세요.",
  "dev.resourcefulness.medium.exp.2":
    "대체 수단이 임시적인지, 아니면 조용히 영구적인 방식이 되어버렸는지, 적어도 스스로에게는 이름 붙여 구분해보는 연습을 해보세요.",
  "dev.resourcefulness.medium.caution.1":
    "명확한 이유 없이 \"제대로 된 자원을 밀어붙이는 것\"과 \"어떻게든 해내는 것\" 사이를 오가면, 주변 사람들에게 기준이 일관성 없어 보일 수 있습니다.",
  "dev.resourcefulness.high.exp.1": "임시방편에 기본적으로 의존하기 전에, 이번이 실제로 제대로 된 자원을 기다릴 가치가 있는 경우는 아닌지 물어보세요.",
  "dev.resourcefulness.high.exp.2": "정기적으로 의지하는 임시방편 하나를 골라, 그것이 조용히 영구적인 하향 조정이 되어버린 것은 아닌지 확인해보세요.",
  "dev.resourcefulness.high.caution.1":
    "대체 수단에 대한 편안함은, 상황이 실제로 필요로 하는 것보다 더 나쁜 도구나 조건을 당연하게 만들어버릴 수 있습니다.",

  "dev.proactive_agency.low.exp.1":
    "이번 주, 자신의 공식적인 역할 밖에서 개선할 수 있는 것을 발견하면, 그냥 넘기지 말고 그 주 안에 담당자에게 알려보세요.",
  "dev.proactive_agency.low.exp.2": "평소라면 요청받을 때까지 기다렸을 작은 일 하나를 골라, 스스로 첫걸음을 떼어보세요.",
  "dev.proactive_agency.low.caution.1":
    "변경 사항을 담당자를 거쳐 처리하는 것은 수동적인 것이 아닙니다 — 조율을 지켜주고, 완전한 맥락을 모르는 일에 대해 행동하는 것을 막아줍니다.",
  "dev.proactive_agency.medium.exp.1":
    "자신의 역할 밖의 일에 행동하기 전에, 정말 여기서 중요하기 때문에 먼저 확인하는 것인지 아니면 습관 때문인지 알아차려보세요.",
  "dev.proactive_agency.medium.exp.2":
    "이번 주 한 번, 평소와 반대로 해보세요 — 평소 먼저 물어봤다면 행동해보고, 평소 먼저 행동했다면 물어봐보세요.",
  "dev.proactive_agency.medium.caution.1":
    "언제는 먼저 나서서 행동하고 언제는 기다리는지가 일관되지 않으면, 주변 사람들이 예측하기 어려울 수 있습니다.",
  "dev.proactive_agency.high.exp.1": "자신의 공식적인 책임 밖의 일에 행동하기 전에, 자신이 모르는 맥락을 가진 다른 사람이 있는지 물어보세요.",
  "dev.proactive_agency.high.exp.2": "최근 요청받지 않고 바꾼 일 하나를 골라, 나중에라도 그 영역의 담당자에게 알려보세요.",
  "dev.proactive_agency.high.caution.1":
    "허락을 기다리지 않고 행동하는 것은, 다른 사람의 주인의식이나 자신에게 없는 맥락을 건너뛸 때 실질적인 마찰을 일으킬 수 있습니다.",

  "dev.belief_updating.low.exp.1":
    "다음에 확고했던 견해에 진짜 반박이 들어오면, 이것이 그에 해당하는지 판단하기 전에 무엇이 있으면 실제로 생각을 바꿀지 구체적으로 적어보세요.",
  "dev.belief_updating.low.exp.2": "오래 지녀온 믿음 하나를 골라, 그것을 새로운 정보에 실제로 마지막으로 검증해본 것이 언제였는지 확인해보세요.",
  "dev.belief_updating.low.caution.1":
    "확고한 입장을 다시 열기 전에 강한 근거를 요구하는 것은 진짜 신념의 한 형태입니다 — 편협한 것과는 다릅니다.",
  "dev.belief_updating.medium.exp.1":
    "다음에 견해를 수정할 때, 새로운 근거가 실제로 그것을 정당화했는지, 아니면 그저 가장 최근에 들은 것이었는지 확인해보세요.",
  "dev.belief_updating.medium.exp.2": "완전히 확신하지 못하는 입장 하나를 골라, 그에 반대하는 가장 강력한 논리를 일부러 찾아보세요.",
  "dev.belief_updating.medium.caution.1":
    "어떤 견해는 빠르게 갱신하고 어떤 것은 전혀 그러지 않는데 그 이유가 분명하지 않으면, 각각의 판단이 합리적이었더라도 일관성 없어 보일 수 있습니다.",
  "dev.belief_updating.high.exp.1": "확고한 견해를 수정하기 전에, 하루를 두고 새로운 근거가 여전히 그만큼 강하게 느껴지는지 확인해보세요.",
  "dev.belief_updating.high.exp.2": "최근에 바뀐 믿음 하나를 골라, 새로운 정보가 절반만 있었어도 같은 결정을 내렸을지 확인해보세요.",
  "dev.belief_updating.high.caution.1":
    "선뜻 갱신한다는 것은 때로 유지되지 않는 근거로 수정한다는 뜻이기도 합니다 — 진짜 오류를 일찍 잡아내는 그 열린 태도는 잘못된 경보도 똑같이 잡아냅니다.",

  // ---------------------------------------------------------------------
  // PHASE 8: helpsWhenKey — one sentence per attribute (all 34), same
  // "This tendency can be useful when X" template as en.ts, deliberately
  // avoiding "장점"/"더 낫다"/"우월" language — each names a CONDITION,
  // never a general superiority claim.
  // ---------------------------------------------------------------------
  "dev.curiosity.helps_when": "이 성향은 다른 사람들이 놓친 것을 알아차리는 데 실질적인 가치가 있을 때 도움이 될 수 있습니다.",
  "dev.analytical_rigor.helps_when": "이 성향은 결론이 행동으로 이어지기 전에 제대로 검증되어야 할 때 도움이 될 수 있습니다.",
  "dev.intuitive_synthesis.helps_when": "이 성향은 완전히 다듬어진 답보다 더 빠르게 쓸 만한 답이 필요할 때 도움이 될 수 있습니다.",
  "dev.systems_abstraction.helps_when": "이 성향은 눈앞의 세부 사항보다 근본 구조가 더 중요할 때 도움이 될 수 있습니다.",
  "dev.independent_thinking.helps_when": "이 성향은 동조하라는 실제 압박 속에서도 입장을 지켜야 할 때 도움이 될 수 있습니다.",
  "dev.belief_updating.helps_when": "이 성향은 새로운 근거가 실제로 행동에 옮길 만큼 강력할 때 도움이 될 수 있습니다.",
  "dev.creative_originality.helps_when": "이 성향은 익숙하고 안전한 아이디어보다 낯선 아이디어가 더 가치 있을 때 도움이 될 수 있습니다.",
  "dev.experimentation.helps_when":
    "이 성향은 확실해질 때까지 기다리기보다 검증되지 않은 것을 시도하는 편이 부담이 적을 때 도움이 될 수 있습니다.",
  "dev.cross_domain_range.helps_when":
    "이 성향은 서로 완전히 다른 분야를 연결하는 것이 문제 해결의 실마리가 될 때 도움이 될 수 있습니다.",
  "dev.aesthetic_sensitivity.helps_when":
    "이 성향은 보이고 들리고 느껴지는 방식이 실제로 결과물의 완성도를 좌우할 때 도움이 될 수 있습니다.",
  "dev.discipline.helps_when": "이 성향은 짧고 강한 몰입보다 꾸준하고 지속적인 노력이 더 중요할 때 도움이 될 수 있습니다.",
  "dev.deep_focus.helps_when": "이 성향은 잦은 전환보다 지속적인 집중이 더 중요할 때 도움이 될 수 있습니다.",
  "dev.detail_orientation.helps_when": "이 성향은 작은 불일치를 그냥 두면 나중에 실제 문제로 이어질 때 도움이 될 수 있습니다.",
  "dev.perfectionism.helps_when": "이 성향은 결과가 실제로 작은 디테일에 좌우될 때 도움이 될 수 있습니다.",
  "dev.execution_speed.helps_when": "이 성향은 다듬어진 완성도보다 실물을 더 빨리 사람들 앞에 내놓는 것이 더 중요할 때 도움이 될 수 있습니다.",
  "dev.planning_orientation.helps_when":
    "이 성향은 미리 계획하는 시간보다 피할 수 있었던 실수를 막는 쪽이 더 중요할 때 도움이 될 수 있습니다.",
  "dev.persistence.helps_when": "이 성향은 더 오래 붙드는 것이 실제로 그 일을 끝까지 이어가게 하는 방법일 때 도움이 될 수 있습니다.",
  "dev.adaptability.helps_when": "이 성향은 상황이 정해둔 계획보다 빠르게 바뀔 때 도움이 될 수 있습니다.",
  "dev.risk_tolerance.helps_when": "이 성향은 의미 있는 성과를 위해 진짜 불확실성을 감수해야 할 때 도움이 될 수 있습니다.",
  "dev.ambiguity_tolerance.helps_when": "이 성향은 상황이 완전히 정리되기 전에 움직여야 진전이 있을 때 도움이 될 수 있습니다.",
  "dev.decisiveness.helps_when": "이 성향은 더 기다리는 것보다 지금 결정하는 편이 나을 때 도움이 될 수 있습니다.",
  "dev.social_assertiveness.helps_when": "이 성향은 그룹에 먼저 말을 꺼낼 누군가가 필요할 때 도움이 될 수 있습니다.",
  "dev.collaboration.helps_when": "이 성향은 여러 사람의 시각이 실제로 필요한 작업일 때 도움이 될 수 있습니다.",
  "dev.leadership_drive.helps_when": "이 성향은 그룹에 방향을 정해줄 누군가가 필요할 때 도움이 될 수 있습니다.",
  "dev.persuasiveness.helps_when": "이 성향은 다른 사람들을 실제로 한뜻으로 모으는 것이 다음 일에 중요할 때 도움이 될 수 있습니다.",
  "dev.conflict_tolerance.helps_when": "이 성향은 의견 차이를 덮어두기보다 실제로 드러내야 할 때 도움이 될 수 있습니다.",
  "dev.mastery_orientation.helps_when": "이 성향은 빨리 끝내는 것보다 실제로 더 나아지는 것이 더 중요할 때 도움이 될 수 있습니다.",
  "dev.achievement_drive.helps_when": "이 성향은 스스로에게 진짜로 더 높은 기준을 세울 가치가 있을 때 도움이 될 수 있습니다.",
  "dev.competitiveness.helps_when": "이 성향은 직접적인 비교가 실제로 더 나은 노력을 이끌어낼 때 도움이 될 수 있습니다.",
  "dev.autonomy_need.helps_when": "이 성향은 명확하고 스스로 이끄는 방식 하나가 작업에 실제로 필요할 때 도움이 될 수 있습니다.",
  "dev.impact_motivation.helps_when": "이 성향은 그 일의 가치가 실제로 얼마나 멀리 영향을 미치는지에 달려 있을 때 도움이 될 수 있습니다.",
  "dev.opportunity_sensing.helps_when": "이 성향은 모두에게 뚜렷해지기 전에 변화를 알아차리는 데 실질적인 가치가 있을 때 도움이 될 수 있습니다.",
  "dev.resourcefulness.helps_when": "이 성향은 조건이 불완전해도 작업이 실제로 계속 진행되어야 할 때 도움이 될 수 있습니다.",
  "dev.proactive_agency.helps_when": "이 성향은 담당자가 정해지기만을 기다리다가 정작 개선할 기회를 놓치게 될 상황일 때 도움이 될 수 있습니다.",

  // ---------------------------------------------------------------------
  // PHASE 8: preservesKey — one sentence per `contextual`-shaped attribute
  // (all 12), answering "what does the user's current/lower pole
  // legitimately protect", independent of score band.
  // ---------------------------------------------------------------------
  "dev.intuitive_synthesis.preserves":
    "결론을 더 신중하게 단계적으로 따져보는 방식은, 실제로는 성립하지 않는 패턴에 따라 행동하는 것을 막아줄 수 있습니다.",
  "dev.cross_domain_range.preserves": "한 영역에 더 오래 머무는 것은, 그 영역에서 진짜 숙련에 필요한 깊이를 지켜줄 수 있습니다.",
  "dev.aesthetic_sensitivity.preserves": "작동 여부를 중심으로 판단하는 방식은, 표면적인 매력만으로 좌우되는 결정을 막아줄 수 있습니다.",
  "dev.detail_orientation.preserves": "작은 불일치를 그냥 넘기는 것은, 그 정도의 정밀함이 필요 없는 작업의 흐름을 지켜줄 수 있습니다.",
  "dev.planning_orientation.preserves":
    "모든 세부 사항이 계획되기 전에 시작하는 것은, 어차피 상황이 바뀌어 무용지물이 될 계획에 시간을 뺏기지 않도록 지켜줄 수 있습니다.",
  "dev.social_assertiveness.preserves":
    "말하기를 잠시 미루는 것은, 대화가 한 가지 의견으로 굳어지기 전에 다른 사람들이 기여할 공간을 지켜줄 수 있습니다.",
  "dev.conflict_tolerance.preserves":
    "의견 차이를 밀어붙이지 않기로 하는 것은, 그 마찰이 필요하지 않은 상황에서 관계나 그룹의 결속을 지켜줄 수 있습니다.",
  "dev.competitiveness.preserves": "다른 사람과 견주어 노력을 재지 않는 것은, 더 꾸준하고 스스로 동기부여된 속도를 지켜줄 수 있습니다.",
  "dev.autonomy_need.preserves": "공유된 방식 안에서 일하는 것은, 그룹 전체의 조율과 일관성을 지켜줄 수 있습니다.",
  "dev.opportunity_sensing.preserves": "더 뚜렷한 신호를 기다리는 것은, 결국 잡음으로 드러날 패턴에 따라 행동하는 것을 막아줄 수 있습니다.",
  "dev.resourcefulness.preserves":
    "제대로 된 자원을 먼저 확보하는 쪽을 선호하는 것은, 임시방편이 피할 수 있었던 타협을 만들어낼 상황에서 기준과 품질, 일관성을 지켜줄 수 있습니다.",
  "dev.proactive_agency.preserves":
    "담당자를 거쳐 변경 사항을 처리하는 것은, 조율을 지켜주고 다른 사람이 갖고 있는 맥락 없이 행동하는 것을 막아줄 수 있습니다.",

  // ---------------------------------------------------------------------
  // PHASE 8K: person display names — presentation ONLY. Never read by
  // `id`/`slug`/matching/`externalIdentity`; resolved through
  // `personDisplayName()` (`i18n/index.ts`), which falls back to
  // `Person.canonicalName` when a slug has no entry here. All 35 of the
  // current roster are covered. Two entries deliberately favour the
  // better-established short/common form over a literal transliteration
  // of the full `canonicalName` field — see the inline note on each.
  // Ambiguous cases (a real competing Korean form, not just "any
  // transliteration involves some judgment") are flagged below and in the
  // Phase 8K report; nothing here was guessed past that point.
  // ---------------------------------------------------------------------
  "person.name.leonardo-da-vinci": "레오나르도 다빈치",
  "person.name.marie-curie": "마리 퀴리",
  "person.name.richard-feynman": "리처드 파인먼",
  "person.name.ada-lovelace": "에이다 러브레이스",
  "person.name.steve-jobs": "스티브 잡스",
  // Japanese names follow Korean convention for Japanese figures
  // (surname first), matching akira-kurosawa below — not `canonicalName`'s
  // Western given-family order.
  "person.name.hayao-miyazaki": "미야자키 하야오",
  // A Korean historical figure — the canonical Korean name, not a
  // transliteration of the English romanisation.
  "person.name.yi-sun-sin": "이순신",
  "person.name.frida-kahlo": "프리다 칼로",
  "person.name.serena-williams": "세리나 윌리엄스",
  "person.name.alan-turing": "앨런 튜링",
  "person.name.wolfgang-amadeus-mozart": "볼프강 아마데우스 모차르트",
  // FLAG (minor): "판 베토벤" matches current standard/encyclopedia usage;
  // an older "반 베토벤" spelling also circulates. Implemented as "판".
  "person.name.ludwig-van-beethoven": "루트비히 판 베토벤",
  "person.name.nelson-mandela": "넬슨 만델라",
  "person.name.mahatma-gandhi": "마하트마 간디",
  // The traditional East Asian name, not a phonetic transliteration.
  "person.name.confucius": "공자",
  "person.name.socrates": "소크라테스",
  "person.name.warren-buffett": "워런 버핏",
  "person.name.coco-chanel": "코코 샤넬",
  "person.name.nikola-tesla": "니콜라 테슬라",
  // FLAG (minor): "로절린드" is the implemented spelling; "로잘린드" also
  // circulates for the same name.
  "person.name.rosalind-franklin": "로절린드 프랭클린",
  "person.name.jane-goodall": "제인 구달",
  "person.name.genghis-khan": "칭기즈 칸",
  "person.name.ibn-khaldun": "이븐 할둔",
  "person.name.wangari-maathai": "왕가리 마타이",
  "person.name.malala-yousafzai": "말랄라 유사프자이",
  // FLAG (real ambiguity, human decision needed): implemented as "브루스
  // 리" (matches canonicalName's Western form and is itself a genuinely
  // well-established Korean rendering), but "이소룡" — the Sino-Korean
  // reading of his Chinese name (李小龍) — is at least as established in
  // Korean, arguably more so for his film career specifically. Not a
  // transliteration-confidence question; a real choice between two
  // legitimate established forms.
  "person.name.bruce-lee": "브루스 리",
  "person.name.srinivasa-ramanujan": "스리니바사 라마누잔",
  "person.name.toni-morrison": "토니 모리슨",
  "person.name.akira-kurosawa": "구로사와 아키라",
  "person.name.benjamin-franklin": "벤저민 프랭클린",
  // The traditional East Asian name, not a phonetic transliteration.
  "person.name.zheng-he": "정화",
  // FLAG (deliberate deviation from canonicalName's full form): "루미"
  // alone, not a transliteration of the full "Jalal ad-Din Muhammad Rumi."
  // "루미" is the genuinely well-established Korean form (how Korean
  // translations of his poetry are shelved and searched); the full
  // Persian/Arabic name has no single settled Korean transliteration this
  // session could verify with confidence, and inventing one risked
  // presenting an uncertain rendering as if it were standard.
  "person.name.rumi": "루미",
  "person.name.oprah-winfrey": "오프라 윈프리",
  "person.name.simone-biles": "시몬 바일스",
  // FLAG (minor): implemented surname-first ("쿠사마 야요이"), matching
  // the Japanese-name convention used for hayao-miyazaki/akira-kurosawa
  // above — but Kusama's international art-world branding uses
  // "Yayoi Kusama" (given-family, Western order) even in Japan, so
  // Korean art coverage sometimes follows that order instead. Worth a
  // native speaker's confirmation against current Korean art-press usage
  // specifically, more than the other Japanese names above.
  "person.name.yayoi-kusama": "쿠사마 야요이",

  // ROSTER-1000 first real expansion batch (roster3.ts, 16 people).
  "person.name.albert-einstein": "알베르트 아인슈타인",
  "person.name.charles-darwin": "찰스 다윈",
  "person.name.ernest-shackleton": "어니스트 섀클턴",
  "person.name.frederick-douglass": "프레더릭 더글러스",
  "person.name.galileo-galilei": "갈릴레오 갈릴레이",
  "person.name.hildegard-of-bingen": "빙엔의 힐데가르트",
  "person.name.ibn-sina": "이븐 시나",
  "person.name.isaac-newton": "아이작 뉴턴",
  "person.name.jane-austen": "제인 오스틴",
  "person.name.martin-luther-king-jr": "마틴 루서 킹 주니어",
  "person.name.rabindranath-tagore": "라빈드라나트 타고르",
  "person.name.thomas-aquinas": "토마스 아퀴나스",
  "person.name.thomas-edison": "토머스 에디슨",
  "person.name.umm-kulthum": "움 쿨숨",
  "person.name.vincent-van-gogh": "빈센트 반 고흐",
  "person.name.wilbur-wright": "윌버 라이트",

  // roster-1000 session 4, second real batch (2026-08) — 16 accepted people.
  "person.name.benjamin-banneker": "벤저민 배네커",
  "person.name.chinua-achebe": "치누아 아체베",
  "person.name.emmy-noether": "에미 뇌터",
  "person.name.fela-kuti": "펠라 쿠티",
  "person.name.florence-nightingale": "플로렌스 나이팅게일",
  "person.name.grace-hopper": "그레이스 호퍼",
  "person.name.immanuel-kant": "임마누엘 칸트",
  "person.name.malcolm-x": "맬컴 엑스",
  "person.name.muhammad-ali": "무하마드 알리",
  "person.name.niels-bohr": "닐스 보어",
  "person.name.rachel-carson": "레이첼 카슨",
  "person.name.simon-bolivar": "시몬 볼리바르",
  "person.name.sojourner-truth": "소저너 트루스",
  "person.name.sor-juana-ines-de-la-cruz": "소르 후아나 이네스 데 라 크루스",
  "person.name.toussaint-louverture": "투생 루베르튀르",
  "person.name.wole-soyinka": "월레 소잉카",

  // roster-1000 session 5, third real batch (2026-08) — 3 accepted people.
  "person.name.aristotle": "아리스토텔레스",
  "person.name.br-ambedkar": "B. R. 암베드카르",
  "person.name.sequoyah": "세쿼야",
  "person.name.elizabeth-blackwell": "엘리자베스 블랙웰",
  "person.name.harriet-tubman": "해리엇 터브먼",
  "person.name.ludwig-wittgenstein": "루트비히 비트겐슈타인",
  "person.name.nicolaus-copernicus": "니콜라우스 코페르니쿠스",
  "person.name.wu-zetian": "측천무후",

  // roster-1000 session 10, eligibility_v2 promotion (2026-08) — 9 people,
  // held under the old flat-mean confidence gate, newly eligible once that
  // gate was replaced by a high-confidence-subset requirement (see
  // docs/roster-1000-checkpoint.md SS52-64). Scores/sources unchanged.
  "person.name.averroes": "이븐 루시드",
  "person.name.cv-raman": "C. V. 라만",
  "person.name.franz-kafka": "프란츠 카프카",
  "person.name.katherine-johnson": "캐서린 존슨",
  "person.name.maimonides": "마이모니데스",
  "person.name.mary-wollstonecraft": "메리 울스턴크래프트",
  "person.name.michelangelo": "미켈란젤로",
  "person.name.octavia-butler": "옥타비아 버틀러",
  "person.name.susan-b-anthony": "수전 B. 앤서니",

  // roster-1000 session 11 (2026-08) — originally 20 people; after the
  // session-11 scoring-integrity re-audit (docs/roster-1000-checkpoint.md
  // SS75-76) only 3 remained eligible and committed to the live roster.
  // The other 17 names were removed from here since those people are not
  // currently in SEED_PEOPLE (their candidate files remain staged as
  // "held" in data-pipeline/candidates/, re-add their names here if a
  // future session re-promotes them).
  "person.name.benito-juarez": "베니토 후아레스",
  "person.name.joan-of-arc": "잔 다르크",
  "person.name.julius-caesar": "율리우스 카이사르",

  // ROSTER-1000 session 18 (roster9.ts, 3 people).
  "person.name.louis-pasteur": "루이 파스퇴르",
  "person.name.fyodor-dostoevsky": "표도르 도스토옙스키",
  "person.name.louis-armstrong": "루이 암스트롱",

  // ROSTER-1000 session 19 (roster10.ts, 5 people).
  "person.name.mustafa-kemal-ataturk": "무스타파 케말 아타튀르크",
  "person.name.aung-san-suu-kyi": "아웅 산 수 치",
  "person.name.anna-pavlova": "안나 파블로바",
  "person.name.akio-morita": "모리타 아키오",
  "person.name.oscar-niemeyer": "오스카 니마이어",

  // POST-10D STAGE A: `<title>`/`<meta description>` copy — see the matching
  // block in en.ts for the full rationale. Natural Korean, not a literal
  // rendering of the English strings.
  "meta.landing.title": "The Great Inside — 역사 속 누구와 생각이 닮았을까요?",
  "meta.landing.description":
    "실제 역사 속 인물, 그리고 현대 인물들과 비교하는 퀴즈 기반 서비스입니다. 회원가입도, 생성형 AI도 없이 당신의 답변만으로 모든 결과가 계산됩니다.",
  "meta.people.title": "위대한 인물 탐색 — The Great Inside",
  "meta.people.description": "시대, 지역, 특성별로 The Great Inside의 인물들을 둘러보세요.",
  "meta.quiz.title": "퀴즈 시작하기 — The Great Inside",
  "meta.quiz.description": "당신이 생각하고 일하는 방식에 관한 솔직한 질문에 답하고, 역사 속 누구와 닮았는지 확인해보세요.",
  "meta.privacy.title": "개인정보처리방침 — The Great Inside",
  "meta.privacy.description": "The Great Inside가 실제로 어떤 정보를 수집·저장·공유하는지 쉬운 말로 설명합니다.",
  "meta.terms.title": "이용약관 — The Great Inside",
  "meta.terms.description": "The Great Inside 이용에 적용되는 약관입니다.",
  "meta.person.description": "{name}의 특성 프로필입니다 — The Great Inside에서 나의 프로필과 비교해보세요.",
  "meta.results.title": "당신의 결과 — The Great Inside",
  "meta.results.description": "당신의 프로필: 가장 닮은 역사 속 인물, 핵심 특성, 그리고 전체 특성 비교 결과.",
  "meta.compare.title": "나 × {name} — The Great Inside",
  "meta.compare.title.generic": "비교하기 — The Great Inside",
  "meta.compare.description": "당신의 퀴즈 결과와 {name}의 프로필을 특성별로 비교합니다 — 닮은 점, 다른 점, 그리고 살펴볼 만한 점.",
  "meta.account.title": "저장된 결과 — The Great Inside",
  "meta.account_result.title": "저장된 결과 — The Great Inside",

  // STAGE B: sharing UX — approved labels/disclosure copy, see en.ts's
  // matching block for the full rationale.
  "share.results.label": "결과 공유",
  "share.compare.label": "비교 공유",
  "share.person.label": "공유",
  "share.disclosure.results": "이 링크를 가진 사람은 누구나 이 결과를 볼 수 있어요.",
  "share.disclosure.compare": "이 링크를 가진 사람은 누구나 이 비교 결과를 볼 수 있어요.",
  "share.feedback.copied": "복사됨!",
  "share.feedback.copy_failed": "복사하지 못했어요 — 다시 시도해주세요",
  "share.feedback.share_failed": "공유하지 못했어요 — 다시 시도해주세요",
};
