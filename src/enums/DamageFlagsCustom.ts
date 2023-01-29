import { DamageFlag } from "isaac-typescript-definitions";
import { bitFlags } from "isaacscript-common";

export const DamageFlagsCustom = {
  SB_BLADE_DAMAGE: bitFlags(DamageFlag.FAKE),
} as const;
