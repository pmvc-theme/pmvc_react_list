
//process.argv.forEach(function (val, index, arr) {
//  console.log(index + ': ' + val,arr);
//});

var fs = require('fs');
var fd = process.stdin.fd;
var buffer = fs.readSync(fd, 4096)[0];

require('./assets/node.bundle.js');
var myJson = JSON.parse(buffer);
var MyApp = global.app;
var ReactServer = global.reactServer;
var tmp = ReactServer.renderToString(MyApp(
    myJson 
));
console.log('<!--start-->'+tmp);
