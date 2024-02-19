import {TearFlag, TearVariant} from "isaac-typescript-definitions";
import {logTearFlags} from "isaacscript-common";
import {getPlayerStateData} from "../../../data/StateData";
import {Tuneable} from "../../../data/Tuneable";
import {flog} from "../../../helpers/DebugHelper";

export function spawnSecretTear(player: EntityPlayer, targetEntity: Entity): void {
    const {hitChainProgression} = getPlayerStateData(player);
    const tearDamageMultiplier = Tuneable.TearDamageMult.get(hitChainProgression);

    const tear = player.FireTear(targetEntity.Position, Vector(0, 0), false, true, false, player, tearDamageMultiplier);
    tear.Visible = false;
    const originalTearHeight = tear.Height;
    tear.Height = -5;
    // tear.SetColor(Color(0, 0, 0, 0), 0, 999);

    // Piercing breaks the mechanism.
    if (tear.HasTearFlags(TearFlag.PIERCING)) {
        tear.TearFlags.band(TearFlag.PIERCING);
    }

    if (tear.HasTearFlags(TearFlag.STICKY)) {
        flog("Sticky tear flag detected, removing it", "SecretTearSpawner");
        tear.Visible = true;
        tear.Height = originalTearHeight + 1;
    } else {
        tear.ChangeVariant(TearVariant.SWORD_BEAM);
    }

    // Creates a chunky audio effect, spawns some nice particles on hit. Also works with things like crickets body, it looks like an intended effect.
    logTearFlags(tear.TearFlags);
}
