import { Direction } from "isaac-typescript-definitions";
import { game, getPlayers } from "isaacscript-common";
import { getPlayerStateData } from "../../../data/StateData";
import { Tuneable } from "../../../data/Tuneable";
import {
  Animations,
  isFinished,
  isPlaying,
  isPlayingOrFinishedChargedIdle,
  isPlayingOrFinishedChargedSwing,
  isPlayingOrFinishedFirstSwing,
  isPlayingOrFinishedIdle,
  isPlayingOrFinishedSwitchToChargedIdle,
  isPlayingOrFinishedSwitchToIdle,
} from "../../../helpers/AnimationHelpers";
import { getBladeSpriteScaleFromStats } from "../../../helpers/BladeHelpers";
import { playerHasSamuraisBladeItem } from "../../../helpers/Helpers";

export function renderBlades(): void {
  if (game.IsPaused() || ModConfigMenu?.IsVisible) return;

  const realPlayers = getPlayers();
  for (const player of realPlayers) {
    if (!playerHasSamuraisBladeItem(player) || game.IsPaused()) {
      return;
    }

    const { bladeSprite, holsterSprite } = getPlayerStateData(player);

    renderUserBlade(bladeSprite, player);

    if (
      !(
        isPlayingOrFinishedIdle(bladeSprite) ||
        isPlayingOrFinishedSwitchToIdle(bladeSprite) ||
        isPlaying(bladeSprite, Animations.CHARGED_IDLE) ||
        isPlayingOrFinishedSwitchToChargedIdle(bladeSprite)
      )
    ) {
      renderUserEmptyHolster(holsterSprite, player);
    }
  }
}

function renderUserBlade(sprite: Sprite, player: EntityPlayer) {
  const isInMirror = game.GetRoom().IsMirrorWorld();
  if (
    !(
      isPlaying(sprite, Animations.IDLE) ||
      isPlayingOrFinishedSwitchToIdle(sprite) ||
      isPlayingOrFinishedChargedIdle(sprite) ||
      isPlayingOrFinishedSwitchToChargedIdle(sprite) ||
      isPlaying(sprite, Animations.CHARGED_IDLE) ||
      isFinished(sprite, Animations.FIRST_SWING) ||
      isFinished(sprite, Animations.SECOND_SWING) ||
      isFinished(sprite, Animations.THIRD_SWING) ||
      isFinished(sprite, Animations.CHARGED_SWING)
    )
  ) {
    sprite.FlipX = isInMirror;
    sprite.Scale = getBladeSpriteScaleFromStats(player);
    sprite.Offset = Vector(0, -8).add(getPlayerStateData(player).activeAimDirection);
  } else {
    sprite.Rotation = 25;
    sprite.Scale = Tuneable.IdleSize;

    const hDir = player.GetHeadDirection();
    if ((hDir !== Direction.RIGHT && !isInMirror) || (hDir === Direction.RIGHT && isInMirror)) {
      sprite.FlipX = true;
      if (isPlayingOrFinishedSwitchToIdle(sprite) || isPlayingOrFinishedSwitchToChargedIdle(sprite) || isPlaying(sprite, Animations.CHARGED_IDLE)) {
        sprite.Offset = Vector(-110, 53);
      } else {
        sprite.Offset = Vector(-5, 3);
      }
    } else {
      sprite.FlipX = false;
      sprite.Offset = Vector(0, -3);
    }
  }
  const playerPos = player.Position;
  const worldPos = Vector(
    !isInMirror ? playerPos.X : -(playerPos.X - 640), // Just don't ask about the math here, it is ugly.
    playerPos.Y,
  );
  sprite.Render(Isaac.WorldToScreen(worldPos));
  if (sprite.GetFrame() === -1) {
    sprite.Play(sprite.GetDefaultAnimation(), false);
    sprite.PlaybackSpeed = 0.5;
  }

  if (isPlayingOrFinishedChargedSwing(sprite) || isPlayingOrFinishedChargedIdle(sprite) || isPlayingOrFinishedFirstSwing(sprite)) {
    sprite.Offset = Vector(-5, 3);
  }

  // game.GetRoom().GetGridWidth();

  updateVisualState(player, sprite);
  sprite.Update();
}

function renderUserEmptyHolster(sprite: Sprite, player: EntityPlayer) {
  const isInMirror = game.GetRoom().IsMirrorWorld();
  const playerPos = player.Position;
  const worldPos = Vector(
    !isInMirror ? playerPos.X : -(playerPos.X - 640), // Just don't ask about the math here, it is ugly.
    playerPos.Y,
  );
  sprite.RenderLayer(5, Isaac.WorldToScreen(worldPos));
  if (sprite.GetFrame() === -1) {
    sprite.Play("EmptyHolsterOverlay", true);
  }
  sprite.Rotation = 25;
  sprite.Scale = Tuneable.IdleSize;

  const hDir = player.GetHeadDirection();
  if ((hDir !== Direction.RIGHT && !isInMirror) || (hDir === Direction.RIGHT && isInMirror)) {
    sprite.FlipX = true;
    sprite.Offset = Vector(-110, 53);
  } else {
    sprite.FlipX = false;
    sprite.Offset = Vector(0, -3);
  }

  // Look at swing direction.
  if ((getPlayerStateData(player).activeAimDirection.X < 0 && !isInMirror) || (getPlayerStateData(player).activeAimDirection.X > 0 && isInMirror)) {
    sprite.FlipX = true;
    sprite.Offset = Vector(-110, 53);
  } else if (getPlayerStateData(player).activeAimDirection.X > 0) {
    sprite.FlipX = false;
    sprite.Offset = Vector(0, -3);
  }

  sprite.Update();
}

export function updateVisualState(player: EntityPlayer, sprite: Sprite): void {
  let rotation = 0;
  const aimDir = getPlayerStateData(player).activeAimDirection;
  if (aimDir.X < 0) {
    rotation = 57.29578 * math.atan(-(aimDir.Y / aimDir.X)) + 90;
    rotation *= -1;
  } else {
    rotation = 57.29578 * math.atan(aimDir.Y / aimDir.X) + 90;
  }
  sprite.Rotation = rotation;
}
