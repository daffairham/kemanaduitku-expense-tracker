import { Link } from "react-router-dom";
import HeroSlogan from "../components/HeroSlogan";
import Button from "../components/Button";

export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen max-w-3xl mx-auto px-6">
      <HeroSlogan />
      <p className="font-light text-2xl text-center mb-6">
        Ayo mulai lacak
        <br />
        pemasukkan dan pengeluaranmu
        <br />
        sekarang!
      </p>
      <Link
        to="/daftar"
        className="bg-[#5BB77B] text-white text-xl px-6 py-3 rounded-full font-medium shadow-lg mb-4 hover:cursor-pointer hover:bg-[#399c5c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
        Daftar Sekarang
      </Link>
      <p className="font-light">
        Sudah punya akun?{" "}
        <Link to="/masuk" className="text-[#00B9FD]">
          Masuk
        </Link>
      </p>
    </div>
  );
}
