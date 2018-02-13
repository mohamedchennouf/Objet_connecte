var ip = '192.168.1.158';
var port = '7896';
var precedentValue = "OFF";
var cpt = 0;

function SeuilNoise(bruit) { 
    if(bruit >= 400) {
        cpt = 0;
        PostLight("ON")
        precedentValue = "ON"
    }else{
        if(cpt === 20){
            PostLight("OFF");
        }
    }
    cpt ++;
    
}




fetch("http://"+ip+":"+port+"/sound-level-stream").then(msg=>{
    var reader = msg.body.getReader();
    var readFunc = tmp=>{
        var string = new TextDecoder("utf-8").decode(tmp.value);
       document.getElementById("infoBruit").innerHTML = string;
       SeuilNoise(+string);
        if(!tmp.done) reader.read().then(readFunc);
   };
    reader.read().then(readFunc);
}).catch(e=>{console.error(e)});