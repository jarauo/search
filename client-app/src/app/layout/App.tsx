import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import { SynthesisBatch } from '../models/synthesisbatch';
import NavBar from './NavBar';
import SynthesisBatchDashboard from '../../features/synthesisbatches/dashboard/SynthesisBatchDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [synthesisbatches, setSynthesisbatches] = useState<SynthesisBatch[]>([]);
  const [selectedSynthesisBatch, setSelectedSynthesisBatch] = useState<SynthesisBatch | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.SynthesisBatches.list().then(response => {
      let synthesisbatches: SynthesisBatch[] = [];
      response.forEach(synthesisbatch => {
        synthesisbatch.date = "1/1/2021";
        synthesisbatches.push(synthesisbatch);
      })
      setSynthesisbatches(response);
      setLoading(false);
    })
  },[])

  function handleSelectSynthesisBatch(id: string) {
    setSelectedSynthesisBatch(synthesisbatches.find(x => x.id === id));
  }

  function handleCancelSelectedSynthesisBatch() {
    setSelectedSynthesisBatch(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectSynthesisBatch(id) : handleCancelSelectedSynthesisBatch();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateorEditSynthesisBatch(synthesisbatch: SynthesisBatch) {
    setSubmitting(true);
    if (synthesisbatch.id) {
      agent.SynthesisBatches.update(synthesisbatch).then(() => {
        setSynthesisbatches([...synthesisbatches.filter(x => x.id !== synthesisbatch.id), synthesisbatch])
        setSelectedSynthesisBatch(synthesisbatch);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      synthesisbatch.id = uuid();
      agent.SynthesisBatches.create(synthesisbatch).then(() => {
        setSynthesisbatches([...synthesisbatches, synthesisbatch])
        setSelectedSynthesisBatch(synthesisbatch);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }

  function handleDeleteSynthesisBatch(id: string) {
    setSubmitting(true);
    agent.SynthesisBatches.delete(id).then(() => {
      setSynthesisbatches([...synthesisbatches.filter(x => x.id !== id)])
      setSubmitting(false);
    })
    
  }

  if (loading) return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <SynthesisBatchDashboard 
          synthesisbatches={synthesisbatches}
          selectedSynthesisBatch={selectedSynthesisBatch}
          selectSynthesisBatch={handleSelectSynthesisBatch}
          cancelSelectSynthesisBatch={handleCancelSelectedSynthesisBatch}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateorEditSynthesisBatch}
          deleteSynthesisBatch={handleDeleteSynthesisBatch}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
