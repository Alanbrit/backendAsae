const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');
const io = require('socket.io')(server);
const multer = require('multer');

const chatSocket = require('./sockets/chat_socket');

const usersRoutes = require('./route/userRoutes');
const chatRoutes = require('./route/chatRoutes');
const mensajeRoutes = require('./route/mensajeRoutes');
const imageRoutes = require('./route/imageRoutes');

const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.disable('x-poered-by');

app.set('port', port);

const upload = multer({
    storage: multer.memoryStorage()
});

chatSocket(io);

usersRoutes(app, upload);
chatRoutes(app);
mensajeRoutes(app);
imageRoutes(app, upload);

server.listen(port, '192.168.0.24' || 'localhost', function() {
    console.log('Aplicacion de Nodejs ' + port + ' Iniciada...')
});

app.get('/', (req, res) => {
    res.send('Ruta raiz del backend');
});

app.get('/test', (req, res) => {
    res.send('Este es la ruta TEST');
});

//Error handler
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});