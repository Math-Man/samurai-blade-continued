import {SaveDataSource} from "./SaveDataSource";
import {ConfigDataSource} from "./ConfigSaveDataHandler";
import {ScalingDataSource} from "./SaveDataHandler";
import {mod} from "../../Mod";

const sources: SaveDataSource[] = [
    new ConfigDataSource(),
    new ScalingDataSource()
]

export class SaveDataManager {

    static #instance: SaveDataManager;

    private constructor() {
    }

    public static get instance(): SaveDataManager {
        if (!SaveDataManager.#instance) {
            SaveDataManager.#instance = new SaveDataManager();
        }
        return SaveDataManager.#instance;
    }

    public register(): void {
        sources.forEach(source => {
            mod.saveDataManager(source.getNamespace(), source.getSaveData());
            mod.saveDataManagerRegisterClass(...source.getCustomClasses());
        });
    }

}