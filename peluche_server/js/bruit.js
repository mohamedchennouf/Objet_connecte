var ip = '192.168.1.158';
var port = '7896';

fetch("http://"+ip+":"+port+"/sound-level-stream").then(msg=>{
    var reader = msg.body.getReader();
    var readFunc = tmp=>{
        var string = new TextDecoder("utf-8").decode(tmp.value);
       document.getElementById("infoBruit").innerHTML = string;
        if(!tmp.done) reader.read().then(readFunc);
   };
    reader.read().then(readFunc);
}).catch(e=>{console.error(e)});