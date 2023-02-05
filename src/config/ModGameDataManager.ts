import { ModUpgraded } from "isaacscript-common";
import { decode, encode } from "json";
import { LineOfSightCheckBehaviour } from "../enums/LineOfSightCheckBehaviour";
import { TearFiringBehaviour } from "../enums/TearFiringBehaviour";

/** Don't forget to modify loadGame() method after adding an option **/
interface ModStateData {
  configSpawnItemInFirstRoom: boolean;
  configPrintDebugInfo: boolean;
  configParticleMultiplier: number;
  configTearFiringBehaviour: TearFiringBehaviour;
  configAdjustmentDamageMultiplier: number;
  configAdjustmentRangeMultiplier: number;
  configLineOfSightCheck: LineOfSightCheckBehaviour;
}

export let modStateData: ModStateData = {
  configSpawnItemInFirstRoom: true,
  configPrintDebugInfo: false,
  configParticleMultiplier: 1.0,
  configTearFiringBehaviour: TearFiringBehaviour.FIRE_DELAY_HACK,
  configAdjustmentDamageMultiplier: 1.0,
  configAdjustmentRangeMultiplier: 1.0,
  configLineOfSightCheck: LineOfSightCheckBehaviour.SOFT,
} as const;

export function saveGame(mod: ModUpgraded): void {
  Isaac.DebugString(`Samurai-Blade, saving game data ${modStateData}`);
  mod.SaveData(encode(modStateData));
}

export function loadGame(mod: ModUpgraded): void {
  if (!mod.HasData()) {
    return;
  }
  let saveState = decode(mod.LoadData());

  Isaac.DebugString(`Samurai-Blade is loading from save state`);

  // TODO: I hate this, I wish I could find a better solution, but I suck at TS.

  // @ts-ignore
  if ("configAdjustmentDamageMultiplier" in saveState) {
    // @ts-ignore
    modStateData.configAdjustmentDamageMultiplier = saveState.configAdjustmentDamageMultiplier;
  }

  // @ts-ignore
  if ("configSpawnItemInFirstRoom" in saveState) {
    // @ts-ignore
    modStateData.configSpawnItemInFirstRoom = saveState.configSpawnItemInFirstRoom;
  }

  // @ts-ignore
  if ("configPrintDebugInfo" in saveState) {
    // @ts-ignore
    modStateData.configPrintDebugInfo = saveState.configPrintDebugInfo;
  }

  // @ts-ignore
  if ("configParticleMultiplier" in saveState) {
    // @ts-ignore
    modStateData.configParticleMultiplier = saveState.configParticleMultiplier;
  }

  // @ts-ignore
  if ("configTearFiringBehaviour" in saveState) {
    // @ts-ignore
    modStateData.configTearFiringBehaviour = saveState.configTearFiringBehaviour;
  }

  // @ts-ignore
  if ("configAdjustmentRangeMultiplier" in saveState) {
    // @ts-ignore
    modStateData.configAdjustmentRangeMultiplier = saveState.configAdjustmentRangeMultiplier;
  }

  // @ts-ignore
  if ("configLineOfSightCheck" in saveState) {
    // @ts-ignore
    modStateData.configLineOfSightCheck = saveState.configLineOfSightCheck;
  }

  Isaac.DebugString(`Samurai-Blade, loaded setting 'configPrintDebugInfo', ${modStateData.configPrintDebugInfo}`);
}
