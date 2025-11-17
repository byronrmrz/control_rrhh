const db = require("../config/db");


const createColaboradorDb = async (colaborador) => {
  const sql = "INSERT INTO colaborador  SET ? ";
  return new Promise((resolve, reject) => {
    db.query(sql, [colaborador], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getColaboradoresDb = async() =>{
  const sql = `
    SELECT
    c.empleado_id,
    c.nombre,
    c.edad,
    c.nit,
    c.telefono,
    c.correo,
    c.empresa_id,
    e.nombre_comercial AS empresa,
    c.is_active
    FROM colaborador c
    INNER JOIN empresa e ON c.empresa_id = e.empresa_id
    WHERE c.is_active = 1
  `;
    return new Promise((resolve, reject) => {
      db.query(sql,(err, result)=>{
        if(err)return reject(err)
        resolve(result);
      })
    })
}

const updateColaborador = async (empleado_id, nuevaData) => {
  const sql = "UPDATE colaborador SET ? WHERE empleado_id = ?";

  return new Promise((resolve, reject) => {
    db.query(sql, [nuevaData, empleado_id], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};


module.exports = {
createColaboradorDb,
getColaboradoresDb,
updateColaborador
};