var express = require('express');
 var app = express();
 app.get('/', function(req, res) {
     res.sendFile('C:/Users/chennouf/Desktop/objet_connecte/Objet_connecte/peluche_server/home.html');
 });

 app.listen(8080); 

