var data = "no data to display";

function myTemperature() {
    console.log('toto2');
    var http = new XMLHttpRequest();
    var url = "http://192.168.1.158:7896/temperature";

    http.open('GET', url, true);
    http.send(null);

    if (http.status === 200) {
        console.log("La temperature s: %s", http.responseText);
        data = http.responseText;
    } else {
        console.log("Status de la réponse: %d (%s)", http.status, http.statusText);
    }

}