import {flog} from "../../helpers/DebugHelper";
import {BladeScalingUpgradeType} from "../../items/samuraiBlade/scaling/BladeScalingUpgradeType";
import {CachePosition} from "../../items/samuraiBlade/scaling/CachePosition";
import {SaveDataSource} from "./SaveDataSource";
import {AnyClass} from "isaacscript-common/src/types/AnyClass";




const saveDataObject = {
    persistent: {},
    run: {
        loaded: false,
        damageDealt: new Map<number, number>(), // Controller Index, damage dealt pairs.
        scalingStateCache: new Map<number, Map<BladeScalingUpgradeType, CachePosition>>()
    },
    room: {},
    level: {},
};


export class ScalingDataSource implements SaveDataSource {

    getCustomClasses(): AnyClass[] {
        return [CachePosition];
    }

    getNamespace(): string {
        return "bladeProgressionData";
    }

    getSaveData(): object {
        return saveDataObject;
    }

}


export function getScalingStateCache(): Map<number, Map<BladeScalingUpgradeType, CachePosition>> {
    return saveDataObject.run.scalingStateCache;
}


export function getTotalDamageDealt(controllerIndex: number): number {
    const value = saveDataObject.run.damageDealt.get(controllerIndex);
    return value ? value : 0;
}

export function increaseDamageDealt(controllerIndex: number, amount: number): void {
    const value = saveDataObject.run.damageDealt.get(controllerIndex);
    if (value) {
        saveDataObject.run.damageDealt.set(controllerIndex, value + amount);
    } else {
        saveDataObject.run.damageDealt.set(controllerIndex, amount);
    }
    flog(`DAMAGE DEALT: ${saveDataObject.run.damageDealt.get(controllerIndex)}, LOADED: ${saveDataObject.run.loaded}`, `[PERSISTENT BLADE DATA]`);
}
