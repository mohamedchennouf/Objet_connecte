var dataAccelerometer = null;

function GetAccelerometre() {
    var http = new XMLHttpRequest();
    var url = "http://192.168.1.165:7896/accelerometer";

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


fetch('http://192.168.1.165:7896/accelerometer-stream').then(msg=>{
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