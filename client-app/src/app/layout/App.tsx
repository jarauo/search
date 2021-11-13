import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import SynthesisBatchDashboard from '../../features/synthesisbatches/dashboard/SynthesisBatchDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {synthesisBatchStore} = useStore();

  useEffect(() => {
    synthesisBatchStore.loadSynthesisBatches();
  },[synthesisBatchStore])

  if (synthesisBatchStore.loadingInitial) return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <SynthesisBatchDashboard />
      </Container>
    </>
  );
}

export default observer(App);
