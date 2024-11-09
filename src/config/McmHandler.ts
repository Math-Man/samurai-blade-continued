import { LOSCheckBehaviourAsString } from "../enums/LineOfSightCheckBehaviour";
import { TearFiringBehaviourAsString } from "../enums/TearFiringBehaviour";
import { flog, infoLog } from "../helpers/DebugHelper";
import { HudPositionOptionsAsString } from "../items/samuraiBlade/hud/HudPositionOptions";
import {configDataObject} from "../data/saveFile/ConfigSaveDataHandler";

const LOG_ID = "MCM CONFIG";

export function setupMCM(): void {
  flog("Setting up MCM for samurai blade!", LOG_ID);
  const modCategoryName = "Samurai's Blade";

  // Reset category if it exists
  ModConfigMenu?.RemoveCategory(modCategoryName);
  ModConfigMenu?.UpdateCategory(modCategoryName, {
    IsOld: false,
    Name: modCategoryName,
    Info: "Samurai-Blade settings.",
  });

  ModConfigMenu?.AddText(modCategoryName, "Settings", () => "General Settings");
  ModConfigMenu?.AddSpace(modCategoryName, "Settings");

  setupConfigSpawnItemInFirstRoom(modCategoryName);
  setupConfigPrintDebugInfo(modCategoryName);
  setupConfigParticleMultiplier(modCategoryName);
  setupConfigTearFiringBehaviour(modCategoryName);
  setupConfigLineOfSightCheck(modCategoryName);
  setupConfigBladePicksUpItems(modCategoryName);
  setupConfigHudPosition(modCategoryName);

  ModConfigMenu?.AddText(modCategoryName, "Tuning", () => "Change item stats");
  ModConfigMenu?.AddSpace(modCategoryName, "Tuning");
  setupConfigDamageMultiplier(modCategoryName);

  setupConfigRangeMultiplier(modCategoryName);

  ModConfigMenu?.AddSpace(modCategoryName, "Tuning");
  ModConfigMenu?.AddText(modCategoryName, "Tuning", () => "More settings might be added later on.");
}

function setupConfigHudPosition(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return configDataObject.persistent.configHudPosition;
    },
    Display(): string {
      return `Hud Position: ${HudPositionOptionsAsString(configDataObject.persistent.configHudPosition)}`;
    },
    Info: ["Change where the hud is located"],
    Maximum: 3,
    Minimum: 0,
    ModifyBy: 1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        configDataObject.persistent.configHudPosition = newValue;
      }
      infoLog(`Hud Position Changed: ${configDataObject.persistent.configHudPosition}}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}

function setupConfigSpawnItemInFirstRoom(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return configDataObject.persistent.configSpawnItemInFirstRoom;
    },
    Display(): string {
      return "Spawn in the starting room :" + configDataObject.persistent.configSpawnItemInFirstRoom;
    },
    Info: ["Should The Samurai Blade spawn in the first room?"],
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "boolean") {
        configDataObject.persistent.configSpawnItemInFirstRoom = newValue;
      }
    },
    Type: ModConfigMenuOptionType.BOOLEAN,
  });
}
function setupConfigPrintDebugInfo(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return configDataObject.persistent.configPrintDebugInfo;
    },
    Display(): string {
      return "Print (crude) debug info :" + configDataObject.persistent.configPrintDebugInfo;
    },
    Info: ["Display debug info on screen and log to console."],
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "boolean") {
        configDataObject.persistent.configPrintDebugInfo = newValue;
      }
      infoLog(`Display debug info: ${configDataObject.persistent.configPrintDebugInfo}`, LOG_ID);
    },
    Type: ModConfigMenuOptionType.BOOLEAN,
  });
}

function setupConfigParticleMultiplier(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return configDataObject.persistent.configParticleMultiplier;
    },
    Display(): string {
      return `Current Particle Multiplier: ${configDataObject.persistent.configParticleMultiplier}`;
    },
    Info: ["Change the intensity of particle effects."],
    Maximum: 5.0,
    Minimum: 0.1,
    ModifyBy: 0.1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        configDataObject.persistent.configParticleMultiplier = newValue;
      }
      infoLog(`Particles value changed: ${configDataObject.persistent.configParticleMultiplier}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}

function setupConfigTearFiringBehaviour(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return configDataObject.persistent.configTearFiringBehaviour;
    },
    Display(): string {
      return `Tear behaviour: ${TearFiringBehaviourAsString(configDataObject.persistent.configTearFiringBehaviour)}`;
    },
    Info: ["Change how the tear firing behaves", "Fire Delay Hack is the default"],
    Maximum: 1,
    Minimum: 0,
    ModifyBy: 1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        configDataObject.persistent.configTearFiringBehaviour = newValue;
      }
      infoLog(`Tear Firing Behaviour Changed: ${configDataObject.persistent.configTearFiringBehaviour}}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}

function setupConfigLineOfSightCheck(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return configDataObject.persistent.configLineOfSightCheck;
    },
    Display(): string {
      return `Line-of-sight Check: ${LOSCheckBehaviourAsString(configDataObject.persistent.configLineOfSightCheck)}`;
    },
    Info: ["Change how the Line of Sight check behaves", "Soft is the default", "Soft is more resource intensive and more accurate"],
    Maximum: 2,
    Minimum: 0,
    ModifyBy: 1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        configDataObject.persistent.configLineOfSightCheck = newValue;
      }
      infoLog(`LOS Check Behaviour Changed: ${configDataObject.persistent.configLineOfSightCheck}}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}

function setupConfigBladePicksUpItems(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return configDataObject.persistent.configBladePicksUpItems;
    },
    Display(): string {
      return `Attacks collects items: ${configDataObject.persistent.configBladePicksUpItems}`;
    },
    Info: ["Should attacking collect items on the ground similarly to the spirit sword"],
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "boolean") {
        configDataObject.persistent.configBladePicksUpItems = newValue;
      }
      infoLog(`Pickup Item Behaviour Changed: ${configDataObject.persistent.configBladePicksUpItems}}`);
    },
    Type: ModConfigMenuOptionType.BOOLEAN,
  });
}

function setupConfigDamageMultiplier(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Tuning", {
    CurrentSetting(): number | boolean {
      return configDataObject.persistent.configAdjustmentDamageMultiplier;
    },
    Display(): string {
      return `Current Damage Multiplier: ${configDataObject.persistent.configAdjustmentDamageMultiplier}`;
    },
    Info: ["Damage multiplier for the combined contact damage of the blade."],
    Maximum: 10.0,
    Minimum: 0.1,
    ModifyBy: 0.1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        configDataObject.persistent.configAdjustmentDamageMultiplier = newValue;
      }
      infoLog(`Damage value changed: ${configDataObject.persistent.configAdjustmentDamageMultiplier}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}

function setupConfigRangeMultiplier(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Tuning", {
    CurrentSetting(): number | boolean {
      return configDataObject.persistent.configAdjustmentRangeMultiplier;
    },
    Display(): string {
      return `Current Range Multiplier: ${configDataObject.persistent.configAdjustmentRangeMultiplier}`;
    },
    Info: ["Range multiplier for the arc size."],
    Maximum: 10.0,
    Minimum: 0.5,
    ModifyBy: 0.1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        configDataObject.persistent.configAdjustmentRangeMultiplier = newValue;
      }
      infoLog(`Range value changed: ${configDataObject.persistent.configAdjustmentRangeMultiplier}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}
