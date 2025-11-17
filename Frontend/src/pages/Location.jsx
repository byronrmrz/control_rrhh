import CardButton from "../components/ui/CardButton";
import { useNavigate } from "react-router-dom";
import { FaGlobe } from "react-icons/fa";
export default function Locations() {
  const navigate = useNavigate();
  return (
    <div className="text-center p-6">
      <h1 className="text-5xl font-bold">Ubicaciones</h1>
      <p className="text-1xl text-primary mb-20">
        {" "}
        Modifica, agrega o elimina una ubicación
      </p>

      <div className="grid grid-cols-3 justify-items-center">
        <CardButton
          icon={<FaGlobe size={100} className="text-primary"/>}
          title="Países"
          onClick={() => navigate("/pais")}
        />

        <CardButton
          icon={<FaGlobe size={100} className="text-primary"/>}
          title="Departamentos"
          onClick={() => navigate("/departamento")}
        />

        <CardButton
          icon={<FaGlobe size={100}className="text-primary" />}
          title="Municipios"
          onClick={() => navigate("/municipio")}
        />
      </div>
    </div>
  );
}
