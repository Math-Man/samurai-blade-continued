import { getPlayers } from "isaacscript-common";
import { modStateData } from "../../../config/ModGameDataManager";
import { getTotalDamageDealt } from "../../../data/saveFile/SaveDataHandler";
import { playerHasSamuraisBladeItem } from "../../../helpers/Helpers";
import { Remap } from "../../../helpers/Maths";
import { getNextUpgradeType, getUpgradeLimits } from "../scaling/BladeScalingManager";
import { BladeScalingUpgradeType } from "../scaling/BladeScalingUpgradeType";
import { getHudSpritesSet } from "./HudManager";
import { HudPositionOptions } from "./HudPositionOptions";
import { HudProgressionIconFrames } from "./HudProgressionIconFrames";

const OFFSET_FOR_HUDS = 150;

export function renderHudForPlayers(): void {
  if (ModConfigMenu?.IsVisible) {
    return;
  }

  const realPlayers = getPlayers();
  let hudIndex = 0;
  for (const player of realPlayers) {
    if (playerHasSamuraisBladeItem(player)) {
      const spriteSet = getHudSpritesSet(player.ControllerIndex);
      const totalDamageDealt = getTotalDamageDealt(player.ControllerIndex);
      const limits = getUpgradeLimits(player.ControllerIndex);
      const limitLowRaw = limits[0];
      const limitHighRaw = limits[1];

      // @ts-ignore
      const totalDamageDealtZeroBased = totalDamageDealt - limitLowRaw;
      // @ts-ignore
      const limitHigh = limitHighRaw - limitLowRaw;

      const mappedProgressVarFrame = Remap(totalDamageDealtZeroBased, 0, limitHigh, 0, 40);

      const progressBarPosition = progressBarPositionFromConfig();

      spriteSet.progressBarSprite.Render(Vector(progressBarPosition.X + OFFSET_FOR_HUDS * hudIndex, progressBarPosition.Y));

      if (mappedProgressVarFrame < 0) {
        spriteSet.progressBarSprite.SetFrame(Math.ceil(30));
      } else {
        spriteSet.progressBarSprite.SetFrame(Math.ceil(mappedProgressVarFrame));
        spriteSet.iconSprite.SetFrame(mapUpgradeTypeToIconType(getNextUpgradeType(player.ControllerIndex).type));
        const iconPosition = iconPositionFromConfig();
        spriteSet.iconSprite.Render(Vector(iconPosition.X + OFFSET_FOR_HUDS * hudIndex, iconPosition.Y));
      }
      hudIndex++;
    }
  }
}

function progressBarPositionFromConfig(): Vector {
  const position = modStateData.configHudPosition;
  switch (position) {
    case HudPositionOptions.BELOW_HEALTH_BAR:
      return Vector(55, 28);
    case HudPositionOptions.BELOW_STATS:
      return Vector(15, 168);
    case HudPositionOptions.UNDER_FOUND_HUD:
      return Vector(Isaac.GetScreenWidth() - 125, Isaac.GetScreenHeight() - 70);
    case HudPositionOptions.ABOVE_SCORE:
      return Vector(Isaac.GetScreenWidth() / 2 - 40, 0);
  }
  return Vector(55, 28);
}

function iconPositionFromConfig(): Vector {
  const position = modStateData.configHudPosition;
  switch (position) {
    case HudPositionOptions.BELOW_HEALTH_BAR:
      return Vector(160, 48);
    case HudPositionOptions.BELOW_STATS:
      return Vector(120, 188);
    case HudPositionOptions.UNDER_FOUND_HUD:
      return Vector(Isaac.GetScreenWidth() - 20, Isaac.GetScreenHeight() - 50);
    case HudPositionOptions.ABOVE_SCORE:
      return Vector(Isaac.GetScreenWidth() / 2 + 65, 20);
  }
  return Vector(55, 28);
}

function mapUpgradeTypeToIconType(upgrade: BladeScalingUpgradeType): HudProgressionIconFrames {
  switch (upgrade) {
    case BladeScalingUpgradeType.DAMAGE:
      return HudProgressionIconFrames.DAMAGE;
    case BladeScalingUpgradeType.CHARGE_ATTACK_DAMAGE:
      return HudProgressionIconFrames.CHARGED_DAMAGE;
    case BladeScalingUpgradeType.RANGE:
      return HudProgressionIconFrames.RANGE;
    case BladeScalingUpgradeType.FIRE_RATE:
      return HudProgressionIconFrames.FIRE_RATE;
    case BladeScalingUpgradeType.BOSS_DAMAGE:
      return HudProgressionIconFrames.BOSS_DAMAGE;
    default:
      return HudProgressionIconFrames.DAMAGE;
  }
}
