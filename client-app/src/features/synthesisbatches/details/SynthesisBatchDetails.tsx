import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import SynthesisBatchDetailedChat from './SynthesisBatchDetailedChat';
import SynthesisBatchDetailedHeader from './SynthesisBatchDetailedHeader';
import SynthesisBatchDetailedInfo from './SynthesisBatchDetailedInfo';
import SynthesisBatchDetailedSidebar from './SynthesisBatchDetailedSidebar';

export default observer (function SynthesisBatchDetails() {

    const {synthesisBatchStore} = useStore();
    const {selectedSynthesisBatch: synthesisbatch, loadSynthesisBatch, loadingInitial} = synthesisBatchStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadSynthesisBatch(id);
    }, [id, loadSynthesisBatch]);

    if (loadingInitial || !synthesisbatch) return <LoadingComponent />;

    return(
        <Grid>
            <Grid.Column width={10}>
                <SynthesisBatchDetailedHeader synthesisBatch={synthesisbatch}/>
                <SynthesisBatchDetailedInfo synthesisBatch={synthesisbatch}/>
                <SynthesisBatchDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <SynthesisBatchDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})