import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainContainer from './containers/MainContainer';
import NavBar from './containers/NavBar';
import Metrics from './pages/Metrics';
import Alerts from './pages/Alerts';
import { Container } from '@mui/material';
function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Container maxWidth='xl'>
        <Routes>
          <Route path='/' element={<MainContainer />} />
          <Route path='/metrics' element={<Metrics />} />
          <Route path='/alerts' element={<Alerts />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
