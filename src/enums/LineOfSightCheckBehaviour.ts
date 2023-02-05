export enum LineOfSightCheckBehaviour {
  NORMAL = 0,
  IGNORED = 1,
}

export function LOSCheckBehaviourAsString(behaviour: LineOfSightCheckBehaviour): string {
  switch (behaviour) {
    case LineOfSightCheckBehaviour.NORMAL:
      return "Check";
    case LineOfSightCheckBehaviour.IGNORED:
      return "Ignore";
  }
}
