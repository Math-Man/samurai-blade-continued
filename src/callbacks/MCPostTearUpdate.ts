import { ModCallback } from "isaac-typescript-definitions";
import { SamuraiBladePostTearUpdate } from "../items/SamuraisBlade";

export function postTearUpdateInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_TEAR_UPDATE, main);
}

function main(tear: EntityTear) {
  SamuraiBladePostTearUpdate(tear);
}
