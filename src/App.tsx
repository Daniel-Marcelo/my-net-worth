import React, { useEffect, useState } from 'react';
import './App.css';
import AuthService from './Auth.service';
import { NavBar } from './components/NavBar/NavBar';
import { TickerSearch } from './components/TickerSearch/TickerSearch';
import {
  defaultTheme,
  ThemeProvider,
  Preflight,
} from '@xstyled/styled-components'
import { x } from '@xstyled/styled-components'
import { PriceChart } from './components/PriceChart/PriceChart';

const theme = {
  ...defaultTheme,
  // Customize your theme here
}


function App({ authService = AuthService }) {
  const [selectedTicker, setSelectedTicker] = useState('')

  const test = () => {
    fetch("/search/quote?symbols=TLS.AX,MUS.AX").then(response => {
      console.log(response)
    })
  }

  useEffect(() => {
    if(selectedTicker) {

    }
  },  [selectedTicker])
  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <div className="App">
        <NavBar />
        <x.div p="4">
        <TickerSearch setSelectedTicker={setSelectedTicker} />
        <PriceChart/>
        </x.div>
      </div>
    </ThemeProvider>
  );
}

export default App;
