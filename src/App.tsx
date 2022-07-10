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
import { PriceChart } from './components/PriceChartV2/PriceChart';
import { useGetPriceHistory } from './components/PriceChartV2/useGetPriceHistory';
// import { PriceChart } from './components/PriceChart/PriceChart';
import format from 'date-fns/format';

const theme = {
  ...defaultTheme,
  // Customize your theme here
}


function App({ authService = AuthService }) {
  const [selectedTicker, setSelectedTicker] = useState('');

  const [selectedTimeframe, setSelectedTimeFrame] = useState('1d');
  const [chartData, setChartData] = useState([])
  const getPriceHistory = useGetPriceHistory()

  const test = () => {
    fetch("/search/quote?symbols=TLS.AX,MUS.AX").then(response => {
      console.log(response)
    })
  }

  const fetchHistory = async (range = '1d', interval = '2m') => {
    const [timestamps, prices] = await getPriceHistory(selectedTicker, range, interval);
    const dates = timestamps.map(t => {
      const date = new Date(0)
      date.setUTCSeconds(t)
      return date;
    });
    const data = dates.map((date, index) => {
      return {
        name: format(date, 'MM/dd/yyyy'),
        price: prices[index]
      }
    });
    setChartData(data);
  }

  useEffect(() => {
    if (selectedTicker) {
      fetchHistory()
    }
  }, [selectedTicker]);


  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <div className="App">
        <NavBar />
        <x.div p="4">
          <TickerSearch setSelectedTicker={setSelectedTicker} />
          {selectedTicker && <x.div display="flex" flexDirection="column" flex="1" alignItems="center" mt={8}>
            <x.div mb={8}>{selectedTicker} price</x.div>
            <x.div mb={8}>
              <Button onClick={() => fetchHistory('1d', '2m')}>1D</Button>
              <Button onClick={() => fetchHistory('5d', '15m')}>5D</Button>
              <Button onClick={() => fetchHistory('1mo', '1h')}>1M</Button>
              <Button onClick={() => fetchHistory('6mo', '1d')}>6M</Button>
              <Button onClick={() => fetchHistory('ytd', '1d')}>YTD</Button>
              <Button onClick={() => fetchHistory('1y', '1wk')}>1Y</Button>
              <Button onClick={() => fetchHistory('5y', '1mo')}>5Y</Button>
              <Button onClick={() => fetchHistory('max', '1mo')}>MAX</Button>
            </x.div>
            <PriceChart chartData={chartData} />
          </x.div>}
        </x.div>
      </div>
    </ThemeProvider>
  );
} 

const Button = ({ onClick, children, isActive = false }) => {
 return <x.span p={4} cursor="pointer" bg={{_: isActive ? '#fff' : '#1976d2', hover: '#1976d2'}} color={{hover: '#fff'}} borderRadius={5} onClick={onClick}>
  <x.span>{children}</x.span>
 </x.span>
}

export default App;
