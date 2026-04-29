import { FaSun } from "react-icons/fa";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <FaSun className="text-blue-500 text-2xl" />
        <h1 className="text-xl font-bold text-blue-500">SolarCool</h1>
        <p className="text-sm">12 Okt 2023, 12:48:05 WIB</p>
      </div>

      <div className="flex gap-4 text-gray-500">
        <p className="text-blue-500 font-semibold">Dashboard</p>
        <p>Pengaturan</p>
      </div>
    </div>
  );
}

export default Navbar;