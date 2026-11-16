import { useEffect, useState } from "react";
import { FaSun } from "react-icons/fa";

function Navbar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update waktu setiap 1 detik
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format tanggal Indonesia (Contoh: Selasa, 17 November 2026)
  const formattedDate = currentTime.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Format jam dengan titik dua (Contoh: 06:20:45)
  const formattedTime = currentTime
    .toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/\./g, ":");

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#050509]/95 backdrop-blur-md px-6 md:px-10 py-4 flex justify-between items-center border-b border-white/10">
      {/* Kiri: Judul / Brand Dashboard */}
      <div className="flex items-center gap-2.5">
        <FaSun className="text-yellow-400 text-lg animate-spin" style={{ animationDuration: "10s" }} />
        <span className="text-white font-semibold text-sm md:text-base tracking-wide">
          Solar Panel Monitoring
        </span>
      </div>

      {/* Kanan: Tanggal, Jam Real-Time & Status Live */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Tanggal & Waktu Otomatis */}
        <div className="text-right">
          <p className="text-xs text-gray-300 font-medium">{formattedDate}</p>
          <p className="text-[11px] text-gray-400 font-mono">{formattedTime} WIB</p>
        </div>

        {/* Status Live */}
        <div className="hidden md:flex items-center gap-2 border-l border-white/15 pl-4">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
          <span className="text-xs text-gray-400 font-medium tracking-wider">
            LIVE MONITORING
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;