import { useEffect, useState } from "react";
import Table from "../components/forms/Table";
import {
  getPaises,
  getMunicipios,
  getDepartamentos,
  createDepto,
  updateDepto,
  borrarDepto,
  createMunicipio,
  updateMuni,
  borrarMun
} from "../api/api";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import FormEmpresa from "../components/forms/FormEmpresa";
import Swal from "sweetalert2";

export default function Municipio() {
  const [empresas, setEmpresas] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [paises, setPaises] = useState([]);
  const [selectedMunicipio, setSelectedMunicipio] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [nombreDepartamento, setNombreDepartamento] = useState(null);
  const [nombreMunicipio, setNombreMunicipio] = useState(null);

  const [pais, setPais] = useState("");
  const [departamento, setDepartamento] = useState("");
    const [municipio, setMunicipio] = useState("");


  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (selectedMunicipio) {
      setNombreMunicipio(selectedMunicipio.municipio || "");
      setDepartamento(selectedMunicipio.departamento_id ?? "");
      setPais(selectedMunicipio.pais_id ?? "");
    }
  }, [selectedMunicipio]);

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
    { header: "Municipio", key: "municipio" },
    { header: "Departamento", key: "departamento" },
    { header: "Pais", key: "pais" },
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
      value: nombreMunicipio,
      onChange: (e) => setNombreMunicipio(e.target.value),
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
  ];

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = {
      municipio: nombreMunicipio,
      departamento_id: departamento,
      pais_id: pais || null,
      activo: 1,
    };
    await createMunicipio(data);

    setIsOpen(false);
    load();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      nombre: nombreMunicipio,
      departamento_id: departamento,
    };
    await updateMuni(selectedMunicipio.municipio_id, data);

    setIsOpen(false);
    load();
  };

  const confirmDelete = (mun) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará el Municipio: ${mun.municipio}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(mun);
        Swal.fire(
          "Eliminado",
          "El Municipio ha sido eliminado exitosamente.",
          "success"
        );
      }
    });
  };

  const handleDelete = async (mun) => {
    const data = { is_active: 0 };
    await borrarMun(mun.municipio_id, data);
    setIsOpen(false);
    load();
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-5xl font-bold">Municipios</h1>

      <div className="mt-5 mb-7">
        <Button
          onClick={() => {
            setSelectedMunicipio(null);
            setNombreDepartamento("");

            setIsOpen(true);
          }}
          variant="third"
        >
          Agregar Municipio
        </Button>
      </div>

      <Table
        columns={columns}
        data={municipios}
        onEdit={(mun) => {
          setSelectedMunicipio(mun);
          setIsOpen(true);
        }}
        onDelete={(mun) => confirmDelete(mun)}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FormEmpresa
          title={
            selectedMunicipio
              ? "Modificar información del Municipio"
              : "Crear Municipio"
          }
          fields={fields}
          onSubmit={selectedMunicipio ? handleUpdate : handleCreate}
        />
      </Modal>
    </div>
  );
}
