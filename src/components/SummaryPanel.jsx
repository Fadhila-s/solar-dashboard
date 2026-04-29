function SummaryPanel({ data }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-4">
      <h1 className="font-semibold">Ringkasan Hari Ini</h1>

      <div className="text-sm text-gray-600 space-y-2">
        <p>Rata-rata Suhu: {data.suhu}°C</p>
      </div>

      <div className="bg-blue-100 p-4 rounded-lg">
        <p className="text-sm font-semibold text-blue-600">
          Rekomendasi
        </p>
        <p className="text-sm text-gray-600">
          Sistem berjalan optimal, tidak perlu penyesuaian.
        </p>
      </div>
    </div>
  );
}

export default SummaryPanel;