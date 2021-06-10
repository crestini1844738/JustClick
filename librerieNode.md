## NPM
NPM è un package manager (Node.js Package Manager) ed è lo strumento che permette di includere, rimuovere e aggiornare le librerie all’interno del proprio progetto.

## EXPRESS

Express.js è un framework Node.js per la programmazione di applicazioni web. 
Il framework Express consente di creare potenti API e di impostare middleware per rispondere alle richieste HTTP, fornendo semplici meccanismi di debugging e una rapida integrazione. 

var express = require('express');

## EXPRESS-SESSION
In ExpressJS una sessione viene creata per tutte le route della nostra applicazione. Nello specifico, una sessione è un oggetto aggiunto tramite middleware all'oggetto richiesta request.

Il modulo express-session opera appunto in questo modo. Una volta creato l'oggetto sessione, possiamo aggiungere e rimuovere le variabili di sessione come proprietà di tale oggetto.
Tale oggetto è un oggetto JavaScript.

var session = require('express-session');


## EXPRESS-FILEUPLOAD
Middleware express che permette il caricamento di file sul server.

const fileupload = require('express-fileupload');


## REQUEST
Framework progettato per effettuare e gestire chiamate http. 

var request2server = require('request');


## BODY-PARSER
body-parser permette di estrarre l'intera parte del corpo di un flusso di richieste in entrata e lo espone in req.body

var bodyParser = require("body-parser");

## COOKIE-PARSER
Cookie-parser fornisce il supporto per la gestione dei cookie sul server.

var cookieParser = require('cookie-parser');

## PATH
Il modulo path fornisce utilità per lavorare con i percorsi di file e directory.
var path = require('path');


## MD5
Permette l' utilizzo di una funzione JavaScript per l'hashing dei messaggi con MD5.
var md5 = require('md5');


## GOOGLE-AUTH-LIBRARY
Questa è la libreria ufficiale per node.js, supportata da Google, per l'utilizzo dell'autorizzazione e dell'autenticazione OAuth2.0 con le API di Google.

const {OAuth2Client} = require('google-auth-library');



## DOTENV
Modulo npm per la gestione dei file .env
require('dotenv').config()

