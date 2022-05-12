import React from 'react';
import ReactDom from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import './styles.css';

const root = ReactDom.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
