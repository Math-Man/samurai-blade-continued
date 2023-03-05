import { getTotalDamageDealt } from "../../../data/saveFile/SaveDataHandler";
import { BladeScalingMap, DUMMY_UPGRADE } from "./BladeScalingMap";
import { BladeScalingUpgrade } from "./BladeScalingUpgrade";
import { BladeScalingUpgradeType } from "./BladeScalingUpgradeType";

//  O P T I M I Z E D
const scalingStateCache = new Map<number, Map<BladeScalingUpgradeType, CachePosition>>();

class CachePosition {
  public index: number;
  public value: number;

  constructor(index: number, value: number) {
    this.index = index;
    this.value = value;
  }
}

function getFromCache(controllerIndex: number, upgradeType: BladeScalingUpgradeType): CachePosition | undefined {
  let playerMap = scalingStateCache.get(controllerIndex);
  if (playerMap) {
    return playerMap.get(upgradeType);
  }
  return undefined;
}

function setCache(controllerIndex: number, upgradeType: BladeScalingUpgradeType, currentIndex: number, currentValue: number): CachePosition {
  let playerMap = scalingStateCache.get(controllerIndex);
  if (!playerMap) {
    playerMap = new Map<BladeScalingUpgradeType, CachePosition>();
    scalingStateCache.set(controllerIndex, playerMap);
  }
  const cachePosition = new CachePosition(currentIndex, currentValue);
  playerMap.set(upgradeType, cachePosition);
  return cachePosition;
}

const cachedScalingMap = Array.from(BladeScalingMap.entries());

export function getTotalIncreaseFromScaling(controllerIndex: number, upgradeType: BladeScalingUpgradeType): number {
  const totalDamageDealt = getTotalDamageDealt(controllerIndex);
  let totalBonus = 0;

  let scalingIndex = 0;
  const cachedValues = getFromCache(controllerIndex, upgradeType);
  if (cachedValues) {
    scalingIndex = cachedValues.index;
    totalBonus = cachedValues.value;
  }

  for (; scalingIndex < cachedScalingMap.length; scalingIndex++) {
    const rawEntry = cachedScalingMap[scalingIndex];

    if (rawEntry) {
      const [key, value] = rawEntry;

      if (value.type === upgradeType) {
        if (totalDamageDealt >= key) {
          totalBonus += value.value;
        } else {
          break;
        }
      }
    }
  }

  setCache(controllerIndex, upgradeType, scalingIndex, totalBonus);
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
