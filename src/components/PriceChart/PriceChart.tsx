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
    <LineChart
      data={chartData}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis
        type="number"
        domain={[
          (dataMin) => Math.round(dataMin) - Math.round(dataMin * 0.01),
          (dataMax) => Math.round(dataMax) + Math.round(dataMax * 0.01),
        ]}
      />
      <Tooltip />
      <Legend formatter={() => `${selectedTicker} Price`} />
      <Line dot={false} type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Spinner />
    </LineChart>
    </ResponsiveContainer>
  );
}
