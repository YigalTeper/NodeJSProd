let ws;

function connectWebSocket() {
    //1. create an instance of a websocket pointing to a specific server and port
    ws = new WebSocket('ws://localhost:3006');

    //2. Event handling - onopen, onmessage, onclose
    ws.onopen = () => {
        console.log('Connected to the WS server');
    };

    // - Server sends a message to me
    ws.onmessage = (ms) => {
        console.log(`Recieved: ${ms.data}`);

        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
            // message.textContent = reader.result;
        }

        if (event.data instanceof Blob) {
            reader.readAsText(event.data);
        }

    };

    // - Connection to server close
    ws.onclose = () => { };
}

function sendMessage() {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send('Hi');
    }
}

connectWebSocket();
