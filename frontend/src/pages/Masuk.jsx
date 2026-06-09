import { Link } from "react-router-dom";
import HeroSlogan from "../components/HeroSlogan";
import Button from "../components/Button";

export default function Masuk() {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center min-h-screen max-w-6xl mx-auto px-6 gap-4">
      <HeroSlogan />
      <div className="flex flex-col max-w-2xl mx-auto justify-center items-center">
        <div className="flex flex-col justify-center items-center text-center">
          <h1 className="text-[#5BB77B] font-semibold text-2xl md:text-3xl lg:text-4xl">
            MASUK
          </h1>
          <p className="font-light mb-2.5">
            Masuk ke dalam sistem Kemanaduitku untuk melacak keuanganmu.
          </p>
        </div>

        <form>
          <div className="flex flex-col items-start">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder=""
              className="w-full bg-white px-4 py-2 rounded-lg border border-[#9A9896] focus:border-[#5BB77B] mb-2"
            />
          </div>
          <div className="flex flex-col items-start">
            <label htmlFor="sandi">Kata sandi</label>
            <input
              id="sandi"
              name="sandi"
              type="password"
              placeholder=""
              className="w-full bg-white px-4 py-2 rounded-lg border border-[#9A9896] focus:border-[#5BB77B] mb-4"
            />
          </div>
          <div className="flex justify-center">
            <Button label="Masuk" />
          </div>
        </form>
        <p className="font-light mt-2.5">
          Belum punya akun?{" "}
          <Link to="/daftar" className="text-[#00B9FD]">
            Daftar sekarang!
          </Link>
        </p>
      </div>
    </div>
  );
}
