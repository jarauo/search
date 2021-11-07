import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { SynthesisBatch } from '../models/synthesisbatch';
import NavBar from './NavBar';
import SynthesisBatchDashboard from '../../features/synthesisbatches/dashboard/SynthesisBatchDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [synthesisbatches, setSynthesisbatches] = useState<SynthesisBatch[]>([]);
  const [selectedSynthesisBatch, setSelectedSynthesisBatch] = useState<SynthesisBatch | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<SynthesisBatch[]>('http://localhost:5000/api/SynthesisBatch').then(response => {
      //console.log(response);
      setSynthesisbatches(response.data);
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
    synthesisbatch.id 
    ? setSynthesisbatches([...synthesisbatches.filter(x => x.id !== synthesisbatch.id), synthesisbatch])
    : setSynthesisbatches([...synthesisbatches, {...synthesisbatch, id: uuid()}]);
    setEditMode(false);
    setSelectedSynthesisBatch(synthesisbatch);
  }

  function handleDeleteSynthesisBatch(id: string) {
    setSynthesisbatches([...synthesisbatches.filter(x => x.id !== id)])
  }

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
        />
      </Container>
    </>
  );
}

export default App;
