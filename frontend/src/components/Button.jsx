import { Link } from "react-router-dom";

export default function Button({ label }) {
  return (
    <Link
      to="/daftar"
      className="bg-[#5BB77B] text-white text-xl px-6 py-3 rounded-full font-medium shadow-lg mb-4 hover:cursor-pointer hover:bg-[#399c5c] transition-colors"
    >
      {label}
    </Link>
  );
}
