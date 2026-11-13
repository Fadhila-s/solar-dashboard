function SummaryPanel({ data }) {
  return (
    <div
      className="
        bg-[#36415A]/80
        border border-white/10
        p-6 md:p-7
        rounded-2xl
        space-y-6
      "
    >

      {/* Header */}
      <div>

        <p className="text-purple-400 text-[10px] font-semibold tracking-[0.25em] uppercase mb-2">
          SYSTEM SUMMARY
        </p>

        <h1 className="text-2xl font-bold text-white">
          Ringkasan Hari Ini
        </h1>

      </div>

      {/* Temperature */}
      <div className="space-y-2">

        <p className="text-gray-400 text-xs uppercase tracking-wider">
          Rata-rata Suhu
        </p>

        <p className="text-3xl font-bold text-blue-400">
          {data.suhu}°C
        </p>

      </div>
    </div>
  );
}

export default SummaryPanel;