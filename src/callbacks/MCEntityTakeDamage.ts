import {ModCallback} from "isaac-typescript-definitions";
import {DamageFlagsCustom} from "../enums/DamageFlagsCustom";
import {playerHasSamuraisBladeItem} from "../helpers/Helpers";
import {SamuraiBladeEntityDamage} from "../items/SamuraisBlade";

export function entityTakeDamageInit(mod: Mod): void {
    mod.AddCallback(ModCallback.ENTITY_TAKE_DMG, entityTakeDamageMain);
}

function entityTakeDamageMain(
    tookDamage: Entity,
    damageAmount: number,
    damageFlags: BitFlag,
    damageSource: EntityRef,
    damageCountdownFrames: number,
): boolean | undefined {
    const player = damageSource.Entity?.ToPlayer();

    // flog(`Extending berserk! ${player} ${tookDamage.HasMortalDamage()}}`);
    // if (player) {
    //   extendBerserk(player);
    // }

    if (player !== undefined && playerHasSamuraisBladeItem(player) && tookDamage.IsVulnerableEnemy() && damageFlags === DamageFlagsCustom.SB_BLADE_DAMAGE) {
        SamuraiBladeEntityDamage(tookDamage, damageAmount, damageFlags, damageSource, damageCountdownFrames);
    }
    return undefined;
}
