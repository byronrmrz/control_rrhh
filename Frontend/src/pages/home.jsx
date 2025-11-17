import CardButton from "../components/ui/CardButton";
import { useNavigate } from "react-router-dom";
import { FaUser, FaBuilding, FaGlobe } from "react-icons/fa";
export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="text-center p-6">
      <h1 className="text-5xl font-bold">Bienvenido</h1>
      <p className="text-1xl text-primary mb-20">
        {" "}
        Selecciona una opción para agregar o modificar
      </p>

      <div className="grid grid-cols-3 justify-items-center">
        <CardButton 
          icon={<FaUser size={100} className="text-primary"/>}
          title="Colaboradores" 
          onClick={() => navigate("/colaboradores")}
        />

        <CardButton
          icon={<FaBuilding size={100} className="text-primary" />}
          title="Empresas"
          onClick={() => navigate("/empresas")}
        />

        <CardButton
          icon={<FaGlobe size={100}  className="text-primary"/>}
          title="Ubicaciones"
          onClick={() => navigate("/locations")}
        />
      </div>
    </div>
  );
}
