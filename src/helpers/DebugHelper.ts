import { game } from "isaacscript-common";

export function flog(text: string, source?: string): void {
  if (isDebugMode()) {
    if (source !== "BladeDamage") {
      return;
    }

    Isaac.DebugString(`[Frame:[${game.GetFrameCount()}] [${source !== undefined ? source : ""}]] ${text}`);
  }
}

export function isDebugMode(): boolean {
  return false;
}
