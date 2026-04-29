function SummaryCard({ title, value, color}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className={`text-xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
}

export default SummaryCard;