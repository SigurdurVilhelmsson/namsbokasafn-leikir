export { ErrorBoundary, useErrorHandler } from './ErrorBoundary';
export { AchievementBadge } from './AchievementBadge';
export { AchievementNotificationPopup, AchievementNotificationsContainer } from './AchievementNotificationPopup';
export { AchievementsPanel, AchievementsButton } from './AchievementsPanel';

// AnimatedMolecule component - sub-components available via '@shared/components/AnimatedMolecule'
export { AnimatedMolecule, ELEMENT_VISUALS } from './AnimatedMolecule';

// HintSystem component - tiered progressive hint system
export { HintSystem, HintTier } from './HintSystem';

// InteractiveGraph component - reusable canvas-based graph
export { InteractiveGraph } from './InteractiveGraph';
export type {
  DataPoint,
  DataSeries,
  AxisConfig,
  MarkerConfig,
  RegionConfig,
  HorizontalLineConfig,
  VerticalLineConfig,
  InteractiveGraphProps
} from './InteractiveGraph';
