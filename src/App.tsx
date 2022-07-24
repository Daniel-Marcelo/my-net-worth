import { useEffect, useState } from "react";
import "./App.css";
import { defaultTheme, ThemeProvider, Preflight, x } from "@xstyled/styled-components";
import format from "date-fns/format";
import { NavBar } from "./components/NavBar/NavBar";
import { TickerSearch } from "./components/TickerSearch/TickerSearch";
import { PriceChart } from "./components/PriceChartV2/PriceChart";
import { useGetPriceHistory } from "./components/PriceChartV2/useGetPriceHistory";
import { PriceChartToolbar } from "./components/PriceChartToolbar";

const theme = {
  ...defaultTheme,
};

function App() {
  const [selectedTicker, setSelectedTicker] = useState("");

  const [selectedTimeframe, setSelectedTimeFrame] = useState("1d");
  const [chartData, setChartData] = useState([]);
  const getPriceHistory = useGetPriceHistory();

  // const test = () => {
  //   fetch("/search/quote?symbols=TLS.AX,MUS.AX").then((response) => {
  //     console.log(response);
  //   });
  // };

  const fetchHistory = async (range = "1d", interval = "2m") => {
    setSelectedTimeFrame(range);
    const [timestamps, prices] = await getPriceHistory(selectedTicker, range, interval);
    const dates = timestamps.map((t) => {
      const date = new Date(0);
      date.setUTCSeconds(t);
      return date;
    });
    const data = dates.map((date, index) => ({
      name: format(date, "MM/dd/yyyy"),
      price: prices[index],
    }));
    setChartData(data);
  };

  useEffect(() => {
    if (selectedTicker) {
      fetchHistory();
    }
  }, [selectedTicker]);

  return (
    <ThemeProvider theme={theme}>
      <Preflight />
      <div className="App">
        <NavBar />
        <x.div p="4">
          <TickerSearch setSelectedTicker={setSelectedTicker} />
          {selectedTicker && (
            <x.div display="flex" flexDirection="column" flex="1" alignItems="center" mt={8}>
              <x.div mb={8}>{selectedTicker} price</x.div>
              <x.div mb={8}>
                <PriceChartToolbar
                  selectedTicker={selectedTicker}
                  setSelectedTimeFrame={setSelectedTimeFrame}
                  selectedTimeFrame={selectedTimeframe}
                  setChartData={setChartData}
                />
              </x.div>
              <PriceChart selectedTicker={selectedTicker} chartData={chartData} />
            </x.div>
          )}
        </x.div>
      </div>
    </ThemeProvider>
  );
}
export default App;
