export enum TearFiringBehaviour {
  FIRE_DELAY_HACK = 0,
  FIRE_TEARS_NORMAL = 1,
}

export function TearFiringBehaviourAsString(behaviour: TearFiringBehaviour): string {
  switch (behaviour) {
    case TearFiringBehaviour.FIRE_DELAY_HACK:
      return "Use Fire Delay Hack";
    case TearFiringBehaviour.FIRE_TEARS_NORMAL:
      return "Can fire tears";
  }
}
