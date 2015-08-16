
//process.argv.forEach(function (val, index, arr) {
//  console.log(index + ': ' + val,arr);
//});
var args = process.argv.slice(2);
var myJson = JSON.parse(args.join(''));
var file = './assets/node.bundle.js'; 
require(file);
var MyApp = global.app;
var React = global.React;
var tmp = React.renderToString(MyApp(
    myJson 
));
console.log(tmp);
