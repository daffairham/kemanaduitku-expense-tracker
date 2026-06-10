import { Link } from "react-router-dom";

export default function Button({ label, onClick, disabled, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-[#5BB77B] text-white text-xl px-6 py-3 rounded-full font-medium shadow-lg mb-4 hover:cursor-pointer hover:bg-[#399c5c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );
}
