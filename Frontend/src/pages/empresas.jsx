import { useEffect, useState } from "react";
import Table from "../components/forms/Table";
import {
  getEmpresas,
  createEmpresa,
  updateEmpresa,
  getMunicipios,
  getDepartamentos,
  getPaises,
} from "../api/api";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import FormEmpresa from "../components/forms/FormEmpresa";
import Swal from "sweetalert2";

export default function Empresas() {
  const [empresas, setEmpresas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [paises, setPaises] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const [nombreComercial, setNombreComercial] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [nit, setNit] = useState("");
  const [direccion, setDireccion] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [pais, setPais] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (selectedEmpresa) {
      setNombreComercial(selectedEmpresa.nombre_comercial || "");
      setRazonSocial(selectedEmpresa.razon_social || "");
      setNit(selectedEmpresa.nit || "");
      setDireccion(selectedEmpresa.direccion || "");
      setMunicipio(selectedEmpresa.municipio_id ?? "");
      setDepartamento(selectedEmpresa.departamento_id ?? "");
      setPais(selectedEmpresa.pais_id ?? "");
      setTelefono(selectedEmpresa.telefono || "");
      setCorreo(selectedEmpresa.correo || "");
      setIsOpen(true); 
    }
  }, [selectedEmpresa]);

  const load = async () => {
    try {
      const resEmp = await getEmpresas();
      setEmpresas(resEmp.data.empresas || []);

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
    { header: "Nombre", key: "nombre_comercial" },
    { header: "Razón Social", key: "razon_social" },
    { header: "NIT", key: "nit" },
    { header: "Dirección", key: "direccion" },
    { header: "Municipio", key: "municipio" },
    { header: "Departamento", key: "departamento" },
    { header: "Pais", key: "pais" },
    { header: "Teléfono", key: "telefono" },
    { header: "Correo", key: "correo" },
  ];

  const paisOptions = paises.map((p) => ({
    value: String(p.pais_id),
    label: p.nombre,
  }));

  const departamentoOptions = departamentos
    .filter((d) => {
      if (!pais) return true; 
      return Number(d.pais_id) === Number(pais);
    })
    .map((d) => ({
      value: String(d.departamento_id),
      label: d.departamento, 
    }));

  const municipioOptions = municipios
    .filter((m) => {
      if (!departamento) return true; 
      return Number(m.departamento_id) === Number(departamento);
    })
    .map((m) => ({
      value: String(m.municipio_id),
      label: m.municipio, 
    }));

  const fields = [
    {
      label: "Nombre Comercial",
      placeholder: "",
      value: nombreComercial,
      onChange: (e) => setNombreComercial(e.target.value),
      required: true,
    },
    {
      label: "Razón Social",
      placeholder: "",
      value: razonSocial,
      onChange: (e) => setRazonSocial(e.target.value),
      required: true,
    },
    {
      label: "Nit",
      value: nit,
      onChange: (e) => setNit(e.target.value),
      required: true,
    },
    {
      label: "Dirección",
      value: direccion,
      onChange: (e) => setDireccion(e.target.value),
      required: true,
    },
    {
      label: "País",
      type: "select",
      value: pais,
      options: paisOptions,
      onChange: (e) => {
        setPais(e.target.value);
        setDepartamento("");
        setMunicipio("");
      },
      required: true,
      childFor: "departamento",
    },
    {
      label: "Departamento",
      type: "select",
      value: departamento,
      options: departamentoOptions,
      onChange: (e) => {
        setDepartamento(e.target.value);
        setMunicipio("");
      },
      required: true,
      disabled: !pais, 
      childFor: "municipio",
    },
    {
      label: "Municipio",
      type: "select",
      value: municipio,
      options: municipioOptions,
      onChange: (e) => setMunicipio(e.target.value),
      required: true,
      disabled: !departamento, 
    },

    {
      label: "Teléfono",
      value: telefono,
      onChange: (e) => setTelefono(e.target.value),
      required: true,
    },
    {
      label: "Correo",
      value: correo,
      onChange: (e) => setCorreo(e.target.value),
      required: true,
    },
  ];

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = {
      nombre_comercial: nombreComercial,
      razon_social: razonSocial,
      nit,
      direccion,
      correo,
      municipio_id: municipio || null,
      departamento_id: departamento || null,
      pais_id: pais || null,
      telefono: telefono,
      is_active: 1,
    };
    await createEmpresa(data);

    setIsOpen(false);
    load();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      nombre_comercial: nombreComercial,
      razon_social: razonSocial,
      nit,
      direccion,
      correo,
      municipio_id: municipio || null,
      departamento_id: departamento || null,
      pais_id: pais || null,
      telefono: telefono,
      is_active: 1,
    };
    await updateEmpresa(selectedEmpresa.empresa_id, data);

    setIsOpen(false);
    load();
  };

  const confirmDelete = (empre) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: `Se eliminará la empresa: ${empre.nombre_comercial}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(empre);
        Swal.fire("Eliminado", "La empresa ha sido eliminada exitosamente.", "success");
      }
    });
  };

  const handleDelete = async (empre) => {
    const data = { is_active: 0 };
    await updateEmpresa(empre.empresa_id, data);
    setIsOpen(false);
    load();
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-5xl font-bold">Empresas</h1>

      <div className="mt-5 mb-7">
        <Button
          onClick={() => {
            setSelectedEmpresa(null);
            setNombreComercial("");
            setRazonSocial("");
            setNit("");
            setDireccion("");
            setPais("");
            setDepartamento("");
            setMunicipio("");
            setTelefono("");
            setCorreo("");
            setIsOpen(true);
          }}
          variant="third"
        >
          Agregar Empresa
        </Button>
      </div>

      <Table
        columns={columns}
        data={empresas}
        onEdit={(empre) => {
          setSelectedEmpresa(empre);
        }}
        onDelete={(empre) => confirmDelete(empre)}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FormEmpresa title={selectedEmpresa ? "Modificar Información de la Empresa" : "Crear Empresa"} fields={fields} onSubmit={selectedEmpresa ? handleUpdate : handleCreate} />
      </Modal>
    </div>
  );
}