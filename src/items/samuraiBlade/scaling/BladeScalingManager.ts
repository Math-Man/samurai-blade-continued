import { getTotalDamageDealt } from "../../../data/saveFile/SaveDataHandler";
import { infoLog } from "../../../helpers/DebugHelper";
import { BladeScalingMap, DUMMY_UPGRADE } from "./BladeScalingMap";
import { BladeScalingUpgrade } from "./BladeScalingUpgrade";
import { BladeScalingUpgradeType } from "./BladeScalingUpgradeType";

// TODO: Cache end value of these methods and invalidate them on reaching an upgrade point, or just calculate them every time not like a few additions and multiplications are going to slow down anything.
export function getTotalDamageIncreaseFromScaling(controllerIndex: number): number {
  const totalDamageDealt = getTotalDamageDealt(controllerIndex);
  let totalBonus = 0;
  BladeScalingMap.forEach((value, key) => {
    if (value.type === BladeScalingUpgradeType.DAMAGE) {
      if (totalDamageDealt >= key) {
        totalBonus += value.value;
      }
    }
  });

  const lim = getUpgradeLimits(controllerIndex);
  infoLog(`Upgrade checks: ${totalDamageDealt}, ${getNextUpgradeTypes(controllerIndex)}, ASDFS  DFGSSDF ${lim[0]}, ${lim[1]}`);

  return totalBonus;
}

export function getTotalRangeIncreaseFromScaling(controllerIndex: number): number {
  const totalDamageDealt = getTotalDamageDealt(controllerIndex);
  let totalBonus = 0;
  BladeScalingMap.forEach((value, key) => {
    if (value.type === BladeScalingUpgradeType.RANGE) {
      if (totalDamageDealt >= key) {
        totalBonus += value.value;
      }
    }
  });
  return totalBonus;
}

export function getNextUpgradeTypes(controllerIndex: number): BladeScalingUpgrade {
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
