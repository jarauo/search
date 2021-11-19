import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import SynthesisBatchDashboard from '../../features/synthesisbatches/dashboard/SynthesisBatchDashboard';
import SynthesisBatchForm from '../../features/synthesisbatches/form/SynthesisBatchForm';
import SynthesisBatchDetails from '../../features/synthesisbatches/details/SynthesisBatchDetails';

function App() {
  const location = useLocation()
  
  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route 
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{marginTop: '7em'}}>
              <Route exact path='/synthesisBatches' component={SynthesisBatchDashboard} />
              <Route path='/synthesisBatches/:id' component={SynthesisBatchDetails} />
              <Route key={location.key} path={['/createSynthesisBatch', '/manage/:id']} component={SynthesisBatchForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
