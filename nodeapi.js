const http = require('http');
const { Console } = require('console');

console.log("Running on http:localhost:8080");

http.createServer(function(req,res){
    res.write("<h1>Hello World<h1>");
    res.end();
}).listen(3000);