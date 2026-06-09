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
      <Button label="Daftar Sekarang" />
      <p className="font-light">
        Sudah punya akun?{" "}
        <Link to="/masuk" className="text-[#00B9FD]">
          Masuk
        </Link>
      </p>
    </div>
  );
}
