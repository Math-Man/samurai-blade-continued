import { getPlayerStateData } from "../data/StateData";
import { Tuneable } from "../data/Tuneable";
import { aimTargetedDotValue } from "./Maths";

export function getHitTargetsInsideArea(player: EntityPlayer, centerPosition: Vector, forwardDirection: Vector, radius: number): Entity[] {
  const entitiesInsideRadius = Isaac.FindInRadius(centerPosition, radius);
  const targetingEntities: Entity[] = [];
  for (const entity of entitiesInsideRadius) {
    if (isHitTargetInsideArea(player, centerPosition, forwardDirection, entity.Position)) {
      targetingEntities.push(entity);
    }
  }
  return targetingEntities;
}

export function isHitTargetInsideArea(player: EntityPlayer, centerPosition: Vector, forwardDirection: Vector, hitTarget: Vector): boolean {
  const hitProduct = aimTargetedDotValue(hitTarget, centerPosition, forwardDirection);
  let ranges = Tuneable.HitChainRanges.get(getPlayerStateData(player).hitChainProgression);
  if (getPlayerStateData(player).charged) {
    ranges = Tuneable.HitChainRanges.get("charged");
  }

  if (ranges === undefined || ranges[0] === undefined || ranges[1] === undefined) {
    error(`Attempting to pull wrong ranges. ${tostring(ranges)}`);
  }

  return hitProduct >= ranges[0] && hitProduct <= ranges[1];
}
