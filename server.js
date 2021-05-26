/****************** installazione moduli node ******************/
// npm install body-parser --save
// npm install cookie-parser --save
// npm install express-session
// npm install ejs
// npm install validator --save
// npm install google-auth-library --save

/****************** VARIABILI GENERALI DEL SERVER ******************/
var DataBase="progetto"; //nome database couchDB
var AccessCouchDB="admin:admin"; //AccessCouchDB=username:password
var PortaCouchDB=5984;
var PortaServer=8889;

/*************************** MODULI NODE ***************************/
var express = require('express');
var request2server = require('request');
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');
var validator = require('validator');
var path = require('path');
const fileupload = require('express-fileupload');
const { response } = require('express');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
var hour = 60*60*1000;
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.set('json spaces', 2);
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.use(fileupload());


/***********************************************************************/




const {OAuth2Client} = require('google-auth-library');
app.post('/auth/loginGoogle', function(req,res) {
    var token=req.body.token;
    var CLIENT_ID='579387928595-2gdmsv73ukvsu48u6i7m6jb3b6vnosdm.apps.googleusercontent.com';
    
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        //se utente già presente login,altrimenti registra e login
        //username=nome+Cognome+IDgoogle
        var username=payload['given_name']+payload['family_name']+payload['sub'];
        var email=payload['email'];
        request2server({
            url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/_find',  
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: '{ "selector": { "Username": "'+username+'" }, "skip": 0, "execution_stats": true }',
        }, function(error,response,body) {
            if(error) {
                console.log(error);
            }
            else
            {
                tutto = JSON.parse(body);
                if(tutto.docs.length==0)
                {
                    //registro utente 
                    var msg=    '{ "Username":"'+username+
                                '","Name":"'+payload['given_name']+
                                '","Surname":"'+payload['family_name']+
                                '" ,"Date":"N/A'+
                                '","Email":"'+payload['email']+
                                '","Password":"Access with Google'+
                                '","Courses": { }'+
                                '  }';
                    request2server({
                        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/'+username, 
                        method: 'PUT',
                        headers: {'content-type': 'application/json'},
                        body: msg
                    }, function(error, response, body){
                        if(error) {
                            console.log(error);
                        }
                        else 
                        {
                            console.log("New user: ",username);
                        }
                    });
                }
                //loggare
                req.session.loggedin = true;
                req.session.username= username;
                req.session.cookie.expires = new Date(Date.now() + hour);
                req.session.cookie.maxAge = hour;
                res.redirect("/personalArea");
            }
        });

        

      }
      verify().catch(console.error);
        
      
      
});


/*************************** INIZIO API ***************************/
app.get('/api/getPopolari', function(req,res) {
    var output = {};
    var courses=[];
    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/_find', 
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{ "selector": { "category": {"$gt": null} }, "sort": [{"courseFollower": "desc"}], "limit": 5, "skip": 0, "execution_stats": true }'         
        }, function(error, response, body){

            if(response.statusCode == 404) {
                res.status(404).send("No popular courses found");
            }
            else {
                tutto = JSON.parse(body);
                for(var i=0; i<tutto.docs.length; i++) {   
                    courses[i] = tutto.docs[i];
                }
                output={corsi:courses};
                res.status(201).json(output);
            }
            
        }
    )
});

app.get('/api/search',function(req,res) {
    //console.log(req.query.search);
    var courses = [];
    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/_find', 
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{"selector": { "courseName": { "$regex": "(?i)('+req.query.search+')"} }, "sort": [{"courseFollower": "desc"}], "limit": 10, "skip": 0, "execution_stats": true }'       
        }, function(error, response, body){
            tutto = JSON.parse(body);
            //console.log(tutto);
            if(tutto.docs.length == 0) res.status(404).send('No Courses Found\n');
            else {
                for(var i=0; i<tutto.docs.length; i++) {   
                    courses[i] = tutto.docs[i];
                }
                res.status(201).send(JSON.stringify(courses)+'\n');
            }       
        }
    );
});

app.post('/api/profiloUtente',function(req,res){
    var output = {};
    var profilo;
    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/_find', 
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{"selector": { "Username": "'+req.query.username+'" }, "limit": 10, "skip": 0, "execution_stats": true }'       
        }, function(error, response, body){
            ris = JSON.parse(body);
            profilo=ris.docs[0];
            output={utente:profilo};
            res.json(output);
        }
    )
});

app.post('/api/corsiUtente', function(req, res){
    var output = {};
        var corsi;
        request2server({
            //mettere l'url del proprio database
            url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/_find', 
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: '{ "selector": { "author": "'+req.query.username+'"}, "sort": [{"courseFollower": "desc"}], "skip": 0, "execution_stats": true }'       
            }, function(error, response, body){
                ris = JSON.parse(body);
                corsi=ris.docs;
                output={tuttiICorsi:corsi};
                res.json(output);
            }
        )
});

app.get('/api/getCorso/:courseName', function(req,res) {
    var CourseLoaded = req.params.courseName;

    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/'+CourseLoaded, 
        method: 'GET',
        headers: {'content-type': 'application/json'},
        }, function(error, response, body){
            if(error) {
                console.log(error);
            }
            else 
            {
                //se lo user non è nel db manda error 404
                if(response.statusCode==404) res.status(404).send('Course Not Found\n');
                else res.status(201).send(body);
            } 
    });    
});

app.get('/api/getMateriale/:courseName', function(req,res) {
    var CourseLoaded = req.params.courseName;

    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/'+CourseLoaded, 
        method: 'GET',
        headers: {'content-type': 'application/json'},
        }, function(error, response, body){
            if(error) {
                console.log(error);
            }
            else 
            {
                if(response.statusCode==404) res.status(400).send('Bad request: course '+CourseLoaded+' does not exist\n');
                else {
                    tutto = JSON.parse(body);
                    if(tutto.courses.length == 0) res.status(404).send('Material Not Found\n');
                    else res.status(201).send(JSON.stringify(tutto.courses)+'\n');
                }
            } 
    });    
});

app.get('/api/getByCategory', function(req,res){
    var courses = [];
    request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/_find', 
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{ "selector": { "category": "'+req.query.q+'" }, "sort": [{"courseFollower": "desc"}], "limit": 10, "skip": 0, "execution_stats": true }'       
        }, function(error, response, body){
            tutto = JSON.parse(body);
            if(tutto.docs.length == 0) res.status(404).send('No Courses Found\n');
            else {
                for(var i=0; i<tutto.docs.length; i++) {   
                    courses[i] = tutto.docs[i];
                }
                res.status(201).send(JSON.stringify(courses)+'\n');
            }   
        }
    );
});

//da fare con oauth
app.get('/api/auth/getPreferiti', function(req,res){
    //implement me
});

app.post('/api/auth/update/:elem', function(req, res) {
    //implement me
});

app.post('/api/auth/updateImg/:c', function(req, res) {
 //implement me
});


/*************************************** FINE API ***************************************/ 


/*************************** OPERAZIONI GESTIONE CLIENT-SERVER **************************/
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
    if(req.session.loggedin) res.render(__dirname + '/public/views/login.ejs', { success:req.session.username ,errormessage:'',logout:''});
    else                     res.render(__dirname + '/public/views/login.ejs', { success:'',errormessage: '',logout:'' });
});

//GET REGISTER
app.get('/register',function(req,res){
    if(req.session.loggedin) res.render(__dirname + '/public/views/registrazione.ejs',{ errormessage: '',login:req.session.username });
    else                     res.render(__dirname + '/public/views/registrazione.ejs',{ errormessage: '',login:'' });
    
});

//GET APIDOC
//app.use(express.static('API_JustClick'));
app.get('/docs/api',function(req,res){
    res.sendFile(__dirname + '/API_JustClick/apidoc/index.html');
});

//GET POPOLARI HOMEPAGE
app.get('/getPopolari', function(req,res) {
    request2server({
        url: 'http://localhost:'+PortaServer+'/api/getPopolari',
        method:'GET',
        headers: {'content-type': 'application/json'}
    }, function(error,response,body) {
        var tutto = JSON.parse(body);
        res.json(tutto);
    })
});

//POST AUTENTICAZIONE LOGIN CON EJS
app.post('/login/auth', function(req, res) {
	var user= req.body.Username;
	var pass = req.body.Password;
    var index=-1;
	request2server({
        //mettere l'url del proprio database
        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/_find', 
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{"selector": { }, "fields": ["Username","Password"], "skip": 0, "execution_stats": true }'
        }, function(error, response, body){
            if(error){
                console.log(error);
            }
            else 
            {
                var json=JSON.parse(body);
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
                    res.status(401).render(__dirname + '/public/views/login.ejs', { success:'',errormessage: 'Username not found',logout:'' });
                }
                else
                {
                    if(json.docs[index].Username==user && json.docs[index].Password==pass)
                    {
                        console.log('Accesso effettuato da '+user.toString()+'!');
                        req.session.loggedin = true;
                        req.session.username= json.docs[index].Username;
                        req.session.password=json.docs[index].Password;
                        req.session.cookie.expires = new Date(Date.now() + hour)
                        req.session.cookie.maxAge = hour
                        res.redirect('/personalArea');
                    }
                    else
                    {
                        res.status(401).render(__dirname + '/public/views/login.ejs', {  success:'',errormessage: 'Incorrect  password',logout:''  });
                    }
                }
            }
    });
});

//POST REGISTRAZIONE CON EJS
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
        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/_find', 
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: '{"selector": { }, "fields": ["Username","Email"], "skip": 0, "execution_stats": true }'
        }, function(error, response, body){
            if(error){
                console.log(error);
            }
            else 
            {
                var errReg=0;
                var json=JSON.parse(body);
                for(i=0;i<json.docs.length && errReg!=1 && errReg!=2;i++)
                {

                    if(json.docs[i].Username==user) errReg=1;
                    if(json.docs[i].Email==email) errReg=2;
                }
                if(errReg==1 )
                {
                    output={   err: 'ERR', msg: 'Username gia in uso'};
                    res.render(__dirname + '/public/views/registrazione.ejs', { errormessage: output ,login:''});
                }
                if(errReg==2)
                {
                    output={   err: 'ERR', msg: 'Email gia in uso'};
                    res.render(__dirname + '/public/views/registrazione.ejs', { errormessage: output,login:'' });
                }
                //se email e username non sono di alcun utente posso procedere con la registrazione
                if(errReg==0)
                {
                    request2server({
                        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/progetto/'+user, 
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
                            res.render(__dirname + '/public/views/registrazione.ejs', { errormessage: output ,login:''});
                        }
                    });
                }
                
            }
    });
});

//LOGOUT
app.get('/logout',function(req, res){
    if (req.session) {
        req.session.destroy(err => {
          if (err) res.status(400).send('Unable to log out')
          else     res.render(__dirname + '/public/views/login.ejs', { success:'',errormessage: '',logout:'Logout eseguito con successo' });
        });
      } 
    else {
        res.end()
    }
});

//GET SEARCH
app.get('/search', function(req,res) {
    request2server({
        //mettere l'url del proprio database
        url: 'http://localhost:8889/api/search?search='+req.query.search, 
        method: 'GET',
        headers: {'content-type': 'application/json'}
    }, function(error,response,body) {
        if(response.statusCode == 404) courses = {};
        else var courses = JSON.parse(body);
        res.render(__dirname + '/public/views/listaCorsi.ejs', {
            corsi: courses
        });
    })
});

//REDIRECT AREA PERSONALE UTENTE
app.get('/personalArea', function(req, res) {
	if (req.session.loggedin) {
		console.log('Welcome back, ' + req.session.username + '!');
        res.sendFile(__dirname+'/public/views/profilo.html');
	} else {
		res.redirect('/login');
	}
});

//POST PROFILO UTENTE
app.post('/profiloUtente', function(req,res) {
    if (req.session.loggedin) {
        var username=req.session.username;
        var password=req.session.password;
        request2server({
            //mettere l'url del proprio database
            url: 'http://localhost:8889/api/profiloUtente?username='+username,//+'&password='+password,
            method: 'POST',
            headers: {'content-type': 'application/json'}
        }, function(error,response,body) {
            var profilo=JSON.parse(body);
            res.json(profilo);
        })
	} else {
		res.redirect('/login');
	}
});

//POST CORSI PROFILO PERSONALE
app.post('/corsiUtente', function(req, res){
    if (req.session.loggedin) {
        var username=req.session.username;
        request2server({
            //mettere l'url del proprio database
            url: 'http://localhost:8889/api/corsiUtente?username='+username,
            method: 'POST',
            headers: {'content-type': 'application/json'}
        }, function(error,response,body) {
            var corsiutente=JSON.parse(body);
            res.json(corsiutente);
        })
    } else {
		res.redirect('/login');
	}
});

//GET CARICA EVENTI
app.get('/caricaEvento',function(req,res){
    if (req.session.loggedin) res.sendFile(__dirname + '/public/views/caricaEvento.html');
    else res.redirect("/login");
});

//GET GESTISCI ACCOUNT
app.get('/manageAccount', function(req,res) {
    if(req.session.loggedin) res.sendFile(__dirname+'/public/views/caricaCorso.html');
    else res.redirect('/login');
});

app.get('/caricaInfo', function(req,res) {
    res.sendFile(__dirname+'/public/views/caricaInfo.html');
});

//GET PAGINA CORSI
app.get('/courses', function(req,res) {
    res.sendFile(__dirname+'/public/views/corsi.html');
});

//GET CORSI
app.get('/courses2/:c', function(req,res) {
    var CourseLoaded = req.params.c;

    request2server({
        url: 'http://localhost:8889/api/getCorso/'+CourseLoaded,
        method: 'GET',
        headers: {'content-type': 'application/json'},
        }, function(error, response, body){
            if(error) {
                console.log(error);
            }
            else 
            {
                //se lo user non è nel db manda error 404
                if(response.statusCode==404) console.log(response.statusMessage);
                else
                {
                    console.log('caricando il corso '+CourseLoaded);
                    let corso= JSON.parse(body);
                    if(req.query.iter) corso.iter = parseInt(req.query.iter);
                    else corso.iter = 0;
                    //console.log(corso);
                    //console.log(req.session);
                    if(!corso.eventi) { //if(!corso.eventi.city)
                        if(req.session.username) {
                            if(req.session.username == corso.author) {
                                res.render(__dirname + '/public/views/course_modify.ejs', {    course: corso   });
                            }
                            else {
                                corso.viewer = req.session.username;
                                res.render(__dirname + '/public/views/course.ejs', {    course: corso });
                            }
                        }
                        else {
                            corso.viewer = "unknown";
                            res.render(__dirname + '/public/views/course.ejs', {    course: corso  });
                        } 
                    }
                    else{
                        request2server({
                            //q=city oppure zip=codicepostale
                            url: 'http://api.openweathermap.org/data/2.5/weather?q='+corso.eventi.city+',it&units=metric&lang=it&appid=c4bf467b6dce8c99bacb02c615c679cb',
                            method: 'GET',
                            headers: {'content-type': 'application/json'},
                            }, function(error, response, body){
                                if(error) console.log(error);
                                else {
                                    if(response.statusCode != 404) {
                                        var meteo = JSON.parse(body);
                                        //console.log(body);
                                        corso.meteoDesc = meteo.weather[0].description;
                                        corso.meteoTemp = meteo.main.temp;
                                        corso.meteoImg = meteo.weather[0].icon;
                                    }
    
                                    if(req.session.username) {
                                        if(req.session.username == corso.author) {
                                            res.render(__dirname + '/public/views/course_modify.ejs', {    course: corso   });
                                        }
                                        else {
                                            corso.viewer = req.session.username;
                                            res.render(__dirname + '/public/views/course.ejs', {    course: corso });
                                        }
                                    }
                                    else {
                                        corso.viewer = "unknown";
                                        res.render(__dirname + '/public/views/course.ejs', {    course: corso  });
                                    }                           
                                }
                        }); 
                    }
                               
                }
            } 
    });    
});

//get categorie corsi
app.get('/courses3', function(req,res) {
    var courses = [];
    if(req.query.q != "Preferiti") {
        request2server({
            //mettere l'url del proprio database
            url: 'http://localhost:8889/api/getByCategory?q='+req.query.q, 
            method: 'GET',
            headers: {'content-type': 'application/json'},    
            }, function(error, response, body){
                if(response.statusCode != 404) courses = JSON.parse(body);
                //console.log(tutto);
                res.render(__dirname + '/public/views/listaCorsi.ejs', {
                    corsi: courses
                });
            }
        );
    }

    else {
        if(req.session.username) {
            request2server({
                //mettere l'url del proprio database
                url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/_find', 
                method: 'POST',
                headers: {'content-type': 'application/json'},
                body: '{ "selector": { "follower": { "$elemMatch": { "$eq": "'+req.session.username+'" } } }, "sort": [{"courseFollower": "desc"}], "limit": 10, "skip": 0, "execution_stats": true }'       
                }, function(error, response, body){
                    tutto = JSON.parse(body);
                    //console.log(tutto);
                    for(var i=0; i<tutto.docs.length; i++) {   
                        courses[i] = tutto.docs[i];
                        //console.log("caricato il corso "+courses[i].courseName);
                    }
                    res.render(__dirname + '/public/views/listaCorsi.ejs', {
                        corsi: courses
                    });
                }
            );
        }
        else res.redirect('/login');
    }
    
});

//POST PER UPLOAD DI FILE
app.post('/carica', function(req,res) {
        //console.log(req.files);
        var user = req.session.username;
        var pubblicazioni = 0;
        var materiale = "";
        var loaded = "not loaded";
        if(!req.files) {
            loaded = "not loaded";
        }
        else {
            if(req.files.image) {
                loaded = "loaded";
            }
            if(req.files.materiale) {
                pubblicazioni++;
                materiale = '["' +req.files.materiale.name+ '+","'+req.body.descMateriale+'","'+req.files.materiale.mimetype+'"]';
                req.files.materiale.name = req.body.titolo+'_'+req.files.materiale.name;
                req.files.materiale.mv(__dirname+'/public/materiale/'+req.files.materiale.name, function(err) {
                    if(err) return res.status(500).send(err);
                });
            }

            if(!req.files.image) {
                console.log('error 400: nessuna immagine selezionata');
                loaded = "not loaded";
    
            }
            else if(req.files.image.size > 50000) console.log('immagine troppo grande');
            else {
                if(req.files.image.mimetype!='image/jpeg' && req.files.image.mimetype!='image/jpg' && req.files.image.mimetype!='image/png' &&
                req.files.image.mimetype!='image/gif' && req.files.image.mimetype!='image/svg+xml' ) 
                    console.log('formato immagine non valido');
                else {
                    req.files.image.name = user+'_'+req.body.titolo+'.png';
                    req.files.image.mv(__dirname+'/public/img/courseImgs/'+req.files.image.name, function(err) {
                        if(err) return res.status(500).send(err);
                    });
                    console.log('file uploaded!');
                }
            }

        }
        
        //console.log(req.body);
        //creazione corso
        var msg=    '{ "courseName":"'+req.body.titolo+
                '","author":"'+user+
                '","desc":"'+req.body.desc+
                '","image":"'+loaded+
                '","category":"'+req.body.opt+
                '" ,"courseFollower": 0'+
                ',"coursePublications": '+pubblicazioni+
                ',"firstEvidenza":[], "secondEvidenza": [], "thirdEvidenza": []'+
                ',"courses": [' +materiale+ ']'+
                ',"follower": []'+
                ',"eventi": []'+
                '  }';

        request2server({
            url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/'+req.body.titolo, 
            method: 'PUT',
            headers: {'content-type': 'application/json'},
            body: msg
        }, function(error, response, body){
            if(error) {
                console.log(error);
            }
            else 
            {
                //console.log(body);
                console.log("corso "+req.body.titolo+" creato!");
            }
        });
        res.redirect('/personalArea');
});

//per rendere array una stringa con codifica json
function array_to_string(array) {
    //JSON.stringify(yourArray);
    if(!array) return "[]";
    var string = "[";
    for(var i=0; i<array.length; i++) {
        if(Array.isArray(array[i])) string += array_to_string(array[i]);
        else {
           string+='"'+array[i]+'"';
        }
        if(i!=array.length-1) string+=',';
    }
    string+="]";
    return string;
}

//per fare update di un corso su couchdb
//NOTA: OBBLIGATORIO FARE LA GET PERCHÈ IL REV CAMBIA SEMPRE
app.post('/update/:elem', function(req, res) {
    var msg;
    //console.log(req.body);
    request2server({
        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/'+req.body.course, 
        method: 'GET',
        headers: {'content-type': 'application/json'},
        body: msg
    }, function(error, response, body){
        if(error) {
            console.log(error);
        }
        else {
            var tutto = JSON.parse(body);
            //console.log(body);
            switch(req.params.elem) {
                case "follower":
                    tutto.courseFollower = req.body.newFollower;
                    if(req.body.delete == "no") tutto.follower.push(req.body.follower); 
                    else {
                        for(var i=0; i<tutto.follower.length; i++) {
                            if(tutto.follower[i]==req.body.follower) {
                                var old = tutto.follower.splice(i,1);
                                //console.log(old);
                            }
                        }
                    }
                    break;
                case "courses":
                    var oldCourses = tutto.courses.splice(req.body.index,1);
                    tutto.coursePublications = tutto.courses.length;
                    //console.log(oldCourses);
                    break;
                case "evidenza":
                    if(req.body.evidenza == 1) tutto.firstEvidenza = [];
                    else if(req.body.evidenza == 2) tutto.secondEvidenza = [];
                    else tutto.thirdEvidenza = [];
                case "setEvidenza":
                    if(tutto.firstEvidenza.length == 0) tutto.firstEvidenza = tutto.courses[req.body.index];
                    else if(tutto.secondEvidenza.length == 0) tutto.secondEvidenza = tutto.courses[req.body.index];
                    else  tutto.thirdEvidenza = tutto.courses[req.body.index];
                    break;
                case "setCorsi":
                    var materiale = [];
                    materiale.push(req.files.materiale.name);
                    materiale.push(req.body.descMateriale);
                    materiale.push(req.files.materiale.mimetype);
                    tutto.courses.push(materiale);
                    tutto.coursePublications = tutto.courses.length;
                    req.files.materiale.name = tutto.courseName+'_'+req.files.materiale.name;
                    req.files.materiale.mv(__dirname+'/public/materiale/'+req.files.materiale.name, function(err) {
                        if(err) return res.status(500).send(err);
                    });
                    break;
                case "evento":
                    tutto.eventi = [];
                    tutto.eventi.push(req.body.titolo);
                    tutto.eventi.push(req.body.desc);
                    tutto.eventi.push(req.body.course);
                    tutto.eventi.push(req.body.dataInizio);
                    //tutto.eventi.push(req.body.oraInizio);
                    tutto.eventi.push(req.body.dataFine);
                    //tutto.eventi.push(req.body.oraFine);
                    tutto.eventi.push(req.body.citta);
                    tutto.eventi.push(req.body.via);
                    //console.log(tutto.eventi);
                    break;
                default:
                    break;
            }

            msg=    '{ "courseName":"'+tutto.courseName+
                '","_rev":"'+tutto._rev+
                '","author":"'+tutto.author+
                '","desc":"'+tutto.desc+
                '","image":"'+tutto.image+
                '","category":"'+tutto.category+
                '","courseFollower": '+ tutto.courseFollower+
                ',"coursePublications": '+tutto.coursePublications+
                ',"firstEvidenza": '+array_to_string(tutto.firstEvidenza)+
                ',"secondEvidenza": '+array_to_string(tutto.secondEvidenza)+
                ',"thirdEvidenza": '+array_to_string(tutto.thirdEvidenza)+
                ',"courses": '+array_to_string(tutto.courses)+
                ',"follower": '+array_to_string(tutto.follower)+
                ',"eventi": '+array_to_string(tutto.eventi)+
                '  }';

            request2server({
                url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/'+req.body.course, 
                method: 'PUT',
                headers: {'content-type': 'application/json'},
                body: msg
            }, function(error, response, body){
                if(error) {
                    console.log(error);
                }
                else {
                    //console.log(msg);
                    //console.log(body);
                    console.log("update "+req.params.elem+" effettuato!");
                    if(req.params.elem == "setCorsi" || req.params.elem == "evento") res.redirect('/courses2/'+req.body.course);
                }
            });
        }
    });
});

//cambiare immagine del corso
app.post('/updateImg/:c', function(req, res) {
    request2server({
        url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/'+req.params.c, 
        method: 'GET',
        headers: {'content-type': 'application/json'}
    }, function(error, response, body){
        if(error) {
            console.log(error);
        }
        else 
        {
            //console.log(req.files);
            //console.log(body);
            var tutto = JSON.parse(body);

            req.files.newImage.name = tutto.author+'_'+tutto.courseName+'.png';
            req.files.newImage.mv(__dirname+'/public/img/courseImgs/'+req.files.newImage.name, function(err) {
                if(err) return res.status(500).send(err);
            });

            console.log("Immagine di "+tutto.courseName+" modificata con successo");
            if(tutto.image == "loaded") res.redirect('/courses2/'+req.params.c);
            else {
                msg=    '{ "courseName":"'+tutto.courseName+
                '","_rev":"'+tutto._rev+
                '","author":"'+tutto.author+
                '","desc":"'+tutto.desc+
                '","image":"'+'loaded'+
                '","category":"'+tutto.category+
                '","courseFollower": '+ tutto.courseFollower+
                ',"coursePublications": '+tutto.coursePublications+
                ',"firstEvidenza": '+array_to_string(tutto.firstEvidenza)+
                ',"secondEvidenza": '+array_to_string(tutto.secondEvidenza)+
                ',"thirdEvidenza": '+array_to_string(tutto.thirdEvidenza)+
                ',"courses": '+array_to_string(tutto.courses)+
                ',"follower": '+array_to_string(tutto.follower)+
                ',"eventi": '+array_to_string(tutto.eventi)+
                '  }';

                request2server({
                    url: 'http://admin:admin@127.0.0.1:'+PortaCouchDB+'/'+DataBase+'/'+req.params.c, 
                    method: 'PUT',
                    headers: {'content-type': 'application/json'},
                    body: msg
                }, function(error, response, body){
                    if(error) {
                        console.log(error);
                    }
                    else {
                        //console.log(msg);
                        //console.log(body);
                        console.log("Immagine di "+tutto.courseName+" modificata con successo");
                        res.redirect('/courses2/'+req.params.c);
                    }
                });
                
            }
        }
    });
    //res.redirect('/courses2/'+req.params.c);
});

//oauth validation
var client_id = "501414949851-b6ot7tcivuh362auuomhtjelk8ia3eoe.apps.googleusercontent.com";
var client_secret = "ovlcp8lB_JrT0biKF1bFEIgp";
var apikey = "AIzaSyDm3kA0H6nEx18Xux8n-pWMtUVKupJNiIU";
app.get('/auth/calendar', function(req,res) {
    var code = req.query.code;
    var redirect_uri = "http://localhost:8889/auth/calendar";
    var url = 'https://www.googleapis.com/oauth2/v3/token';
	var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
	var body ="code="+code+"&client_id="+client_id+"&client_secret="+client_secret+"&redirect_uri="+redirect_uri+"&grant_type=authorization_code";
    request2server({
        //mettere l'url del proprio database
        url: url, 
        method: 'POST',
        headers: headers,
        body: body
    }, function(error,response,body) {
        var myobj = JSON.parse(body);
        //console.log(body);
        var token = myobj.access_token;
        var calendarID = "primary";
        var url2 = "https://www.googleapis.com/calendar/v3/calendars/"+calendarID+"/events?sendUpdates=all&key="+apikey;
	    var headers2 = {'Authorization': 'Bearer '+token,'Accept': 'application/json','Content-Type':'application/json'};
        //console.log(req.query.state);
        var data = JSON.parse(req.query.state);
        var evento = '{ "start": { "dateTime": "'+data[3]+'" , "timeZone": "Europe/Rome" }, "end": { "dateTime": "'+data[4]+'" , "timeZone": "Europe/Rome"}, "colorId": "7", "description": "'+data[1]+'", "location": "'+data[6]+', '+data[5]+'", "summary": "JustClick Event: '+data[0]+' by '+data[2]+'", "reminders": {"useDefault" : false, "overrides": [ { "method": "email", "minutes": 5} , {"method": "popup", "minutes": 5} ] } }';
        request2server({
            //mettere l'url del proprio database
            url: url2, 
            method: 'POST',
            headers: headers2,
            body: evento
        }, function(error,response,body) {
            //console.log(evento);
            //console.log(body);
            res.redirect('/courses2/'+data[2]);
        })

    })
});

var fs = require('fs');
const {google} = require ('googleapis');
app.get('/auth/drive', function(req,res) {
    
    //console.log(req.query.state);
    var dati = JSON.parse(req.query.state);
    var code = req.query.code;
    var titolo = dati.course+'_'+dati.name;
    var redirect_uri = "http://localhost:8889/auth/drive";
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uri
    )
    oAuth2Client.getToken(code, function(err, tokens){
        oAuth2Client.setCredentials(tokens);
        const drive = google.drive({
            version: 'v3',
            auth: oAuth2Client
        })
        var fileMetadata = {
            //cambiare
            'name': titolo
          };
          var media = {
            //cambiare
            mimeType: dati.mimetype,
            body: fs.createReadStream('./public/materiale/'+titolo)
          };
          drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id'
          }, function (err, file) {
            if (err) {
              // Handle error
              console.error(err);
            } else {
                //cambiare
              res.redirect('/courses2/'+dati.course);
            }
        })
    })
});


/*************************** SERVER IN ASCOLTO***************************/
app.listen(PortaServer);
console.log('Server running at port '+PortaServer);
