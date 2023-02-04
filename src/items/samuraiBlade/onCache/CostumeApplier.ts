import { CostumesCustom } from "../../../enums/CostumesCustom";
import { flog } from "../../../helpers/DebugHelper";

export function applyCoolCostume(player: EntityPlayer): void {
  flog(`COSTUME EXISTS! : ${CostumesCustom.SB_COSTUME_SAM}`);
  player.AddNullCostume(CostumesCustom.SB_COSTUME_SAM);
}
