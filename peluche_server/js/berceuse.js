


function myBerceuse() {
   
    var http = new XMLHttpRequest();
    var url = "http://192.168.1.165:7896/berceuse";

    var params = JSON.stringify({ apiBerceuse : 'http://www.brainybetty.com/FacebookFans/Feb112010/cello.wav' });
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () {//Call a function when the state changes.
       document.getElementById("log").innerHTML = 'is Running';
        if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {
            console.log('envoye correctement');
        }
    };

    http.send(params);
}








