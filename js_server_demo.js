const http = require('http');
const ws = require('ws');

const wss = new ws.Server({noServer: true});

function accept(req, res) {
  console.log("Incomming connection");

  // all incoming requests must be websockets
  if (!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket') {
    console.log("Connection rejected because it is not a websocket");
    res.end();
    return;
  }

  // can be Connection: keep-alive, Upgrade
  if (!req.headers.connection.match(/\bupgrade\b/i)) {
    console.log("Non upgradable connection");
    res.end();
    return;
  }

  console.log("...accepting connection");
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function onConnect(ws) {
  ws.on('message', function (message) {
    message = message.toString();
    console.log("Got message:");
    console.log(message);

    if(message === "Designer_Message"){
      console.log("Got message from Firework Designer");
    }

    if(message === "Sky_Message"){
      console.log("Got message from Sky");
    }


    /*
    let name = message.match(/([\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]+)$/gu) || "Guest";
    ws.send(`Hello from server, ${name}!`);*/

    // setTimeout(() => ws.close(1000, "Bye!"), 5000);
  });
}

if (!module.parent) {
  http.createServer(accept).listen(42742);
} else {
  exports.accept = accept;
}