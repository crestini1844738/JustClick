// npm install body-parser --save
// npm install cookie-parser --save
// npm install express-session
// npm install ejs
// npm install validator --save

var express = require('express');
var request2server = require('request');
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var validator = require('validator');

//variabili login
var erroreLogin=0;
var json;

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
app.set('json spaces', 2);
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');







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
    //get login se uso ajax
    //res.sendFile(__dirname + '/public/views/login.html');   

    //get login se uso ejs
    res.render(__dirname + '/public/views/login.ejs', { errormessage: '' });   
});








//AUTENTICAZIONE LOGIN CON AJAX (NON FUNZIONA DIO ******)
/*app.post('/ajax/login', (req, res) => {
    var output = {};
    var errors = [];
    var user;
    var pass;
    var index=-1;
    //fa la richiesta al database soltanto se entrambi i campi sono compilati
    if(validator.isEmpty(req.body.Username) || validator.isEmpty(req.body.Password) ) {
        errors.push({
            msg: 'Username e/o password non validi.'
        });
    }
    else
    {
        user = req.body.Username;
        pass = req.body.Password;
        
        request2server({
            //mettere l'url del proprio database
            url: 'http://admin:admin@127.0.0.1:5984/progetto/_find', 
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: '{"selector": { }, "fields": ["Username","Password"], "skip": 0, "execution_stats": true }'
            }, function(error, response, body){
            if(error) {
                console.log(error);
                
            }
            else 
            {
                console.log('effettuando il login...');
                var json=JSON.parse(body);
                //console.log(json.docs[0].Password);
                for(i=0;i<json.docs.length;i++)
                {
                    if(json.docs[i].Username==user)
                    {
                        index=i;
                        break;
                    }
                }
                if(index==-1) {
                    console.log("username sbagliato");
                    errors.push({
                        msg: 'Username not found.'
                    });
                }
                else
                {
                    if(json.docs[index].Username==user && json.docs[index].Password==pass)
                    {
                        //login ok 
                        //console.log(response.statusCode);
                        req.session.loggedin = true;
                        req.session.username=user;
                        errors=[];
                        console.log('Accesso effettuato da '+json.docs[index].Username.toString()+'!');
                        index=-3;
                    }
                    else
                    {
                        index=-2;
                        console.log("password sbagliata");
                        errors.push({
                            msg: 'Incorrect  password'
                        });
                    }
                }    
            }
        });
    }
    if(index==-1)
    {
        errors.push({
            msg: 'Username not found.'
        });
    }
    if(index==-2)
    {
        errors.push({
            msg: 'Incorrect  password'
        });
    }
    if(index== -3)
    {
        errors=[];
    }
    if(errors.length > 0) {
        console.log("errors");
        output.errors = errors;
        
    } else 
    {    
        console.log("success");
        output.success = 'Bentornato '+user.toString()+'!'
    }
    res.json(output);
});
*/


//AUTENTICAZIONE LOGIN CON EJS
//uso delle sessione per salvare l' utente autenticato
app.post('/login/auth', function(req, res) {
	var user= req.body.Username;
	var pass = req.body.Password;
    var index=-1;
	request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:5984/progetto/_find', 
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{"selector": { }, "fields": ["Username","Password"], "skip": 0, "execution_stats": true }'
        }, function(error, response, body){
            if(error){
                console.log(error);
            }
            else 
            {

                console.log('effettuando il login...');
                var json=JSON.parse(body);
                //console.log(json.docs[0].Password);
                for(i=0;i<json.docs.length;i++)
                {
                    if(json.docs[i].Username==user)
                    {
                        index=i;
                        break;
                    }
                }
                if(index==-1)
                {
                    // Login errato
                    console.log('username not found')
                    res.render(__dirname + '/public/views/login.ejs', { errormessage: 'Username not found' });
                }
                else
                {
                    if(json.docs[index].Username==user && json.docs[index].Password==pass)
                    {
                        //login ok 
                        //console.log(response.statusCode);
                        console.log('Accesso effettuato da '+user.toString()+'!');
                        req.session.loggedin = true;
                        req.session.username= json.docs[index].Username;
                        res.redirect('/personalArea');
                    }
                    else
                    {
                        console.log('password non valida');
                        res.render(__dirname + '/public/views/login.ejs', { errormessage: 'Incorrect  password' });
                    }
                }
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
    //se si è loggati restituisci l' area personale utente altrimenti loggati
	if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.username + '!');
	} else {
		res.redirect('/login');
	}
	res.end();
});

//pagina corsi
app.get('/courses', function(req,res) {
    var username = [];
    var courseName = [];
    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:5984/progetto/_find', 
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{"selector": { }, "fields": ["Username","Courses.names"], "skip": 0, "execution_stats": true }'
        //"limit": 2, "sort": [{"courseFollower": "asc"}],
        }, function(error, response, body){
            tutto = JSON.parse(body);
            console.log(tutto.docs);
            for(var i=0; i<tutto.docs.length; i++) {                
                username[i] = tutto.docs[i].Username;
                courseName[i] = tutto.docs[i].Courses.names[0];
            }

            res.render(__dirname + '/public/views/corsi.ejs', {
                user1: username[0], coursename1: courseName[0],
                user2: username[1], coursename2: courseName[1],
                user3: username[2], coursename3: courseName[2],
                user4: username[3], coursename4: courseName[3],
                user5: username[4], coursename5: courseName[4],
            });
        }
    );

    
});



//GET CORSI
app.get('/courses2/:num', function(req,res) {
    var user = req.params.num;
    var coursename = req.query.coursename;
    //var user = req.params.userk;
    //var coursename = req.params.coursename;
    var nomeCorso;
    var follower, pubblicazioni;
    var first, second, third = [];
    var materiali = [];

    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:5984/progetto/'+user, 
        method: 'GET',
        headers: {'content-type': 'application/json'},
        }, function(error, response, body){
            if(error) {
                console.log(error);
            }
            else 
            {
                //se lo user non è nel db manda error 404
                if(response.statusCode==404) {
                    
                    // Login errato
                    console.log(response.statusMessage);
                    //res.render(__dirname + '/public/views/login.ejs', { errormessage: 'Username not found' });
                }
                else
                {
                    console.log('caricando il corso di...'+user);
                    let tutto = JSON.parse(body);
                    var corsi = tutto.Courses;
                    var corso = corsi.Corso0; //da cambiare
                    console.log(corso);
                    nomeCorso = corso.courseName;
                    follower = corso.courseFollower;
                    pubblicazioni = corso.coursePublications;
                    first = corso.firstEvidenza;
                    second = corso.secondEvidenza;
                    third = corso.thirdEvidenza;
                    materiali = corso.courses;
                    
                    res.render(__dirname + '/public/views/course.ejs', {
                        username: user, courseName: nomeCorso, 
                        courseFollower: follower, coursePublications: pubblicazioni,
                        firstEvidenza: first, secondEvidenza: second, thirdEvidenza: third,
                        courses: materiali
                        }
                    );
                }
            } 
    });    
});


//GET REGISTER
app.get('/register',function(req,res){
    res.sendFile(__dirname + '/public/views/registrazione.html');
    console.log('fornita pagina registrazione ');
});

//POST REGISTER AJAX
app.post('/ajax/register', (req, res) => {
    var output = {};
    var errors = [];
    var username=req.body.Username;
    var erroreUsername=0;
    var erroreEmail=0;


    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:5984/progetto/'+username, 
        method: 'GET',
        headers: {'content-type': 'application/json'},
        }, function(error, response, body){
        if(error) {
            console.log(error);
        }
        else 
        {
            
            if(!response.statusCode==404){
                erroreUsername=1;
                errors.push({
                    msg: 'Username già in uso.'
                });
            }
        }
    });









    //fa la richiesta al database soltanto se entrambi i campi sono compilati
    if(validator.isEmpty(req.body.Username) || validator.isEmpty(req.body.Password) ) {
        errors.push({
            msg: 'Username e/o password non validi.'
        });
    }
    else
    {
        username = req.body.Username;
        password = req.body.Password;
        
        request2server({
            //mettere l'url del proprio database
            url: 'http://admin:admin@127.0.0.1:5984/progetto/'+username, 
            method: 'GET',
            headers: {'content-type': 'application/json'},
            }, function(error, response, body){
            if(error) {
                console.log(error);
            }
            else 
            {
                
                //se lo user non è nel db manda error 404
                if(response.statusCode==404) {
                    erroreLogin=404;
                    errors.push({
                        msg: 'Username e/o password non validi.'
                    });
                }
                else
                {
                    json = JSON.parse(body);
                    //se la password non è corretta restituisce 1 altrimenti 2
                    if(json.Password==password)
                    {   
                        erroreLogin=2;
                        //login ok 
                    }
                    else
                    {   
                        erroreLogin=1;
                        errors.push({
                            msg: 'Username e/o password non validi.'
                        });
                    }
                }    
            }
        });
    }
    if(errors.length > 0 || erroreLogin==404  || erroreLogin==1) {
        output.errors = errors;
        
    } else {
        if(erroreLogin==2){
            //erroreLogin è 2 ovvero utente trovato e password corretta
            output.success = 'Bentornato '+username.toString()+'!'
            req.session.loggedin = true;
            req.session.username=username;
            console.log('Accesso effettuato da '+username.toString()+'!');
        }
        
    }
    res.json(output);
});
//POST REGISTER
app.post("/registerInsert", function(req,res){
    
    var msg=    '{ "Username":"'+req.body.Username+
                '","Name":"'+req.body.Name+
                '","Surname":"'+req.body.Surname+
                '" ,"Date":"'+req.body.Date+
                '","Email":"'+req.body.Email+
                '","Password":"'+req.body.Password+
                '","Courses": { }'+
                '  }';

    //corso vuoto
    /*  '{ "courseName": "",'+
        '"courseFollower": 0, "coursePublications": 0,'+
        '"firstEvidenza": [], "secondEvidenza": [], "thirdEvidenza": [], "courses": [] }'+
        '  }';*/

    console.log(req.body);
    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:5984/progetto/'+req.body.Username, 
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: msg
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
