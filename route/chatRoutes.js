const passport = require('passport');
const chatsController = require('../controllers/chatsController');

module.exports = (app) => {
    app.get('/api/chats/findByIdUser/:id_user/:id_user1/:id_user2', chatsController.findByIdUser);
    app.get('/api/chats/findById/:id_user1/:id_user2/:id_user3/:id_user4', chatsController.findById);

    app.post('/api/chats/create', chatsController.create);

    app.put('/api/chats/update', chatsController.update);
}