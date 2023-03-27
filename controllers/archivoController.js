const Archivo = require('../models/archivo');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {
    create(req, res) {
        const archivo = JSON.parse(req.body.archivo);

        const files = req.files;

        let inserts = 0;

        if (files.length === 0) {
            return res.status(501).json({
                success: false,
                message: 'Error, debe seleccionar una imagen',
            });
        }
        else {
            Archivo.create(archivo, (err, id_imagen) => {
                if (err) {
                    return res.status(501).json({
                        success: false,
                        message: 'Hubo un error con el registro de las imagenes',
                        error: err
                    });
                }

                archivo.id = id_imagen;
                const star = async () => {
                    await asyncForEach(files, async (file) => {
                        const path = `image_${Date.now()}`;
                        const url = await storage(file, path);

                        if(url != undefined && url != null) {
                            if (inserts == 0){ //Imagen 1
                                archivo.imagen_1 = url;
                            }
                            else if (inserts == 1){ //imagen 2
                                archivo.imagen_2 = url;
                            }
                            else if (inserts == 2){ //imagen 3
                                archivo.imagen_3 = url;
                            }
                        }
                        await Archivo.update(archivo, (err, data) => {
                            if (err) {
                                return res.status(501).json({
                                    success: false,
                                    message: 'Hubo un error con el registro de las imagenes',
                                    error: err
                                });
                            }
                            inserts = inserts + 1;
                            if (inserts == files.length) {
                                return res.status(201).json({
                                    success: true,
                                    message: 'El registro se realizo correctamente',
                                    data: data
                                });
                            }
                        });
                    });
                }
                star();
            });
        }
    },
    findById(req, res) {
        const id_usuario = req.params.id_usuario;

        Archivo.findById(id_usuario, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las imnagenes',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },
    delete(req, res) {
        const id = req.params.id;

        Archivo.delete(id, (err, data) => {
            if (err) {
                return res.status(501).json({
                    success: false,
                    message: 'Hubo un error al momento de listar las imnagenes',
                    error: err
                });
            }

            return res.status(201).json(data);
        });
    },
}