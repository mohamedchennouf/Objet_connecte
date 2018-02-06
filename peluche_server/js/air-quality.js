
function GetAirQuality() {
    var http = new XMLHttpRequest();
    var url = "http://"+ip+":"+port+"/air-quality";

    http.open('GET', url, false);
    http.send(null);

    if (http.status === 200) {
        console.log("La qualite air est : %s", http.responseText);
        data = http.responseText;
        document.getElementById("infoAir").innerHTML = data;
    } else {
        console.log("Status de la réponse: %d (%s)", http.status, http.statusText);
    }
}


fetch("http://"+ip+":"+port+"/air-quality-stream").then(msg=>{
    var reader = msg.body.getReader();
    var readFunc = tmp=>{
        var string = new TextDecoder("utf-8").decode(tmp.value);
       document.getElementById("infoAir").innerHTML = string;
        if(!tmp.done) reader.read().then(readFunc);
   };
    reader.read().then(readFunc);
}).catch(e=>{console.error(e)});