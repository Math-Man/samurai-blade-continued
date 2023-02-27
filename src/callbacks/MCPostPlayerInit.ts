import { ModCallback } from "isaac-typescript-definitions";
import { registerSaveData } from "../data/saveFile/SaveDataHandler";

export function postPlayerInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_PLAYER_INIT, main);
}

function main() {
  registerSaveData();
}
