import {TearFiringBehaviour} from "../../enums/TearFiringBehaviour";
import {LineOfSightCheckBehaviour} from "../../enums/LineOfSightCheckBehaviour";


export const configDataObject = {
    persistent: {
        configSpawnItemInFirstRoom: false,
        configPrintDebugInfo: false,
        configParticleMultiplier: 0.8,
        configTearFiringBehaviour: TearFiringBehaviour.FIRE_DELAY_HACK,
        configAdjustmentDamageMultiplier: 1.0,
        configAdjustmentRangeMultiplier: 1.0,
        configLineOfSightCheck: LineOfSightCheckBehaviour.SOFT,
        configBladePicksUpItems: true,
        configHudPosition: 0,
    },
    run: {},
    room: {},
    level: {},
};
