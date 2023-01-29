import { ModUpgraded } from "isaacscript-common";
import { decode, encode } from "json";

interface ModStateData {
  configSpawnItemInFirstRoom: boolean;
  configPrintDebugInfo: boolean;
  configAdjustmentDamageMultiplier: number;
}

export let modStateData: ModStateData = {
  configSpawnItemInFirstRoom: true,
  configPrintDebugInfo: false,
  configAdjustmentDamageMultiplier: 1.0,
} as const;

export function saveGame(mod: ModUpgraded): void {
  Isaac.DebugString(`Samurai-Blade, saving game data ${modStateData}`);
  mod.SaveData(encode(modStateData));
}

export function loadGame(mod: ModUpgraded): void {
  Isaac.DebugString(`THIS WORLD IS AN ILLUSION EXILE`);

  if (!mod.HasData()) {
    return;
  }
  let saveState = decode(mod.LoadData());

  Isaac.DebugString(`Samurai-Blade is loading from save state`);

  // TODO: I hate this, I hope I could find a better solution, but I suck at TS.

  // @ts-ignore
  if ("configAdjustmentDamageMultiplier" in saveState) {
    // @ts-ignore
    modStateData.configAdjustmentDamageMultiplier =
      saveState.configAdjustmentDamageMultiplier;

    Isaac.DebugString(
      `Samurai-Blade, loaded setting 'configAdjustmentDamageMultiplier', ${modStateData.configAdjustmentDamageMultiplier}`,
    );
  }

  // @ts-ignore
  if ("configSpawnItemInFirstRoom" in saveState) {
    // @ts-ignore
    modStateData.configSpawnItemInFirstRoom =
      saveState.configSpawnItemInFirstRoom;

    Isaac.DebugString(
      `Samurai-Blade, loaded setting 'configSpawnItemInFirstRoom', ${modStateData.configSpawnItemInFirstRoom}`,
    );
  }

  // @ts-ignore
  if ("configPrintDebugInfo" in saveState) {
    // @ts-ignore
    modStateData.configPrintDebugInfo = saveState.configPrintDebugInfo;
  }

  Isaac.DebugString(
    `Samurai-Blade, loaded setting 'configPrintDebugInfo', ${modStateData.configPrintDebugInfo}`,
  );
}
