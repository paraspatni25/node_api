var express = require('express');
const app = express();

var mysql = require('mysql');

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'items'
});

connection.connect(function(err){
    if (err) throw err;
    console.log("connected!!!");

    var image = "https://static.zara.net/photos///2020/I/2/2/p/0220/015/999/2/w/460/0220015999_1_1_1.jpg?ts=1592557801990";
    var price = "25";

    var insertCmd = "INSERT INTO item(image,price) value (?,?)";
    var values = [image,price];


    connection.query(insertCmd,values,function(err,result){
        if (err) throw err;
        console.log("1 Entry Recorded");
    });
});

var server = app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
});
