import { ButtonAction, ControllerIndex, Mouse } from "isaac-typescript-definitions";
import { game } from "isaacscript-common";
import { CollectibleTypeCustom } from "../enums/CollectibleTypeCustom";

export function getPlayerById(playerNumber: int): EntityPlayer {
  return Isaac.GetPlayer(playerNumber);
}

export function playerHasSamuraisBladeItem(player: EntityPlayer): boolean {
  return player.HasCollectible(CollectibleTypeCustom.SB_SAMURAI_BLADE);
}

export function isPlayerShooting(player: EntityPlayer): boolean {
  if (game.IsPaused() || ModConfigMenu?.IsVisible) {
    return false;
  }

  const mouseShooting = player.ControllerIndex === ControllerIndex.KEYBOARD && Options.MouseControl && Input.IsMouseBtnPressed(Mouse.BUTTON_LEFT);

  return (
    mouseShooting ||
    Input.IsActionPressed(ButtonAction.SHOOT_UP, player.ControllerIndex) ||
    Input.IsActionPressed(ButtonAction.SHOOT_RIGHT, player.ControllerIndex) ||
    Input.IsActionPressed(ButtonAction.SHOOT_DOWN, player.ControllerIndex) ||
    Input.IsActionPressed(ButtonAction.SHOOT_LEFT, player.ControllerIndex)
  );
}
