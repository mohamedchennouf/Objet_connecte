var stateTemp = null;
var mytemperature = null;
var ip = '192.168.1.158';
var port = '7896';

function GetTemperature() {
    var http = new XMLHttpRequest();
    var url = "http://"+ip+":"+port+"/temperature";

    http.open('GET', url, false);
    http.send(null);

    if (http.status === 200) {
        console.log("La temperature : %s", http.responseText);
        data = http.responseText;
        document.getElementById("infoTemperature").innerHTML = data;
        drawTemperature(data);
    } else {
        console.log("Status de la réponse: %d (%s)", http.status, http.statusText);
    }
}


function SeuilTemperature(temperature) {
    mytemperature = temperature;
    if (temperature < 15) {
        stateTemp =  0;
    }
    else if (temperature > 30) {
        stateTemp =  1;
    }
    else {
        stateTemp = 2;
    }
}


function drawTemperature(value) {
    SeuilTemperature(value);
    var edit_image = document.getElementById("image");
    if (stateTemp === 0) {
        edit_image.src = './image/froid.png';
    } else if (stateTemp === 1) {
        edit_image.src = './image/chaud.jpg';
    } else {
         edit_image.src = './image/content.jpg';
    }         
    document.getElementById("infoTemperature").innerHTML = mytemperature;           
}


fetch("http://"+ip+":"+port+"/temperature-stream").then(msg=>{
    var reader = msg.body.getReader();
    var readFunc = tmp=>{
        var string = new TextDecoder("utf-8").decode(tmp.value);
        drawTemperature(+string);
        if(!tmp.done) reader.read().then(readFunc);
   };
    reader.read().then(readFunc);
}).catch(e=>{console.error(e)});

