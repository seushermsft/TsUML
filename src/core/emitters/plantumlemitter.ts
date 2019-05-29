import { PropertyDetails, MethodDetails, HeritageClause, IEmitter } from "../interfaces";
import { join } from "lodash";

export class PlantUmlEmitter implements IEmitter  {

    emitSingleClass(name: string, properties: PropertyDetails[], methods: MethodDetails[]) {
        return PlantUmlEmitter.templates.class(name, properties, methods);
    }

    emitSingleInterface(name: string, properties: PropertyDetails[], methods: MethodDetails[]) {
        return PlantUmlEmitter.templates.interface(name);
    }
    
    emitHeritageClauses(heritageClauses: HeritageClause[]) {
        return heritageClauses.map((heritageClause) =>
            PlantUmlEmitter.templates.implementsOrExtends(heritageClause.clause, heritageClause.className)
        );
    }

    postProcess(x :(string | string[])[]) {
        return join(x, "\n")
    }

    static templates = {
        implementsOrExtends: (abstraction: string, implementation: string) => {
            return (
            `${PlantUmlEmitter.templates.plainClassOrInterface(abstraction)} ` +
            `<|-- ${PlantUmlEmitter.templates.plainClassOrInterface(implementation)} \n`
            );
        },
        plainClassOrInterface: (name: string) => `${name}`,
        colorClass: (name: string) => `${name}`,
        colorInterface: (name: string) => `interface ${name}`,
        class: (name: string, props: PropertyDetails[], methods: MethodDetails[]) => {
            const pTemplate = (property: PropertyDetails) => `${property.name}`;
            const mTemplate = (method: MethodDetails) => `${method.name}()`;
            return (
            `class ${PlantUmlEmitter.templates.colorClass(name)} {\n` +
            `${props.map(pTemplate).join("\n")}\n` + `${methods.map(mTemplate).join("\n")}\n` + "} \n"
            );
        },
        interface: (
            name: string
        ) => {
            return (
            `${PlantUmlEmitter.templates.colorInterface(name)}\n`
            );
        }
    };
}
