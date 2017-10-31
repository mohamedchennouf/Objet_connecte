var restify = require('restify');
var fetch = require('node-fetch');
var bodyParser = require('body-parser')

const server = restify.createServer({
    name: 'myapp',

    version: '1.0.0'
});

server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(bodyParser.json());

server.post('/button', function (req, res, next) {
    console.log("Button pressed");
    res.send(req.params);
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
	res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.body);
    res.send("ok");
    /*
    fetch('http://' + pi.addr + ':' + pi.port + '/light', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.params)
    }).then((result) => {
        if (result.ok) {
            console.log("Light successfuly turned " + req.params.status);
            res.send();
        } else
            res.send(result.status);
        return next();
    }).catch((err) => {
        console.error("An error happened.");
        console.error(err);
        res.send(500, err);
    });*/
});
