var data = "no data to display";

function myAccelerometre() {
    console.log('toto');
    var http = new XMLHttpRequest();
    var url = "http://192.168.1.158:7896/accelerometer";

    http.open('GET', url, true);
    http.send(null);

    if (http.status === 200) {
        console.log("La qualite dair est : %s", http.responseText);
        data = http.responseText;
    } else {
        console.log("Status de la réponse: %d (%s)", http.status, http.statusText);
    }

}