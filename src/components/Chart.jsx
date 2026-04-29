import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { time: "08:00", suhu: 24 },
  { time: "10:00", suhu: 27 },
  { time: "12:00", suhu: 30 },
  { time: "14:00", suhu: 29 },
  { time: "16:00", suhu: 26 },
];

function Chart() {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="mb-4 font-bold">Grafik Suhu</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="suhu" stroke="#f466ad" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;