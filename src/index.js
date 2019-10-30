import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:7000';
axios.defaults.headers.common['Content-Type']='application/json';

const theme=createMuiTheme({
  palette:{
    primary:{
       
      main: '#00BD9D',
      dark: '#45B69C',
    },
    secondary:{
      light: '#F44E3F',
      main: '#DD1C1A',
      dark: '#941B0C',
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
