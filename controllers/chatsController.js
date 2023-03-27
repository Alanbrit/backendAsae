const Chat = require('../models/chat');

module.exports = {
    async create(req, res) {
        const chat = req.body;
            Chat.create(chat, (err, data) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del chat',
                        error: err
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: 'El registro se realizo correctamente',
                    data: data
                });
            });
    },
    findById(req, res) {
        const id_user1 = req.params.id_user1;
        const id_user2 = req.params.id_user2;
        const id_user3 = req.params.id_user3;
        const id_user4 = req.params.id_user4;

        Chat.findById(id_user1, id_user2, id_user3, id_user4, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los chats',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },
    findByIdUser(req, res) {
        const id_user = req.params.id_user;
        const id_user1 = req.params.id_user1;
        const id_user2 = req.params.id_user2;

        Chat.findByIdUser(id_user, id_user1, id_user2, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los chats',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },
    update(req, res) {
        const chat = req.body;
        Chat.update(chat, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la acctualizacion',
                    error: err
                });
            }
            return res.status(201).json({
                success: true,
                message: 'La actualizacion se realizo correctamente',
                data: data
            });
        });
    }
}