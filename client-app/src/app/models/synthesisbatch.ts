export interface SynthesisBatch {
    id: string;
    batchNumber: string;
    date: Date | null;
    startTime: string;
    endTime: string;
    targetryPerson: string;
    synthesisPerson: string;
    qcPerson: string;
    releaser: string;
    cyclotron: string;
}