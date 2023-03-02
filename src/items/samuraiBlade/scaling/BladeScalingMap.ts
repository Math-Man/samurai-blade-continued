import { BladeScalingUpgrade } from "./BladeScalingUpgrade";
import { BladeScalingUpgradeType } from "./BladeScalingUpgradeType";

export const DUMMY_UPGRADE = new BladeScalingUpgrade(BladeScalingUpgradeType.DUMMY, 0);

export const BladeScalingMap = new Map<number, BladeScalingUpgrade>([
  [50, new BladeScalingUpgrade(BladeScalingUpgradeType.DAMAGE, 7)],
  [125, new BladeScalingUpgrade(BladeScalingUpgradeType.RANGE, 5)],
  [250, new BladeScalingUpgrade(BladeScalingUpgradeType.BOSS_DAMAGE, 5)],
  [400, new BladeScalingUpgrade(BladeScalingUpgradeType.FIRE_RATE, 10)],
  [550, new BladeScalingUpgrade(BladeScalingUpgradeType.CHARGE_ATTACK_DAMAGE, 10)],
  [700, new BladeScalingUpgrade(BladeScalingUpgradeType.RANGE, 15)],
  [800, new BladeScalingUpgrade(BladeScalingUpgradeType.BOSS_DAMAGE, 9)],
  [950, new BladeScalingUpgrade(BladeScalingUpgradeType.DAMAGE, 10)],
  [1200, new BladeScalingUpgrade(BladeScalingUpgradeType.RANGE, 20)],
  [1400, new BladeScalingUpgrade(BladeScalingUpgradeType.CHARGE_ATTACK_DAMAGE, 10)],
  [1400, new BladeScalingUpgrade(BladeScalingUpgradeType.FIRE_RATE, 10)],
]);
