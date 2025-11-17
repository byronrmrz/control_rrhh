import { useEffect, useState } from "react";
import Table from "../components/forms/Table";
import {
  getMunicipios,
  getDepartamentos,
  getPaises,
  createPais,
  updatePais,
  borrarPais
} from "../api/api";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import FormEmpresa from "../components/forms/FormEmpresa";
import FormBase from "../components/forms/Form";
import Swal from "sweetalert2";

export default function Pais() {
  const [empresas, setEmpresas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [paises, setPaises] = useState([]);
  const [selectedPais, setSelectedPais] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [nombrePais, setNombrePais] = useState(null);


  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (selectedPais) {
      setNombrePais(selectedPais.nombre || "");
    }
  }, [selectedPais]);

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
    { header: "ID", key: "pais_id" },
    { header: "Nombre", key: "nombre" },
    
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
      value: nombrePais,
      onChange: (e) => setNombrePais(e.target.value),
      required: true,
    },
    
  ];

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = {
      nombre:nombrePais
    };
    await createPais(data);

    setIsOpen(false);
    load();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      nombre: nombrePais,
    };
    await updatePais(selectedPais.pais_id, data);

    setIsOpen(false);
    load();
  };

  const confirmDelete = (country) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el país: ${country.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(country);
        Swal.fire("Eliminado", "el país ha sido eliminado exitosamente.", "success");
      }
    });
  };

  const handleDelete = async (country) => {
    const data = { is_active: 0 };
    await borrarPais(country.pais_id, data);
    setIsOpen(false);
    load();
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-5xl font-bold">Países</h1>

      <div className="mt-5 mb-7">
        <Button
          onClick={() => {
            setSelectedPais(null);
            setNombrePais("");
            // setRazonSocial("");
            // setNit("");
            // setDireccion("");
            // setPais("");
            // setDepartamento("");
            // setMunicipio("");
            // setTelefono("");
            // setCorreo("");
            setIsOpen(true);
          }}
          variant="third"
        >
          Agregar País
        </Button>
      </div>

      <Table
        columns={columns}
        data={paises}
        onEdit={(country) => {
          setSelectedPais(country);
          setIsOpen(true)
        }}
        onDelete={(country) => confirmDelete(country)}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FormBase title={selectedPais ? "Modificar nombre del país" : "Crear País"} fields={fields} onSubmit={selectedPais ? handleUpdate : handleCreate} />
      </Modal>
    </div>
  );
}