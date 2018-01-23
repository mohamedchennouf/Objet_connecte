var data = "no data to display";

function myAccelerometre() {
    var http = new XMLHttpRequest();
    var url = "http://192.168.1.158:7896/accelerometer";

    http.open('GET', url, false);
    http.send(null);

    if (http.status === 200) {
        console.log("La position est  : %s", http.responseText);
        data = http.responseText;
        document.getElementById("log").innerHTML = data;
    } else {
        console.log("Status de la réponse: %d (%s)", http.status, http.statusText);
    }

}