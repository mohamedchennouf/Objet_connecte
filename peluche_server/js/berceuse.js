


function PostBerceuse() {
   
    var http = new XMLHttpRequest();
    var url = "http://"+ip+":"+port+"/berceuse";
    var uriBerceuse = 'http://www.brainybetty.com/FacebookFans/Feb112010/cello.wav';

    var params = JSON.stringify({ apiBerceuse : uriBerceuse });
    http.open("POST", url, true);

    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/json");

    http.onreadystatechange = function () {//Call a function when the state changes.
       document.getElementById("infoRunBerceuse").innerHTML = 'is Running';
       document.getElementById("infoNameBerceuse").innerHTML = uriBerceuse ;
        if (http.readyState == XMLHttpRequest.DONE && http.status == 200) {
            console.log('envoye correctement');
        }
    };

    http.send(params);
}


function RunBerceuse(time){
        if(time.hour===d.getHours() && time.minutes===d.getMinutes() && d.getSeconds()===0){
             document.getElementById("infoRunBerceuse").innerHTML = 'La berceuse est lance';
            PostBerceuse();
        }else if(time.hour===d.getHours() && time.minutes>=d.getMinutes() && time.minutes < d.getMinutes() + 5 ){
            document.getElementById("infoRunBerceuse").innerHTML = 'La berceuse est lance';
        }
        else{
            document.getElementById("infoRunBerceuse").innerHTML = "La berceuse se lancera a "+time.hour +":"+time.minutes;
        }
}








