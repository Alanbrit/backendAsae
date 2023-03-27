const imagesController = require('../controllers/archivoController');

module.exports = (app, upload) => {
    app.post('/api/image/create', upload.array('image', 3), imagesController.create);
  
    app.get('/api/image/findById/:id_usuario', imagesController.findById);

    app.delete('/api/image/delete/:id', imagesController.delete);

}