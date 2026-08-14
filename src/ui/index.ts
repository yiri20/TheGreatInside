/**
 * Design system public surface — design_system_v1.
 *
 * Consumers import from here, never from individual component files, so the
 * internal file layout can change without touching call sites.
 *
 * Styles are plain CSS and must be loaded once at the app root:
 *   import "@ui/styles/tokens.css";
 *   import "@ui/styles/components.css";
 */
export {
  Button,
  Card,
  Cluster,
  Display,
  Divider,
  Eyebrow,
  Grid,
  Heading,
  Numeric,
  Select,
  Stack,
  Text,
  TextField,
  VisuallyHidden,
} from "./components/primitives.js";

export type { SelectOption } from "./components/primitives.js";

export { IdentityHero, Rail } from "./components/layout.js";

export {
  ComparisonBar,
  ConfidenceIndicator,
  ImpactBadge,
  PersonCard,
  ScoreBar,
  TraitCard,
  TraitChip,
} from "./components/data.js";

export type { PersonCardProps } from "./components/data.js";

export { ChoiceGroup, LikertScale, QuizProgress } from "./components/quiz.js";
export type { ChoiceOptionView } from "./components/quiz.js";

export { ShareButton } from "./components/share.js";

export {
  ALL_IMPACTS,
  barWidth,
  clampScore,
  confidenceLevel,
  confidencePips,
  CONFIDENCE_BOUNDS,
  cx,
  formatLifespan,
  formatMatch,
  formatPotential,
  formatScore,
  gapGeometry,
  impactPresentation,
} from "./lib/display.js";

export type { ConfidenceLevel, ImpactPresentation } from "./lib/display.js";
