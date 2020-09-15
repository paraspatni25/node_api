var express = require('express');
const app = express();
var mysql = require('mysql');

var bodyparser = require('body-parser');

var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:'user_info'
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
// Post request sent
app.post('/register/',(req,res,next)=>{
    
    var data = req.body;
    var userName = data.userName;
    var password = data.password;

    console.log(userName+"--"+password);

    connection.query("SELECT * FROM user_data WHERE userName = ?",[userName],function(err,result,fields){
        connection.on('error',(err)=>{
            console.log("[MySQL ERROR]",err)
    
        });
        if (result && result.length){
            res.json("User already exists.");
        }
        else {
            var insert_cmd = "INSERT INTO user_data (userName,password) values(?,?)";
            values = [userName,password];

            console.log("Executing: "+insert_cmd);
            connection.query(insert_cmd,values,(err,result,fields)=>{
                connection.on('err',(err)=>{
                    console.log('[MySQL Error]',err);
                });

                res.json("Registered!!!");
                console.log("Registeration Sucessfull");

            });
        }
    });
});
//Login
app.post('/login/',(req,res,next)=>{
    
    var data = req.body;
    var userName = data.userName;
    var password = data.password;

    connection.query("SELECT * FROM user_data WHERE userName = ?",[userName],(err,result,fields)=>{
        connection.on('error',(err)=>{
            console.log('[MySQL Error]',err);
        });
        
        if (result && result.length){
            console.log(result);

            if(password == result[0].password){
                res.json("User Logged IN");
                res.end;
            }
            else{
                res.json("Passcode Does Not Match");
                res.end;
            }
        }
        else{
            res.json("User Not Found");
            res.end;
        } 
    });
});

var server = app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000");
});