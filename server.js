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

//GET REGISTER
app.get('/register',function(req,res){
    res.render(__dirname + '/public/views/registrazione.ejs',{ errormessage: '' });
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
                    res.status(401).render(__dirname + '/public/views/login.ejs', { errormessage: 'Username not found' });
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
                        res.status(401).render(__dirname + '/public/views/login.ejs', { errormessage: 'Incorrect  password' });
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
		console.log('Welcome back, ' + req.session.username + '!');
        res.sendFile('/public/views/profilo.html');
	} else {
		res.redirect('/login');
	}
	res.end();
});

//GET GESTISCI ACCOUNT
app.get('/manageAccount', function(req,res) {
    res.sendFile(__dirname+'/public/views/profilo.html');
});


//pagina corsi
app.get('/courses', function(req,res) {
    res.sendFile(__dirname+'/public/views/corsi.html');
});



//GET CORSI
app.get('/courses2/:c', function(req,res) {
    var CourseLoaded = req.params.c;

    var nomeCorso;
    var user, category;
    var follower, pubblicazioni;
    var first, second, third = [];
    var materiali = [];

    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:5984/progetto/'+CourseLoaded, 
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
                    console.log('caricando il corso '+CourseLoaded);
                    let corso= JSON.parse(body);
                    //console.log(corso);
                    
                    res.render(__dirname + '/public/views/course.ejs', {    course: corso   });
                }
            } 
    });    
});

//get categorie corsi
app.get('/courses3', function(req,res) {
    var username = [];
    var courses = [];
    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:5984/progetto/_find', 
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{"selector": { "category": "'+req.query.q+'" }, "limit": 10, "skip": 0, "execution_stats": true }'       
        }, function(error, response, body){
            tutto = JSON.parse(body);
            //console.log(tutto);
            for(var i=0; i<tutto.docs.length; i++) {   
                courses[i] = tutto.docs[i];
                console.log("caricato il corso "+courses[i].courseName);
            }
            res.render(__dirname + '/public/views/listaCorsi.ejs', {
                corsi: courses
            });
        }
    );
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



//POST REGISTRAZIONE E CONTROLLO CON EJS
//non si possono registrare utenti con stesso username o email
app.post('/register/auth', function(req, res) {
	var user= req.body.Username;
	var email = req.body.Email;
    var msg=    '{ "Username":"'+req.body.Username+
                '","Name":"'+req.body.Name+
                '","Surname":"'+req.body.Surname+
                '" ,"Date":"'+req.body.Date+
                '","Email":"'+req.body.Email+
                '","Password":"'+req.body.Password+
                '","Courses": { }'+
                '  }';
    
	request2server({
        url: 'http://admin:admin@127.0.0.1:5984/progetto/_find', 
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{"selector": { }, "fields": ["Username","Email"], "skip": 0, "execution_stats": true }'
        }, function(error, response, body){
            if(error){
                console.log(error);
            }
            else 
            {

                console.log('controllo registrazione...');
                var errReg=0;
                var json=JSON.parse(body);
                for(i=0;i<json.docs.length && errReg!=1 && errReg!=2;i++)
                {

                    if(json.docs[i].Username==user) errReg=1;
                    if(json.docs[i].Email==email) errReg=2;
                }
                if(errReg==1 )
                {
                    console.log(errReg,' username già in uso');
                    output={   err: 'ERR', msg: 'Username gia in uso'};
                    res.render(__dirname + '/public/views/registrazione.ejs', { errormessage: output });
                }
                if(errReg==2)
                {
                    console.log(errReg, 'Email già in uso')
                    output={   err: 'ERR', msg: 'Email gia in uso'};
                    res.render(__dirname + '/public/views/registrazione.ejs', { errormessage: output });
                }
                //se email e username non sono di alcun utente posso procedere con la registrazione
                if(errReg==0)
                {
                    request2server({
                        url: 'http://admin:admin@127.0.0.1:5984/progetto/'+user, 
                        method: 'PUT',
                        headers: {'content-type': 'application/json'},
                        body: msg
                    }, function(error, response, body){
                        if(error) {
                            console.log(error);
                        }
                        else 
                        {
                            console.log("New user: ",user);
                            output={   err: 'OK', msg: 'Registrazione avvenuta con successo'};
                            res.render(__dirname + '/public/views/registrazione.ejs', { errormessage: output });
                        }
                    });
                }
                
            }
    });
    
    
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

app.get('/course4', function(req,res) {
    console.log("ciao");
});


app.listen(8889);
console.log('Server running at port 8889');
