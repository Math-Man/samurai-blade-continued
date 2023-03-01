import { getPlayers } from "isaacscript-common";
import { getTotalDamageDealt } from "../../../data/saveFile/SaveDataHandler";
import { playerHasSamuraisBladeItem } from "../../../helpers/Helpers";
import { Remap } from "../../../helpers/Maths";
import { getUpgradeLimits } from "../scaling/BladeScalingManager";
import { getHudSpritesSet } from "./HudManager";

const OFFSET_FOR_HUDS = 130;

export function renderHudForPlayers(): void {
  const realPlayers = getPlayers();
  let hudIndex = 0;
  for (const player of realPlayers) {
    if (playerHasSamuraisBladeItem(player)) {
      const spriteSet = getHudSpritesSet(player.ControllerIndex);
      const totalDamageDealt = getTotalDamageDealt(player.ControllerIndex);
      const limits = getUpgradeLimits(player.ControllerIndex);
      const limitLowRaw = limits[0];
      const limitHighRaw = limits[1];

      // @ts-ignore
      const totalDamageDealtZeroBased = totalDamageDealt - limitLowRaw;
      // @ts-ignore
      const limitHigh = limitHighRaw - limitLowRaw;

      const mappedProgressVarFrame = Remap(totalDamageDealtZeroBased, 0, limitHigh, 0, 40);

      spriteSet.progressBarSprite.Render(Vector(55 + OFFSET_FOR_HUDS * hudIndex, 28));
      if (mappedProgressVarFrame < 0) {
        spriteSet.progressBarSprite.SetFrame(Math.ceil(40));
      } else {
        spriteSet.progressBarSprite.SetFrame(Math.ceil(mappedProgressVarFrame));
      }
      hudIndex++;
    }
  }
}
