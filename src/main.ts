import { ModCallback } from "isaac-typescript-definitions";
import { ModUpgraded } from "isaacscript-common";
import { entityTakeDamageInit } from "./callbacks/MCEntityTakeDamage";
import { evaluateCacheInit } from "./callbacks/MCEvaluateCache";
import { postCollectibleRemoved } from "./callbacks/MCPostCollectibleRemoved";
import { postGameStartedInit } from "./callbacks/MCPostGameStarted";
import { postItemPickupInit } from "./callbacks/MCPostItemPickup";
import { postNewRoomInit } from "./callbacks/MCPostNewRoom";
import { postPlayerInit } from "./callbacks/MCPostPlayerInit";
import { postRenderInit } from "./callbacks/MCPostRender";
import { postRenderPickupInit } from "./callbacks/MCPostRenderPickup";
import { postRenderPlayerInit } from "./callbacks/MCPostRenderPlayer";
import { postTearUpdateInit } from "./callbacks/MCPostTearUpdate";
import { postUpdateInit } from "./callbacks/MCPostUpdate";
import { preGameExitInit } from "./callbacks/MCPreGameExit";
import { mod } from "./Mod";
import {SaveDataManager} from "./data/saveFile/SaveDataManager";
import {flog} from "./helpers/DebugHelper";

const LOG_ID = "MAIN-SAMURAI";
const MOD_NAME = "samurai-blade";

main();

export function main(): void {
  Isaac.DebugString(`${MOD_NAME} initialized.`);
  registerCallbacks(mod);
  registerSaveDataManager();
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
  preGameExitInit(mod);
  postCollectibleRemoved(mod);
  postPlayerInit(mod);
}

function registerSaveDataManager() {
  flog("Registering save data manager", LOG_ID);
  SaveDataManager.instance.register();
}
