import { getTotalDamageDealt } from "../../../data/saveFile/SaveDataHandler";
import { BladeScalingMap, DUMMY_UPGRADE } from "./BladeScalingMap";
import { BladeScalingUpgrade } from "./BladeScalingUpgrade";
import { BladeScalingUpgradeType } from "./BladeScalingUpgradeType";

// TODO: Cache end value of this methods and invalidate them on reaching an upgrade point, or just calculate them every time not like a few additions and multiplications are going to slow down anything.

export function getTotalIncreaseFromScaling(controllerIndex: number, upgradeType: BladeScalingUpgradeType): number {
  const totalDamageDealt = getTotalDamageDealt(controllerIndex);
  let totalBonus = 0;
  BladeScalingMap.forEach((value, key) => {
    if (value.type === upgradeType) {
      if (totalDamageDealt >= key) {
        totalBonus += value.value;
      }
    }
  });
  return totalBonus;
}

export function getNextUpgradeType(controllerIndex: number): BladeScalingUpgrade {
  const totalDamageDealt = getTotalDamageDealt(controllerIndex);
  let nextUpgrade = DUMMY_UPGRADE;
  for (let [key, value] of BladeScalingMap.entries()) {
    if (totalDamageDealt < key) {
      nextUpgrade = value;
      break;
    }
  }
  return nextUpgrade;
}

/**
 * first index is lower , second index is higher
 * @param controllerIndex
 */
export function getUpgradeLimits(controllerIndex: number): number[] {
  const totalDamageDealt = getTotalDamageDealt(controllerIndex);
  let previous = 0;
  let next = 0;
  for (let [key, value] of BladeScalingMap.entries()) {
    if (totalDamageDealt < key) {
      next = key;
      break;
    }
    previous = key;
  }
  return [previous, next];
}
