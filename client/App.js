import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import MainContainer from './homepage/containers/MainContainer';
import NavBar from './homepage/containers/NavBar';
import MetricsContainer from './metricspage/containers/MetricsContainer';
import Alerts from './alertspage/Alerts';
import { Container, Box } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import LogsContainer from './logspage/containers/LogsContainer';
import CustomMetricsContainer from './custompage/containers/CustomMetricsContainer';

/* Applies MUI dark theme */

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

/* Leveraging React Router to create multiple views within single page application */
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <NavBar>
          <Container maxWidth='xl'>
            <Routes>
              <Route path='/' element={<MainContainer />} />
              <Route path='/metrics' element={<MetricsContainer />} />
              <Route path='/custom' element={<CustomMetricsContainer />} />
              <Route path='/alerts' element={<Alerts />} />
              <Route path='/logs' element={<LogsContainer />} />
            </Routes>
          </Container>
        </NavBar>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
