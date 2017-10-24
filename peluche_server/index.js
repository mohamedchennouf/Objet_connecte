var restify = require('restify');

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

console.log("The ip is on " + pi.addr + ":" + pi.port);

server.post('/light', (req, res, next) => {
    fetch(pi.addr + ':' + pi.port + '/light', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        if (res.ok) {
            console.log("Light success");
        }
    });
    return next();
});
