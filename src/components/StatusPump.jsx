function StatusPump({ status }) {
  const isOn = status === "ON";

  return (
    <div
      className="
        bg-[#0b0a16]/80
        border border-white/10
        p-5
        rounded-2xl
        transition-all duration-300
        hover:border-purple-500/30
      "
    >

      <p className="text-gray-500 text-xs uppercase tracking-[0.15em] mb-3">
        Status Pompa
      </p>

      <div className="flex items-center gap-3">

        <span
          className={`w-2.5 h-2.5 rounded-full ${
            isOn
              ? "bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.7)]"
              : "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"
          }`}
        />

        <h2
          className={`text-2xl font-bold ${
            isOn ? "text-green-400" : "text-red-400"
          }`}
        >
          {status}
        </h2>

      </div>

    </div>
  );
}

export default StatusPump;