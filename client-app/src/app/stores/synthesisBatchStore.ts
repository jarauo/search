import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { SynthesisBatch } from "../models/synthesisbatch";

export default class SynthesisBatchStore {
    synthesisBatchRegistry = new Map<string, SynthesisBatch>();
    selectedSynthesisBatch: SynthesisBatch | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;


    constructor() {
        makeAutoObservable(this)
    }

    get synthesisBatchesByStartTime() {
        return Array.from(this.synthesisBatchRegistry.values()).sort((a, b) => 
            Date.parse(a.startTime) - Date.parse(b.startTime));
            //Date.parse(a.date) - Date.parse(b.date));
    }

    get synthesisBatchesByDate() {
        return Array.from(this.synthesisBatchRegistry.values()).sort((a,b) =>
            a.date!.getDate() - b.date!.getDate());
    }

    get groupedSynthesisBatches() {
        return Object.entries(
            this.synthesisBatchesByDate.reduce((synthesisBatches, synthesisbatch) => {
                const date = format(synthesisbatch.date!, 'dd.MM.yyyy');
                synthesisBatches[date] = synthesisBatches[date] ? [...synthesisBatches[date], synthesisbatch] : [synthesisbatch];
                return synthesisBatches;
            }, {} as {[key: string]: SynthesisBatch[]})
        )
    }

    loadSynthesisBatches = async () => {
        this.loadingInitial = true;
        try {
            const synthesisBatches = await agent.SynthesisBatches.list();
            synthesisBatches.forEach(synthesisbatch => {
                this.setSynthesisBatch(synthesisbatch);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(true);
        }
    }

    loadSynthesisBatch = async (id: string) => {
        let synthesisBatch = this.getSynthesisBatch(id);
        if (synthesisBatch) {
            this.selectedSynthesisBatch = synthesisBatch;
            return synthesisBatch;
        } else {
            this.loadingInitial = true;
            try {
                synthesisBatch = await agent.SynthesisBatches.details(id);
                this.setSynthesisBatch(synthesisBatch);
                runInAction(() => {
                    this.selectedSynthesisBatch = synthesisBatch;
                })
                this.setLoadingInitial(false);
                return synthesisBatch;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setSynthesisBatch = (synthesisbatch: SynthesisBatch) => {
        synthesisbatch.date = new Date(synthesisbatch.date!);
        this.synthesisBatchRegistry.set(synthesisbatch.id, synthesisbatch);
    }

    private getSynthesisBatch = (id: string) => {
        return this.synthesisBatchRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createSynthesisBatch = async (synthesisbatch: SynthesisBatch) => {
        this.loading = true;
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