import { BladeScalingUpgrade } from "./BladeScalingUpgrade";
import { BladeScalingUpgradeType } from "./BladeScalingUpgradeType";

export const DUMMY_UPGRADE = new BladeScalingUpgrade(BladeScalingUpgradeType.DUMMY, 0);

export const BladeScalingMap = new Map<number, BladeScalingUpgrade>([
  [50, new BladeScalingUpgrade(BladeScalingUpgradeType.DAMAGE, 7)],
  [75, new BladeScalingUpgrade(BladeScalingUpgradeType.RANGE, 5)],
  [200, new BladeScalingUpgrade(BladeScalingUpgradeType.RANGE, 10)],
  [250, new BladeScalingUpgrade(BladeScalingUpgradeType.DAMAGE, 8)],
  [350, new BladeScalingUpgrade(BladeScalingUpgradeType.RANGE, 15)],
  [400, new BladeScalingUpgrade(BladeScalingUpgradeType.DAMAGE, 9)],
  [550, new BladeScalingUpgrade(BladeScalingUpgradeType.DAMAGE, 10)],
  [600, new BladeScalingUpgrade(BladeScalingUpgradeType.RANGE, 20)],
]);
