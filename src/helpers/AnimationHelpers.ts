export enum Animations {
  IDLE = "Idle",
  SWITCH_IDLE = "SwitchToIdle",
  CHARGED_IDLE = "ChargedIdle",
  SWITCH_CHARGED_IDLE = "SwitchToChargedIdle",
  FIRST_SWING = "FirstSwing",
  SECOND_SWING = "SecondSwing",
  THIRD_SWING = "ThirdSwing",
  CHARGED_SWING = "ChargedSwing",
}

export function isPlaying(sprite: Sprite, animation: Animations): boolean {
  return sprite.IsPlaying(animation);
}

export function isFinished(sprite: Sprite, animation: Animations): boolean {
  return sprite.IsFinished(animation);
}

export function isPlayingOrFinished(sprite: Sprite, animation: Animations): boolean {
  return isPlaying(sprite, animation) || isFinished(sprite, animation);
}

export function isPlayingOrFinishedIdle(sprite: Sprite): boolean {
  return isPlayingOrFinished(sprite, Animations.IDLE);
}

export function isPlayingOrFinishedSwitchToIdle(sprite: Sprite): boolean {
  return isPlayingOrFinished(sprite, Animations.SWITCH_IDLE);
}

export function isPlayingOrFinishedChargedIdle(sprite: Sprite): boolean {
  return isPlayingOrFinished(sprite, Animations.CHARGED_IDLE);
}

export function isPlayingOrFinishedSwitchToChargedIdle(sprite: Sprite): boolean {
  return isPlayingOrFinished(sprite, Animations.SWITCH_CHARGED_IDLE);
}

export function isPlayingOrFinishedFirstSwing(sprite: Sprite): boolean {
  return isPlayingOrFinished(sprite, Animations.FIRST_SWING);
}

export function isPlayingOrFinishedSecondSwing(sprite: Sprite): boolean {
  return isPlayingOrFinished(sprite, Animations.SECOND_SWING);
}

export function isPlayingOrFinishedThirdSwing(sprite: Sprite): boolean {
  return isPlayingOrFinished(sprite, Animations.THIRD_SWING);
}

export function isPlayingOrFinishedChargedSwing(sprite: Sprite): boolean {
  return isPlayingOrFinished(sprite, Animations.CHARGED_SWING);
}
