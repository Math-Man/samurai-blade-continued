import { TearFlag, TearVariant } from "isaac-typescript-definitions";
import { logTearFlags } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { getBladeDamage } from "../../../helpers/BladeHelpers";
import { flog } from "../../../helpers/DebugHelper";
import { Tuneable } from '../../../data/Tuneable';

export function spawnSecretTear(player: EntityPlayer, targetEntity: Entity): void {

  const { charged, hitChainProgression } = getPlayerStateData(player);
  const tearDamageMultiplier = Tuneable.TearDamageMult.get(hitChainProgression);
  
  const tear = player.FireTear(targetEntity.Position, Vector(0, 0), false, true, false, player, tearDamageMultiplier);
  tear.Height = 0;
  tear.Visible = false;
  tear.SetColor(Color(0, 0, 0, 0), 1, 999);

  // Piercing breaks the mechanism.
  if (tear.HasTearFlags(TearFlag.PIERCING)) {
    tear.TearFlags.band(TearFlag.PIERCING);
  }

  // Creates a chunky audio effect spawns some nice particles on hit. Also with things like crickets
  // body, it looks like an intended effect.
  tear.ChangeVariant(TearVariant.SWORD_BEAM);

  flog("Secret tear spawned ", "SecretTearSpawner");
  logTearFlags(tear.TearFlags);
}
