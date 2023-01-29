import { TearVariant } from "isaac-typescript-definitions";

export function setTearToBlade(tear: EntityTear): void {
  tear.ChangeVariant(TearVariant.SWORD_BEAM);
}
