import { EffectVariant, EntityType, ItemPoolType, PickupVariant, SoundEffect } from "isaac-typescript-definitions";
import { game, getPlayers, sfxManager, spawn } from "isaacscript-common";
import { modStateData } from "../../../config/ModGameDataManager";
import { getPlayerStateData } from "../../../data/StateData";
import { Tuneable } from "../../../data/Tuneable";
import { CollectibleTypeCustom } from "../../../enums/CollectibleTypeCustom";
import { SoundsCustom } from "../../../enums/SoundsCustom";
import { TearFiringBehaviour } from "../../../enums/TearFiringBehaviour";
import {
  Animations,
  isFinished,
  isPlaying,
  isPlayingOrFinishedIdle,
  isPlayingOrFinishedSwitchToChargedIdle,
  isPlayingOrFinishedSwitchToIdle,
} from "../../../helpers/AnimationHelpers";
import {
  canPlayerFireBlade,
  getActualTimeToGoIdle,
  getAndUpdatePlayerBladeFireTime,
  getBladePhysicalRange,
  getChargeTime,
  getNextPlayerStateFromAnimation,
  hasPlayerExitedAttackState,
  isPlayerInAttackState,
} from "../../../helpers/BladeHelpers";
import { isPlayerShooting, playerHasSamuraisBladeItem } from "../../../helpers/Helpers";
import { getHitTargetsInsideArea } from "../../../helpers/TargetFinding";
import { isHitCritical } from "../onDealingDamage/CriticalHitHandler";
import { clearDamageState } from "../onDealingDamage/DamageStateHandler";
import { pickupBasics } from "../specialBehaviour/BasicPickups";
import { dealSamuraiBladeDamage } from "./BladeDamage";

const LOG_ID = "BladeBehavior";

export function updateBladeBehavior(): void {
  if (modStateData.configSpawnItemInFirstRoom) {
    spawnItemFirstFrame();
  }

  const realPlayers = getPlayers();
  for (const player of realPlayers) {
    if (playerHasSamuraisBladeItem(player)) {
      updatePlayerBladeBehavior(player);
    }
  }
}

function spawnFromPool(player: EntityPlayer): void {
  spawn(EntityType.PICKUP, PickupVariant.COLLECTIBLE, game.GetItemPool().GetCollectible(ItemPoolType.TREASURE, false), player.Position);
}

function updatePlayerBladeBehavior(player: EntityPlayer) {
  disableShooting(player);
  const { bladeSprite } = getPlayerStateData(player);
  let { hitChainProgression } = getPlayerStateData(player);

  if (
    !(
      isPlaying(bladeSprite, Animations.CHARGED_IDLE) ||
      isPlayingOrFinishedSwitchToChargedIdle(bladeSprite) ||
      isPlaying(bladeSprite, Animations.CHARGED_SWING)
    )
  ) {
    getPlayerStateData(player).charged = false;
  }

  if (player.IsExtraAnimationFinished() && isPlayerShooting(player) && canPlayerFireBlade(player, bladeSprite)) {
    // spawnFromPool(player);

    getAndUpdatePlayerBladeFireTime(player);
    let canDealDamage = true;

    if (
      (hitChainProgression === 1 && (isPlaying(bladeSprite, Animations.IDLE) || isPlayingOrFinishedSwitchToIdle(bladeSprite))) ||
      isFinished(bladeSprite, Animations.THIRD_SWING)
    ) {
      bladeSprite.Play(Animations.FIRST_SWING, true);
      hitChainProgression = 2;
      sfxManager.Play(SoundsCustom.SB_SMALL_SLICE, 1, 1, false);
      game.ShakeScreen(2);
    } else if (isPlaying(bladeSprite, Animations.CHARGED_IDLE) || isPlayingOrFinishedSwitchToChargedIdle(bladeSprite)) {
      bladeSprite.Play(Animations.CHARGED_SWING, true);
      hitChainProgression = 2;
      game.ShakeScreen(12);
      sfxManager.Play(SoundsCustom.SB_CHARGED_SLICE, 2, 0, false);
      sfxManager.Play(SoundEffect.EXPLOSION_WEAK, 0.8, 0, false);
      game.SpawnParticles(player.Position, EffectVariant.IMPACT, 25, 10);
    } else if (
      hitChainProgression === 2 &&
      (isFinished(bladeSprite, Animations.FIRST_SWING) ||
        isFinished(bladeSprite, Animations.CHARGED_SWING) ||
        isPlayingOrFinishedSwitchToIdle(bladeSprite) ||
        isPlayingOrFinishedIdle(bladeSprite))
    ) {
      bladeSprite.Play(Animations.SECOND_SWING, true);
      hitChainProgression = 3;
      sfxManager.Play(SoundsCustom.SB_SMALL_SLICE, 1, 0, false);
      game.ShakeScreen(3);
    } else if (
      hitChainProgression === 3 &&
      (isFinished(bladeSprite, Animations.SECOND_SWING) || isPlayingOrFinishedSwitchToIdle(bladeSprite) || isPlayingOrFinishedIdle(bladeSprite))
    ) {
      bladeSprite.Play(Animations.THIRD_SWING, true);
      hitChainProgression = 1;
      sfxManager.Play(SoundsCustom.SB_BIG_SLICE, 1.5, 1, false);
      game.ShakeScreen(5);
    } else {
      canDealDamage = false;
    }

    if (canDealDamage) {
      clearDamageState(player);
      const playerAimDir = player.GetAimDirection();
      getPlayerStateData(player).activeAimDirection = Vector(playerAimDir.X, playerAimDir.Y);
    }
  } else {
    // Player is idling.
    const { lastFireTime } = getPlayerStateData(player);

    if (lastFireTime >= 0) {
      if (
        game.GetFrameCount() - lastFireTime > getActualTimeToGoIdle(player) &&
        !(
          isPlaying(bladeSprite, Animations.FIRST_SWING) ||
          isPlaying(bladeSprite, Animations.SECOND_SWING) ||
          isPlaying(bladeSprite, Animations.THIRD_SWING) ||
          isPlaying(bladeSprite, Animations.CHARGED_SWING) ||
          isPlaying(bladeSprite, Animations.IDLE) ||
          isPlaying(bladeSprite, Animations.SWITCH_IDLE) ||
          isPlaying(bladeSprite, Animations.CHARGED_IDLE) ||
          isPlayingOrFinishedSwitchToChargedIdle(bladeSprite)
        )
      ) {
        clearDamageState(player);
        getPlayerStateData(player).hitChainProgression = 1;
        if (!isPlaying(bladeSprite, Animations.SWITCH_IDLE)) {
          bladeSprite.Play(Animations.SWITCH_IDLE, false);
        }

        if (isFinished(bladeSprite, Animations.SWITCH_IDLE)) {
          bladeSprite.Play(Animations.IDLE, true);
        }
      }

      const chargeTime = getChargeTime(player);
      if (
        game.GetFrameCount() - lastFireTime > chargeTime &&
        ((!isPlaying(bladeSprite, Animations.CHARGED_IDLE) && !isPlaying(bladeSprite, Animations.SWITCH_CHARGED_IDLE)) ||
          isFinished(bladeSprite, Animations.SWITCH_CHARGED_IDLE))
      ) {
        getPlayerStateData(player).charged = true;
        if (!isPlayingOrFinishedSwitchToChargedIdle(bladeSprite)) {
          bladeSprite.Play(Animations.SWITCH_CHARGED_IDLE, false);
          sfxManager.Play(SoundsCustom.SB_CHARGED_UP, 2, 0);
        }

        if (isFinished(bladeSprite, Animations.SWITCH_CHARGED_IDLE)) {
          bladeSprite.Play(Animations.CHARGED_IDLE, true);
        }
      }
    }
  }

  if (isPlayerInAttackState(bladeSprite)) {
    const frameIndexes = Tuneable.hitStateFrames.get(getPlayerStateData(player).hitChainProgression);
    const canHitThisFrame = frameIndexes?.includes(bladeSprite.GetFrame());

    if (canHitThisFrame ?? false) {
      const targets = getHitTargetsInsideArea(player, player.Position, player.GetAimDirection(), getBladePhysicalRange(player));

      dealSamuraiBladeDamage(player, isHitCritical(player), targets);

      // if it is the first frame of the swing animation, allow item pickups
      if (modStateData.configBladePicksUpItems && frameIndexes && frameIndexes[0] === bladeSprite.GetFrame()) {
        pickupBasics(player, targets);
      }
    }
  }

  if (hasPlayerExitedAttackState(bladeSprite)) {
    const nextHitChainState = getNextPlayerStateFromAnimation(bladeSprite);
    getPlayerStateData(player).hitChainProgression = nextHitChainState;
  }
}

function spawnItemFirstFrame() {
  if (game.GetFrameCount() === 1) {
    Isaac.Spawn(EntityType.PICKUP, PickupVariant.COLLECTIBLE, CollectibleTypeCustom.SB_SAMURAI_BLADE, Vector(320, 300), Vector(0, 0), undefined);
  }
}

function disableShooting(player: EntityPlayer) {
  if (modStateData.configTearFiringBehaviour == TearFiringBehaviour.FIRE_DELAY_HACK) {
    player.FireDelay = player.MaxFireDelay + 1;
    player.UpdateCanShoot();
  }
}
