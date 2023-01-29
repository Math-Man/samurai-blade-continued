import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded, upgradeMod } from "isaacscript-common";
import { entityTakeDamageInit } from "./callbacks/MCEntityTakeDamage";
import { evaluateCacheInit } from "./callbacks/MCEvaluateCache";
import { postGameStartedInit } from "./callbacks/MCPostGameStarted";
import { postItemPickupInit } from "./callbacks/MCPostItemPickup";
import { postNewRoomInit } from "./callbacks/MCPostNewRoom";
import { postRenderInit } from "./callbacks/MCPostRender";
import { postRenderPickupInit } from "./callbacks/MCPostRenderPickup";
import { postRenderPlayerInit } from "./callbacks/MCPostRenderPlayer";
import { postTearUpdateInit } from "./callbacks/MCPostTearUpdate";
import { postUpdateInit } from "./callbacks/MCPostUpdate";

const MOD_NAME = "samurai-blade";

main();

export function main(): void {
  const modVanilla = RegisterMod(MOD_NAME, 1);
  const mod = upgradeMod(modVanilla);

  Isaac.DebugString(`${MOD_NAME} initialized.`);
  registerCallbacks(mod);
}

function registerCallbacks(mod: ModUpgraded) {
  Isaac.DebugString(`Callback triggered: POST_GAME_STARTED ${ModCallback.POST_GAME_STARTED}`);

  postUpdateInit(mod);
  postRenderInit(mod);
  postNewRoomInit(mod);
  postGameStartedInit(mod);
  evaluateCacheInit(mod);
  entityTakeDamageInit(mod);
  postRenderPlayerInit(mod);
  postRenderPickupInit(mod);
  postItemPickupInit(mod);
  postTearUpdateInit(mod);
}
