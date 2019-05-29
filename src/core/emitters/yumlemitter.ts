import { PropertyDetails, MethodDetails, HeritageClause, IEmitter } from "../interfaces";
import { join } from "lodash";

export class YumlEmitter implements IEmitter {
    emitSingleClass(name: string, properties: PropertyDetails[], methods: MethodDetails[]) {
        return YumlEmitter.templates.class(name, properties, methods);
    }

    emitSingleInterface(name: string, properties: PropertyDetails[], methods: MethodDetails[]) {
        return YumlEmitter.templates.interface(name, properties, methods);
    }
    
    emitHeritageClauses(heritageClauses: HeritageClause[]) {
        return heritageClauses.map((heritageClause) =>
            YumlEmitter.templates.implementsOrExtends(heritageClause.clause, heritageClause.className)
        );
    }

    postProcess(x :(string | string[])[]) {
        return join(x, ",")
    }

    static templates = {
        composition: "+->",
        implementsOrExtends: (abstraction: string, implementation: string) => {
            return (
            `${YumlEmitter.templates.plainClassOrInterface(abstraction)}` +
            `^-${YumlEmitter.templates.plainClassOrInterface(implementation)}`
            );
        },
        plainClassOrInterface: (name: string) => `[${name}]`,
        colorClass: (name: string) => `[${name}{bg:skyblue}]`,
        colorInterface: (name: string) => `[${name}{bg:palegreen}]`,
        class: (name: string, props: PropertyDetails[], methods: MethodDetails[]) => {
            const pTemplate = (property: PropertyDetails) => `${property.name};`;
            const mTemplate = (method: MethodDetails) => `${method.name}();`;
            return (
            `${YumlEmitter.templates.colorClass(name)}` +
            `[${name}|${props.map(pTemplate).join("")}|${methods.map(mTemplate).join("")}]`
            );
        },
        interface: (
            name: string,
            props: PropertyDetails[],
            methods: MethodDetails[]
        ) => {
            const pTemplate = (property: PropertyDetails) => `${property.name};`;
            const mTemplate = (method: MethodDetails) => `${method.name}();`;
            return (
            `${YumlEmitter.templates.colorInterface(name)}` +
            `[${name}|${props.map(pTemplate).join("")}|${methods.map(mTemplate).join("")}]`
            );
        }
    };
}
