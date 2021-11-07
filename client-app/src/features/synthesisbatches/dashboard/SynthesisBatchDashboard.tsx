import React from 'react';
import { Grid } from 'semantic-ui-react';
import { SynthesisBatch } from '../../../app/models/synthesisbatch';
import SynthesisBatchDetails from '../details/SynthesisBatchDetails';
import SynthesisBatchForm from '../form/SynthesisBatchForm';
import SynthesisBatchList from './SynthesisBatchList';

interface Props {
    synthesisbatches: SynthesisBatch[];
    selectedSynthesisBatch: SynthesisBatch | undefined;
    selectSynthesisBatch: (id: string) => void;
    cancelSelectSynthesisBatch: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (synthesisbatch: SynthesisBatch) => void;
    deleteSynthesisBatch: (id: string) => void;
    submitting: boolean;
}

export default function SynthesisBatchDashboard({synthesisbatches, selectedSynthesisBatch, selectSynthesisBatch, 
        cancelSelectSynthesisBatch, editMode, openForm, closeForm, createOrEdit, deleteSynthesisBatch, submitting}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
            <SynthesisBatchList synthesisbatches={synthesisbatches} 
                selectSynthesisBatch={selectSynthesisBatch}
                deleteSynthesisBatch={deleteSynthesisBatch}
                submitting={submitting}
            />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedSynthesisBatch && !editMode &&
                <SynthesisBatchDetails 
                    synthesisbatch={selectedSynthesisBatch} 
                    cancelSelectSynthesisBatch={cancelSelectSynthesisBatch}
                    openForm={openForm}

                />}
                {editMode &&
                <SynthesisBatchForm 
                    closeForm={closeForm} 
                    synthesisbatch={selectedSynthesisBatch} 
                    createOrEdit={createOrEdit}
                    submitting={submitting}
                />}
            </Grid.Column>
        </Grid>
    )
}