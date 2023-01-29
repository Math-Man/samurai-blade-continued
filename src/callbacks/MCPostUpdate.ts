import { ModCallback } from "isaac-typescript-definitions";
import { SamuraiBladePostUpdate } from "../items/SamuraisBlade";

export function postUpdateInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_UPDATE, main);
}

function main() {
  SamuraiBladePostUpdate();
}
