var express = require('express');
var request2server = require('request');
// npm install body-parser
// deprecated solo il costruttore 
// var bodyParser = require("body-parser");

var app = express();
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//var path = require('path');


//app.use(express.static(__dirname + '/public'));
//per far vedere tutti i file basta questo. Vengono viti tutti i file che si trovano nella cartella public
//Per questo motivo va messo tutto in public nelle rispettive cartelle
app.use(express.static('public'));
app.use(express.json());

//per far vedere i file css,img e logo
//app.use('/static', express.static(path.join(__dirname, 'cssPersonal')))
//app.use('/static', express.static(path.join(__dirname, 'logo')))
//app.use('/static', express.static(path.join(__dirname, 'img')))
//app.use('/static', express.static(path.join(__dirname, 'css')))
//app.use('/static', express.static(path.join(__dirname, 'js')))


//GET PAGINA INIZIALE
app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/views/index.html');
});


//GET LOGIN
app.get('/login',function(req,res){
    res.sendFile(__dirname + '/public/views/login.html');   
});


//EFFETTUARE LOGIN
app.post('/loginsend',function(req,res){

    console.log('effettuando il login...');
    //curl --get http://admin:admin@127.0.0.1:5984/progetto/_all_docs
    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:5984/progetto/'+req.body.Username, 
        method: 'GET',
        headers: {'content-type': 'application/json'},
        }, function(error, response, body){
            console.log('effettuando il login...'+req.body.Username);
        if(error) {
            console.log(error);
        }
        else 
        {
            //se lo user non è nel db manda error 404
            if(response.statusCode==404) {
                res.sendFile(__dirname + '/public/views/login.html');
            }

            //altrimenti restituisce l'elemento
            else{
                let json = JSON.parse(body);
                console.log(response.statusCode, json[0]);
                res.sendFile(__dirname + '/public/views/index.html');
            }        
        }
    });
});


//GET CORSI
app.get('/courses', function(req,res) {
    //res.sendFile(path.join(__dirname + '/public/views/courses.html'));
    res.sendFile(__dirname + '/public/views/courses.html');
});


//GET REGISTER
app.get('/register',function(req,res){
    
    res.sendFile(__dirname + '/public/views/registrazione.html');
    console.log('fornita pagina registrazione ');
});

//POST REGISTER
app.post("/registerInsert", function(req,res){
    
    console.log(req.body);
    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:5984/progetto/'+req.body.Username, 
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: '{ "username":"'+req.body.Username+'","name":"'+req.body.Name+'","surname":"'+req.body.Surname+'" ,"date":"'+req.body.Date+'","Email":"'+req.body.Email+'","Password":"'+req.body.Password+'"   }'
        //body: JSON.stringify(body1)
    }, function(error, response, body){
        if(error) {
            console.log(error);
        }
        else 
        {
            res.sendFile(__dirname + '/public/views/index.html');
            /*
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
            
            res.end();*/
            console.log(response.statusCode, body);
        }
    });

});

//vecchio metodo con la get, non lo levo perchè potrebbe tornarmi utile per altre cose
/*app.get('/registerInsert', function(req, res){

    console.log(req.query);+
    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:5984/progetto/'+req.query.Username, 
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
            
            res.end();
            console.log(response.statusCode, body);
        }
    });
  ;
});*/

app.listen(8889);
console.log('Server running at port 8889');
