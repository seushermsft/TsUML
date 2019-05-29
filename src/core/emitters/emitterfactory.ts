import { IEmitter } from "../interfaces";
import { YumlEmitter } from "./yumlemitter";
import { PlantUmlEmitter } from "./plantumlemitter";

export class EmitterFactory {

    static getEmitter(emitter: string): IEmitter {

        switch (emitter) {
            case EmitterType.yuml.toString():
                return new YumlEmitter();
            case EmitterType.plantuml.toString():
                return new PlantUmlEmitter();
            default:
                throw new Error(`No emitter found of type ${emitter}`);
        }
    }
}

export enum EmitterType {
    yuml = "yuml",
    plantuml = "plantuml"
}