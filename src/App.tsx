import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthService from './Auth.service';

function App({authService = AuthService}) {
  return (
    <div className="App">
      <header className="App-header">
      </header>

      <button onClick={authService.login}>Login</button>
    </div>
  );
}

export default App;
