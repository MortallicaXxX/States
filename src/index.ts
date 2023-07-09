export class State<T>{
    #_mutation_callback_stack:Map<string,{
        target:HTMLElement;
        callback:(value:T) => void;
    }> = new Map();
    #_value:T;
    get value(){return this.#_value;}

    constructor(value){
        this.#_value = value;
    }

    #_update = (value) => {
        this.#_value = value;
        return this.#_value;
    }

    #_mutationCallback = (value:T) => {
        Array.from( [...this.#_mutation_callback_stack.keys()] , async (key) => {
            const option = this.#_mutation_callback_stack.get(key);
            if((option as any).target.ownerDocument && (option as any).target.ownerDocument.contains((option as any).target))(option as any).callback(value);
            else this.#_mutation_callback_stack.delete(key);
        } )
    } 

    get mutator(){return [this,(value)=>{
        this.#_mutationCallback(value);
        return this.#_update(value);
    }]}

    subscribe = (referenceElement:HTMLElement , callback:(value:T) => void):string|null => {
        if(typeof callback != 'function')return null;
        const mutationListerId = crypto.randomUUID();
        this.#_mutation_callback_stack.set(mutationListerId , {
            get target(){return referenceElement},
            callback
        });
        return mutationListerId;
    }

    unsubscribe = (mutationListerId:string) => {
        return ( this.#_mutation_callback_stack.has(mutationListerId) ? this.#_mutation_callback_stack.delete(mutationListerId) : null )
    }
}

const states = new class States{

    #_states:Map<number,State<any>> = new Map();
    get list(){ 
        return Array.from([...this.#_states.values()] as State<any>[] , (state , iterator) => {
            console.log(state.value)
            return { value : state.value }
        });
    }
    set<T>(value){
        this.#_states.set(this.#_states.size , new State<T>(value));
        let iterator = this.#_states.size - 1;
        return (this.#_states as any).get(iterator).mutator;
    }
    get get(){return this.#_states.get}

}();

export const listStates = () => {
    console.table(states.list);
}

export function useState<T>(arg:T):[State<T>,(value:T)=>T]{
    return states.set(arg);
}