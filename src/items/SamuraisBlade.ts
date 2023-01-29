import { CacheFlag } from "isaac-typescript-definitions";
import { getPlayers } from "isaacscript-common";
import { flushAllStateData, getPlayerStateData } from "../data/StateData";
import { flog } from "../helpers/DebugHelper";
import { playerHasSamuraisBladeItem } from "../helpers/Helpers";
import { applyCoolCostume } from "./samuraiBlade/onCache/CostumeApplier";
import { motivatePlayer } from "./samuraiBlade/onCache/Motivate";
import { playerHitSound } from "./samuraiBlade/onDealingDamage/HitSound";
import { spawnGore } from "./samuraiBlade/onDealingDamage/SpawnGore";
import { printDebugText } from "./samuraiBlade/rendering/DebugText";
import { renderBlades } from "./samuraiBlade/rendering/RenderBlade";
import { reloadCacheWithExistingItemSynergies } from "./samuraiBlade/synergy/SynergyCache";
import { updateBladeBehavior } from "./samuraiBlade/update/BladeBehavior";
import { setTearToBlade } from "./samuraiBlade/update/PlayerSpawnedTearUpdate";

const LOG_ID = "SamuraisBlade";

export function SamuraiBladePostUpdate(): void {
  updateBladeBehavior();
}

export function SamuraiBladePostRender(): void {
  printDebugText();
  renderBlades();
}

export function SamuraiBladePostRenderPlayer(): void {}

export function SamuraiBladePostRenderPickup(): void {}

export function SamuraiBladePostNewRoom(): void {
  const realPlayers = getPlayers();
  for (const player of realPlayers) {
    if (playerHasSamuraisBladeItem(player)) {
      getPlayerStateData(player).lastFireTime = 0;
    }
  }
}

export function SamuraiBladePostGameStarted(): void {
  flushAllStateData();
  reloadCacheWithExistingItemSynergies();

  flog("Resetting all states and synergy caches", LOG_ID);
}

export function SamuraiBladeEntityDamage(tookDamage: Entity, damageAmount: number, damageFlags: BitFlag, damageSource: EntityRef, damageCountdownFrames: number): boolean {
  spawnGore(tookDamage, damageAmount, damageFlags, damageSource, damageCountdownFrames);
  playerHitSound(tookDamage, damageAmount, damageFlags, damageSource, damageCountdownFrames);
  return true;
}

export function SamuraiBladeEvalCache(player: EntityPlayer, cacheFlag: CacheFlag): void {
  motivatePlayer(player, cacheFlag);
}

export function SamuraiBladePostTearUpdate(tear: EntityTear): void {
  const realPlayers = getPlayers();
  for (const player of realPlayers) {
    if (playerHasSamuraisBladeItem(player)) {
      setTearToBlade(tear);
    }
  }
}

export function SamuraiBladePostPickup(player: EntityPlayer): void {
  flog("Item picked up!", LOG_ID);
  applyCoolCostume(player);
}
