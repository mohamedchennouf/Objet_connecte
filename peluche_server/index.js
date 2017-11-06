var restify = require('restify');
var fetch = require('node-fetch');
var bodyParser = require('body-parser');
const server = restify.createServer({
    name: 'myapp',

    version: '1.0.0'
});


server.use(bodyParser.urlencoded({
    extended: true
}));
server.use(bodyParser.json());

server.opts(/.*/, (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'));
    res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    res.send(200);
    return next();
});

server.post('/button', function (req, res, next) {
    console.log("Button " + req.body.status);
    return next();
});

server.listen(9070, function () {
    console.log('%s listening at %s', server.name, server.url);
});

var pi = {
    addr: "localhost",
    port: 7896
};

if (process.argv.length > 2)
    pi.addr = process.argv[2];
if (process.argv.length > 3)
    pi.port = +process.argv[3];

console.log("Teddy is on " + pi.addr + ":" + pi.port);

// Just forward the request to the object...
server.post('/light', (req, res, next) => {
    console.log(req.params);
    console.log(req.body);

    fetch('http://' + pi.addr + ':' + pi.port + '/light', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    }).then((result) => {
        if (result.ok) {
            console.log("Light successfuly turned " + req.body.status);
            res.send();
        } else
            res.send(result.status);
        return next();
    }).catch((err) => {
        console.error("An error happened.");
        console.error(err);
        res.send(500, err);
    });
});
