import { useEffect, useState } from "react";

function LogTable() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://backend-solar-dashboard-production.up.railway.app/api/suhu")
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
    <div className="bg-white p-4 rounded-xl shadow">
      <h1 className="font-semibold mb-4">Log Aktivitas</h1>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 text-left">
            <th>Waktu</th>
            <th>Suhu</th>
            <th>Daya</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {data.slice(-5).reverse().map((item, index) => (
            <tr key={index} className="border-t">
              <td>{item.time}</td>
              <td>{item.suhu}°C</td>
              <td>{item.daya} watt</td>
              <td
                className={`font-bold ${
                  item.status === "OFF" ? "text-green-500" : "text-red-500"}`}>{item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogTable;