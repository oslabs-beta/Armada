import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MainContainer from './homepage/containers/MainContainer';
import NavBar from './homepage/containers/NavBar';
import MetricsContainer from './metricspage/containers/MetricsContainer';
// import Metrics from './pages/Metrics';
import Alerts from './alertspage/Alerts';
import { Container, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import LogsContainer from './logspage/containers/LogsContainer';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: 'rgba(255, 255, 255, 0.08)',
    },
    text: {
      primary: '#fff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      {/* <Box sx={{ backgroundColor: blueGrey['50'], minHeight: '100vh' }}> */}
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
      {/* </Box> */}
    </ThemeProvider>
  );
}

export default App;
