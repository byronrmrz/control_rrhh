const { createEmpresaDb,getEmpresasDb, updateEmpresa,} = require('../models/empresaModel');

const createEmpresa = async (req, res) => {
  const { pais_id, departamento_id, municipio_id, nit, razon_social, nombre_comercial, telefono, correo, direccion } = req.body;

  try {
    
    const empresa = {
        pais_id: pais_id,
        departamento_id: departamento_id,
        municipio_id: municipio_id,
        nit: nit,
        razon_social: razon_social,
        nombre_comercial: nombre_comercial, 
        telefono:telefono,
        correo:correo,
        direccion:direccion
     
    };

    console.log('empresa: ', empresa)

    await createEmpresaDb(empresa);
    res.status(201).json({message: "Empresa creada correctamente", empresa})


  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error al crear Empresa', error: err.message });
  }
};

const getEmpresaPorPais = async (req, res) => {
    const {pais_id} = req.params;
    try{
        const empresas = await getEmpresasDb(pais_id);
        if(!empresas || empresas.length === 0)
        {
            return res.status(201).json({message: "No hay empresas creadas en el país seleccionado"})

        }
        res.status(201).json({empresas})

    }catch(err){
        res.status(400).json({message: "Error trayendo empresa", err})

    }
}

const actualizarEmpresa = async (req,res) => {
    const {empresa_id} = req.params;
    const datos = req.body;

    try{
        const result = await updateEmpresa(empresa_id, datos);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    res.status(200).json({
      message: "Empresa actualizada correctamente",
      empresa_id,
      cambios: datos
    });

  } catch (err) {
    res.status(500).json({
      message: "Error actualizando empresa",
      error: err.message
    });
    }
}




module.exports = {createEmpresa,getEmpresaPorPais,actualizarEmpresa}

