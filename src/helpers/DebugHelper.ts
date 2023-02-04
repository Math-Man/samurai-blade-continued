import { game } from "isaacscript-common";
import { modStateData } from "../config/ModGameDataManager";

export function flog(text: string, source?: string): void {
  if (isDebugMode()) {
    Isaac.DebugString(`[SAMURAI SWORD][Frame:[${game.GetFrameCount()}] [${source !== undefined ? source : ""}]] ${text}`);
  }
}

export function isDebugMode(): boolean {
  return modStateData.configPrintDebugInfo;
}

export function infoLog(text: string, source?: string): void {
  Isaac.DebugString(`[SAMURAI SWORD][Frame:[${game.GetFrameCount()}] [${source !== undefined ? source : ""}]] ${text}`);
}
