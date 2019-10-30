import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Patient from './Patients';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Patient />
      </div>
    </BrowserRouter>
  );
}

export default App;
