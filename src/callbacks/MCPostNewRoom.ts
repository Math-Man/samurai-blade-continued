import { ModCallback } from "isaac-typescript-definitions";
import { SamuraiBladePostNewRoom } from "../items/SamuraisBlade";

export function postNewRoomInit(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_NEW_ROOM, main);
}

function main() {
  SamuraiBladePostNewRoom();
}
