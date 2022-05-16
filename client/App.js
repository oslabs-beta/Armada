import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainContainer from './homepage/containers/MainContainer';
import NavBar from './homepage/containers/NavBar';
import MetricsContainer from './metricspage/containers/MetricsContainer';
// import Metrics from './pages/Metrics';
import Alerts from './alertspage/Alerts';
import { Container } from '@mui/material';
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth='xl'>
        <Routes>
          <Route path='/' element={<MainContainer />} />
          <Route path='/metrics' element={<MetricsContainer />} />
          <Route path='/alerts' element={<Alerts />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
