const db = require('../config/config');

const Archivo = {};

Archivo.findById = (id_usuario, result) => {
    const sql = `
    SELECT 
        CONVERT(id, char) AS id,
        imagen_1,
        imagen_2,
        imagen_3
    FROM
        imagen
    WHERE 
        id_usuario = ?
    `;

    db.query(
        sql, 
        [id_usuario],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    )
}

Archivo.delete = (id, result) => {
    const sql = `
    DELETE 
    FROM
        imagen
    WHERE 
        id = ?
    `;

    db.query(
        sql, 
        [id],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    )
}

Archivo.create = (archivo, result) => {
    const sql = `
        INSERT INTO
            imagen(
                id_usuario,
                imagen_1,
                imagen_2,
                imagen_3
            )
        VALUES(?, ?, ?, ?)
        `;

    db.query
    (
        sql,
        [
            archivo.id_usuario,
            archivo.imagen_1,
            archivo.imagen_2,
            archivo.imagen_3
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de las imagenes:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

Archivo.update = (archivo, result) => {
    const sql = `
        UPDATE
            imagen
        SET
            id_usuario = ?,
            imagen_1 = ?,
            imagen_2 = ?,
            imagen_3 = ?
        WHERE
            id = ?
        `;

    db.query
    (
        sql,
        [
            archivo.id_usuario,
            archivo.imagen_1,
            archivo.imagen_2,
            archivo.imagen_3,
            archivo.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id de las imagenes actualizadas:', archivo.id);
                result(null, archivo.id);
            }
        }
    )
}


module.exports = Archivo;