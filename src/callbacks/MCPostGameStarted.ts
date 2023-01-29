import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import { SamuraiBladePostGameStarted } from "../items/SamuraisBlade";

export function postGameStartedInit(mod: ModUpgraded): void {
  mod.AddCallback(ModCallback.POST_GAME_STARTED, () => {
    main(mod);
  });
}

function main(mod: ModUpgraded) {
  SamuraiBladePostGameStarted(mod);
}
