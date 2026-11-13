function SummaryCard({ title, value, color }) {
  return (
    <div
      className="
        bg-[#36415A]/80
        border border-white/10
        p-5
        rounded-2xl
        transition-all duration-300
        hover:-translate-y-1
        hover:border-purple-500/30
        hover:bg-[#100d20]
      "
    >

      <p className="text-gray-400 text-xs uppercase tracking-[0.15em] mb-3">
        {title}
      </p>

      <h2 className={`text-2xl md:text-3xl font-bold ${color}`}>
        {value}
      </h2>

      <p className="text-[10px] text-gray-400 mt-3 tracking-wide">
        REAL-TIME DATA
      </p>

    </div>
  );
}

export default SummaryCard;