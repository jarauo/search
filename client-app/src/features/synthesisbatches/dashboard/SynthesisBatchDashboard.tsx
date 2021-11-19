import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import SynthesisBatchList from './SynthesisBatchList';

export default observer ( function SynthesisBatchDashboard() {
    const {synthesisBatchStore} = useStore();
    const {loadSynthesisBatches, synthesisBatchRegistry} = synthesisBatchStore;

  useEffect(() => {
    if (synthesisBatchRegistry.size <= 1) loadSynthesisBatches();
  },[synthesisBatchRegistry.size, loadSynthesisBatches])

  if (synthesisBatchStore.loadingInitial) return <LoadingComponent content='Loading app'/>

    return (
        <Grid>
            <Grid.Column width='10'>
            <SynthesisBatchList />
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>SynthesisBatchFilter</h2>
            </Grid.Column>
        </Grid>
    )
})