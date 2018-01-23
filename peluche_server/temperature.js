var data = "no data to display";

function myTemperature() {
    console.log('toto2');
    var http = new XMLHttpRequest();
    var url = "http://192.168.1.158:9070/temperature";

    http.open('GET', url, false);
    http.send(null);

    if (http.status === 200) {
        console.log("Réponse reçue: %s", http.responseText);
        data = http.responseText;
    } else {
        console.log("Status de la réponse: %d (%s)", http.status, http.statusText);
    }

}