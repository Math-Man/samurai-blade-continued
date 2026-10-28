export enum PickupBehaviour {
  NONE = 0,
  ITEMS = 1,
  ITEMS_AND_CHESTS = 2,
}

export function PickupBehaviourAsString(behaviour: PickupBehaviour): string {
  switch (behaviour) {
    case PickupBehaviour.NONE:
      return "None";
    case PickupBehaviour.ITEMS:
      return "Items";
    case PickupBehaviour.ITEMS_AND_CHESTS:
      return "Items and chests";
  }
}
