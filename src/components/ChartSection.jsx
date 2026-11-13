
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
      <div className="bg-[#100d20] border border-purple-500/30 rounded-xl p-4 shadow-xl text-sm">
        <p className="text-gray-400 mb-2">{label}</p>

        {payload.map((entry, index) => (
          <p
            key={index}
            style={{ color: entry.color }}
            className="font-semibold mb-1"
          >
            {entry.name === "suhu" ? "Suhu" : "Daya"}:{" "}
            {entry.value}
            {entry.name === "suhu" ? "°C" : " W"}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

function ChartSection() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwkIhQqGBMBigMtdHuyAVXSsQNkRrieKZJURh4kRr0AlHlFKB8mYQmOOJtM_AGHnQPILA/exec";

    const fetchHistory = () => {
      fetch(GOOGLE_SCRIPT_URL)
        .then((res) => res.json())
        .then((result) => {
          if (result && Array.isArray(result.history)) {
            const formattedData = [...result.history]
              .reverse()
              .map((item) => {
                const dateObj = new Date(item.timestamp);

                const timeString = isNaN(dateObj.getTime())
                  ? "-"
                  : dateObj.toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    });

                return {
                  time: timeString,
                  suhu: Number(item.suhu),
                  daya: Number(item.daya),
                };
              });

            setData(formattedData);
          }
        })
        .catch((err) =>
          console.error("Error Fetch Chart:", err)
        );
    };

    fetchHistory();

    const interval = setInterval(fetchHistory, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0b0a16]/80 p-5 md:p-7 rounded-2xl border border-white/10">

      {/* HEADER */}
      <div className="mb-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          <h1 className="text-xl md:text-2xl font-bold text-white">
            Analisis Performa Historis
          </h1>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] tracking-wider text-gray-500">
              LIVE DATA
            </span>
          </div>

        </div>
      </div>

      {/* LEGEND */}
      <div className="flex flex-wrap gap-6 mb-5">

        <div className="flex items-center gap-2">
          <span className="w-5 h-[2px] bg-blue-400 rounded-full" />
          <span className="text-xs text-gray-400">Suhu (°C)</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-5 h-[2px] bg-yellow-200 rounded-full" />
          <span className="text-xs text-gray-400">Daya (W)</span>
        </div>

      </div>

      {/* CHART */}
      <div className="w-full h-[300px]">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 15,
              left: -15,
              bottom: 5,
            }}
          >

            <CartesianGrid
              stroke="#ffffff"
              strokeOpacity={0.07}
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="time"
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={{ stroke: "#ffffff", strokeOpacity: 0.1 }}
              tickLine={false}
              minTickGap={25}
            />

            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={45}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#a78bfa",
                strokeDasharray: "4 4",
              }}
            />

            <Line
              type="monotone"
              dataKey="suhu"
              name="suhu"
              stroke="#96c9ff"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#96c9ff",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />

            <Line
              type="monotone"
              dataKey="daya"
              name="daya"
              stroke="#ebf9a2"
              strokeWidth={2.5}
              dot={false}
              activeDot={{
                r: 5,
                fill: "#ebf9a2",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>

      {/* FOOTER */}
      <div className="mt-5 pt-4 border-t border-white/5">
        <p className="text-[10px] text-gray-500 tracking-wide">
          Data diperbarui otomatis setiap 5 detik
        </p>
      </div>

    </div>
  );
}

export default ChartSection;
