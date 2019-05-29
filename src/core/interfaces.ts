export interface MethodDetails {
    name: string;
}

export interface PropertyDetails {
    name: string;
}

export interface HeritageClause {
    clause: string;
    className: string;
}

export interface IEmitter {
    emitSingleClass(name: string, properties: PropertyDetails[], methods: MethodDetails[]): string;

    emitSingleInterface(name: string, properties: PropertyDetails[], methods: MethodDetails[]): string;

    emitHeritageClauses(heritageClauses: HeritageClause[]): string[];

    postProcess(x :(string | string[])[]): string;
}