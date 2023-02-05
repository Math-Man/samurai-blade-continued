import { EntityType, PickupVariant } from "isaac-typescript-definitions";
import { isRedHeart } from "isaacscript-common";
import { flog, infoLog } from "../../../helpers/DebugHelper";

export function pickupBasics(player: EntityPlayer, targets: Entity[]): void {
  targets.forEach((value) => {
    const pickup = value.ToPickup();
    if (pickup) {
      if (pickup.Type === EntityType.PICKUP && !pickup.IsShopItem()) {
        switch (pickup.Variant) {
          case PickupVariant.HEART:
            infoLog(`I don't understand this but I want to understand this : ${player.HasFullHealth()} ${player.HasFullHearts()}, ${isRedHeart(pickup)}`);

            if ((!player.HasFullHearts() && isRedHeart(pickup)) || !isRedHeart(pickup)) {
              flog(`[PICKUP DETECTION] Red heart}`);
              pickup.Position = player.Position;
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
  //
  // targets
  //   .filter((entity) => isPickup(entity))
  //   .forEach((pickup) => {
  //     infoLog(`[PICKUP DETECTION]Found a thing: ${pickup}`);
  //     pickup.Position = player.Position;
  //   });
}
