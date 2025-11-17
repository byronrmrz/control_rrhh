import { useEffect, useState } from "react";
import Table from "../components/forms/Table";
import {
    getPaises,
  getMunicipios,
  getDepartamentos,
createDepto,
updateDepto,
borrarDepto
} from "../api/api";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import FormEmpresa from "../components/forms/FormEmpresa";
import Swal from "sweetalert2";

export default function Departamento() {
  const [empresas, setEmpresas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [paises, setPaises] = useState([]);
  const [selectedDepartmento, setSelectedDepartamento] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [nombreDepartamento, setNombreDepartamento] = useState(null);
    const [pais, setPais] = useState("");



  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (selectedDepartmento) {
      setNombreDepartamento(selectedDepartmento.departamento || "");
            
      setPais(selectedDepartmento.pais_id ?? "");

    }
  }, [selectedDepartmento]);

  const load = async () => {
    try {

      const resMunicipios = await getMunicipios();
      setMunicipios(resMunicipios.data.municipio || []);

      const resDeptos = await getDepartamentos();
      setDepartamentos(resDeptos.data.deptos || []);

      const resPaises = await getPaises();
      setPaises(resPaises.data.countries || []);

    } catch (err) {
      console.error("ERROR:", err.response?.data || err);
    }
  };

  const columns = [
    { header: "ID", key: "departamento_id" },
    { header: "Departamento", key: "departamento" },
    { header: "Pais", key: "pais" },

    
  ];

  const paisOptions = paises.map((p) => ({
    value: String(p.pais_id),
    label: p.nombre,
  }));


//   const departamentoOptions = departamentos
//     .filter((d) => {
//       if (!pais) return true; 
//       return Number(d.pais_id) === Number(pais);
//     })
//     .map((d) => ({
//       value: String(d.departamento_id),
//       label: d.departamento, 
//     }));

//   const municipioOptions = municipios
//     .filter((m) => {
//       if (!departamento) return true; 
//       return Number(m.departamento_id) === Number(departamento);
//     })
//     .map((m) => ({
//       value: String(m.municipio_id),
//       label: m.municipio, 
//     }));

  const fields = [
    {
      label: "Nombre",
      placeholder: "",
      value: nombreDepartamento,
      onChange: (e) => setNombreDepartamento(e.target.value),
      required: true,
    },
    {
      label: "País",
      type: "select",
      value: pais,
      options: paisOptions,
      onChange: (e) => {
        setPais(e.target.value);
        // setDepartamento("");
      },
      required: true,
    //   childFor: "departamento",
    },
    
  ];

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = {
      departamento:nombreDepartamento,
      pais_id: pais || null,
            activo: 1,


    };
    await createDepto(data);

    setIsOpen(false);
    load();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      nombre: nombreDepartamento,
      pais_id: pais
    };
    await updateDepto(selectedDepartmento.departamento_id, data);

    setIsOpen(false);
    load();
  };

  const confirmDelete = (depto) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el Departamento: ${depto.departamento}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(depto);
        Swal.fire("Eliminado", "el Departamento ha sido eliminado exitosamente.", "success");
      }
    });
  };

  const handleDelete = async (depto) => {
    const data = { is_active: 0 };
    await borrarDepto(depto.departamento_id, data);
    setIsOpen(false);
    load();
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-5xl font-bold">Departamentos</h1>

      <div className="mt-5 mb-7">
        <Button
          onClick={() => {
            setSelectedDepartamento(null);
            setNombreDepartamento("");

            setIsOpen(true);
          }}
          variant="third"
        >
          Agregar Departamento
        </Button>
      </div>

      <Table
        columns={columns}
        data={departamentos}
        onEdit={(depto) => {
          setSelectedDepartamento(depto);
          setIsOpen(true)
        }}
        onDelete={(depto) => confirmDelete(depto)}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FormEmpresa title={selectedDepartmento ? "Modificar información del Departamento" : "Crear Departamento"} fields={fields} onSubmit={selectedDepartmento ? handleUpdate : handleCreate} />
      </Modal>
    </div>
  );
}