import logo from './logo.svg';
import './App.css';
import React from 'react';
import CryptoTracker from './CryptoTracker';
import CryptoGrid from './CryptoGrid';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Crypto Tracker App</h1>
        <CryptoTracker /> 
      </header>
      <div className="Body-container">
        <CryptoGrid />
      </div>      
    </div>
  );
}

export default App;
