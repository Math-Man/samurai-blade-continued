import { ButtonAction } from "isaac-typescript-definitions";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";

export function getPlayerById(playerNumber: int): EntityPlayer {
  return Isaac.GetPlayer(playerNumber);
}

export function playerHasSamuraisBladeItem(player: EntityPlayer): boolean {
  return player.HasCollectible(CollectibleTypeCustom.SB_SAMURAI_BLADE);
}

export function isPlayerShooting(player: EntityPlayer): boolean {
  return (
    Input.IsActionPressed(ButtonAction.SHOOT_UP, player.ControllerIndex) ||
    Input.IsActionPressed(ButtonAction.SHOOT_RIGHT, player.ControllerIndex) ||
    Input.IsActionPressed(ButtonAction.SHOOT_DOWN, player.ControllerIndex) ||
    Input.IsActionPressed(ButtonAction.SHOOT_LEFT, player.ControllerIndex)
  );
}

export function boolToNumber(value: boolean): number {
  return value ? 1 : 0;
}
