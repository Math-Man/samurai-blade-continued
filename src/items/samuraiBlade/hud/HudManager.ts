const HudSpritesSets = new Map<number, PlayerSpriteSet>();

export class PlayerSpriteSet {
  controllerIndex: number;
  progressBarSprite: Sprite;

  constructor(controllerIndex: number) {
    this.controllerIndex = controllerIndex;

    this.progressBarSprite = Sprite();
    this.progressBarSprite.Scale = Vector(0.9, 0.9);
    this.progressBarSprite.Load("gfx/animation/HudProgressBar.anm2", true);
    this.progressBarSprite.Play("ChargeBar", true);
  }
}

export function getAllSpriteSets(): PlayerSpriteSet[] {
  return Array.from(HudSpritesSets.values());
}

export function getHudSpritesSet(controllerIndex: number): PlayerSpriteSet {
  if (HudSpritesSets.has(controllerIndex)) {
    // @ts-ignore
    return HudSpritesSets.get(controllerIndex);
  } else {
    const spriteSet = new PlayerSpriteSet(controllerIndex);
    HudSpritesSets.set(controllerIndex, spriteSet);
    return spriteSet;
  }
}
