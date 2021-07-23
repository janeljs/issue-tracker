import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Theme from './style/Theme';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
