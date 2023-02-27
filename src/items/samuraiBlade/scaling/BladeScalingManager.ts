import { getTotalDamageDealt } from "../../../data/saveFile/SaveDataHandler";
import { BladeScalingMapDamage, BladeScalingMapRange } from "./BladeScalingMap";

export function getTotalDamageIncreaseFromScaling(controllerIndex: number): number {
  const totalDamageDealt = getTotalDamageDealt(controllerIndex);
  let totalBonus = 0;
  BladeScalingMapDamage.forEach((value, key) => {
    if (totalDamageDealt >= key) {
      totalBonus += value.value;
    }
  });
  return totalBonus;
}

export function getTotalRangeIncreaseFromScaling(controllerIndex: number): number {
  const totalDamageDealt = getTotalDamageDealt(controllerIndex);
  let totalBonus = 0;
  BladeScalingMapRange.forEach((value, key) => {
    if (totalDamageDealt >= key) {
      totalBonus += value.value;
    }
  });
  return totalBonus;
}
