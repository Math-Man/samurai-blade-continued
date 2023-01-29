import { CostumesCustom } from "../../../enums/CostumesCustom";

export function applyCoolCostume(player: EntityPlayer): void {
  player.AddNullCostume(CostumesCustom.SB_COSTUME_SAM);
}
