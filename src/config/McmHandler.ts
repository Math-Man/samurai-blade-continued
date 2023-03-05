import { LOSCheckBehaviourAsString } from "../enums/LineOfSightCheckBehaviour";
import { TearFiringBehaviourAsString } from "../enums/TearFiringBehaviour";
import { flog, infoLog } from "../helpers/DebugHelper";
import { HudPositionOptionsAsString } from "../items/samuraiBlade/hud/HudPositionOptions";
import { modStateData } from "./ModGameDataManager";

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
      return modStateData.configHudPosition;
    },
    Display(): string {
      return `Hud Position: ${HudPositionOptionsAsString(modStateData.configHudPosition)}`;
    },
    Info: ["Change where the hud is located"],
    Maximum: 3,
    Minimum: 0,
    ModifyBy: 1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        modStateData.configHudPosition = newValue;
      }
      infoLog(`Hud Position Changed: ${modStateData.configHudPosition}}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}

function setupConfigSpawnItemInFirstRoom(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return modStateData.configSpawnItemInFirstRoom;
    },
    Display(): string {
      return "Spawn in the starting room :" + modStateData.configSpawnItemInFirstRoom;
    },
    Info: ["Should The Samurai Blade spawn in the first room?"],
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "boolean") {
        modStateData.configSpawnItemInFirstRoom = newValue;
      }
    },
    Type: ModConfigMenuOptionType.BOOLEAN,
  });
}
function setupConfigPrintDebugInfo(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return modStateData.configPrintDebugInfo;
    },
    Display(): string {
      return "Print (crude) debug info :" + modStateData.configPrintDebugInfo;
    },
    Info: ["Display debug info on screen and log to console."],
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "boolean") {
        modStateData.configPrintDebugInfo = newValue;
      }
      infoLog(`Display debug info: ${modStateData.configPrintDebugInfo}`, LOG_ID);
    },
    Type: ModConfigMenuOptionType.BOOLEAN,
  });
}

function setupConfigParticleMultiplier(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return modStateData.configParticleMultiplier;
    },
    Display(): string {
      return `Current Particle Multiplier: ${modStateData.configParticleMultiplier}`;
    },
    Info: ["Change the intensity of particle effects."],
    Maximum: 5.0,
    Minimum: 0.1,
    ModifyBy: 0.1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        modStateData.configParticleMultiplier = newValue;
      }
      infoLog(`Particles value changed: ${modStateData.configParticleMultiplier}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}

function setupConfigTearFiringBehaviour(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return modStateData.configTearFiringBehaviour;
    },
    Display(): string {
      return `Tear behaviour: ${TearFiringBehaviourAsString(modStateData.configTearFiringBehaviour)}`;
    },
    Info: ["Change how the tear firing behaves", "Fire Delay Hack is the default"],
    Maximum: 1,
    Minimum: 0,
    ModifyBy: 1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        modStateData.configTearFiringBehaviour = newValue;
      }
      infoLog(`Tear Firing Behaviour Changed: ${modStateData.configTearFiringBehaviour}}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}

function setupConfigLineOfSightCheck(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return modStateData.configLineOfSightCheck;
    },
    Display(): string {
      return `Line-of-sight Check: ${LOSCheckBehaviourAsString(modStateData.configLineOfSightCheck)}`;
    },
    Info: ["Change how the Line of Sight check behaves", "Soft is the default", "Soft is more resource intensive and more accurate"],
    Maximum: 2,
    Minimum: 0,
    ModifyBy: 1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        modStateData.configLineOfSightCheck = newValue;
      }
      infoLog(`LOS Check Behaviour Changed: ${modStateData.configLineOfSightCheck}}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}

function setupConfigBladePicksUpItems(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return modStateData.configBladePicksUpItems;
    },
    Display(): string {
      return `Attacks collects items: ${modStateData.configBladePicksUpItems}`;
    },
    Info: ["Should attacking collect items on the ground similarly to the spirit sword"],
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "boolean") {
        modStateData.configBladePicksUpItems = newValue;
      }
      infoLog(`Pickup Item Behaviour Changed: ${modStateData.configBladePicksUpItems}}`);
    },
    Type: ModConfigMenuOptionType.BOOLEAN,
  });
}

function setupConfigDamageMultiplier(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Tuning", {
    CurrentSetting(): number | boolean {
      return modStateData.configAdjustmentDamageMultiplier;
    },
    Display(): string {
      return `Current Damage Multiplier: ${modStateData.configAdjustmentDamageMultiplier}`;
    },
    Info: ["Damage multiplier for the combined contact damage of the blade."],
    Maximum: 10.0,
    Minimum: 0.1,
    ModifyBy: 0.1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        modStateData.configAdjustmentDamageMultiplier = newValue;
      }
      infoLog(`Damage value changed: ${modStateData.configAdjustmentDamageMultiplier}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}

function setupConfigRangeMultiplier(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Tuning", {
    CurrentSetting(): number | boolean {
      return modStateData.configAdjustmentRangeMultiplier;
    },
    Display(): string {
      return `Current Range Multiplier: ${modStateData.configAdjustmentRangeMultiplier}`;
    },
    Info: ["Range multiplier for the arc size."],
    Maximum: 10.0,
    Minimum: 0.5,
    ModifyBy: 0.1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        modStateData.configAdjustmentRangeMultiplier = newValue;
      }
      infoLog(`Range value changed: ${modStateData.configAdjustmentRangeMultiplier}`);
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}
