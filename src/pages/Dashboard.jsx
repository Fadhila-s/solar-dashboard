import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import StatusPump from "../components/StatusPump";
import ChartSection from "../components/ChartSection";
import LogTable from "../components/LogTable";
import SummaryPanel from "../components/SummaryPanel";

function Dashboard() {
  const [data, setData] = useState({
    suhu: 0,
    status: "OFF",
    daya: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:3000/api/suhu")
        .then(res => res.json())
        .then(result => {
        console.log("DATA:", result); // 👈 cek ini
        setData(result);
      })
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen pt-10 space-y-6">
      <Navbar />

      {/* STATUS PANEL */}
      <div className="bg-white p-6 rounded-xl shadow flex justify-between items-center">
        <div>
          <p className={`font-semibold ${
              data.status === "OFF" ? "text-green-500" : "text-red-500"}`}>
              {data.status === "OFF" ? "Cooling Off" : "Cooling Active"}
          </p>
          <h1 className="text-l font-semibold">
            Status Sistem Pendingin Panel
          </h1>
          <p className="text-gray-500 text-sm">
            Sistem monitoring mendeteksi temperatur panel saat ini di atas ambang batas.
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-gray-500">Temperature Panel</p>
          <h1 className="text-3xl font-bold text-blue-500">{data.suhu}°C</h1>
        </div>
      </div>

      {/* CARD */}
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard title="Temperature Panel" value={`${data.suhu}°C`} color={"text-blue-500"}/>
        <SummaryCard title="Daya Output" value={`${data.daya} watt`} color={"text-blue-500"}/>
        <SummaryCard title="Status Pompa" value={data.status} color={data.status === "OFF" ? "text-green-500" : "text-red-500"} />
      </div>

      {/* CHART */}
      <ChartSection />

      {/* BOTTOM */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <LogTable/>
        </div>
        <SummaryPanel data={data} />
      </div>
    </div>
  );
}

export default Dashboard;