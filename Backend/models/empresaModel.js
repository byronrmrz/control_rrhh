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
};