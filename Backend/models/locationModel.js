const db = require("../config/db");

const createCountryDb = async (nombre) => {
  const sql = "INSERT INTO pais (nombre) VALUES (?) ";
  return new Promise((resolve, reject) => {
    db.query(sql, [nombre], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const createDeptoDb = async (departamento) => {
  const sql = "INSERT INTO departamento set ?";
  return new Promise((resolve, reject) => {
    db.query(sql, departamento, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const createMunicipioDb = async (municipio) => {
  const sql = "INSERT INTO municipio set ?";
  return new Promise((resolve, reject) => {
    db.query(sql, municipio, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getAllCountries = async () => {
  const sql = "SELECT * FROM pais WHERE activo = 1";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getAllDeptos = async () => {
    const sql = `
        SELECT 
            d.departamento_id,
            d.nombre AS departamento,
            d.pais_id,
            p.nombre AS pais
        FROM departamento d
        INNER JOIN pais p ON d.pais_id = p.pais_id 
        WHERE d.activo = 1
    `;

    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const getAllMunicipios = async () => {
  const sql = `
        SELECT
            m.municipio_id,
            m.nombre AS municipio,
            d.departamento_id,
            d.nombre AS departamento,
            p.pais_id,
            p.nombre AS pais
        FROM municipio m 
        INNER JOIN departamento d ON m.departamento_id = d.departamento_id
        INNER JOIN pais p ON d.pais_id = p.pais_id
        WHERE m.activo = 1
    `;
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const delCountry = async (pais_id) => {
    return new Promise((resolve, reject) => {

        const sqlPais = `UPDATE pais SET activo = 0 WHERE pais_id = ?`;
        const sqlDeptos = `UPDATE departamento SET activo = 0 WHERE pais_id = ?`;
        const sqlMunicipios = `
            UPDATE municipio 
            SET activo = 0
            WHERE departamento_id IN (
                SELECT departamento_id 
                FROM departamento 
                WHERE pais_id = ?
            )
        `;

        db.query(sqlPais, [pais_id], (err) => {
            if (err) return reject(err);

            db.query(sqlDeptos, [pais_id], (err) => {
                if (err) return reject(err);

                db.query(sqlMunicipios, [pais_id], (err) => {
                    if (err) return reject(err);

                    resolve({ message: "País inactivado correctmente" });
                });
            });
        });
    });
};

const delDepartamento = async (departamento_id) => {
    return new Promise((resolve, reject) => {

        const sqlDepto = `
            UPDATE departamento 
            SET activo = 0 
            WHERE departamento_id = ?
        `;

        const sqlMunicipios = `
            UPDATE municipio 
            SET activo = 0
            WHERE departamento_id = ?
        `;

        db.query(sqlDepto, [departamento_id], (err, resultDepto) => {
            if (err) return reject(err);

            db.query(sqlMunicipios, [departamento_id], (err) => {
                if (err) return reject(err);

                resolve({
                    message: "Departamento y municipios inactivados correctamente",
                    departamento_id
                });
            });
        });

    });
};

const delMunicipio = async (municipio_id) => {
    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE municipio 
            SET activo = 0
            WHERE municipio_id = ?
        `;

        db.query(sql, [municipio_id], (err, result) => {
            if (err) return reject(err);

            resolve({
                municipio_id,
                affectedRows: result.affectedRows
            });
        });

    });
};


module.exports = {
  createCountryDb,
  createDeptoDb,
  createMunicipioDb,
  getAllCountries,
  getAllDeptos,
  getAllMunicipios,
  delCountry,
  delDepartamento,
  delMunicipio
};
