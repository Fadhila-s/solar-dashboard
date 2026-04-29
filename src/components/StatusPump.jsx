function StatusPump({ status }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500">Status Pompa</p>
      <h2
        className={`font-bold ${
          status === "ON" ? "text-green-500" : "text-red-500"
        }`}
      >
        {status}
      </h2>
    </div>
  );
}

export default StatusPump;