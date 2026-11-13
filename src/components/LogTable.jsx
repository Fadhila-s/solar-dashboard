import { useEffect, useState } from "react";

function LogTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwkIhQqGBMBigMtdHuyAVXSsQNkRrieKZJURh4kRr0AlHlFKB8mYQmOOJtM_AGHnQPILA/exec";

    const fetchLogs = () => {
      fetch(GOOGLE_SCRIPT_URL)
        .then((res) => res.json())
        .then((result) => {
          if (result && Array.isArray(result.history)) {
            const formattedLogs = result.history.map((item) => {
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
                suhu: Number(item.suhu).toFixed(1),
                daya: Number(item.daya).toFixed(2),
                status: item.status || "OFF",
              };
            });

            setData(formattedLogs);
          }
        })
        .catch((err) =>
          console.error("Error Fetch LogTable:", err)
        );
    };

    fetchLogs();

    const interval = setInterval(fetchLogs, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="
        bg-[#0b0a16]/80
        border border-white/10
        p-5 md:p-6
        rounded-2xl
        overflow-hidden
      "
    >
      {/* HEADER */}
      <div className="mb-5">

        <p className="text-purple-400 text-[10px] tracking-[0.25em] uppercase mb-2">
          ACTIVITY LOG
        </p>

        <div className="flex items-center justify-between gap-4">

          <h1 className="text-xl md:text-2xl font-bold text-white">
            Log Aktivitas
          </h1>

          <div className="flex items-center gap-2">

            <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>

            <span className="text-[10px] text-gray-500 tracking-wider">
              LIVE
            </span>

          </div>

        </div>

      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full text-sm">

          <thead>
            <tr className="text-gray-400 text-left border-b border-white/10">

              <th className="py-3 px-3 font-medium text-xs uppercase tracking-wider">
                Waktu
              </th>

              <th className="py-3 px-3 font-medium text-xs uppercase tracking-wider">
                Suhu
              </th>

              <th className="py-3 px-3 font-medium text-xs uppercase tracking-wider">
                Daya
              </th>

              <th className="py-3 px-3 font-medium text-xs uppercase tracking-wider">
                Status
              </th>

            </tr>
          </thead>

          <tbody>

            {data.slice(0, 5).map((item, index) => (

              <tr
                key={index}
                className="
                  border-b border-white/5
                  hover:bg-purple-500/[0.04]
                  transition-colors
                "
              >

                <td className="py-4 px-3 text-gray-400">
                  {item.time}
                </td>

                <td className="py-4 px-3 text-blue-400">
                  {item.suhu}°C
                </td>

                <td className="py-4 px-3 text-yellow-200">
                  {item.daya} watt
                </td>

                <td className="py-4 px-3">

                  <span
                    className={`font-semibold ${
                      item.status === "OFF"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

            {/* EMPTY STATE */}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="py-10 text-center text-gray-600 text-sm"
                >
                  Belum ada data monitoring.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}

export default LogTable;