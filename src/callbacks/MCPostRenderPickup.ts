import { ModCallback } from "isaac-typescript-definitions";
import { SamuraiBladePostRenderPickup } from "../items/SamuraisBlade";

export function postRenderPickupInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PICKUP_RENDER, main);
}

function main() {
  SamuraiBladePostRenderPickup();
}
