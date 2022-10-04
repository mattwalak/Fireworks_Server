activeSky = null;


const http = require('http');
const ws = require('ws');

const wss = new ws.Server({noServer: true});

function accept(req, res) {
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

  console.log("...accepting new connection");
  wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onConnect);
}

function processDesignerMessage(ws, msg){
  if(activeSky != null){
    console.log("Designer: sending message to sky");
    activeSky.send(msg);
  }else{
    console.log("Designer: no active sky");
  }
}

function processSkyMessage(ws, msg){
  if(msg === "setAsActiveSky"){
    console.log("Sky: Setting this instance as active")
    activeSky = ws;
  }else{
    console.log(`Sky: Unknown message = ${msg}`);
  }
}


function onConnect(ws) {
  ws.on('message', function (message) {
    console.log(`Got message ${message}`);
    message = message.toString();
    colon_i = message.indexOf(':');
    if(colon_i < 0){
      console.log(`Tossing message = ${message}; No delimiter`);
    }else{
      prefix = message.substring(0, colon_i);
      data = message.substring(colon_i + 1, message.length)
      if(prefix === "sky"){
        processSkyMessage(ws, data);
      }else if(prefix === "designer"){
        processDesignerMessage(ws, data);
      }else{
        console.log(`Tossing message, unknown prefix = ${prefix}`)
      }
    }
  });
}

if (!module.parent) {
  console.log("launching on port 42742");
  http.createServer(accept).listen(42742);
} else {
  exports.accept = accept;
}