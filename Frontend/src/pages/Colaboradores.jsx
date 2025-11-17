import { useEffect, useState } from "react";
import Table from "../components/forms/Table";
import {
  getColaboradores,
  createColaborador,
  updateColaborador,
  getEmpresas
} from "../api/api";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";
import FormBase from "../components/forms/Form";
import Swal from "sweetalert2";


export default function Colabordores() {
  const [colaboradores, setColaboradores] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [nit, setNit] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [selectedColab, setSelectedColab] = useState(null);
  const [empresas, setEmpresas] = useState([]);


  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (selectedColab) {
      setNombre(selectedColab.nombre);
      setEdad(selectedColab.edad);
      setNit(selectedColab.nit);
      setEmail(selectedColab.correo);
      setEmpresa(selectedColab.empresa_id);
    }
  }, [selectedColab]);

const load = async () => {
  try {
    const resCol = await getColaboradores();
    setColaboradores(resCol.data.colaboradores);

    const resEmp = await getEmpresas();
    setEmpresas(resEmp.data.empresas);

  } catch (err) {
    console.error("ERROR:", err.response?.data);
  }
};

  const columns = [
    { header: "Nombre", key: "nombre" },
    { header: "Edad", key: "edad" },
    { header: "NIT", key: "nit" },
    { header: "Email", key: "correo" },
    { header: "Empresa", key: "empresa" },
  ];

  const fields = [
    {
      label: "Nombre completo",
      placeholder: "Ej. Juan Pérez",
      value: nombre,
      onChange: (e) => setNombre(e.target.value),
      required: true,
    },
    {
      label: "Edad",
      type: "number",
      placeholder: "Ej. 43",
      value: edad,
      onChange: (e) => setEdad(e.target.value),
      required: true,
    },
    {
      label: "Nit",
      value: nit,
      onChange: (e) => setNit(e.target.value),
      required: true,
    },
    {
      label: "Email",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
      required: true,
    },
    {
    label: "Empresa",
    type: "select",
    value: empresa,
    options: empresas,  
    onChange: (e) => setEmpresa(e.target.value),
    required: true,
    },
  ];

  const handleCreate = async (e) => {
    e.preventDefault();

    const data = {
      nombre,
      edad,
      nit,
      correo: email,
      empresa_id: empresa,
      is_active: 1,
    };
    await createColaborador(data);

    setIsOpen(false);
    load();
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      nombre,
      edad,
      nit,
      correo: email,
      empresa_id: empresa,
      is_active: 1,
    };
    await updateColaborador(selectedColab.empleado_id, data);

    setIsOpen(false);
    load();
  };

  const confirmDelete = (colab) => {
    Swal.fire({
      title: "¿Está seguro?",
      text: `Se eliminará el colaborador: ${colab.nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await handleDelete(colab);
        Swal.fire(
          "Eliminado",
          "El colaborador hasido eliminado exitosamente.",
          "success"
        );
      }
    });
  };

  const handleDelete = async (e) => {
    const data = {
      is_active: 0,
    };
    await updateColaborador(selectedColab.empleado_id, data);
    setIsOpen(false);
    load();
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-5xl font-bold">Colaboradores</h1>

      <div className="mt-5 mb-7">
        <Button
          onClick={() => {
            setSelectedColab(null);
            setIsOpen(true);
          }}
          variant="third"
        >
          Agregar Colaborador
        </Button>
      </div>

      <Table
        columns={columns}
        data={colaboradores}
        onEdit={(colab) => {
          setSelectedColab(colab);
          setIsOpen(true);
        }}
         onDelete={(colab) => confirmDelete(colab)}

      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <FormBase
          title={
            selectedColab
              ? "Modificar Información del colaborador"
              : "Crear Colaborador"
          }
          fields={fields}
          onSubmit={selectedColab ? handleUpdate : handleCreate}
        />
      </Modal>
    </div>
  );
}
