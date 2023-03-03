import { clamp, game } from "isaacscript-common";
import { modStateData } from "../config/ModGameDataManager";
import { getPlayerStateData } from "../data/StateData";
import { Tuneable } from "../data/Tuneable";
import { getTotalIncreaseFromScaling } from "../items/samuraiBlade/scaling/BladeScalingManager";
import { BladeScalingUpgradeType } from "../items/samuraiBlade/scaling/BladeScalingUpgradeType";
import { Animations, isFinished, isPlaying } from "./AnimationHelpers";
import { flog } from "./DebugHelper";

const LOG_ID = "BladeHelpers";

const RANGE_CONVERSION_FACTOR = 40;
const CHARGE_VALUE_MODIFIER_FACTOR = 0.25;

export function getBladeSpriteScaleFromStats(player: EntityPlayer): Vector {
  const { charged } = getPlayerStateData(player);
  let scaleMultiplier = (1 + (player.TearRange / 40) * Tuneable.StatRange * 0.02) * Tuneable.StatRangeVisual;

  if (charged) {
    scaleMultiplier += scaleMultiplier * CHARGE_VALUE_MODIFIER_FACTOR;
  }

  scaleMultiplier *= modStateData.configAdjustmentRangeMultiplier;
  const scalingMultiplier = 1 + getTotalIncreaseFromScaling(player.ControllerIndex, BladeScalingUpgradeType.RANGE) / 100;
  scaleMultiplier *= scalingMultiplier;

  return Vector(scaleMultiplier, scaleMultiplier);
}

export function getBladePhysicalRange(player: EntityPlayer): float {
  const { charged } = getPlayerStateData(player);
  let calculatedRange = (Tuneable.BaseRange + (Math.pow(player.TearRange, 1.2) / RANGE_CONVERSION_FACTOR) * Tuneable.StatDamage) * Tuneable.StatRangePhysical;

  if (charged) {
    calculatedRange += calculatedRange * CHARGE_VALUE_MODIFIER_FACTOR;
  }

  calculatedRange *= modStateData.configAdjustmentRangeMultiplier;
  const scalingMultiplier = 1 + getTotalIncreaseFromScaling(player.ControllerIndex, BladeScalingUpgradeType.RANGE) / 100;
  calculatedRange *= scalingMultiplier;

  return calculatedRange;
}

export function getBladeDamage(player: EntityPlayer, targetingBoss: boolean): float {
  const { charged, hitChainProgression } = getPlayerStateData(player);
  const damage = Tuneable.Damage.get(hitChainProgression);
  if (damage === undefined) {
    error("Invalid hit chain progression value");
  }
  let damageVal = damage + player.Damage * 0.6;
  if (charged) {
    const totalChargedDamageIncreaseFromScaling = getTotalIncreaseFromScaling(player.ControllerIndex, BladeScalingUpgradeType.CHARGE_ATTACK_DAMAGE) / 100;
    damageVal *= 1 + CHARGE_VALUE_MODIFIER_FACTOR + totalChargedDamageIncreaseFromScaling + Tuneable.baseCriticalDamageMultiplier;
  }

  // Apply user modified adjustment
  damageVal *= modStateData.configAdjustmentDamageMultiplier;

  // Apply progression buffs
  const totalDamageIncreaseFromScaling = 1 + getTotalIncreaseFromScaling(player.ControllerIndex, BladeScalingUpgradeType.DAMAGE) / 100;
  damageVal *= totalDamageIncreaseFromScaling;

  if (targetingBoss) {
    const bossDamageIncreaseFromScaling = 1 + getTotalIncreaseFromScaling(player.ControllerIndex, BladeScalingUpgradeType.BOSS_DAMAGE) / 100;
    damageVal *= bossDamageIncreaseFromScaling;
  }
  return damageVal;
}

export function getBladeFireDelay(player: EntityPlayer): number {
  const fireDelay = Tuneable.FireDelayByProgressionStage.get(getPlayerStateData(player).hitChainProgression);
  if (fireDelay === undefined) {
    error("Invalid hit chain progression value");
  }
  const totalFireRateIncreaseFromScaling = clamp(0.5 + getTotalIncreaseFromScaling(player.ControllerIndex, BladeScalingUpgradeType.FIRE_RATE) / 100, 0, 10);
  const actualFireRate = clamp(fireDelay - (1 / (player.MaxFireDelay / totalFireRateIncreaseFromScaling) - 0.1) * 100, 4, 100);
  return actualFireRate;
}

export function getAndUpdatePlayerBladeFireTime(player: EntityPlayer): number {
  const { lastFireTime } = getPlayerStateData(player);
  getPlayerStateData(player).lastFireTime = game.GetFrameCount();
  return lastFireTime;
}

export function canPlayerFireBlade(player: EntityPlayer, bladeSprite: Sprite): boolean {
  if (getPlayerStateData(player).lastFireTime === -1) {
    getPlayerStateData(player).lastFireTime = 0;
  }

  const firingDelay = getBladeFireDelay(player);

  if (firingDelay === undefined) {
    error("Invalid hit chain progression value");
  }

  if (bladeSprite.IsFinished(bladeSprite.GetAnimation())) {
    flog("Animation finished so that the player can fire.", LOG_ID);
  }

  return math.abs(game.GetFrameCount() - getPlayerStateData(player).lastFireTime) >= firingDelay;
}

export function getChargeTime(player: EntityPlayer): number {
  const timeToGoIdle = getActualTimeToGoIdle(player);
  return clamp((3 * timeToGoIdle) / player.ShotSpeed, timeToGoIdle * 2, timeToGoIdle * 10);
}

export function getActualTimeToGoIdle(player: EntityPlayer): number {
  const fireDelay = getBladeFireDelay(player);
  return Tuneable.TimeToGoIdleFrames <= getBladeFireDelay(player) ? fireDelay + 5 : Tuneable.TimeToGoIdleFrames;
}

export function isPlayerInAttackState(bladeSprite: Sprite): boolean {
  return (
    isPlaying(bladeSprite, Animations.FIRST_SWING) ||
    isPlaying(bladeSprite, Animations.SECOND_SWING) ||
    isPlaying(bladeSprite, Animations.THIRD_SWING) ||
    isPlaying(bladeSprite, Animations.CHARGED_SWING)
  );
}

export function hasPlayerExitedAttackState(bladeSprite: Sprite): boolean {
  return (
    isFinished(bladeSprite, Animations.FIRST_SWING) ||
    isFinished(bladeSprite, Animations.SECOND_SWING) ||
    isFinished(bladeSprite, Animations.THIRD_SWING) ||
    isFinished(bladeSprite, Animations.CHARGED_SWING)
  );
}

export function getPlayerStateFromAnimation(bladeSprite: Sprite): int {
  switch (bladeSprite.GetAnimation()) {
    case Animations.FIRST_SWING:
    case Animations.CHARGED_SWING:
      return 1;
    case Animations.SECOND_SWING:
      return 2;
    case Animations.THIRD_SWING:
      return 3;
    default:
      error("SOMETHING WENT TERRIBLY WRONG OH GOD.");
  }
}

export function getNextPlayerStateFromAnimation(bladeSprite: Sprite): int {
  switch (bladeSprite.GetAnimation()) {
    case Animations.FIRST_SWING:
    case Animations.CHARGED_SWING:
      return 2;
    case Animations.SECOND_SWING:
      return 3;
    case Animations.THIRD_SWING:
      return 1;
    default:
      error("SOMETHING WENT TERRIBLY WRONG OH GOD.");
  }
}
