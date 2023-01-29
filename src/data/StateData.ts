interface PlayerState {
  bladeSprite: Sprite;
  holsterSprite: Sprite;
  lastFireTime: float;
  hitChainProgression: int;
  activeAimDirection: Vector;
  charged: boolean;

  hitStateEntities: number[]; // Entity indexes.
}

const StateData = new Map<int, PlayerState>();

export function getStateData(): Map<int, PlayerState> {
  return StateData;
}

export function flushAllStateData(): void {
  StateData.clear();
}

export function getPlayerStateData(player: EntityPlayer): PlayerState {
  let playerData = getStateData().get(player.Index);

  // Data doesn't exist, add it.
  if (playerData === undefined) {
    playerData = {
      bladeSprite: Sprite(),
      holsterSprite: Sprite(),
      lastFireTime: -1,
      hitChainProgression: 1,
      activeAimDirection: Vector(0, 0),
      charged: false,
      hitStateEntities: [],
    };

    // Load sprite data.
    playerData.bladeSprite.Load("gfx/animation/BladeAnim.anm2", true);
    playerData.holsterSprite.Load("gfx/animation/BladeAnim.anm2", true);

    getStateData().set(player.Index, playerData);
  }

  return playerData;
}

export function getPlayerStateDataNoCreate(player: EntityPlayer): PlayerState | undefined {
  return getStateData().get(player.Index);
}
