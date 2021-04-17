var express = require('express');
var request2server = require('request');
// npm install body-parser
// deprecated
// var bodyParser = require("body-parser");

var app = express();
// app.use(bodyParser.urlencoded({ extended: false }));


var path = require('path');


app.use(express.static(__dirname + '/public'));
app.use(express.json());

//GET PAGINA INIZIALE
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/register', function(req, res){

    console.log(req.query);+
    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:biar@127.0.0.1:5984/progetto/'+req.query.Username, 
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: '{ "username":"'+req.query.Username+'","name":"'+req.query.Name+'","surname":"'+req.query.Surname+'"}'
        //body: JSON.stringify(body1)
    }, function(error, response, body){
        if(error) {
            console.log(error);
        }
        else 
        {
            
            //per scrivere html su nodejs https://www.nodeacademy.it/restituire-pagine-html-un-server-node-js/
            res.writeHead(200,{"Content-Type":"text/html"});
            res.write('<!DOCTYPE html>'+
            '<html>'+
                '<head>'+     
                    '<title> Project_X - Success!</title>'+
                    '<meta charset="utf-8" />'+
                    '<meta name="viewport" content="width=device-width, initial-scale=1"/>'+
                    '<link rel="stylesheet" type="text/css" href="http://127.0.0.1:5500/css/bootstrap.min.css"/>'+
                    '<script type="text/javascript" lang="javascript" src="http://127.0.0.1:5500/js/bootstrap.bundle.min.js"></script>'+
                '</head>'+
                '<body class="text-center">'+
                    '<h1>SUCCESS</h1>'+
                    '<br>'+
                    '<img class="mb-4" src="http://127.0.0.1:5500/img.svg" alt="" width="1000" height="800" />'+
                '</body>'+
            '</html>');
            //res.sendFile('/project_RDC_LTW/index.html');
            res.end();
            console.log(response.statusCode, body);
        }
    });
  ;
});

app.listen(8889);
console.log('Server running at port 8889');
