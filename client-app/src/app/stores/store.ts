import { createContext, useContext } from "react";
import SynthesisBatchStore from "./synthesisBatchStore";

interface Store {
    synthesisBatchStore: SynthesisBatchStore
}

export const store: Store = {
    synthesisBatchStore: new SynthesisBatchStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}