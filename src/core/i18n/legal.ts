/**
 * PRIVACY POLICY / TERMS OF SERVICE — Broader Public Launch Finish Line.
 *
 * Deliberately NOT part of the `MessageKey`/`t()` system: that system is
 * for short, reusable UI atoms (labels, buttons, template fragments);
 * these are two long-form, one-off documents, and routing every paragraph
 * through a discrete `MessageKey` would bloat `en.ts`/`ko.ts` for content
 * that's never interpolated or reused elsewhere. Kept in `src/core/i18n`
 * anyway (not `app/`) because it's still canonical, locale-keyed content —
 * consistent with this project's "canonical content lives in src/core"
 * rule — and because keeping it framework-agnostic means the page
 * components that render it stay thin.
 *
 * EVERY factual claim below is traceable to one of: (1) actual repository
 * behavior, verified by reading the code directly during the Broader
 * Public Launch Finish Line audit (2026-08) — see CLAUDE.md's dedicated
 * section for the full inventory this content is built from; (2) an
 * official external platform requirement/behavior (Google OAuth, Supabase,
 * Wikimedia); or (3) a generic, non-specific service term that asserts no
 * unverifiable fact. No company/legal-entity name, physical address,
 * specific retention duration, or compliance-regime claim (GDPR/CCPA/
 * COPPA) is asserted anywhere in this file — none of those facts exist in
 * this project and none are invented here. The one contact channel used
 * throughout, thegreatinside.web@gmail.com, was supplied directly by the
 * project owner for exactly this purpose, not inferred or guessed.
 */

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
}

const CONTACT_EMAIL = "thegreatinside.web@gmail.com";

export const PRIVACY_POLICY: Record<"en-US" | "ko-KR", LegalDocument> = {
  "en-US": {
    title: "Privacy Policy",
    lastUpdated: "Last updated: August 21, 2026",
    intro: [
      `The Great Inside ("the site," "we," "us") is a small, independent project that lets you take a quiz and compare your answers to historical and contemporary people using a deterministic algorithm — no AI generates your results. This page explains, in plain language, what information the site actually collects, stores, and shares, based on how the product works today.`,
      `Questions about this policy, or a request about your data: ${CONTACT_EMAIL}`,
    ],
    sections: [
      {
        heading: "Using the quiz without an account",
        paragraphs: [
          "You can take the quiz and view your results without ever creating an account or signing in. Your in-progress answers are saved only in your own browser, so you can leave and come back without losing progress. Nothing is sent to our servers while you're taking the quiz.",
          "Your finished result lives entirely in a link — a URL containing a token that encodes your answers. The Great Inside recomputes your results from that token every time the page loads; we do not keep a server-side record of anonymous results. Anyone who has that link can view that result, so treat it the way you'd treat any link you don't want strangers to see — the same thing is disclosed next to the Share button on your results page.",
        ],
      },
      {
        heading: "Signing in with Google (optional)",
        paragraphs: [
          `Signing in is entirely optional and unlocks one thing: saving your results to an account so you can find them again later, instead of relying on the link. We use Google Sign-In through our authentication provider, Supabase, and request only the minimum needed to know who you are — your basic Google identity (the "openid," "email," and "profile" scopes). We do not request access to your Gmail, Google Drive, contacts, calendar, or anything beyond identity verification.`,
          "When you sign in, Supabase — not The Great Inside directly — receives and stores basic profile information Google provides as part of that sign-in; this is standard behavior for any app using Google Sign-In. The Great Inside's own database does not store your name, email address, or profile picture. What we store is an internal account identifier issued by Supabase, used only to link your saved results to your account.",
        ],
      },
      {
        heading: "What we store once you save a result",
        paragraphs: [
          "If you sign in and save a result, our database stores: an internal account identifier (not your email or name); the same result token used in your results link; the date and time you completed the quiz; a frozen snapshot of your results page — the same trait scores, comparisons, and matches you already saw, kept so it stays accurate even if we later improve our matching methodology; and version information about the quiz and scoring methodology used, so we can tell which version of the site produced your result.",
          "This data is protected by database-level access rules restricting it to your account only — enforced by the database itself, not just our application code.",
          "We do not sell, rent, or share this data with advertisers or data brokers. The Great Inside currently runs no analytics software, no advertising network, and no behavioral-profiling third party of any kind.",
        ],
      },
      {
        heading: "Deep Inside purchases",
        paragraphs: [
          `Deep Inside is an optional, one-time paid feature (US$6.99, no subscription, no recurring charge) that unlocks a deeper breakdown of your own result. If you purchase it, payment is handled entirely by Stripe, our payment processor — The Great Inside never sees or stores your card number, expiry date, CVC, or any other full payment card details.`,
          "What we store, in our own database, is a minimal purchase record: an internal account identifier, Stripe's own checkout session and payment identifiers (not card data), the amount and currency charged, and the purchase status (e.g. completed, refunded) — kept for as long as your account exists, for entitlement (so Deep Inside stays unlocked when you sign back in, on any device) and support purposes (so we can look into a payment issue if you contact us). We also record, separately, a small number of anonymous usage counts (e.g. how many people viewed the Deep Inside upsell or started checkout) to understand whether the feature is useful — these do not include payment details and are not shared with advertisers.",
          "Whether Deep Inside access is active on your account is decided by our server and database, never by anything stored only in your browser.",
        ],
      },
      {
        heading: "Deleting your data",
        paragraphs: [
          "You can permanently delete every saved result associated with your account at any time from your Account page — a real, immediate deletion, not a temporary hide.",
          `We do not currently offer a fully automated way to delete the underlying sign-in record itself (the identity record our authentication provider, Supabase, keeps to recognize you when you sign in), or purchase/entitlement records kept for the reasons described above. If you'd like any of that removed too, email ${CONTACT_EMAIL} and we'll process it manually. You can also revoke The Great Inside's access at any time from your Google Account's third-party access settings, which stops any future sign-in.`,
        ],
      },
      {
        heading: "Cookies and local storage",
        paragraphs: [
          "The Great Inside uses a small number of cookies and browser-storage entries, none for advertising or cross-site tracking:",
          "A cookie remembering your language preference (English or Korean), kept for about a year. A short-lived cookie (a few minutes) used only during the Google sign-in process, to return you to the right page afterward. If you sign in, Supabase sets its own session cookies to keep you signed in between visits, governed by Supabase's standard authentication behavior.",
          "A few browser-storage entries (not cookies) hold your in-progress quiz answers, the token of the last result you viewed, and a short queue of results you've completed in this browser so they can be offered for saving if you sign in afterward. These stay on your device and are never sent to any server except when you explicitly complete or save a result.",
        ],
      },
      {
        heading: "Other services this site talks to",
        paragraphs: [
          "Supabase hosts our database and handles sign-in. Vercel hosts the website itself. Google provides the optional sign-in. Stripe processes payment for the optional Deep Inside purchase — governed by Stripe's own privacy practices, which apply to the payment details you give Stripe directly.",
          "Wikimedia Commons: one profile portrait currently used on the site (Leonardo da Vinci's) is loaded directly from Wikimedia Commons when you view that page — your browser makes a direct request to Wikimedia for that image, governed by Wikimedia's own privacy practices.",
          "Links to Wikipedia and Wikidata pages appear on some profiles for reference. These only load if you click them.",
        ],
      },
      {
        heading: "Children",
        paragraphs: [
          "The Great Inside is not directed at children, and we do not knowingly collect information from children under 13.",
        ],
      },
      {
        heading: "Security",
        paragraphs: [
          "We rely on our providers' standard security practices — encrypted connections, provider-managed authentication, and database-level access controls — to protect the limited information described above. No online service can guarantee complete security, and we can't promise one either.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          `We may update this policy as the site changes. We'll update the "Last updated" date above when we do.`,
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions, data requests, or anything else: ${CONTACT_EMAIL}`],
      },
    ],
  },
  "ko-KR": {
    title: "개인정보처리방침",
    lastUpdated: "최종 업데이트: 2026년 8월 21일",
    intro: [
      `The Great Inside("이 사이트", "저희")는 설문에 답하면 결정론적 알고리즘으로 여러분의 답변을 역사 속 인물 및 동시대 인물들과 비교해 주는 작은 독립 프로젝트입니다. 결과를 만드는 과정에는 AI가 사용되지 않습니다. 이 페이지는 현재 서비스가 실제로 어떤 정보를 수집·저장·공유하는지 쉬운 말로 설명합니다.`,
      `이 방침에 대한 문의나 개인정보 관련 요청: ${CONTACT_EMAIL}`,
    ],
    sections: [
      {
        heading: "계정 없이 설문 이용하기",
        paragraphs: [
          "계정을 만들거나 로그인하지 않고도 설문에 참여하고 결과를 볼 수 있습니다. 진행 중인 답변은 여러분의 브라우저에만 저장되므로, 페이지를 벗어났다가 다시 돌아와도 진행 상황이 남아 있습니다. 설문을 진행하는 동안에는 어떤 정보도 저희 서버로 전송되지 않습니다.",
          "완료된 결과는 전적으로 링크(답변을 인코딩한 토큰이 담긴 URL) 안에 존재합니다. The Great Inside는 페이지를 불러올 때마다 이 토큰으로 결과를 다시 계산할 뿐, 익명 결과를 서버에 별도로 저장해 두지 않습니다. 이 링크를 가진 사람은 누구나 해당 결과를 볼 수 있으므로, 낯선 사람에게 보이고 싶지 않은 링크를 다루듯 취급해 주세요 — 결과 페이지의 공유 버튼 옆에도 같은 안내가 표시됩니다.",
        ],
      },
      {
        heading: "Google 로그인(선택 사항)",
        paragraphs: [
          `로그인은 전적으로 선택 사항이며, 로그인하면 결과를 계정에 저장해 링크 없이도 나중에 다시 찾아볼 수 있게 됩니다. 저희는 인증 제공업체인 Supabase를 통해 Google 로그인을 사용하며, 신원 확인에 필요한 최소한의 정보(openid, email, profile 범위)만 요청합니다. Gmail, Google 드라이브, 연락처, 캘린더 등 신원 확인 이상의 접근 권한은 요청하지 않습니다.`,
          "로그인하면 The Great Inside가 아니라 Supabase가 Google이 로그인 과정에서 제공하는 기본 프로필 정보를 전달받아 보관합니다 — 이는 Google 로그인을 사용하는 앱의 일반적인 방식입니다. The Great Inside 자체 데이터베이스에는 여러분의 이름, 이메일 주소, 프로필 사진이 저장되지 않습니다. 저희가 저장하는 것은 Supabase가 발급한 내부 계정 식별자뿐이며, 이는 저장된 결과를 계정과 연결하는 용도로만 사용됩니다.",
        ],
      },
      {
        heading: "결과를 저장하면 저장되는 정보",
        paragraphs: [
          "로그인 후 결과를 저장하면 데이터베이스에는 다음이 저장됩니다: 내부 계정 식별자(이메일이나 이름이 아님), 결과 링크에 사용된 것과 동일한 결과 토큰, 설문을 완료한 날짜와 시간, 이미 화면에서 보신 특성 점수·비교·매칭 결과를 그대로 얼려둔 스냅샷(추후 매칭 방식을 개선하더라도 당시 결과가 정확하게 유지되도록), 그리고 어떤 버전의 설문·채점 방식으로 만들어진 결과인지 알 수 있는 버전 정보입니다.",
          "이 데이터는 계정 소유자만 접근할 수 있도록 데이터베이스 자체에 적용된 접근 규칙으로 보호됩니다 — 애플리케이션 코드뿐 아니라 데이터베이스 계층에서도 강제됩니다.",
          "저희는 이 데이터를 광고주나 데이터 브로커에게 판매·대여·공유하지 않습니다. The Great Inside는 현재 어떠한 분석 도구, 광고 네트워크, 행동 프로파일링 제3자도 사용하지 않습니다.",
        ],
      },
      {
        heading: "딥 인사이드 구매",
        paragraphs: [
          "딥 인사이드는 선택 사항인 1회 결제 유료 기능입니다(US$6.99, 구독 아님, 반복 결제 없음) — 여러분 자신의 결과를 더 깊이 분석해 보여줍니다. 구매하실 경우 결제는 전적으로 저희 결제 대행업체인 Stripe가 처리하며, The Great Inside는 카드 번호, 유효기간, CVC 등 카드 결제 정보를 전혀 확인하거나 저장하지 않습니다.",
          "저희 데이터베이스에 저장되는 것은 최소한의 구매 기록뿐입니다: 내부 계정 식별자, Stripe 자체의 결제 세션·결제 식별자(카드 정보 아님), 결제 금액과 통화, 구매 상태(완료·환불 등)로, 계정이 존재하는 동안 보관되며 이는 (다른 기기에서 로그인해도 딥 인사이드 잠금이 유지되도록 하는) 권한 관리 목적과 (결제 문의 시 확인할 수 있도록 하는) 고객 지원 목적을 위한 것입니다. 또한 별도로, 딥 인사이드 안내를 본 사람 수나 결제를 시작한 횟수 같은 소수의 익명 이용 통계도 기록합니다 — 여기에는 결제 정보가 포함되지 않으며 광고주와 공유되지 않습니다.",
          "계정에 딥 인사이드 접근 권한이 활성화되어 있는지는 항상 저희 서버와 데이터베이스가 판단하며, 브라우저에만 저장된 정보로 결정되지 않습니다.",
        ],
      },
      {
        heading: "내 정보 삭제하기",
        paragraphs: [
          "계정 페이지에서 언제든지 계정에 저장된 모든 결과를 영구적으로 삭제할 수 있습니다 — 일시적으로 숨기는 것이 아니라 실제로 즉시 삭제됩니다.",
          `로그인 기록 자체(인증 제공업체인 Supabase가 로그인 시 여러분을 식별하기 위해 보관하는 식별 정보)나 위에서 설명한 구매·권한 기록을 삭제하는 완전 자동화된 방법은 아직 제공하지 않습니다. 이것까지 삭제를 원하시면 ${CONTACT_EMAIL}로 이메일을 보내주시면 수동으로 처리해 드립니다. 또한 Google 계정의 타사 앱 접근 권한 설정에서 언제든 The Great Inside의 접근 권한을 철회하여 이후 로그인을 막을 수 있습니다.`,
        ],
      },
      {
        heading: "쿠키 및 로컬 저장소",
        paragraphs: [
          "The Great Inside는 소수의 쿠키와 브라우저 저장 항목을 사용하며, 광고나 사이트 간 추적 목적은 전혀 없습니다:",
          "언어 설정(한국어/영어)을 약 1년간 기억하는 쿠키. Google 로그인 과정에서만 사용되는 짧은 수명(몇 분)의 쿠키로, 로그인 후 원래 페이지로 돌아가기 위한 것입니다. 로그인하면 Supabase가 자체 세션 쿠키를 설정해 방문 사이에 로그인 상태를 유지합니다 — 이는 Supabase의 표준 인증 방식을 따릅니다.",
          "몇 가지 브라우저 저장 항목(쿠키 아님)은 진행 중인 설문 답변, 마지막으로 본 결과의 토큰, 이 브라우저에서 완료한 결과 목록(로그인 시 저장 여부를 물어보기 위한 짧은 대기열)을 담고 있습니다. 이 정보들은 기기에만 남아 있으며, 결과를 실제로 완료하거나 저장할 때를 제외하고는 어떤 서버로도 전송되지 않습니다.",
        ],
      },
      {
        heading: "이 사이트가 연동하는 다른 서비스",
        paragraphs: [
          "Supabase는 데이터베이스와 로그인을 처리합니다. Vercel은 웹사이트 자체를 호스팅합니다. Google은 선택적 로그인을 제공합니다. Stripe는 선택 사항인 딥 인사이드 구매의 결제를 처리합니다 — 여러분이 Stripe에 직접 제공하는 결제 정보에는 Stripe 자체의 개인정보 처리 방식이 적용됩니다.",
          "Wikimedia Commons: 현재 사이트에서 사용 중인 유일한 인물 사진(레오나르도 다빈치)은 해당 페이지를 볼 때 Wikimedia Commons에서 직접 불러옵니다 — 이때 브라우저가 그 이미지를 요청하기 위해 Wikimedia에 직접 접속하며, 이는 Wikimedia 자체의 개인정보 처리 방식을 따릅니다.",
          "일부 인물 프로필에는 참고용으로 위키백과·위키데이터 링크가 있습니다. 이 링크는 클릭했을 때만 로드됩니다.",
        ],
      },
      {
        heading: "아동 관련 안내",
        paragraphs: [
          "The Great Inside는 아동을 대상으로 하지 않으며, 만 13세 미만 아동의 정보를 고의로 수집하지 않습니다.",
        ],
      },
      {
        heading: "보안",
        paragraphs: [
          "저희는 위에서 설명한 제한된 정보를 보호하기 위해 이용 서비스 제공업체의 표준 보안 관행(암호화된 연결, 제공업체가 관리하는 인증, 데이터베이스 수준의 접근 제어)에 의존합니다. 어떤 온라인 서비스도 완전한 보안을 보장할 수 없으며, 저희도 이를 약속드릴 수는 없습니다.",
        ],
      },
      {
        heading: "이 방침의 변경",
        paragraphs: ["사이트가 변경됨에 따라 이 방침도 업데이트될 수 있으며, 그때마다 위의 '최종 업데이트' 날짜를 갱신합니다."],
      },
      {
        heading: "문의",
        paragraphs: [`문의사항, 데이터 관련 요청, 그 밖의 모든 문의: ${CONTACT_EMAIL}`],
      },
    ],
  },
};

export const TERMS_OF_SERVICE: Record<"en-US" | "ko-KR", LegalDocument> = {
  "en-US": {
    title: "Terms of Service",
    lastUpdated: "Last updated: August 21, 2026",
    intro: [
      "By using The Great Inside, you agree to these terms. If you don't agree, please don't use the site.",
    ],
    sections: [
      {
        heading: "What The Great Inside is",
        paragraphs: [
          `The Great Inside is an entertainment and self-reflection tool. You answer a quiz, and a deterministic algorithm — no generative AI in this path — compares your answers to a curated set of historical and contemporary people, producing a "Greatness Potential" score, trait comparisons, and match suggestions.`,
        ],
      },
      {
        heading: "Not a factual or scientific claim",
        paragraphs: [
          `Results are an interpretive, entertainment-oriented pattern comparison — not a scientific, psychological, or historical assessment, and not a claim that any comparison is objectively true. A "match" with a historical figure reflects similarity in a self-reported trait model, not an endorsement, an equivalence, or a factual statement about you or about that person. Historical figures are represented using publicly available biographical information, interpreted by us; we don't claim these interpretations are authoritative.`,
        ],
      },
      {
        heading: "Accounts",
        paragraphs: [
          "Creating an account is optional and requires signing in with Google. You're responsible for the Google account you use to sign in. You may delete your saved results at any time from your Account page — see our Privacy Policy for details on data deletion.",
        ],
      },
      {
        heading: "Sharing results",
        paragraphs: [
          "Any result or comparison you generate can be viewed by anyone who has the link, whether or not you intentionally share it further. You're responsible for who you share your result links with.",
        ],
      },
      {
        heading: "Deep Inside (paid feature)",
        paragraphs: [
          `Deep Inside is an optional, one-time purchase (US$6.99 at time of writing) — not a subscription, and never a recurring charge. It grants your account a lifetime entitlement to Deep Inside's expanded, still fully deterministic breakdown of your results, restored automatically whenever you sign back in, on this result and any future one. Purchases are processed by Stripe; The Great Inside does not handle or store your card details.`,
          `Access is decided by our server based on your account's recorded purchase, never by anything a browser alone can claim. If you believe a payment or your access is wrong, contact ${CONTACT_EMAIL} and we'll look into it — we don't commit to a specific refund policy here beyond that.`,
          "Like the rest of the site (see \"Availability\" below), Deep Inside's specific sections and presentation may change over time; we aim to keep already-purchased access working, but can't guarantee every future addition to Deep Inside stays identical to what existed when you purchased it.",
        ],
      },
      {
        heading: "Availability",
        paragraphs: [
          "The Great Inside is provided on an as-available basis. We may change, suspend, or discontinue any part of the site — including specific features, the matching algorithm, or the dataset of people — at any time. We do our best to keep saved results readable even after such changes, but we can't guarantee every past result stays available forever.",
        ],
      },
      {
        heading: "Content and data compilation",
        paragraphs: [
          "The site's design, code, and the specific compilation, scoring methodology, and presentation of trait data are owned by The Great Inside. Biographical facts about historical and public figures are drawn from publicly available sources and are not owned by us; where we use specific third-party material (such as a Wikimedia Commons image), it's used under its own stated license and credited on the page where it appears.",
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "Don't use The Great Inside to harass, defame, or make false factual claims about real people using content generated by the site. Don't attempt to interfere with, maliciously reverse-engineer, or abuse the service — including automated scraping at a scale that degrades the site for others.",
        ],
      },
      {
        heading: "Third-party links and materials",
        paragraphs: [
          "The site links to, and on some profile pages embeds, material from third parties (Wikipedia, Wikidata, Wikimedia Commons). We don't control and aren't responsible for third-party content, sites, or their availability.",
        ],
      },
      {
        heading: "Disclaimer of warranties",
        paragraphs: [
          `The Great Inside is provided "as is," without warranties of any kind, express or implied, including that it will be error-free, uninterrupted, or fit for any particular purpose.`,
        ],
      },
      {
        heading: "Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, The Great Inside is not liable for any indirect, incidental, or consequential damages arising from your use of the site. Nothing here limits liability where the law doesn't allow it to be limited.",
        ],
      },
      {
        heading: "Changes to these terms",
        paragraphs: [
          `We may update these terms as the site changes. We'll update the "Last updated" date above when we do.`,
        ],
      },
      {
        heading: "Contact",
        paragraphs: [`Questions about these terms: ${CONTACT_EMAIL}`],
      },
    ],
  },
  "ko-KR": {
    title: "이용약관",
    lastUpdated: "최종 업데이트: 2026년 8월 21일",
    intro: ["The Great Inside를 이용하시면 이 약관에 동의하는 것으로 간주됩니다. 동의하지 않으시면 사이트를 이용하지 말아 주세요."],
    sections: [
      {
        heading: "The Great Inside란",
        paragraphs: [
          `The Great Inside는 오락 및 자기 성찰을 위한 도구입니다. 설문에 답하면 결정론적 알고리즘(이 과정에는 생성형 AI가 사용되지 않습니다)이 여러분의 답변을 엄선된 역사 속·동시대 인물들과 비교하여 "Greatness Potential" 점수, 특성 비교, 매칭 결과를 만들어냅니다.`,
        ],
      },
      {
        heading: "사실적·과학적 주장이 아닙니다",
        paragraphs: [
          "결과는 해석적이고 오락적인 성격의 패턴 비교이며, 과학적·심리학적·역사적 평가가 아니고 어떤 비교도 객관적 사실이라는 주장이 아닙니다. 역사 속 인물과의 '매칭'은 자기보고식 특성 모델상의 유사성을 나타낼 뿐, 지지·동일시·여러분이나 해당 인물에 대한 사실 진술이 아닙니다. 역사 속 인물은 공개적으로 이용 가능한 전기적 정보를 저희가 해석하여 표현한 것이며, 이러한 해석이 권위 있는 것이라 주장하지 않습니다.",
        ],
      },
      {
        heading: "계정",
        paragraphs: [
          "계정 생성은 선택 사항이며 Google 로그인이 필요합니다. 로그인에 사용하는 Google 계정에 대한 책임은 이용자 본인에게 있습니다. 계정 페이지에서 언제든지 저장된 결과를 삭제할 수 있습니다 — 데이터 삭제에 대한 자세한 내용은 개인정보처리방침을 참고해 주세요.",
        ],
      },
      {
        heading: "결과 공유",
        paragraphs: [
          "생성한 결과나 비교 링크는 의도적으로 공유했는지 여부와 관계없이 그 링크를 가진 사람이라면 누구나 볼 수 있습니다. 결과 링크를 누구와 공유할지는 이용자 본인의 책임입니다.",
        ],
      },
      {
        heading: "딥 인사이드(유료 기능)",
        paragraphs: [
          "딥 인사이드는 선택 사항인 1회 결제 상품입니다(작성 시점 기준 US$6.99) — 구독이 아니며 반복 결제가 발생하지 않습니다. 구매하시면 계정에 딥 인사이드의 확장된, 여전히 완전히 결정론적인 결과 분석에 대한 평생 이용 권한이 부여되며, 이 결과와 앞으로의 결과 모두에 대해 다시 로그인할 때마다 자동으로 복원됩니다. 결제는 Stripe가 처리하며, The Great Inside는 카드 정보를 다루거나 저장하지 않습니다.",
          `이용 권한이 있는지는 계정에 기록된 구매 내역을 바탕으로 저희 서버가 판단하며, 브라우저만으로 주장할 수 있는 것이 아닙니다. 결제나 이용 권한에 문제가 있다고 생각되시면 ${CONTACT_EMAIL}로 문의해 주시면 확인해 드립니다 — 다만 이 조항이 특정 환불 정책을 약속하는 것은 아닙니다.`,
          "사이트의 다른 부분과 마찬가지로(아래 '서비스 제공' 참고), 딥 인사이드의 구체적인 구성이나 표현 방식은 시간이 지나며 변경될 수 있습니다. 이미 구매한 이용 권한이 계속 작동하도록 노력하지만, 구매 당시와 딥 인사이드의 향후 모든 추가 내용이 동일하게 유지된다고 보장할 수는 없습니다.",
        ],
      },
      {
        heading: "서비스 제공",
        paragraphs: [
          "The Great Inside는 있는 그대로(as-available) 제공됩니다. 저희는 특정 기능, 매칭 알고리즘, 인물 데이터셋을 포함해 사이트의 어느 부분이든 언제든지 변경, 중단, 또는 종료할 수 있습니다. 그런 변경 이후에도 저장된 결과를 계속 볼 수 있도록 최선을 다하지만, 과거의 모든 결과가 영구히 유지된다고 보장할 수는 없습니다.",
        ],
      },
      {
        heading: "콘텐츠 및 데이터 구성",
        paragraphs: [
          "사이트의 디자인, 코드, 그리고 특성 데이터의 구체적인 구성·채점 방식·표현 방식은 The Great Inside의 소유입니다. 역사 속 인물 및 공인에 대한 전기적 사실은 공개적으로 이용 가능한 출처에서 가져온 것으로 저희 소유가 아니며, 특정 제3자 자료(예: Wikimedia Commons 이미지)를 사용하는 경우 해당 자료의 라이선스에 따라 사용하고 표시된 페이지에 출처를 밝힙니다.",
        ],
      },
      {
        heading: "이용 수칙",
        paragraphs: [
          "사이트가 생성한 콘텐츠를 이용해 실존 인물을 괴롭히거나, 명예를 훼손하거나, 허위 사실을 주장하는 데 사용하지 말아 주세요. 서비스를 방해하거나, 악의적으로 리버스 엔지니어링하거나, 다른 이용자에게 지장을 줄 정도로 대규모 자동 스크래핑을 하는 등 서비스를 오·남용하지 말아 주세요.",
        ],
      },
      {
        heading: "제3자 링크 및 자료",
        paragraphs: [
          "사이트는 제3자(위키백과, 위키데이터, Wikimedia Commons)의 자료를 링크하며, 일부 프로필 페이지에는 이를 직접 표시합니다. 저희는 제3자 콘텐츠·사이트나 그 이용 가능 여부를 통제하지 않으며 책임지지 않습니다.",
        ],
      },
      {
        heading: "보증의 부인",
        paragraphs: [
          "The Great Inside는 '있는 그대로' 제공되며, 오류가 없거나 중단되지 않거나 특정 목적에 적합하다는 것을 포함해 명시적이든 묵시적이든 어떠한 종류의 보증도 하지 않습니다.",
        ],
      },
      {
        heading: "책임의 제한",
        paragraphs: [
          "법이 허용하는 최대 범위 내에서, The Great Inside는 사이트 이용으로 발생하는 간접적·부수적·결과적 손해에 대해 책임지지 않습니다. 법이 책임 제한을 허용하지 않는 경우 이 조항은 그 범위를 제한하지 않습니다.",
        ],
      },
      {
        heading: "약관의 변경",
        paragraphs: ["사이트가 변경됨에 따라 이 약관도 업데이트될 수 있으며, 그때마다 위의 '최종 업데이트' 날짜를 갱신합니다."],
      },
      {
        heading: "문의",
        paragraphs: [`이 약관에 대한 문의: ${CONTACT_EMAIL}`],
      },
    ],
  },
};
