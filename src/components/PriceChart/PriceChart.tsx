import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Quote } from "../../models";
import { Spinner } from "../Spinner";

interface PriceChartProps {
  selectedTicker: string;
  chartData: Quote[];
}
export function PriceChart({ chartData, selectedTicker }: PriceChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ left: 0 }}>
        <XAxis dataKey="name" />
        <YAxis
          hide
          width={40}
          type="number"
          domain={[
            (dataMin) => Math.round(dataMin) - Math.round(dataMin * 0.01),
            (dataMax) => Math.round(dataMax) + Math.round(dataMax * 0.01),
          ]}
        />
        <Tooltip />
        <Legend formatter={() => `${selectedTicker} Price`} />
        <Line dot={false} type="monotone" dataKey="price" stroke="green" activeDot={{ r: 8 }} />
        <Spinner />
      </LineChart>
    </ResponsiveContainer>
  );
}
