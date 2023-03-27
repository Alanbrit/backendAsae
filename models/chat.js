const db = require('../config/config');

const Chat = {};

Chat.findByIdUser = (id_user, id_user1, id_user2, result) => {
    const sql = `
    SELECT 
        CONVERT(C.id, char) as id,
        CONVERT(C.id_user1, char) as id_user1,
        CONVERT(C.id_user2, char) as id_user2,
        C.timestamp,
        U1.nombre AS name_user1,
        U1.apellidos AS apellidos_user1,
        U1.correo AS email_user1,
        U1.telefono AS numero_user1,
        U1.foto AS foto_user1,
        U2.nombre AS name_user2,
        U2.apellidos AS apellidos_user2,
        U2.correo AS email_user2,
        U2.telefono AS numero_user2,
        U2.foto AS foto_user2,
        (
			SELECT
				contenido
			FROM
				mensajes AS M
			WHERE
				M.id_chat = C.id
			ORDER BY
				M.timestamp DESC
			LIMIT 1
		) AS last_message,
        (
            SELECT
                COUNT(*)
            FROM
                mensajes AS M
            WHERE
                M.id_chat = C.id AND ((M.status = 'ENVIADO' OR M.status = 'RECIBIDO') AND M.id_receptor = ?)
        ) AS unread_message,
        (
			SELECT
				timestamp
			FROM
				mensajes AS M
			WHERE
				M.id_chat = C.id
			ORDER BY
				M.timestamp DESC
			LIMIT 1
		) AS last_message_timestamp
    FROM
        chats AS C
    INNER JOIN
        usuario AS U1
    ON
        U1.id = C.id_user1	
    INNER JOIN
        usuario AS U2
    ON
        U2.id = C.id_user2
    WHERE
        (id_user1 = ? OR id_user2 = ?)
    AND
        (
            SELECT
                COUNT(*)
            FROM 
                mensajes AS M
            WHERE
                M.id_chat = C.id
        ) > 0
    `;

    db.query(
        sql, 
        [
            id_user,
            id_user1,
            id_user2
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

Chat.create = async (chat, result) => {
    const sql = `
        INSERT INTO
            chats(
                id_user1,
                id_user2,
                timestamp,
                created_at,
                updated_at
            )
        VALUES(?, ?, ?, ?, ?)
    `;

    db.query
    (
        sql,
        [
        chat.id_user1,
        chat.id_user2,
        new Date().getTime(),
        new Date(),
        new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del chat:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

Chat.findById = (id_user1, id_user2, id_user3, id_user4, result) => {
    const sql = `
    SELECT
        CONVERT(id, char) as id,
        CONVERT(id_user1, char) as id_user1,
        CONVERT(id_user2, char) as id_user2,
        timestamp
    FROM
        chats
    WHERE
        (id_user1 = ? AND id_user2 = ?)
    OR
        (id_user1 = ? AND id_user2 = ?)
    `;
    db.query(
        sql,
        [
            id_user1,
            id_user2,
            id_user3,
            id_user4
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


Chat.update = async (chat, result) => {
    const sql = `
        UPDATE
            chats
        SET
            id_user1 = ?,
            id_user2 = ?,
            timestamp = ?,
            updated_at = ?
        WHERE
            id = ?
    `;

    db.query
    (
        sql,
        [
        chat.id,
        chat.id_user1,
        chat.id_user2,
        new Date().getTime(),
        new Date()
        ],
        (err, res) => {
            if (err) {
                console.log('Error:', err);
                result(err, null);
            }
            else {
                console.log('Id del chat:', res.insertId);
                result(null, res.insertId);
            }
        }
    )
}

module.exports = Chat;