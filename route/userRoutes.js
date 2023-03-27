const userController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app, upload) => {
    app.post('/api/users/create', userController.register);
    app.post('/api/users/createWithImage', upload.array('image', 1), userController.registerWithImage);
    app.post('/api/users/login', userController.login);

    //app.put('/api/users/update', passport.authenticate('jwt', { session: false }), userController.update);   
    app.put('/api/users/update', upload.array('image', 1), userController.updateWithImage); 
    app.put('/api/users/updateWithouImage', userController.updateWithoutImage); 

    app.get('/api/users/findByRol/:id_rol', userController.findByRol);

}