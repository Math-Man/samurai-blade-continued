import { BladeScalingUpgrade } from "./BladeScalingUpgrade";
import { BladeScalingUpgradeType } from "./BladeScalingUpgradeType";

export const BladeScalingMapDamage = new Map<number, BladeScalingUpgrade>([
  [50, new BladeScalingUpgrade(BladeScalingUpgradeType.DAMAGE, 7)],
  [200, new BladeScalingUpgrade(BladeScalingUpgradeType.DAMAGE, 7)],
  [400, new BladeScalingUpgrade(BladeScalingUpgradeType.DAMAGE, 7)],
  [600, new BladeScalingUpgrade(BladeScalingUpgradeType.DAMAGE, 7)],
]);

export const BladeScalingMapRange = new Map<number, BladeScalingUpgrade>([
  [50, new BladeScalingUpgrade(BladeScalingUpgradeType.RANGE, 5)],
  [200, new BladeScalingUpgrade(BladeScalingUpgradeType.RANGE, 10)],
  [400, new BladeScalingUpgrade(BladeScalingUpgradeType.RANGE, 15)],
  [600, new BladeScalingUpgrade(BladeScalingUpgradeType.RANGE, 100)],
]);
