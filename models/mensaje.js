const db = require('../config/config');

const Mensaje = {};
Mensaje.findByChat = (id_chat, result) => {
    const sql = `
    SELECT
        CONVERT(id, char) as id,
        contenido,
        CONVERT(id_receptor, char) as id_receptor,
        CONVERT(id_emisor, char) as id_emisor,
        CONVERT(id_chat, char) as id_chat,
        timestamp,
        status
    FROM
        mensajes
    WHERE
        id_chat = ?
    ORDER BY
        timestamp DESC
    `;
    db.query(
        sql, 
        id_chat,
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    );
}
Mensaje.create = async (mensaje, result) => {
    const sql = `
        INSERT INTO
            mensajes(
                contenido,
                id_receptor,
                id_emisor,
                timestamp,
                status,
                id_chat,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
        mensaje.contenido,
        mensaje.id_receptor,
        mensaje.id_emisor,
        new Date().getTime(),
        'ENVIADO',
        mensaje.id_chat,    
        new Date(),
        new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del mensaje:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}
Mensaje.updateToSeen = (id, result) => {
    const sql = `
    UPDATE
        mensajes
    SET
        status = 'VISTO',
        updated_at = ?
    WHERE
        id = ?
    `;
    db.query(
        sql, 
        [
            new Date(),
            id
            
        ],
        (err, data) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                result(null, data);
            }
        }
    );
}


module.exports = Mensaje;