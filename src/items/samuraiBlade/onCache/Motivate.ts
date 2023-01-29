import { CacheFlag } from "isaac-typescript-definitions";
import { sfxManager } from "isaacscript-common";
import { SoundsCustom } from "../../../enums/SoundsCustom";
import { flog } from "../../../helpers/DebugHelper";

const LOG_ID = "Motivate";

export function motivatePlayer(player: EntityPlayer, cacheFlag: CacheFlag): void {
  flog(`Play pickup sound${tostring(player)}${tostring(cacheFlag)}`, LOG_ID);
  sfxManager.Play(SoundsCustom.SB_PICKUP_BLADE, 3, 1);
}
