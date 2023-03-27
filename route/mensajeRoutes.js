const passport = require('passport');
const mensajesController = require('../controllers/mensajesController');

module.exports = (app) => {

    app.get('/api/mensajes/findByChat/:id_chat', mensajesController.findByChat);

    app.post('/api/mensajes/create', mensajesController.create);

    app.put('/api/mensajes/updateToSeen', mensajesController.updateToSeen);


}