const { createColaboradorDb, getColaboradoresDb,updateColaborador } = require('../models/colaboradorModel');

const createColaborador = async (req, res) => {
  const { nombre, nit, edad, telefono, correo, empresa_id, is_active} = req.body;

  try {
    
    const colaborador = {
        nombre: nombre,
        nit: nit,
        edad: edad,
        telefono: telefono,
        correo: correo,
        empresa_id: empresa_id, 
        is_active:is_active,
    };

    await createColaboradorDb(colaborador);
    res.status(201).json({message: "Colaborador creada correctamente", colaborador})


  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al crear Colaborador', error: err.message });
  }
};


const getAllColaboradores = async (req, res) => {
    try{
        const colaboradores = await getColaboradoresDb();
        if(!colaboradores || colaboradores.length === 0)
        {
            return res.status(201).json({message: "No hay Colaboradores registrados"})

        }
        res.status(201).json({colaboradores})

    }catch(err){
        res.status(400).json({message: "Error trayendo empresa", err})

    }
}

const actualizarColaborador = async (req,res) => {
    const {empleado_id} = req.params;
    const datos = req.body;
    console.log('empleado: ', empleado_id)
    try{
        const result = await updateColaborador(empleado_id, datos);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Colaborador no encontradO" });
    }

    res.status(200).json({
      message: "Colaborador actualizado correctamente",
      empleado_id,
      cambios: datos
    });

  } catch (err) {
    res.status(500).json({
      message: "Error actualizando colaborador",
      error: err.message
    });
    }
}




module.exports = {createColaborador, getAllColaboradores, actualizarColaborador}

