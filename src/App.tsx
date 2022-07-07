import React from 'react';
import './App.css';
import AuthService from './Auth.service';
import { NavBar } from './components/NavBar/NavBar';

function App({ authService = AuthService }) {

  const test = () => {
    fetch("/search/quote?symbols=TLS.AX,MUS.AX").then(response => {
      console.log(response)
    })
  }
  return (
    <div className="App">
      <NavBar />
      <button onClick={test}>Login</button>
    </div>
  );
}

export default App;
