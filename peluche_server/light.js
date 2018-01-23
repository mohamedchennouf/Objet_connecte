var status = "OFF";

function myLight() {
    if (status == "OFF")
        status = "ON";
    else
        status = "OFF";
    /*$.post( "http://localhost:9070/light", function( data ) {
     //As soon as the browser finished downloading, this function is called.
     $('#demo').html(data);
     });*/
    var http = new XMLHttpRequest();
    var url = "http://192.168.1.158:7896/light";

    var params = JSON.stringify({ status: status });
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
        }
    }

    http.send(JSON.stringify({ status: status }));
}