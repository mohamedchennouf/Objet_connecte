var express = require('express');





 var app = express();
 app.get('/', function(req, res) {
     res.sendFile('C:/Users/chennouf/Desktop/objet_connecte/Objet_connecte/peluche_server/home.html');
 });



// route image
app.get('/image/froid.png', function(req, res) {
     res.sendFile('C:/Users/chennouf/Desktop/objet_connecte/Objet_connecte/peluche_server/image/froid.png');
 });

app.get('/image/chaud.jpg', function(req, res) {
     res.sendFile('C:/Users/chennouf/Desktop/objet_connecte/Objet_connecte/peluche_server/image/chaud.jpg');
 });

app.get('/image/content.jpg', function(req, res) {
     res.sendFile('C:/Users/chennouf/Desktop/objet_connecte/Objet_connecte/peluche_server/image/content.jpg');
 });





//route js files
app.get('/js/light.js', function(req, res) {
     res.sendFile('C:/Users/chennouf/Desktop/objet_connecte/Objet_connecte/peluche_server/js/light.js');
 });

app.get('/main.js', function(req, res) {
     res.sendFile('C:/Users/chennouf/Desktop/objet_connecte/Objet_connecte/peluche_server/main.js');
 });

app.get('/js/temperature.js', function(req, res) {
     res.sendFile('C:/Users/chennouf/Desktop/objet_connecte/Objet_connecte/peluche_server/js/temperature.js');
 });

app.get('/js/berceuse.js', function(req, res) {
     res.sendFile('C:/Users/chennouf/Desktop/objet_connecte/Objet_connecte/peluche_server/js/berceuse.js');
 });

app.get('/js/air-quality.js', function(req, res) {
     res.sendFile('C:/Users/chennouf/Desktop/objet_connecte/Objet_connecte/peluche_server/js/air-quality.js');
 });

app.get('/js/accelerometre.js', function(req, res) {
     res.sendFile('C:/Users/chennouf/Desktop/objet_connecte/Objet_connecte/peluche_server/js/accelerometre.js');
 });


 app.listen(8080); 










