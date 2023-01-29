import { EntityType } from "isaac-typescript-definitions";
import { EnemyVisualType } from "../enums/EnemyVisualType";

export function getEnemyVisualType(entityType: number, variant: number): EnemyVisualType {
  switch (entityType) {
    case EntityType.GREED_GAPER:
    case EntityType.EXORCIST:
    case EntityType.KNIGHT:
    case EntityType.HORF:
      return EnemyVisualType.BONE_AND_BLOOD;

    case EntityType.NECRO:
    case EntityType.BONY:
    case EntityType.BLACK_BONY:
    case EntityType.REVENANT:
      return EnemyVisualType.BONE;

    case EntityType.GAPER_L2:
    case EntityType.GUSHER:
    case EntityType.TWITCHY:
    case EntityType.BLACK_GLOBIN:
    case EntityType.BLACK_GLOBIN_BODY:
    case EntityType.BLACK_GLOBIN_HEAD:
    case EntityType.TAR_BOY:
      return EnemyVisualType.DEFAULT_BLOOD_BLACK;

    case EntityType.SPLASHER:
      return EnemyVisualType.DEFAULT_BLOOD_GREEN;

    case EntityType.DUMP:
    case EntityType.CLOGGY:
    case EntityType.DINGA:
    case EntityType.DINGLE:
    case EntityType.DIP:
    case EntityType.SQUIRT:
    case EntityType.SPLURT:
      return EnemyVisualType.POOP;

    case EntityType.BLASTER:
    case EntityType.QUAKEY:
    case EntityType.HARDY:
      return EnemyVisualType.STONE;

    case EntityType.CLICKETY_CLACK:
    case EntityType.BIG_BONY:
    case EntityType.DEATHS_HEAD:
      return EnemyVisualType.BONE;

    case EntityType.WIZOOB:
      return EnemyVisualType.GHOST;

    // Variant specific effects:
    case EntityType.GURGLE:
      switch (variant) {
        case 0:
          return EnemyVisualType.DEFAULT_BLOOD_GREEN;
        case 1:
          return EnemyVisualType.STONE;
      }
      break;

    case EntityType.DANNY:
      switch (variant) {
        case 1:
          return EnemyVisualType.STONE;
      }
      break;

    case EntityType.NEEDLE:
      switch (variant) {
        case 1:
          return EnemyVisualType.BONE;
      }
      break;

    case EntityType.DEATH:
      switch (variant) {
        case 0:
          return EnemyVisualType.BONE;
        case 10:
          return EnemyVisualType.NONE;
      }
      break;

    case EntityType.BEAST:
      switch (variant) {
        case 41:
          return EnemyVisualType.NONE;
      }
      break;

    case EntityType.CLOTTY:
      switch (variant) {
        case 1:
          return EnemyVisualType.DEFAULT_BLOOD_BLACK;
      }
      break;

    case EntityType.CHARGER:
      switch (variant) {
        case 3:
          return EnemyVisualType.BONE_AND_BLOOD;
      }
      break;

    case EntityType.GLOBIN:
      switch (variant) {
        case 2:
        case 3:
          return EnemyVisualType.DEFAULT_BLOOD_BLACK;
      }
      break;

    case EntityType.HOST:
      switch (variant) {
        case 0:
          return EnemyVisualType.BONE_AND_BLOOD;
        case 1:
          return EnemyVisualType.DEFAULT_BLOOD;
        case 3:
          return EnemyVisualType.STONE;
      }
      break;

    case EntityType.LEAPER:
      switch (variant) {
        case 1:
          return EnemyVisualType.DEFAULT_BLOOD_BLACK;
      }
      break;

    case EntityType.GUTS:
      switch (variant) {
        case 2:
          return EnemyVisualType.DEFAULT_BLOOD_BLACK;
      }
      break;

    case EntityType.PREY:
      switch (variant) {
        case 1:
          return EnemyVisualType.GHOST;
      }
      break;

    default:
      return EnemyVisualType.DEFAULT_BLOOD;
  }

  return EnemyVisualType.DEFAULT_BLOOD;
}
