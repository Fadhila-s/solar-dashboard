import { FaSun } from "react-icons/fa";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#050509]/95 backdrop-blur-md px-6 md:px-10 py-4 flex justify-between items-center border-b border-white/10">
      {/* Status */}
      <div className="hidden md:flex items-center gap-2">

        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>

        <span className="text-xs text-gray-400">
          LIVE MONITORING
        </span>

      </div>

    </div>
  );
}

export default Navbar;