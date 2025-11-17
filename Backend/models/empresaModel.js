const db = require("../config/db");


const createEmpresaDb = async (empresa) => {
  const sql = "INSERT INTO empresa  SET ? ";
  return new Promise((resolve, reject) => {
    db.query(sql, [empresa], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getEmpresasDb = async(pais_id) =>{
  const sql = "SELECT * FROM empresa WHERE pais_id = ? && is_active = 1"
    return new Promise((resolve, reject) => {
      db.query(sql, [pais_id],(err, result)=>{
        if(err)return reject(err)
        resolve(result);
      })
    })
}

const getAllEmpresasDb = async(pais_id) =>{
  const sql = `
      SELECT 
        e.empresa_id,
        e.nombre_comercial,
        e.razon_social,
        e.direccion, 
        e.nit,
        e.telefono,
        e.correo,
        e.pais_id, 
        e.departamento_id,
        e.municipio_id,
        p.nombre AS pais,
        d.nombre AS departamento,
        m.nombre AS municipio
        FROM empresa e
        INNER JOIN pais p ON e.pais_id = P.pais_id
        INNER JOIN departamento d ON e.departamento_id = d.departamento_id
        INNER JOIN municipio m ON e.municipio_id = m.municipio_id
        WHERE  e.is_active = 1`;
    return new Promise((resolve, reject) => {
      db.query(sql, [pais_id],(err, result)=>{
        if(err)return reject(err)
        resolve(result);
      })
    })
}

const updateEmpresa = async (empresa_id, nuevaData) => {
  const sql = "UPDATE empresa SET ? WHERE empresa_id = ?";

  return new Promise((resolve, reject) => {
    db.query(sql, [nuevaData, empresa_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


module.exports = {
  createEmpresaDb,
  getEmpresasDb,
  updateEmpresa,
  getAllEmpresasDb
};