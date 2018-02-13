


var ip = '192.168.1.158';
var port = '7896';
var heureVeilleuse = [17,30];
var heureBerceuse = [20,35];




function runAnimationCars() {
    running = setInterval(mainloop, 1000);
    //mainloop();
}

function mainloop(){
    displayTime();
    AllumeVeilleuse({hour:heureVeilleuse[0] ,minutes:heureVeilleuse[1] },1);
    RunBerceuse({hour: heureBerceuse[0] ,minutes:heureBerceuse[1] });
}


function changerVeilleuse(){
    var newHeure = document.getElementById("timeV").value;
    heureVeilleuse[0]=newHeure;
}

function changerBerceuse(){
    var newHeure = document.getElementById("timeB").value;
    heureBerceuse[0]=newHeure;
}




runAnimationCars();