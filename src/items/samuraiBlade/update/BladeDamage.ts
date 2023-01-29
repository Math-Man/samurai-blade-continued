// Compiler messes up nil checks in reduce statements. This why we add this exclude.
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { EntityType, LineCheckMode, TearFlag } from "isaac-typescript-definitions";
import { clamp, game, getRandomInt, hasFlag } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { Tuneable } from "../../../data/Tuneable";
import { DamageFlagsCustom } from "../../../enums/DamageFlagsCustom";
import { getBladeDamage, getBladePhysicalRange } from "../../../helpers/BladeHelpers";
import { flog } from "../../../helpers/DebugHelper";
import { getHitTargetsInsideArea, isHitTargetInsideArea } from "../../../helpers/TargetFinding";
import { countOccurrencesOfState, registerDamageState } from "../onDealingDamage/DamageStateHandler";
import { spawnSecretTear } from "../onDealingDamage/SecretTearSpawner";
import { handleTearCountSynergies, hasSpectral } from "../synergy/SynergyHandlers";

const LOG_ID = "BladeDamage";

export function dealSamuraiBladeDamage(player: EntityPlayer, isCritical: boolean): void {
  const targets = getHitTargetsInsideArea(player, player.Position, player.GetAimDirection(), getBladePhysicalRange(player));
  for (const target of targets) {
    if (target.IsVulnerableEnemy() || target.Type === EntityType.FIREPLACE || target.Type === EntityType.BOMB) {
      const previousHitCountToSameEntity = countOccurrencesOfState(player, target);
      flog(`hit count ${previousHitCountToSameEntity}, UNDEFINED: ${countOccurrencesOfState(player, target) === undefined}`, LOG_ID);
      if (LOSCheck(player, target) && (countOccurrencesOfState(player, target) === undefined || countOccurrencesOfState(player, target) <= Tuneable.maxNumberOfHitsInOneSwingToSameEntity - 1)) {
        // Do the damage related things once.
        doEntityDamage(player, target, previousHitCountToSameEntity !== undefined ? previousHitCountToSameEntity : 0, 0, 1, 0, isCritical);
        spawnSecretTear(player, target);

        // Handle tear count synergies.
        const tearCountSynergy = getRandomInt(0, handleTearCountSynergies(player));
        flog(`Extra hits count : ${tearCountSynergy}`, LOG_ID);
        for (let i = 0; i < tearCountSynergy; i++) {
          doEntityDamage(player, target, previousHitCountToSameEntity !== undefined ? previousHitCountToSameEntity : 0, i + 1, clamp(1.2 / tearCountSynergy, 0, 1), 0.1, isCritical);
          spawnSecretTear(player, target);
        }
      }
      // Pushing shouldn't care about the damage state. It looks really awkward to have one enemy
      // getting pushed and others not.
      if (LOSCheck(player, target)) {
        pushEntityAway(player, target);
        registerDamageState(player, target);
      }
    }
  }
  doTileDamage(player);
}

export function doEntityDamage(player: EntityPlayer, entity: Entity, index: number, damageDelay: number, damageModifier: float, flatDamageIncrease: number, isCritical: boolean): void {
  const damageValue = (flatDamageIncrease + getBladeDamage(player) * damageModifier * Tuneable.DamageModifierForHittingSameEnemy ** index) * (isCritical ? Tuneable.baseCriticalDamageMultiplier : 1) + (entity.IsBoss() ? 3 : 0);
  entity.TakeDamage(damageValue, DamageFlagsCustom.SB_BLADE_DAMAGE, EntityRef(player), damageDelay);
}

export function pushEntityAway(player: EntityPlayer, entity: Entity): void {
  const diff = entity.Position.sub(player.Position).Normalized();
  if (getPlayerStateData(player).charged) {
    diff.Resize(2);
  }
  entity.Velocity = entity.Velocity.add(diff.Resized(Tuneable.PushMultiplier));
}

export function doTileDamage(player: EntityPlayer): void {
  const room = game.GetRoom();
  for (let i = 1; i < room.GetGridSize(); i++) {
    const gridEntity = room.GetGridEntity(i);
    if (gridEntity !== undefined && player.Position.Distance(gridEntity.Position) < getBladePhysicalRange(player) && isHitTargetInsideArea(player, player.Position, getPlayerStateData(player).activeAimDirection, gridEntity.Position)) {
      let gridDamage = 1;
      if (getPlayerStateData(player).charged) {
        gridDamage = 5;
      }
      room.DamageGrid(gridEntity.GetGridIndex(), gridDamage);
    }
  }
}

export function LOSCheck(player: EntityPlayer, target: Entity): boolean {
  if (shouldIgnoreLosChecks(player)) {
    return true;
  }

  if (IsLOSIgnoreType(target.Type)) {
    return true;
  }
  flog(`hit count ${game.GetRoom().CheckLine(player.Position, target.Position, LineCheckMode.ECONOMIC)[0]}`, LOG_ID);
  return hasSpectral(player) || game.GetRoom().CheckLine(player.Position, target.Position, LineCheckMode.ECONOMIC, 0, true, false)[0];
}

export function IsLOSIgnoreType(type: EntityType): boolean {
  switch (type) {
    case EntityType.WALL_CREEP:
    case EntityType.RAGE_CREEP:
    case EntityType.THE_THING:
      return true;
    default:
      return false;
  }
}

export function shouldIgnoreLosChecks(player: EntityPlayer): boolean {
  return hasFlag(player.TearFlags, TearFlag.SPECTRAL) || player.IsFlying();
}
