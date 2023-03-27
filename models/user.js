const db = require('../config/config');
const bcrypt = require('bcryptjs');

const User = {};

User.findById = (id, result) => {
    const sql = `
    SELECT 
        CONVERT(id, char) AS id,
        correo,
        nombre, 
        apellidos,
        fecha_nacimiento,
        telefono,
        password,
        foto,
        CONVERT(id_rol, char) AS id_rol
    FROM
        usuario
    WHERE 
        id = ?
    `;

    db.query(
        sql, 
        [id],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )
}


User.findByEmail = (correo, result) => {
    const sql = `
    SELECT 
        id,
        correo,
        nombre, 
        apellidos,
        fecha_nacimiento,
        telefono,
        password,
        foto,
        CONVERT(id_rol, char) AS id_rol
    FROM
        usuario
    WHERE 
        correo = ?
    `;

    db.query(
        sql, 
        [correo],
        (err, user) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario obtenido:', user[0]);
                result(null, user[0]);
            }
        }
    )
}

User.create = async (user, result) => {
    const hash = await bcrypt.hash(user.password, 10);
    const rol = "1";
    const sql = `
        INSERT INTO
            usuario(
                correo,
                nombre, 
                apellidos,
                fecha_nacimiento,
                telefono,
                password,
                foto,
                id_rol
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
        `;

    db.query
    (
        sql,
        [
            user.correo,
            user.nombre,
            user.apellidos,
            user.fecha_nacimiento,
            user.telefono,
            hash,
            user.foto,
            rol
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del nuevo usuario:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}



User.update = (user, result) => {
    const sql = `
    UPDATE 
        usuario
    SET
        nombre = ?,
        apellidos = ?,
        fecha_nacimiento = ?,
        telefono = ?,
        foto = ?
    WHERE
        id = ?
    `;
    db.query
    (
        sql,
        [
            user.nombre,
            user.apellidos,
            user.fecha_nacimiento,
            user.telefono,
            user.foto,
            user.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualizado', user.id);
                result(null, user.id);
            }
        }
    )
}

User.updateWithoutImage = (user, result) => {
    const sql = `
    UPDATE 
        usuario
    SET
        nombre = ?,
        apellidos = ?,
        fecha_nacimiento = ?,
        telefono = ?
    WHERE
        id = ?
    `;
    db.query
    (
        sql,
        [
            user.nombre,
            user.apellidos,
            user.fecha_nacimiento,
            user.telefono,
            user.id
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Usuario actualizado', user.id);
                result(null, user.id);
            }
        }
    )
}


User.findByRol = (id_rol, result) => {
    const sql = `
    SELECT 
        CONVERT(id, char) as id, 
        nombre,
        apellidos,
        correo,
        foto 
    FROM 
        usuario 
    WHERE 
        id_rol = ?
    `;
    db.query(
        sql,
        [id_rol],
        (err, data) => {
            if(err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    );
}




module.exports = User;