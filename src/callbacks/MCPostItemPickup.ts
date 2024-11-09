import {ItemType} from "isaac-typescript-definitions";
import {ModCallbackCustom, ModUpgraded, PickingUpItem,} from "isaacscript-common";
import {CollectibleTypeCustom} from "../enums/CollectibleTypeCustom";
import {flog} from "../helpers/DebugHelper";
import {SamuraiBladePostPickup} from "../items/SamuraisBlade";

export function postItemPickupInit(mod: ModUpgraded): void {
    mod.AddCallbackCustom(
        ModCallbackCustom.POST_ITEM_PICKUP,
        main,
        ItemType.PASSIVE,
        CollectibleTypeCustom.SB_SAMURAI_BLADE,
    );
}

function main(player: EntityPlayer, pickingUpItem: PickingUpItem) {
    flog("Item:" + pickingUpItem, "CALLBACK");
    SamuraiBladePostPickup(player);
}
