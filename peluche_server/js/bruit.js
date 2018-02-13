var ip = '192.168.1.158';
var port = '7896';
var lights = require("/Users/mezrigui/Desktop/Objet_connecte/peluche_server/js/bruit.js");
var light = lights.PostLight;


function SeuilNoise(bruit) {
    if (bruit > 300) {
        light;
    }
}




fetch("http://"+ip+":"+port+"/sound-level-stream").then(msg=>{
    var reader = msg.body.getReader();
    var readFunc = tmp=>{
        var string = new TextDecoder("utf-8").decode(tmp.value);
       document.getElementById("infoBruit").innerHTML = string;
       SeuilNoise(+String);
        if(!tmp.done) reader.read().then(readFunc);
   };
    reader.read().then(readFunc);
}).catch(e=>{console.error(e)});