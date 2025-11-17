import logo from "../../assets/logo.svg";
import { IoHomeSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-primary text-light px-4 py-3">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-2 md:gap-0">

        <div className="flex items-center gap-3">


          <img
            src={logo}
            onClick={() => navigate("/")}
            alt="Logo"
            className="h-10 w-auto object-contain cursor-pointer"
          />
        </div>

        <h1 className="text-center text-sm sm:text-base md:text-xl font-semibold md:absolute left-1/2 md:-translate-x-1/2">
          Sistema para gestión de RRHH
        </h1>

        <div className="hidden md:block w-12"></div>

                  <IoHomeSharp
            onClick={() => navigate("/")}
            className="text-light text-2xl cursor-pointer hover:opacity-80 transition"
          />
      </div>
    </header>
  );
}
