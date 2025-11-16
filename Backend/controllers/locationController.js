const { createCountryDb,createDeptoDb,createMunicipioDb,getAllCountries,getAllDeptos,getAllMunicipios,delCountry,delDepartamento,delMunicipio } = require('../models/locationModel');

const createCountry = async(req, res) => {
    const body = req.body;
    try{
        const nombre = body.nombre
        if(!nombre){
            return res.status(400).json({message: "El nombre del país es obligatorio"})
        }
        const result = await createCountryDb(nombre);
        res.status(201).json({message: "País creado correctamente",country_id: result.insertId,nombre
})
        console.log('País Creado: ', nombre)
    }catch(err){
    console.log(err);
    res.status(500).json({ message: 'Error creando el país', error: err.message });
    }
}

const createDepto = async(req,res)=>{
    const body = req.body;

    try{
        const {departamento, pais_id} = body;

        if(!departamento || !pais_id){
            return res.status(400).json({message: "Datos incompletos"});
        }
        const departamentodB = {nombre: departamento, pais_id: pais_id, nombre:departamento}
        const result =  await createDeptoDb(departamentodB);
        res.status(201).json({message: "Departamento Creado Correctamente", departamento_id: result.insertId})

    }catch(err){
        res.status(500).json({message:"Error Creando Departamento", error: err.message})
    }
}


const createMunicipio = async(req,res)=>{
    const body = req.body;

    try{
        const {municipio, departamento_id} = body;

        if(!municipio || !departamento_id){
            return res.status(400).json({message: "Datos incompletos"});
        }
        const municipiodB = {nombre: municipio, departamento_id: departamento_id}
        const result =  await createMunicipioDb(municipiodB);
        res.status(201).json({message: "Municipio Creado Correctamente", municipio_id: result.insertId, nombre: municipio})

    }catch(err){
        res.status(500).json({message:"Error Creando Municipio", error: err.message})
    }
}

const getCountries = async(req,res)=>{
    try{
        const countries = await getAllCountries();
        res.status(200).json({ countries})
    }catch(err){
    }
}

const getDeptos = async (req, res) => {
    try {
        const deptos = await getAllDeptos();
        res.status(200).json({ deptos });
    } catch (err) {
        res.status(500).json({
            message: "Error obteniendo departamentos",
            error: err.message
        });
    }
};
const getMunicipios = async(req,res)=>{
    try{
        const municipio = await getAllMunicipios();
        res.status(200).json({ municipio})
    }catch(err){
                res.status(500).json({
            message: "Error obteniendo Municipios",
            error: err.message
        });
    }
}

const deleteCountry = async (req,res)=>{
    const {pais_id} = req.params;
    try{
        const deleted = await delCountry(pais_id)
            res.status(200).json({
            message: "País inactivado correctamente",
            pais_id,
            affected_rows: deleted.affectedRows
        });    
    }catch(err){
         res.status(500).json({
            message: "Error Borrando países",
            error: err.message
        });
    }
}

const deleteDepartamento = async (req,res)=>{
    const {departamento_id} = req.params;
    try{
        const deleted = await delDepartamento(departamento_id)
            res.status(200).json({
            message: "Departamento inactivado correctamente",
            departamento_id,
            affected_rows: deleted.affectedRows
        });    
    }catch(err){
         res.status(500).json({
            message: "Error Borrando departamento",
            error: err.message
        });
    }
}

const deleteMunicipio = async (req, res) => {
    const { municipio_id } = req.params;

    try {
        const deleted = await delMunicipio(municipio_id);

        res.status(200).json({
            message: "Municipio inactivado correctamente",
            municipio_id,
            affected_rows: deleted.affectedRows
        });

    } catch (err) {
        res.status(500).json({
            message: "Error inactivando municipio",
            error: err.message
        });
    }
};





module.exports = {createCountry, createDepto,createMunicipio,getCountries,getDeptos,getMunicipios,deleteCountry,deleteDepartamento,deleteMunicipio}