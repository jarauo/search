import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import SynthesisBatchStore from "./synthesisBatchStore";

interface Store {
    synthesisBatchStore: SynthesisBatchStore
    commonStore: CommonStore;
}

export const store: Store = {
    synthesisBatchStore: new SynthesisBatchStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}