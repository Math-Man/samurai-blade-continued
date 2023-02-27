import { flog } from "../../helpers/DebugHelper";
import { mod } from "../../Mod";

const saveDataObject = {
  persistent: {},
  run: {
    loaded: false,
    damageDealt: new Map<number, number>(), // Controller Index, damage dealt pairs.
  },
  room: {},
  level: {},
};

export function registerSaveData(): void {
  if (!saveDataObject.run.loaded) {
    saveDataObject.run.loaded = true;
    mod.saveDataManager("bladeProgressionData", saveDataObject);
  }
  flog(`Save data registered: ${saveDataObject.run.damageDealt}`);
}

export function getTotalDamageDealt(controllerIndex: number): number {
  const value = saveDataObject.run.damageDealt.get(controllerIndex);
  return value ? value : 0;
}

export function increaseDamageDealt(controllerIndex: number, amount: number): void {
  const value = saveDataObject.run.damageDealt.get(controllerIndex);
  if (value) {
    saveDataObject.run.damageDealt.set(controllerIndex, value + amount);
  } else {
    saveDataObject.run.damageDealt.set(controllerIndex, amount);
  }
  flog(`DAMAGE DEALT: ${saveDataObject.run.damageDealt.get(controllerIndex)}, LOADED: ${saveDataObject.run.loaded}`, `[PERSISTENT BLADE DATA]`);
}
