export enum HudPositionOptions {
  BELOW_HEALTH_BAR,
  BELOW_STATS,
  UNDER_FOUND_HUD,
  ABOVE_SCORE,
}

export function HudPositionOptionsAsString(option: HudPositionOptions): string {
  switch (option) {
    case HudPositionOptions.BELOW_HEALTH_BAR:
      return "Under Health Bar";
    case HudPositionOptions.BELOW_STATS:
      return "Under Extra-Hud Stats";
    case HudPositionOptions.UNDER_FOUND_HUD:
      return "Under the found hud";
    case HudPositionOptions.ABOVE_SCORE:
      return "Above Score/Time";
  }
}
