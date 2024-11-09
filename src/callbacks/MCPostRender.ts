import {ModCallback} from "isaac-typescript-definitions";
import {renderHudForPlayers} from "../items/samuraiBlade/hud/HudRenderer";
import {SamuraiBladePostRender} from "../items/SamuraisBlade";

export function postRenderInit(mod: Mod): void {
    mod.AddCallback(ModCallback.POST_RENDER, main);
}

function main() {
    SamuraiBladePostRender();

    renderHudForPlayers();
}
