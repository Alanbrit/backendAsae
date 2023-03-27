const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const update = require('../models/user');
const storage = require('../utils/cloud_storage');

module.exports = {

    login(req, res) {
        const correo = req.body.correo;
        const password = req.body.password;

        User.findByEmail(correo, async (err, myUser) => {
            console.log('Error', err);
            console.log('Usuario', myUser);
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de usuario',
                    error: err
                });
            }
            if (!myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'El email no fue encontrado',
                    error: err
                });
            }

            const isPasswordValid = await bcrypt.compare(password, myUser.password);

            if (isPasswordValid) {
                const token = jwt.sign({id: myUser.id, correo: myUser.correo}, keys.secretOrKey, {});
                const data = {
                    id: `${myUser.id}`,
                    correo: myUser.correo,
                    nombre: myUser.nombre,
                    apellidos: myUser.apellidos,
                    fecha_nacimiento: myUser.fecha_nacimiento,
                    telefono: myUser.telefono,
                    foto: myUser.foto,
                    id_rol: myUser.id_rol,
                    session_token: `JWT ${token}`
                }
                return res.status(201).json({
                    success: true,
                    message: 'El usuario fue autenticado',
                    data: data
                });
            }
            else {
                return res.status(401).json({
                    success: false,
                    message: 'El password es incorrecto',
                    error: err
                });
            }
        });
    },

    register(req, res) {
        const user = req.body;
        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de usuario',
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

    async registerWithImage(req, res) {
        const user = JSON.parse(req.body.user);

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if(url != undefined && url != null) {
                user.foto = url;
            }
        }

        User.create(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con el registro de usuario',
                    error: err
                });
            }

            user.id = `${data}`;
            const token = jwt.sign({id: user.id, correo: user.correo}, keys.secretOrKey, {});
            session_token = `JWT ${token}`;

            return res.status(201).json({
                success: true,
                message: 'El registro se realizo correctamente',
                data: user
            });
        });
    },

    async updateWithImage(req, res) {
        const user = JSON.parse(req.body.user);

        const files = req.files;

        if (files.length > 0) {
            const path = `image_${Date.now()}`;
            const url = await storage(files[0], path);

            if(url != undefined && url != null) {
                user.foto = url;
            }
        }

        User.update(user, (err, data) => {

            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion del usuario',
                    error: err
                });
            }
            User.findById(data, (err, myData) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con la actualizacion del usuario',
                        error: err
                    });
                }

                myData.session_token = user.session_token;
    
                return res.status(201).json({
                    success: true,
                    message: 'El usuario se actualizo correctamente',
                    data: myData
                });
            })
        });
    },
    
    async updateWithoutImage(req, res) {
        const user = req.body;
        

        User.updateWithoutImage(user, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error con la actualizacion del usuario',
                    error: err
                });
            }

            User.findById(data, (err, myData) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con la actualizacion del usuario',
                        error: err
                    });
                }

                myData.session_token = user.session_token;
    
                return res.status(201).json({
                    success: true,
                    message: 'El usuario se actualizo correctamente',
                    data: myData
                });
            })
        });
    },
    findByRol(req, res) {
        const id_rol = req.params.id_rol;

        User.findByRol(id_rol, (err, data) => {
            if(err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar los usuarios',
                    error: err
                });
            }
            
            return res.status(201).json(data);
        });
    },

    
    
}