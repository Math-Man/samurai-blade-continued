import { ModCallback } from "isaac-typescript-definitions";
import { DamageFlagsCustom } from "../enums/DamageFlagsCustom";
import { playerHasSamuraisBladeItem } from "../helpers/Helpers";
import { SamuraiBladeEntityDamage } from "../items/SamuraisBlade";

export function entityTakeDamageInit(mod: Mod): void {
  mod.AddCallback(ModCallback.ENTITY_TAKE_DMG, main);
}

function main(tookDamage: Entity, damageAmount: number, damageFlags: BitFlag, damageSource: EntityRef, damageCountdownFrames: number): boolean {
  const player = damageSource.Entity?.ToPlayer();
  if (player !== undefined && playerHasSamuraisBladeItem(player) && tookDamage.IsVulnerableEnemy() && damageFlags === DamageFlagsCustom.SB_BLADE_DAMAGE) {
    return SamuraiBladeEntityDamage(tookDamage, damageAmount, damageFlags, damageSource, damageCountdownFrames);
  }
  return true;
}
