const { updateToSeen } = require('../models/mensaje');
const Mensaje = require('../models/mensaje');

module.exports = {
    async create(req, res) {
        const mensaje = req.body;
            Mensaje.create(mensaje, (err, data) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro del mensaje',
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
    findByChat(req, res) {
        const id_chat = req.params.id_chat;

        Mensaje.findByChat(id_chat, (err, data) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los mensajes',
                    error: err
                });
            }
            
            return res.status(201).json(data);
        });
    },
    async updateToSeen(req, res) {
        const id = req.body.id;
            Mensaje.updateToSeen(id, (err, data) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'No se pudo actualiuzar el mensaje',
                        error: err
                    });
                }
                return res.status(201).json({
                    success: true,
                    message: 'El mensaje se ha actualizado correctamente'
                });
            });
    }
}