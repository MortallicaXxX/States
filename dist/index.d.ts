export declare class State<T> {
    #private;
    get value(): T;
    constructor(value: any);
    get mutator(): (this | ((value: any) => T))[];
    subscribe: (referenceElement: HTMLElement, callback: (value: T) => void) => string | null;
    unsubscribe: (mutationListerId: string) => boolean;
}
export declare const listStates: () => void;
export declare function useState<T>(arg: T): [State<T>, (value: T) => T];
