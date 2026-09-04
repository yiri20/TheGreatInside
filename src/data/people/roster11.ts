/**
 * ROSTER 11 — roster-expansion-125 evidence program (1 person).
 *
 * Generated from `data-pipeline/candidates/*.json` (status: qa_passed) via
 * `src/dev/roster1000/generateRoster11.ts`. Every score's rationale is
 * preserved as the inline comment above its Row, the same evidence-audit-
 * trail discipline the earlier rosters use.
 *
 * The roster-expansion-125 program (see `docs/checkpoints/
 * roster-expansion-125-FINAL-CONVERGENCE-DRAFT.md`) researched/scored 30
 * primaries toward a future 95->125 expansion; only Miriam Makeba crossed
 * `eligibility_v2` honestly on the strength of genuinely new evidence (the
 * 1968 Stokely Carmichael marriage and its documented, quoted career
 * consequences) added during a held-candidate evidence-deepening pass, not
 * by re-tuning existing rows. The other 29 candidates from that program
 * remain `held`/`STRUCTURALLY_THIN`/unscored and are not part of this batch.
 */
import { build, bio, wiki, type PersonSeed } from "./builder.js";
import type { Person } from "../../core/types.js";

const seeds: PersonSeed[] = [
  {
    id: "p_miriam_makeba",
    slug: "miriam-makeba",
    canonicalName: "Miriam Makeba",
    birthYear: 1932,
    deathYear: 2008,
    isLiving: false,
    era: "20th_century",
    nationalityCodes: ["ZA"],
    regionCode: "sub_saharan_africa",
    occupationIds: ["singer", "political_activist"],
    fieldIds: ["music"],
    impactDomains: ["artistic", "cultural", "social"],
    tagIds: ["overcame_adversity", "advocate", "founder"],
    archetypeIds: ["social_influencer", "creative_creator"],
    externalIdentity: { wikidataId: "Q146256" },
    sources: [{ id: "src_makeba_wikipedia", kind: "wikipedia", title: "Miriam Makeba", url: "https://en.wikipedia.org/wiki/Miriam_Makeba" }, { id: "src_makeba_britannica", kind: "institution", title: "Encyclopaedia Britannica — Miriam Makeba" }, { id: "src_makeba_memoir", kind: "archive", title: "Miriam Makeba with James Hall, Makeba: My Story (1988)" }, { id: "src_makeba_safundi", kind: "institution", title: "\"A marriage of inconvenience: Miriam Makeba's relationship with Stokely Carmichael and her music career in the United States\", Safundi 17(3), 2016 — peer-reviewed scholarly treatment of the 1968 marriage and its documented career consequences" }],
    rows: {
      // [NEW_EVIDENCE, this session] Two independent, well-corroborated documented instances of accepting severe, foreseeable personal cost for principle: (1) the 1963 UN apartheid testimony, after which South Africa revoked her passport and citizenship for over 30 years; (2) her 1968 marriage to Black Power activist Stokely Carmichael, which she pursued knowing (and which then caused) her US record label to drop her and her American concerts to be cancelled — she is directly quoted at the time: "My concerts are being canceled left and right. I learn that people are afraid that my shows will finance radical activities." Two independent documented instances from more than one source meets this rubric's top confidence band.
      risk_tolerance: [84, 0.8, "d", "R"],
      // The UN testimony itself, and her sustained public advocacy against apartheid across subsequent decades of exile, are both documented instances of direct public political assertion.
      social_assertiveness: [86, 0.68, "d", "A"],
      // Continued public anti-apartheid advocacy for over three decades in exile despite the severe, documented personal cost (loss of citizenship, inability to return home even for her mother's funeral).
      conflict_tolerance: [78, 0.6, "d", "R"],
      // Widely credited with using her international musical platform to bring global attention to apartheid, documented via the sustained international press and diplomatic attention her advocacy generated.
      persuasiveness: [76, 0.58, "d", "A"],
      // Sustained a performing and advocacy career across more than three decades of exile from her home country, documented via her continuous international recording and touring record.
      persistence: [82, 0.65, "d", "A"],
      // Self-initiated the 1963 UN testimony rather than being asked to give it by an outside organization, documented via the historical record of the hearing.
      proactive_agency: [78, 0.62, "d", "A"],
      // Engaged across music, international diplomacy, and political activism throughout her decades of exile, documented via her memoir and public record.
      curiosity: [55, 0.42, "s", "N"],
      // Noted for meticulous vocal and musical craftsmanship blending South African and international styles, documented via critical assessment of her recordings.
      detail_orientation: [58, 0.44, "s", "N"],
      // [NEW_EVIDENCE, this session] The 1963 UN testimony (leading directly to her citizenship being revoked) is now corroborated by a second, independent documented instance: her 1968 marriage to Stokely Carmichael was a personal/political choice made in full awareness it would cost her the US commercial career she had already built — she chose the relationship and her politics over preserving that career, documented via scholarly treatment (Safundi 2016) of the marriage's specific, traceable professional consequences.
      independent_thinking: [78, 0.78, "d", "A"],
      // Sustained an international recording and performing career across roughly five decades despite decades of exile, documented via her discography.
      deep_focus: [62, 0.46, "s", "A"],
      // Continued developing her musical career across genres and decades in exile rather than remaining static, documented via her sustained recording history.
      mastery_orientation: [58, 0.44, "s", "A"],
      // Credited with popularizing South African musical styles (including click-consonant Xhosa singing) to international audiences in a form not previously widely heard outside the region.
      creative_originality: [68, 0.52, "s", "A"],
      // Rebuilt her career and life across multiple countries during her decades of exile (the US, Guinea, and elsewhere), documented via her residency history during this period.
      adaptability: [74, 0.58, "d", "A"],
      // Served as a prominent, recognized figure within the international anti-apartheid movement, though the surviving record documents her as an advocate/symbol more than a formal organizational leader.
      leadership_drive: [62, 0.46, "i", "N"],
      // Explicitly and repeatedly used her platform for the anti-apartheid cause across decades rather than for personal career advancement alone, documented via her sustained public advocacy record.
      impact_motivation: [80, 0.62, "d", "A"],
      // Sustained an international recording and touring career across several decades and multiple countries of exile.
      discipline: [66, 0.5, "s", "A"],
      // Continued building an international career across genuinely difficult circumstances (statelessness, exile) rather than retreating from public life.
      achievement_drive: [58, 0.44, "i", "N"],
      // [NEW_EVIDENCE, this session] Beyond the general pattern of rebuilding her career across several countries of exile, a specific documented instance now anchors this: she chose to relocate to Guinea with Carmichael specifically because her US career had been shut down by the marriage, rather than distancing herself from him to preserve that career — a concrete, dated instance of prioritizing her own relationship/political commitments over institutional/commercial security.
      autonomy_need: [62, 0.56, "s", "N"],
      // Worked with numerous musicians and organizations across her international career and exile, a real but moderately documented collaborative pattern.
      collaboration: [55, 0.42, "i", "N"],
      // Documented achievement is concentrated in music performance and direct political advocacy — real but modest range, honestly scored rather than inflated.
      cross_domain_range: [48, 0.4, "i", "N"],
    },
  },
];

export const ROSTER_11: readonly Person[] = seeds.map(build);
