module.exports = (io) => {
    const chatNSP = io.of('/chat');
    chatNSP.on('connection', function(socket) {
        console.log('USUARIO SE CONECTO A SOCKET IO', socket.id);

        socket.on('message', function(data){
            console.log('NUEVO MENSAJE', data);
            chatNSP.emit(`message/${data.id_chat}`, data);
            chatNSP.emit(`message/${data.id_user}`, data);
        });

        socket.on('seen', function(data){
            console.log('Mensaje visto', data);
            chatNSP.emit(`seen/${data.id_chat}`, data);
        });

        socket.on('disconnet', function(data){
            console.log('UN USUARIO SE DESCONECTO', socket.id);
        });
    });
}