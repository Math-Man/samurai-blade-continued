import {AnyClass} from "isaacscript-common/src/types/AnyClass";

export interface SaveDataSource {
    getNamespace(): string;

    getSaveData(): object;

    getCustomClasses(): AnyClass[];
}