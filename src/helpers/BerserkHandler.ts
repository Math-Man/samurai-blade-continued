import { getEffectsList } from "isaacscript-common";
import { flog } from "./DebugHelper";

export function isBerserk(player: EntityPlayer): boolean {
  return getEffectsList(player).map((value) => value.Item.Name === "#BERSERK_NAME").length > 0;
}

export function getTemporaryBerserkEffect(player: EntityPlayer): TemporaryEffect | undefined {
  return getEffectsList(player).find((value) => value.Item.Name === "#BERSERK_NAME");
}

export function extendBerserk(player: EntityPlayer): void {
  const berserkEffect = getEffectsList(player).find((value) => value.Item.Name === "#BERSERK_NAME");
  if (berserkEffect === undefined) {
    flog("Player is not berserk!");
    return;
  }
  player.GetEffects().AddCollectibleEffect(704, false, 0);
  player.GetEffects();
  // berserkEffect.Count += 1;
}
