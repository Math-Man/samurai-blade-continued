import { ISCFeature, upgradeMod } from "isaacscript-common";

export const MOD_NAME = "wheelchair-boi";

const ISC_FEATURES = [ISCFeature.MODDED_ELEMENT_SETS, ISCFeature.PLAYER_INVENTORY, ISCFeature.RUN_IN_N_FRAMES, ISCFeature.SAVE_DATA_MANAGER] as const;

const modVanilla = RegisterMod(MOD_NAME, 1);
export const mod = upgradeMod(modVanilla, ISC_FEATURES);
