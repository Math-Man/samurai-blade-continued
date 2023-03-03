import { TearFlag, TearVariant } from "isaac-typescript-definitions";
import { logTearFlags } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { Tuneable } from "../../../data/Tuneable";

export function spawnSecretTear(player: EntityPlayer, targetEntity: Entity): void {
  const { hitChainProgression } = getPlayerStateData(player);
  const tearDamageMultiplier = Tuneable.TearDamageMult.get(hitChainProgression);

  const tear = player.FireTear(targetEntity.Position, Vector(0, 0), false, true, false, player, tearDamageMultiplier);
  tear.Visible = false;
  tear.Height = -5;
  // tear.SetColor(Color(0, 0, 0, 0), 0, 999);

  // Piercing breaks the mechanism.
  if (tear.HasTearFlags(TearFlag.PIERCING)) {
    tear.TearFlags.band(TearFlag.PIERCING);
  }

  // Creates a chunky audio effect spawns some nice particles on hit. Also with things like crickets
  // body, it looks like an intended effect.
  tear.ChangeVariant(TearVariant.SWORD_BEAM);
  logTearFlags(tear.TearFlags);
}
