// Get net module 
const net = require('net');

//Configuration ===================================
const port = 8181;
//=================================================

//send time
let sedT;

let sendData = 'hello PCP';

//================= Client ============================
//Create the socket client.
const client = new net.Socket();

//Connect to the server on the configured port 
client.connect(port, function () {
   //Log when the connection is established
   console.log(`Cleint :Connected to server on port ${port}`);

   //Try to send data to the server
   client.write(sendData);
   console.log(`Client send to server : ${sendData}`);

   //save read time
   sedT = new Date();

});
//Handle data coming from the server
client.on('data', function (data) {
   console.log(`Client received from server : ${data}`);
   console.log(sendData.localeCompare(data) >= 0);
   console.log((new Date(new Date() - sedT).getTime() / 1000) + ' sec.');
});
// Handle connection close 
client.on('close', function () {
   console.log('Cleint :Connection Closed');
});
//Handle error
client.on('error', function (error) {
   console.error(`Connection Error ${error}`);
});