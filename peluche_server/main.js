


var ip = '192.168.1.158';
var port = '7896';
var heureVeilleuse = [16,51];
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
    var splits = newHeure.split(",", 2);
    heureVeilleuse[0]= parseInt(splits[0]);
    heureVeilleuse[1]= parseInt(splits[1]);
}

function changerBerceuse(){
    var newHeure = document.getElementById("timeB").value;
    var splits = newHeure.split(",", 2);
    heureBerceuse[0]= parseInt(splits[0]);
    heureBerceuse[1]= parseInt(splits[1]);
}




runAnimationCars();