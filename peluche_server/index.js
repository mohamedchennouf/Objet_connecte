var restify = require('restify');
var fetch = require('node-fetch');

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

server.post('/button', function (req, res, next) {
    console.log("Button pressed");
    res.send(req.params);
    return next();
});

server.listen(8080, function () {
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
    });
});
