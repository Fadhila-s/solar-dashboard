import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SummaryCard from "../components/SummaryCard";
import SummaryPanel from "../components/SummaryPanel";
import ChartSection from "../components/ChartSection";
import LogTable from "../components/LogTable";
import spaceBg from "../assets/space-bg.png";

function Dashboard() {
  const [data, setData] = useState({
    suhu: 0,
    status: "OFF",
    daya: 0,
  });

  useEffect(() => {
    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwkIhQqGBMBigMtdHuyAVXSsQNkRrieKZJURh4kRr0AlHlFKB8mYQmOOJtM_AGHnQPILA/exec";

    const fetchData = () => {
      fetch(GOOGLE_SCRIPT_URL)
        .then((res) => {
          if (!res.ok) throw new Error("Gagal mengambil data");
          return res.json();
        })
        .then((result) => {
          console.log("DATA DARI GOOGLE SHEETS:", result);

          setData({
            suhu:
              result.suhu !== undefined
                ? Number(result.suhu).toFixed(1)
                : 0,

            daya:
              result.daya !== undefined
                ? Number(result.daya).toFixed(2)
                : 0,

            status: result.status || "OFF",
          });
        })
        .catch((err) =>
          console.error("Error Fetch Dashboard:", err)
        );
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const isActive = data.status === "ON";

  return (
    <div className="min-h-screen bg-[#050509] text-white" 
    style={{
    backgroundImage: `
      linear-gradient(
        rgba(5, 5, 9, 0.45),
        rgba(5, 5, 9, 0.95)
      ),
      url(${spaceBg})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }}>

      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[500px] pt-32 px-6 md:px-16 flex items-center justify-center overflow-hidden">

        {/* Space background */}
        <div className="absolute inset-0">

          <div
            className="
              absolute inset-0
              bg-gradient-to-b
              from-[#050509]/20
              via-[#080612]/70
              to-[#050509]
            "
          />

          {/* Purple nebula */}
          <div
            className="
              absolute
              top-10
              left-1/2
              -translate-x-1/2
              w-[700px]
              h-[350px]
              bg-purple-600/10
              blur-[100px]
              rounded-full
            "
          />

        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center max-w-3xl">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">

            Monitoring
            <span className="text-purple-400">
              {" "}Suhu Panel
            </span>

            <br />

            secara real-time.

          </h1>

          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mt-6 leading-relaxed">
            Sistem monitoring temperatur dan daya panel surya
            dengan pengendalian pendingin secara otomatis.
          </p>

          {/* System indicator */}
          <div className="mt-8 flex justify-center">

            <div
              className="
                flex items-center gap-3
                px-5 py-2.5
                rounded-full
                bg-white/5
                border border-white/10
              "
            >

              <span
                className={`w-2 h-2 rounded-full ${
                  isActive
                    ? "bg-red-400 animate-pulse"
                    : "bg-green-400"
                }`}
              />

              <span className="text-xs text-gray-400">
                {isActive
                  ? "COOLING SYSTEM ACTIVE"
                  : "SYSTEM OPERATING NORMALLY"}
              </span>

            </div>

          </div>

        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-5 md:px-8 pb-20">

        {/* STATUS */}
        <section className="mb-10">

          <div className="mb-4">

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Kondisi Sistem
            </h2>

          </div>

          <div
            className="
              bg-[#36415A]/80
              border border-white/10
              rounded-2xl
              p-6
            "
          >

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div>

                <p
                  className={`text-sm font-semibold mb-2 ${
                    isActive
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {isActive
                    ? "Cooling Active"
                    : "Cooling Off"}
                </p>

                <h3 className="text-xl font-semibold">
                  Status Sistem Pendingin Panel
                </h3>

                <p className="text-gray-300 text-sm mt-2 max-w-2xl">
                  {data.status === "OFF"
                    ? "Sistem monitoring mendeteksi temperatur panel dalam kondisi aman."
                    : "Sistem monitoring mendeteksi temperatur panel saat ini di atas ambang batas."}
                </p>

              </div>

              <div className="text-left md:text-right">

                <p className="text-[10px] text-gray-400 tracking-widest">
                  CURRENT STATUS
                </p>

                <p
                  className={`text-2xl font-bold mt-1 ${
                    isActive
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  {data.status}
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* SUMMARY CARDS */}
        <section className="mb-10">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <SummaryCard
              title="Suhu Panel"
              value={`${data.suhu ?? 0}°C`}
              color="text-blue-400"
            />

            <SummaryCard
              title="Daya Output"
              value={`${data.daya ?? 0} watt`}
              color="text-yellow-200"
            />

            <SummaryCard
              title="Status Pompa"
              value={data.status ?? "OFF"}
              color={
                data.status === "OFF"
                  ? "text-green-400"
                  : "text-red-400"
              }
            />

          </div>

        </section>

        {/* CHART */}
        <section className="mb-10">

          <div className="mb-5">

            <p className="text-purple-400 text-[10px] tracking-[0.3em] uppercase">
              MONITORING
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Perubahan Data
            </h2>

          </div>

          <div
            className="
              bg-[#0b0a16]/80
              border border-white/10
              rounded-2xl
              p-4
            "
          >
            <ChartSection />
          </div>

        </section>

        {/* SUMMARY */}
        <section className="mb-10">

          <SummaryPanel data={data} />

        </section>

        {/* LOG */}
        <section>

          <div className="mb-5">

            <p className="text-purple-400 text-[10px] tracking-[0.3em] uppercase">
              ACTIVITY LOG
            </p>

            <h2 className="text-2xl md:text-3xl font-bold mt-2">
              Riwayat Monitoring
            </h2>

          </div>

          <div
            className="
              bg-[#0b0a16]/80
              border border-white/10
              rounded-2xl
              p-4
            "
          >
            <LogTable />
          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;