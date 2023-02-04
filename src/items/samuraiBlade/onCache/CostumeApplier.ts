import { PlayerType } from "isaac-typescript-definitions";
import { CostumesCustom } from "../../../enums/CostumesCustom";

export function applyCoolCostume(player: EntityPlayer): void {
  switch (player.GetPlayerType()) {
    case PlayerType.LILITH:
    case PlayerType.LILITH_B:
      return;

    case PlayerType.BLUE_BABY_B:
    case PlayerType.BLUE_BABY:
    case PlayerType.LOST:
    case PlayerType.LOST_B:
    case PlayerType.DARK_JUDAS:
    case PlayerType.APOLLYON:
    case PlayerType.APOLLYON_B:
    case PlayerType.SOUL:
      player.AddNullCostume(CostumesCustom.SB_COSTUME_SAM_NO_FACE);
      return;

    case PlayerType.AZAZEL:
    case PlayerType.AZAZEL_B:
    case PlayerType.KEEPER:
    case PlayerType.KEEPER_B:
    case PlayerType.FORGOTTEN:
    case PlayerType.FORGOTTEN_B:
    case PlayerType.ESAU:
    case PlayerType.JACOB:
    case PlayerType.JACOB_B:
    case PlayerType.JACOB_2_B:
    case PlayerType.JUDAS_B:
    case PlayerType.LAZARUS_2_B:
    case PlayerType.SOUL_B:
    case PlayerType.BETHANY:
    case PlayerType.BETHANY_B:
      player.AddNullCostume(CostumesCustom.SB_COSTUME_SAM_NO_FACE_NO_HAIR);
      return;

    case PlayerType.MAGDALENE:
    case PlayerType.MAGDALENE_B:
    case PlayerType.EVE:
    case PlayerType.EVE_B:
    case PlayerType.SAMSON:
    case PlayerType.SAMSON_B:
    case PlayerType.LAZARUS:
    case PlayerType.LAZARUS_2:
    case PlayerType.LAZARUS_B:
    case PlayerType.EDEN:
    case PlayerType.EDEN_B:
      player.AddNullCostume(CostumesCustom.SB_COSTUME_SAM_NO_HAIR);
      return;

    default:
      player.AddNullCostume(CostumesCustom.SB_COSTUME_SAM);
      return;
  }
}
