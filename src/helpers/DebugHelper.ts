import { game } from "isaacscript-common";
import {configDataObject} from "../data/saveFile/ConfigSaveDataHandler";

export function flog(text: string, source?: string): void {
  if (isDebugMode()) {
    Isaac.DebugString(`[SAMURAI SWORD][Frame:[${game.GetFrameCount()}] [${source !== undefined ? source : ""}]] ${text}`);
  }
}

export function isDebugMode(): boolean {
  return configDataObject.persistent.configPrintDebugInfo;
}

export function infoLog(text: string, source?: string): void {
  Isaac.DebugString(`[SAMURAI SWORD][Frame:[${game.GetFrameCount()}] [${source !== undefined ? source : ""}]] ${text}`);
}
