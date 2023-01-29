import { getRandom } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { Tuneable } from "../../../data/Tuneable";

export function calculateCriticalChance(player: EntityPlayer): float {
  const { charged } = getPlayerStateData(player);

  if (charged) {
    return 0;
  }

  return Tuneable.baseCriticalChance + player.Luck * Tuneable.luckCriticalChanceEffect;
}

export function isHitCritical(player: EntityPlayer): boolean {
  return getRandom() > calculateCriticalChance(player) / 100;
}
