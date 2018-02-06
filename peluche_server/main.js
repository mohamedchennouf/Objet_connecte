


var ip = '192.168.1.158';
var port = '7896';




function runAnimationCars() {
    running = setInterval(mainloop, 1000);
}

function mainloop(){
    displayTime();
    AllumeVeilleuse({hour:20 ,minutes:30},1);
    RunBerceuse({hour:20 ,minutes:35});
}


runAnimationCars();