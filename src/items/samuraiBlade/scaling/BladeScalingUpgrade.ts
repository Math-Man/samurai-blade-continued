import { BladeScalingUpgradeType } from "./BladeScalingUpgradeType";

export class BladeScalingUpgrade {
  private _type: BladeScalingUpgradeType;
  private _value: number;

  constructor(type: BladeScalingUpgradeType, value: number) {
    this._type = type;
    this._value = value;
  }

  get type(): BladeScalingUpgradeType {
    return this._type;
  }

  get value(): number {
    return this._value;
  }
}
