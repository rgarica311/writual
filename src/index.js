import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { MenuProvider } from 'react-native-popup-menu';

ReactDOM.render(
  <BrowserRouter>
    <MenuProvider>
      <App />
    </MenuProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
