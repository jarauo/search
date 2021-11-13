import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { SynthesisBatch } from "../models/synthesisbatch";
import {v4 as uuid} from 'uuid';

export default class SynthesisBatchStore {
    synthesisBatchRegistry = new Map<string, SynthesisBatch>();
    selectedSynthesisBatch: SynthesisBatch | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;


    constructor() {
        makeAutoObservable(this)
    }

    get synthesisBatchesByStartTime() {
        return Array.from(this.synthesisBatchRegistry.values()).sort((a, b) => 
            Date.parse(a.startTime) - Date.parse(b.startTime));
    }

    loadSynthesisBatches = async () => {
        try {
            const synthesisBatches = await agent.SynthesisBatches.list();
            synthesisBatches.forEach(synthesisbatch => {
                synthesisbatch.date = "1/1/2021";
                this.synthesisBatchRegistry.set(synthesisbatch.id, synthesisbatch);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(true);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    selectSynthesisBatch = (id: string) => {
        this.selectedSynthesisBatch = this.synthesisBatchRegistry.get(id);
    }

    cancelSelectedSynthesisBatch = () => {
        this.selectedSynthesisBatch = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectSynthesisBatch(id) : this.cancelSelectedSynthesisBatch();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createSynthesisBatch = async (synthesisbatch: SynthesisBatch) => {
        this.loading = true;
        synthesisbatch.id = uuid();
        try {
            await agent.SynthesisBatches.create(synthesisbatch);
            runInAction(() => {
                this.synthesisBatchRegistry.set(synthesisbatch.id, synthesisbatch);
                this.selectedSynthesisBatch = synthesisbatch;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;

            })
        }
    }

    updateSynthesisBatch = async (synthesisBatch: SynthesisBatch) => {
        this.loading = true;
        try {
            await agent.SynthesisBatches.update(synthesisBatch);
            runInAction(() => {
                this.synthesisBatchRegistry.set(synthesisBatch.id, synthesisBatch);
                this.selectedSynthesisBatch = synthesisBatch;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteSynthesisBatch = async (id: string) => {
        this.loading = true;
        try {
            await agent.SynthesisBatches.delete(id);
            runInAction(() => {
                this.synthesisBatchRegistry.delete(id);
                if (this.selectedSynthesisBatch?.id === id) this.cancelSelectedSynthesisBatch();
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }
}