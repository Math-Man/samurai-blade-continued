import { CollectibleType } from "isaac-typescript-definitions";
import { getPlayerCollectibleMap, getPlayers } from "isaacscript-common";

let synergyCache = new Map<number, Map<CollectibleType, number>>(); // player, <collectible, count of colectible>

export function incrementCacheSynergyItem(
  playerIndex: number,
  collectible: CollectibleType,
): void {
  const existingCacheValue = getPlayerCache(playerIndex).get(collectible);
  getPlayerCache(playerIndex).set(
    collectible,
    existingCacheValue === undefined ? 1 : existingCacheValue + 1,
  );
}

export function decrementCachedSynergyItem(
  playerIndex: number,
  collectible: CollectibleType,
): boolean {
  const existingCacheValue = getPlayerCache(playerIndex).get(collectible);
  if (existingCacheValue !== undefined) {
    if (existingCacheValue - 1 === 0) {
      synergyCache.delete(collectible);
    } else {
      getPlayerCache(playerIndex).set(collectible, existingCacheValue - 1);
    }
    return true;
  }
  return false;
}

export function getNumberOfCachedItem(
  playerIndex: number,
  collectible: CollectibleType,
): number {
  const count = getPlayerCache(playerIndex).get(collectible);
  return count !== undefined ? count : 0;
}

export function reloadCacheWithExistingItemSynergies(): void {
  const realPlayers = getPlayers();
  for (const player of realPlayers) {
    const playerItems = getPlayerCollectibleMap(player);
    synergyCache.set(player.Index, new Map(playerItems));
  }
}

export function clearAllCachedSynergies(): void {
  synergyCache = new Map<number, Map<CollectibleType, number>>();
}

export function getPlayerCache(
  playerIndex: number,
): Map<CollectibleType, number> {
  const possibleCache = synergyCache.get(playerIndex);
  if (possibleCache !== undefined) {
    return possibleCache;
  }

  // No cache exists yet create it.
  const newCache = new Map<CollectibleType, number>();
  synergyCache.set(playerIndex, newCache);
  return newCache;
}
