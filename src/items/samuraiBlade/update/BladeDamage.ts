// Compiler messes up nil checks in reduce statements. This why we add this exclude.
/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { EntityType, LineCheckMode } from "isaac-typescript-definitions";
import { clamp, game, getRandomInt } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { Tuneable } from "../../../data/Tuneable";
import { DamageFlagsCustom } from "../../../enums/DamageFlagsCustom";
import { LineOfSightCheckBehaviour } from "../../../enums/LineOfSightCheckBehaviour";
import { getBladeDamage, getBladePhysicalRange } from "../../../helpers/BladeHelpers";
import { flog } from "../../../helpers/DebugHelper";
import { isHitTargetInsideArea } from "../../../helpers/TargetFinding";
import { countOccurrencesOfState, registerDamageState } from "../onDealingDamage/DamageStateHandler";
import { spawnSecretTear } from "../onDealingDamage/SecretTearSpawner";
import { handleTearCountSynergies, hasSpectral } from "../synergy/SynergyHandlers";
import {increaseDamageDealt} from "../../../data/saveFile/SaveDataHandler";
import {configDataObject} from "../../../data/saveFile/ConfigSaveDataHandler";

const LOG_ID = "BladeDamage";

export function dealSamuraiBladeDamage(player: EntityPlayer, isCritical: boolean, targets: Entity[]): void {
  for (const target of targets) {
    if (target.IsVulnerableEnemy() || target.Type === EntityType.FIREPLACE || target.Type === EntityType.BOMB || target.Type === EntityType.MOVABLE_TNT) {
      const previousHitCountToSameEntity = countOccurrencesOfState(player, target);
      flog(`hit count ${previousHitCountToSameEntity}, UNDEFINED: ${countOccurrencesOfState(player, target) === undefined}`, LOG_ID);
      if (
        LOSCheck(player, target) &&
        (countOccurrencesOfState(player, target) === undefined || countOccurrencesOfState(player, target) <= Tuneable.maxNumberOfHitsInOneSwingToSameEntity - 1)
      ) {
        // Do the damage related things once.
        doEntityDamage(player, target, previousHitCountToSameEntity !== undefined ? previousHitCountToSameEntity : 0, 0, 1, 0, isCritical);
        spawnSecretTear(player, target);

        // Handle tear count synergies.
        const tearCountSynergy = getRandomInt(0, handleTearCountSynergies(player));
        flog(`Extra hits count : ${tearCountSynergy}`, LOG_ID);
        for (let i = 0; i < tearCountSynergy; i++) {
          doEntityDamage(
            player,
            target,
            previousHitCountToSameEntity !== undefined ? previousHitCountToSameEntity : 0,
            i + 1,
            clamp(1.2 / tearCountSynergy, 0, 1),
            0.1,
            isCritical,
          );
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

export function doEntityDamage(
  player: EntityPlayer,
  entity: Entity,
  index: number,
  damageDelay: number,
  damageModifier: float,
  flatDamageIncrease: number,
  isCritical: boolean,
): void {
  const damageValue =
    flatDamageIncrease +
    getBladeDamage(player, entity.IsBoss()) * damageModifier * Tuneable.DamageModifierForHittingSameEnemy ** index +
    (entity.IsBoss() ? 3 : 0);
  entity.TakeDamage(damageValue, DamageFlagsCustom.SB_BLADE_DAMAGE, EntityRef(player), damageDelay);
  if (player) {
    increaseDamageDealt(player.ControllerIndex, damageValue);
  }
}

export function pushEntityAway(player: EntityPlayer, entity: Entity): void {
  const diff = entity.Position.sub(player.Position).Normalized();
  if (getPlayerStateData(player).charged) {
    diff.Resize(2);
  }

  let pushMultiplier = Tuneable.PushMultiplier * (entity.IsBoss() ? 0.75 : 1);
  if (Math.sign(diff.X) == Math.sign(entity.Velocity.X) && Math.sign(diff.Y) == Math.sign(entity.Velocity.Y)) {
    pushMultiplier *= -1;
  }

  entity.Velocity = entity.Velocity.add(diff.Resized(pushMultiplier));
}

export function doTileDamage(player: EntityPlayer): void {
  const room = game.GetRoom();
  for (let i = 1; i < room.GetGridSize(); i++) {
    const gridEntity = room.GetGridEntity(i);
    if (
      gridEntity !== undefined &&
      player.Position.Distance(gridEntity.Position) < getBladePhysicalRange(player) &&
      isHitTargetInsideArea(player, player.Position, getPlayerStateData(player).activeAimDirection, gridEntity.Position)
    ) {
      let gridDamage = 1;
      if (getPlayerStateData(player).charged) {
        gridDamage = 5;
      }
      room.DamageGrid(gridEntity.GetGridIndex(), gridDamage);
    }
  }
}

export function LOSCheck(player: EntityPlayer, target: Entity): boolean {
  if (configDataObject.persistent.configLineOfSightCheck === LineOfSightCheckBehaviour.IGNORED) {
    return true;
  }

  if (shouldIgnoreLosChecks(player)) {
    return true;
  }

  if (IsLOSIgnoreType(target)) {
    return true;
  }

  /* Soften up the LOS check: */
  /* Here is the mad science math:
   *  1. Check Line, if it hits, it hits, return true.
   *  2. If it doesn't hit do the following
   *  3. grab the hit position from the CheckLine method
   *  4. do a small 'in range' check from hit point to the target position
   *  5. if in range, return true
   *  6. If still not true try one last thing
   *  7. Since hit boxes are circles in Isaac, we can do basic line-casting on the surface of the circle around the coordinate edges
   *  8. Doing 4 of these should be enough.
   *  9. If any hits, return true.
   *  10. Last check is really expansive as it does multiple line casts. Might need a better custom solution later on.
   * */
  const lineCheckResult = game.GetRoom().CheckLine(player.Position, target.Position, LineCheckMode.PROJECTILE, 0, true, false);
  if (lineCheckResult[0]) {
    return true;
  } else if (configDataObject.persistent.configLineOfSightCheck === LineOfSightCheckBehaviour.SOFT) {
    const hitPosition = lineCheckResult[1];
    const distance = hitPosition.Distance(target.Position);
    const targetLOSSize = Tuneable.LOSCheckRadiusSoftness * target.Size;

    if (targetLOSSize * 2 + 28 >= distance) {
      return true;
    } else {
      if (
        game.GetRoom().CheckLine(player.Position, target.Position.add(Vector(targetLOSSize, 0)), LineCheckMode.PROJECTILE, 0, true, false)[0] ||
        game.GetRoom().CheckLine(player.Position, target.Position.add(Vector(-targetLOSSize, 0)), LineCheckMode.PROJECTILE, 0, true, false)[0] ||
        game.GetRoom().CheckLine(player.Position, target.Position.add(Vector(0, targetLOSSize)), LineCheckMode.PROJECTILE, 0, true, false)[0] ||
        game.GetRoom().CheckLine(player.Position, target.Position.add(Vector(0, -targetLOSSize)), LineCheckMode.PROJECTILE, 0, true, false)[0]
      ) {
        return true;
      }
    }
  }
  return false;
}

export function IsLOSIgnoreType(target: Entity): boolean {
  if (
    target.IsFlying() ||
    !(target.GridCollisionClass == 5 || target.GridCollisionClass == 6) // Ground or no-pits
  ) {
    return true;
  }

  switch (target.Type) {
    case EntityType.WALL_CREEP:
    case EntityType.RAGE_CREEP:
    case EntityType.THE_THING:
    case EntityType.HORF:
    case EntityType.SUB_HORF:
    case EntityType.NECRO:
      return true;
    default:
      return false;
  }
}

export function shouldIgnoreLosChecks(player: EntityPlayer): boolean {
  return hasSpectral(player) || player.IsFlying();
}
