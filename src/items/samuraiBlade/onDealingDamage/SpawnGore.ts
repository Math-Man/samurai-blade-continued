import { EffectVariant } from "isaac-typescript-definitions";
import { clamp, COLORS, game } from "isaacscript-common";
import { EnemyVisualType } from "../../../enums/EnemyVisualType";
import { flog } from "../../../helpers/DebugHelper";
import { getEnemyVisualType } from "../../../helpers/GetEnemyVisualType";

const LOG_ID = "SpawnGore/SpawnParticles";

export function spawnGore(damagedEntity: Entity, damageAmount: number, damageFlags: BitFlag, damageSource: EntityRef, damageCountdownFrames: number): void {
  flog(`Spawn particles: ${tostring(damagedEntity)}${tostring(damageAmount)}${tostring(damageFlags)}${tostring(damageSource)}${tostring(damageCountdownFrames)}`, LOG_ID);

  const spawnModifier = clamp(math.floor(1.2 ** damageAmount), 0, 20);

  switch (getEnemyVisualType(damagedEntity.Type, damagedEntity.Variant)) {
    case EnemyVisualType.DEFAULT_BLOOD:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, spawnModifier, spawnModifier);
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_EXPLOSION, spawnModifier, spawnModifier);
      break;
    case EnemyVisualType.DEFAULT_BLOOD_BLACK:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, spawnModifier, spawnModifier, COLORS.Black);
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_EXPLOSION, spawnModifier, spawnModifier, COLORS.Black);
      break;
    case EnemyVisualType.DEFAULT_BLOOD_GREEN:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, spawnModifier, spawnModifier, COLORS.Green);
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_EXPLOSION, spawnModifier, spawnModifier, COLORS.Green);
      break;
    case EnemyVisualType.DEFAULT_BLOOD_WHITE:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, spawnModifier, spawnModifier, COLORS.White);
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_EXPLOSION, spawnModifier, spawnModifier, COLORS.White);
      break;
    case EnemyVisualType.BONE:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.NAIL_PARTICLE, spawnModifier, spawnModifier);
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_EXPLOSION, spawnModifier, spawnModifier, COLORS.White);
      break;
    case EnemyVisualType.BONE_AND_BLOOD:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.NAIL_PARTICLE, spawnModifier, spawnModifier, COLORS.White);
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_PARTICLE, spawnModifier, spawnModifier);
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_EXPLOSION, spawnModifier, spawnModifier);
      break;
    case EnemyVisualType.GHOST:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.CREEP_WHITE, spawnModifier, spawnModifier);
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_EXPLOSION, spawnModifier, spawnModifier, COLORS.Gray);
      break;
    case EnemyVisualType.POOP:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.POOP_PARTICLE, spawnModifier, spawnModifier);
      game.SpawnParticles(damagedEntity.Position, EffectVariant.BLOOD_EXPLOSION, spawnModifier, spawnModifier, COLORS.Brown);
      break;
    case EnemyVisualType.STONE:
      game.SpawnParticles(damagedEntity.Position, EffectVariant.ROCK_PARTICLE, spawnModifier * 2, spawnModifier);
      break;
  }

  game.SpawnParticles(damagedEntity.Position, EffectVariant.IMPACT, 10, 10);
}
