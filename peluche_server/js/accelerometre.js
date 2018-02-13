var dataAccelerometer = null;
var ip = '192.168.1.158';
var port = '7896';

function GetAccelerometre() {
    var http = new XMLHttpRequest();
    var url = "http://"+ip+":"+port+"/accelerometer";

    http.open('GET', url, false);
    http.send(null);

    if (http.status === 200) {
        console.log("La position est  : %s", http.responseText);
        data = http.responseText;
        document.getElementById("infoAccelerometre").innerHTML = data;
    } else {
        console.log("Status de la réponse: %d (%s)", http.status, http.statusText);
    }

}


fetch("http://"+ip+":"+port+"/accelerometer-stream").then(msg=>{
    var reader = msg.body.getReader();
    var readFunc = tmp=>{
        var string = new TextDecoder("utf-8").decode(tmp.value);
        dataAccelerometer = string;
        drawAccelerometer();
        if(!tmp.done) reader.read().then(readFunc);
   };
    reader.read().then(readFunc);
}).catch(e=>{console.error(e)});


function drawAccelerometer() {
    console.log(dataAccelerometer);
    document.getElementById("infoAccelerometre").innerHTML = dataAccelerometer;           
}