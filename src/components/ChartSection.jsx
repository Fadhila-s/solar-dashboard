import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// CUSTOM TOOLTIP
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded shadow text-sm">
        <p className="font-semibold">{label}</p>

        <p className="text-green-500">
          daya : {payload[1]?.value}
        </p>

        <p className="text-blue-500">
          suhu : {payload[0]?.value}
        </p>
      </div>
    );
  }
  return null;
};

function ChartSection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:3000/api/history")
        .then(res => res.json())
        .then(result => {
          console.log("HISTORY:", result); // debug
          setData(result);
        })
        .catch(err => console.error(err));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="font-semibold mb-4">Analisis Performa Historis</h1>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />

          {/* 🔥 TOOLTIP CUSTOM */}
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="suhu"
            stroke="#3b82f6"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="daya"
            stroke="#22c55e"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartSection;