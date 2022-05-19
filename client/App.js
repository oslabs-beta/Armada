import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainContainer from './homepage/containers/MainContainer';
import NavBar from './homepage/containers/NavBar';
import MetricsContainer from './metricspage/containers/MetricsContainer';
// import Metrics from './pages/Metrics';
import Alerts from './alertspage/Alerts';
import { Container, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import LogsContainer from './logspage/containers/LogsContainer';

// import { io } from 'socket.io-client';

// const socket = io('ws://localhost:3001', 'echo-protocol');

// socket.emit('hello from client');
// socket.on('hello from client');

function App() {
  return (
    <Box sx={{ backgroundColor: blueGrey['50'], minHeight: '100vh' }}>
      <BrowserRouter>
        <NavBar>
          <Container maxWidth='xl'>
            <Routes>
              <Route path='/' element={<MainContainer />} />
              <Route path='/metrics' element={<MetricsContainer />} />
              <Route path='/alerts' element={<Alerts />} />
              <Route path='/logs' element={<LogsContainer />} />
            </Routes>
          </Container>
        </NavBar>
      </BrowserRouter>
    </Box>
  );
}

export default App;
