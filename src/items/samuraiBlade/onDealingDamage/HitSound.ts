import { sfxManager } from "isaacscript-common";
import { SoundsCustom } from "../../../enums/SoundsCustom";

const LOG_ID = "Hit Sound";

export function playerHitSound(
  damagedEntity: Entity,
  damageAmount: number,
  damageFlags: BitFlag,
  damageSource: EntityRef,
  damageCountdownFrames: number,
): void {
  sfxManager.Play(SoundsCustom.SB_HIT, 1, 1, false, 1.2);
}
