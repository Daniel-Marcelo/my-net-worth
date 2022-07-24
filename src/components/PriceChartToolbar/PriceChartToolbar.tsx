import { x } from "@xstyled/styled-components";
import { ReactNode } from "react";
import format from "date-fns/format";
import { useGetPriceHistory } from "../PriceChartV2/useGetPriceHistory";

interface ButtonProps {
  isActive: boolean;
  children: ReactNode;
  onClick: () => void;
}

function Button({ onClick, children, isActive }: ButtonProps) {
  return (
    <x.span
      mr={4}
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

interface PriceChartToolbarProps {
  selectedTimeFrame: string;
  selectedTicker: string;
  setChartData: (data: any[]) => void;
  setSelectedTimeFrame: (timeframe: string) => void;
}
export function PriceChartToolbar({
  selectedTimeFrame,
  setSelectedTimeFrame,
  selectedTicker,
  setChartData,
}: PriceChartToolbarProps) {
  const getPriceHistory = useGetPriceHistory();

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

  const isActive = (range: string) => selectedTimeFrame === range;

  return (
    <>
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
    </>
  );
}
