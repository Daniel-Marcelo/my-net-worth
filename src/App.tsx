import { ReactNode, useEffect, useState } from "react";
import "./App.css";
import { defaultTheme, ThemeProvider, Preflight, x } from "@xstyled/styled-components";
import format from "date-fns/format";
import { NavBar } from "./components/NavBar/NavBar";
import { TickerSearch } from "./components/TickerSearch/TickerSearch";
import { PriceChart } from "./components/PriceChartV2/PriceChart";
import { useGetPriceHistory } from "./components/PriceChartV2/useGetPriceHistory";

const theme = {
  ...defaultTheme,
};

interface ButtonProps {
  isActive: boolean;
  children: ReactNode;
  onClick: () => void;
}

function Button({ onClick, children, isActive }: ButtonProps) {
  return (
    <x.span
      p={4}
      cursor="pointer"
      bg={{ _: isActive ? "#1976d2" : "#fff", hover: "#1976d2" }}
      color={{ hover: "#fff", _: isActive ? "#fff" : "black" }}
      borderRadius={5}
      onClick={onClick}
    >
      <x.span>{children}</x.span>
    </x.span>
  );
}

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

  const isActive = (range: string) => selectedTimeframe === range;

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
                <Button isActive={isActive("1d")} onClick={() => fetchHistory("1d", "2m")}>
                  1D
                </Button>
                <Button isActive={isActive("5d")} onClick={() => fetchHistory("5d", "15m")}>
                  5D
                </Button>
                <Button isActive={isActive("1mo")} onClick={() => fetchHistory("1mo", "1h")}>
                  1M
                </Button>
                <Button isActive={isActive("6mo")} onClick={() => fetchHistory("6mo", "1d")}>
                  6M
                </Button>
                <Button isActive={isActive("ytd")} onClick={() => fetchHistory("ytd", "1d")}>
                  YTD
                </Button>
                <Button isActive={isActive("1y")} onClick={() => fetchHistory("1y", "1wk")}>
                  1Y
                </Button>
                <Button isActive={isActive("5y")} onClick={() => fetchHistory("5y", "1mo")}>
                  5Y
                </Button>
                <Button isActive={isActive("max")} onClick={() => fetchHistory("max", "1mo")}>
                  MAX
                </Button>
              </x.div>
              <PriceChart chartData={chartData} />
            </x.div>
          )}
        </x.div>
      </div>
    </ThemeProvider>
  );
}
export default App;
