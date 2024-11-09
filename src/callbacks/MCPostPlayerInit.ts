import {ModCallback} from "isaac-typescript-definitions";

export function postPlayerInit(mod: Mod): void {
    mod.AddCallback(ModCallback.POST_PLAYER_INIT, main);
}

function main() {
}
