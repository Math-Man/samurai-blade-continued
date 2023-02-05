export enum LineOfSightCheckBehaviour {
  SOFT = 0,
  IGNORED = 1,
  NORMAL = 2,
}

export function LOSCheckBehaviourAsString(behaviour: LineOfSightCheckBehaviour): string {
  switch (behaviour) {
    case LineOfSightCheckBehaviour.SOFT:
      return "Soft-Check";
    case LineOfSightCheckBehaviour.IGNORED:
      return "Ignore";
    case LineOfSightCheckBehaviour.NORMAL:
      return "Normal";
  }
}
