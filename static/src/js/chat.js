const chatSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/chat/'
)

chatSocket.onmessage = function(e) {
    console.log(e)
    const data = JSON.parse(e.data);
    console.log(data)
}

let message = "nuestro mensaje"
chatSocket.send(JSON.stringify({
                'message': message
            }));