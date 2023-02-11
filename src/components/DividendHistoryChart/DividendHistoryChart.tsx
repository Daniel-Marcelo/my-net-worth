import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

// eslint-disable-next-line react/prop-types
export function Example({ history }) {
  return (
    <BarChart
      width={800}
      height={300}
      data={history}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dateString" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="amount" fill="#8884d8" />
    </BarChart>
  );
}
