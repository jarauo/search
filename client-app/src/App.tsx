import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [synthesisbatches, setSynthesisbatches] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/SynthesisBatch').then(response => {
      console.log(response);
      setSynthesisbatches(response.data);
    })
  },[])

  return (
    <div>
      <Header as='h2' icon='search' content='SynthesisBatch Search' />

        <List>
        {synthesisbatches.map((synthesisbatch: any) => (
            <List.Item key={synthesisbatch.id}>
              {synthesisbatch.batchNumber}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;
