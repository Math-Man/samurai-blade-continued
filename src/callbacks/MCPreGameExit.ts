import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import { SamuraiBladePreGameExit } from "../items/SamuraisBlade";

export function preGameExitInit(mod: ModUpgraded): void {
  mod.AddCallback(ModCallback.PRE_GAME_EXIT, () => {
    main(mod);
  });
}

function main(mod: ModUpgraded) {
  SamuraiBladePreGameExit(mod);
}
