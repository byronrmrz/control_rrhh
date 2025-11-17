import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-primary text-light px-6 py-3">
      <div className="mx-auto max-w-7xl flex items-center justify-between relative">
        
        <img src={logo}  onClick={() => navigate("/")} alt="Logo" className="h-12 w-auto object-contain" />

        <h1 className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold">
          Sistema para gestión de Empleados
        </h1>

        {/* Espaciador para balancear el flex */}
        <div className="w-12"></div>
      </div>
    </header>
  );
}
