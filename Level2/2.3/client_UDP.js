const udp = require("dgram");
let client = udp.createSocket('udp4');

const port = 8383;

//send time
let sedT;

let sendData = 'hello UDP';

client.on('message', function (msg, info) {
    console.log('Data received from server : ' + msg.toString());
    console.log(sendData.localeCompare(msg) >= 0);
    console.log((new Date(new Date() - sedT).getTime() / 1000) + ' sec.');
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
    client.close();
});


client.send(Buffer.from(sendData), port, 'localhost', function (error) {
    //save read time
    sedT = new Date();

    if (error) {
        console.log(error);
        client.close();
    } else {
        console.log('Sent data: ' + sendData);
    }
});