import { EntityType, PickupVariant } from "isaac-typescript-definitions";
import { isRedHeart } from "isaacscript-common";
import { configDataObject } from "../../../data/saveFile/ConfigSaveDataHandler";
import { PickupBehaviour } from "../../../enums/PickupBehaviour";
import { flog } from "../../../helpers/DebugHelper";

export function pickupBasics(player: EntityPlayer, targets: Entity[]): void {
  targets.forEach((value) => {
    const pickup = value.ToPickup();
    if (pickup) {
      if (pickup.Type === EntityType.PICKUP && !pickup.IsShopItem()) {
        switch (pickup.Variant) {
          case PickupVariant.HEART:
            if ((!player.HasFullHearts() && isRedHeart(pickup)) || !isRedHeart(pickup)) {
              flog(`[PICKUP DETECTION] Red heart}`);
              pickup.Position = player.Position;
            }
            break;
          case PickupVariant.CHEST:
            if (configDataObject.persistent.configBladePickupBehaviour === PickupBehaviour.ITEMS_AND_CHESTS) {
              flog(`[PICKUP DETECTION] Chest`);
              pickup.TryOpenChest(player);
            }
            break;
          case PickupVariant.LIL_BATTERY:
          case PickupVariant.COIN:
          case PickupVariant.KEY:
          case PickupVariant.BOMB:
          case PickupVariant.SACK:
          case PickupVariant.TRINKET:
          case PickupVariant.PILL:
          case PickupVariant.POOP:
          case PickupVariant.TAROT_CARD:
            flog(`[PICKUP DETECTION] Found a thing}`);
            pickup.Position = player.Position;
            // pickup.Position = pickup.Position.add(player.Position.sub(pickup.Position));
            break;
        }
      }
    }
  });
}
