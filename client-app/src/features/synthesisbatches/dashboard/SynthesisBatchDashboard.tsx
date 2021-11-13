import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import SynthesisBatchDetails from '../details/SynthesisBatchDetails';
import SynthesisBatchForm from '../form/SynthesisBatchForm';
import SynthesisBatchList from './SynthesisBatchList';

export default observer ( function SynthesisBatchDashboard() {

    const {synthesisBatchStore} = useStore();
    const {selectedSynthesisBatch, editMode} = synthesisBatchStore;

    return (
        <Grid>
            <Grid.Column width='10'>
            <SynthesisBatchList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedSynthesisBatch && !editMode &&
                <SynthesisBatchDetails />}
                {editMode &&
                <SynthesisBatchForm />}
            </Grid.Column>
        </Grid>
    )
})