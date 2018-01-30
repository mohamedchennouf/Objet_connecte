var status = "OFF";
var d = null;

//myLight();

function PostLight() {
    if (status == "OFF")
        status = "ON";
    else
        status = "OFF";
    /*$.post( "http://localhost:9070/light", function( data ) {
     //As soon as the browser finished downloading, this function is called.
     $('#demo').html(data);
     });*/
    var http = new XMLHttpRequest();
    var url = "http://192.168.1.165:7896/light";

    var params = JSON.stringify({ status: status });
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () {//Call a function when the state changes.
       document.getElementById("infoVeilleuse").innerHTML = status;
        if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {
            console.log(status);
        }
    };
    http.send(JSON.stringify({ status: status }));
}


function displayTime(){
    d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString();
}

function AllumeVeilleuse(time,duration){
     if(time.hour===d.getHours() && time.minutes>=d.getMinutes() && d.getMinutes()<time.minutes + duration ){
       document.getElementById("infoVeilleuse").innerHTML = 'La veilleuse est allume durant '+duration+' minutes';
        if(time.hour===d.getHours() && time.minutes===d.getMinutes() && d.getSeconds()===0){
            PostLight();
        }
     }else{
         document.getElementById("infoVeilleuse").innerHTML = "La veilleuse s'allumera a "+time.hour +":"+time.minutes;
     }
}
