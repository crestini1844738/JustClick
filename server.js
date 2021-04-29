// npm install body-parser --save
// npm install cookie-parser --save
// npm install express-session
// npm install ejs

var express = require('express');
var request2server = require('request');

var app = express();
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var path = require('path');

//per le sesioni exrpess
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//app.use(express.static(__dirname + '/public'));
//per far vedere tutti i file basta questo. Vengono viti tutti i file che si trovano nella cartella public
//Per questo motivo va messo tutto in public nelle rispettive cartelle
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');


var urlencodedparser = bodyParser.urlencoded({extended:false})
//PROVA AJAX
/*app.post('/ajax', urlencodedparser, function (req, res){  
    console.log(req.body);
    var user=req.body.Username;
    var pass=req.body.Password;
    if(req.body.Username=='Valeriosalame2')
    {
        console.log('giusto');
    }
    console.log('req received');
    res.render(__dirname + '/public/views/login.ejs', { errormessage: 'PROVAAAAA' });
    //res.redirect('/login');
    res.end();
 
 });*/





//GET PAGINA INIZIALE
app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/views/index.html');
});


//GET PAGINA ABOUT US
app.get('/AboutUs', function(req,res) {
    res.sendFile(__dirname+'/public/views/AboutUs.html');
});


//GET PAGINA LOGIN
app.get('/login',function(req,res){
    res.render(__dirname + '/public/views/login.ejs', { errormessage: '' });   
});




//AUTENTICAZIONE LOGIN
//uso delle sessione per salvare l' utente autenticato
app.post('/login/auth', function(req, res) {
	var username = req.body.Username;
	var password = req.body.Password;
	request2server({
            //mettere l'url del proprio database
            url: 'http://admin:admin@127.0.0.1:5984/progetto/'+username, 
            method: 'GET',
            headers: {'content-type': 'application/json'},
            }, function(error, response, body){
                console.log('effettuando il login...');
            if(error) {
                console.log(error);
            }
            else 
            {
                //se lo user non è nel db manda error 404
                if(response.statusCode==404) {
                    
                    // Login errato
                    console.log('username not found')
                    res.render(__dirname + '/public/views/login.ejs', { errormessage: 'Username not found' });
                }
                else
                {
                    let json = JSON.parse(body);
                    if(json.Password==password)
                    {   
                        //login ok 
                        //console.log(response.statusCode);
                        console.log('Accesso effettuato da '+username.toString()+'!');
                        req.session.loggedin = true;
                        req.session.username= json.username;
                        res.redirect('/personalArea');
                    }
                    else
                    {
                        console.log('password non valida');
                        res.render(__dirname + '/public/views/login.ejs', { errormessage: 'Incorrect  password' });
                    }
                }
                res.end();
            }
        });
});

app.get('/logout',function(req, res){
    if (req.session) {
        req.session.destroy();
    }
    if (req.session) {
        req.session.destroy(err => {
          if (err) {
            res.status(400).send('Unable to log out')
          } else {
            res.render(__dirname + '/public/views/login.ejs', { errormessage: 'Logout successful' });
          }
        });
      } else {
        res.end()
      }
});


//area personale di ogni utente
//accesso solo se si è loggati. Uso delle sessioni per vedere se si è loggati oppue no 
app.get('/personalArea', function(req, res) {
	if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		res.redirect('/login');
	}
	res.end();
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
        body: '{ "Username":"'+req.body.Username+'","Name":"'+req.body.Name+'","Surname":"'+req.body.Surname+'" ,"Date":"'+req.body.Date+'","Email":"'+req.body.Email+'","Password":"'+req.body.Password+'"   }'
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

//POST PER UPLOAD DI FILE
const fileupload = require('express-fileupload');
app.use(fileupload());
app.post('/carica', function(req,res) {
        if(!req.files) console.log('error 400: nessuna immagine selezionata');
        else if(req.files.image.size > 50000) console.log('immagine troppo grande');
        else {
            if(req.files.image.mimetype!='image/jpeg' && req.files.image.mimetype!='image/jpg' && req.files.image.mimetype!='image/png' &&
            req.files.image.mimetype!='image/gif' && req.files.image.mimetype!='image/svg+xml' ) 
                console.log('formato immagine non valido');
            else {
                req.files.image.name = 'banana.png';
                req.files.image.mv(__dirname+'/public/img/profileImgs/'+req.files.image.name, function(err) {
                    if(err) return res.status(500).send(err);
                });
                console.log('file uploaded!');
            }
        }
        res.sendFile(__dirname + '/public/php/myform.html');
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
