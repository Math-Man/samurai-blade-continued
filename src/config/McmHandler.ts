import { flog } from "../helpers/DebugHelper";
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

  ModConfigMenu?.AddText(modCategoryName, "Tuning", () => "Change item stats");
  ModConfigMenu?.AddSpace(modCategoryName, "Tuning");
  setupConfigDamageMultiplier(modCategoryName);

  ModConfigMenu?.AddSpace(modCategoryName, "Tuning");
  ModConfigMenu?.AddText(
    modCategoryName,
    "Tuning",
    () => "More settings might be added later on.",
  );
}

function setupConfigSpawnItemInFirstRoom(modCategoryName: string) {
  ModConfigMenu?.AddSetting(modCategoryName, "Settings", {
    CurrentSetting(): number | boolean {
      return modStateData.configSpawnItemInFirstRoom;
    },
    Display(): string {
      return (
        "Spawn in the starting room :" + modStateData.configSpawnItemInFirstRoom
      );
    },
    Info: ["Should The Samurai Blade spawn in the first room?"],
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "boolean") {
        modStateData.configSpawnItemInFirstRoom = newValue;
      }
      flog(
        `Spawn On start: ${modStateData.configSpawnItemInFirstRoom}`,
        LOG_ID,
      );
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
      flog(`Display debug info: ${modStateData.configPrintDebugInfo}`, LOG_ID);
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
    Info: ["Ye"],
    Maximum: 10.0,
    Minimum: 0.1,
    ModifyBy: 0.1,
    OnChange(newValue: number | boolean | undefined): void {
      if (typeof newValue === "number") {
        modStateData.configAdjustmentDamageMultiplier = newValue;
      }
      flog(
        `Damage value changed: ${modStateData.configAdjustmentDamageMultiplier}`,
      );
    },
    PopupWidth: 0,
    Type: ModConfigMenuOptionType.NUMBER,
  });
}
