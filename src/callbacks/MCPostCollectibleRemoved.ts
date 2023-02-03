import { CollectibleType } from "isaac-typescript-definitions";
import { ModCallbackCustom, ModUpgraded } from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";
import { flog } from "../helpers/DebugHelper";

export function postCollectibleRemoved(mod: ModUpgraded): void {
  mod.AddCallbackCustom(ModCallbackCustom.POST_PLAYER_COLLECTIBLE_REMOVED, main, CollectibleTypeCustom.SB_SAMURAI_BLADE);
}

function main(player: EntityPlayer, collectibleType: CollectibleType) {
  flog(`Item is gone, this is so sad. so sad indeed... ${collectibleType} `);
}
