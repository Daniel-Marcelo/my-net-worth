import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Quote } from "../../models";

interface PriceChartProps {
  selectedTicker: string;
  chartData: Quote[];
}
export function PriceChart({ chartData, selectedTicker }: PriceChartProps) {
  return (
    <LineChart
      width={800}
      height={300}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis
        type="number"
        domain={[
          (dataMin) => Math.round(dataMin) - Math.round(dataMin * 0.005),
          (dataMax) => Math.round(dataMax) + Math.round(dataMax * 0.005),
        ]}
      />
      <Tooltip />
      <Legend formatter={() => `${selectedTicker} Price`} />
      <Line dot={false} type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
}
