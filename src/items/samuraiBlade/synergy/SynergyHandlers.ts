/* Here is some really whacky combos that are going to take forever to implement:
 *
 * *Evil Eye:
 *  This one needs to spawn an entity, behaving similarly to evil eye, that swings the direction player is swinging.
 *  Needs reworking the state cache or a new entity that behaves differently that holds its own smaller state container.
 *
 * * Inner Eye , 20/20, quad shot, eye sore
 *   These are all super whack, need to multiply number of blade sprites or instances of damage somehow, deal damage for every blade instance etc.
 *
 * * Brimstone:
 *   I don't even know what to do with this one?
 */

import { CollectibleType, TearFlag } from "isaac-typescript-definitions";
import { getPlayerCollectibleCount, getRandomInt, hasFlag, playerHasCollectible } from "isaacscript-common";

export function getTotalRawDamageIncreaseFromItems(): number {
  return 0;
}

export function getTotalRawRangeIncreaseFromItems(): number {
  return 0;
}

export function getTotalRawFireRateIncreaseFromItems(): number {
  return 0;
}

export function getTotalRawShotSpeedIncreaseFromItems(): number {
  return 0;
}

export function getTotalRawLuckIncreaseFromItems(): number {
  return 0;
}

export function handleTearCountSynergies(player: EntityPlayer): number {
  const doubleShotCount = getPlayerCollectibleCount(player, CollectibleType.TWENTY_TWENTY);
  const tripleShotCount = getPlayerCollectibleCount(player, CollectibleType.INNER_EYE);
  const quadShotCount = getPlayerCollectibleCount(player, CollectibleType.MUTANT_SPIDER);
  const eyeSoreCount = getPlayerCollectibleCount(player, CollectibleType.EYE_SORE);

  return doubleShotCount + tripleShotCount * 2 + quadShotCount * 3 + eyeSoreCount * getRandomInt(0, 2);
}

export function hasSpectral(player: EntityPlayer): boolean {
  return hasFlag(player.TearFlags, TearFlag.SPECTRAL);
}

export function hasControlledTear(player: EntityPlayer): boolean {
  return playerHasCollectible(player, CollectibleType.LUDOVICO_TECHNIQUE);
  // TODO: Not done yet.
}
