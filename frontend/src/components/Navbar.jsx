import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutDashboard, List, Plus, LogOut } from "lucide-react";
import axios from "axios";

const navItems = [
  {
    label: "Dashboard",
    to: "/dashboard",
    page: "dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Daftar Transaksi",
    to: "/transaksi",
    page: "transaksi",
    icon: <List className="h-5 w-5" />,
  },
  {
    label: "Tambah Transaksi",
    to: "/tambah-transaksi",
    page: "tambah",
    icon: <Plus className="h-5 w-5" />,
  },
];

export default function Navbar({ activePage }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/auth/me", {
          withCredentials: true,
        });

        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUser();
  }, []);
  async function handleLogout() {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
    } catch (err) {
    } finally {
      navigate("/masuk");
    }
  }
  return (
    <>
      {/* DESKTOP NAVBAR */}
      <nav className="hidden md:flex items-center justify-between px-6 py-4 ">
        <Link
          to="/"
          className="text-[#5BB77B] font-black text-xl tracking-tight">
          KEMANADUITKU
        </Link>

        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.page}
              to={item.to}
              className={`font-medium transition-colors ${
                activePage === item.page
                  ? "text-[#5BB77B] underline underline-offset-4"
                  : "text-gray-800 hover:text-[#5BB77B]"
              }`}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">
            Halo, {user?.name || "User"}!
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-800 cursor-pointer transition-colors text-white p-2 rounded-lg">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </nav>

      {/* MOBILE NAVBAR */}
      <nav className="md:hidden flex top-0 left-0 right-0 items-center text-center justify-center mt-4">
        <img
          src="/Logo big.svg"
          alt=""
          className="w-72 sm:w-96 md:w-96 lg:w-96"
        />
      </nav>
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-[#e8e5e2] border border-gray-300 flex justify-around py-3 px-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <Link
            key={item.page}
            to={item.to}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activePage === item.page ? "text-[#5BB77B]" : "text-gray-500"
            }`}>
            {item.icon}
            <span className="text-xs font-medium">
              {item.label.split(" ")[0]}
            </span>
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 text-red-500">
          <LogOut className="h-5 w-5" />
          <span className="text-xs font-medium">Keluar</span>
        </button>
      </nav>
    </>
  );
}
