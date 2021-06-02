# JustClick

## Elementi utilizzati
-node js 
Per installare node js usare questa guida: https://www.nodeacademy.it/installare-node-js-ubuntu-linux/
Tutte le librerie relative al progetto sono gia state installate all' interno della directory node_modules

-couchDB
Per installare e configurare couchDB usare questa guida: https://docs.couchdb.org/en/latest/install/index.html

-html
-js
-css
-ejs

## eseguire il progetto
1) installare node js e couchDB sul pc

2) configurare CouchDB per il progetto:
	(di default couchDB lavora sulla porta 5984)
	(Per accedere a couchDB basta andare a http://localhost:5984/_utils/;
	Se couchdb non è attivo sulla porta fare riferimento alla  guida linkata all 'inizio.)

	2 modalità di configurazione:

	1)
		-Impostare l' username e la password di couchDB con username:"admin" , password:"admin";

		-Creare un database e chiamarlo "progetto";

		-inserire nel database appena creato i file JSON presenti in DATABASE.txt;
		 (!!! Vanno inseriri uno per volta elimando il campo rev) 
	
	2)
		-Utilizzare le proprie credenziali username e password di couchDB;

		-Creare un database e chiamarlo come si vuole;

		-Andare nel file server.js presente in questa directory; 
		 all 'inizio del file vi sono le variabili DataBase,AccessCouchDB,PortaCouchDB.
		 Queste possono essere settate con le vostre informazioni(il Database deve essere quello creato al punto sopra)

		 -inserire nel database appena creato i file JSON presenti in DATABASE.txt;
		 (!!! Vanno inseriri uno per volta elimando il campo rev) 

3) eseguire il server
	Aprire un terminale e entrare in questa directory.
	Digitare: node server.js 
	Il server si attiva e comunica a terminale che è attivo sulla porta 8889
	(Se si vuole modificare la porta del server andare nel file server.js e modificare la variabile PortaServer
	 Il server sarà in ascolto sulla nuova porta specificata)

4) Accedere alla homepage del sito
	Aprire un browser e digitare localhost:8889
	(se è stata modificata la porta di ascolto digitare localhost:"nuovaporta")
	Sarete reindirizzati sulla homepage del sito.


## GITHUB
PER CLONARE LA CARTELLA DI TALE PROGETTO DA GITHUB E GESTIRLA CON CODE
LINK: https://github.com/crestini1844738/JustClick.git

PROCEDIMENTO:
-farsi un account su github

-scaricare su vs code l'estensione pull requests

-scrivere su terminale Linux

        git config --global user.name "<il tuo user>"  
        git config --global user.email "<la tua mail>" (sostituire le cose tra <...>)
      
-Tra le icone di vs code sulla barra a sinistra, cliccare quella di "source control" (e cliccare il tasto "initialize repository")

-cliccare sui tre puntini (o tasto destro) e mettere clone per clonare la repository

-digitare l'URL della repository da clonare, premere invio e poi quando appare "Add to workspace". Altrimenti, se non appare, File --> Add Folder to Workspace

-adesso cliccare sull'icona "pull requests" sulla barra della repository appena aggiunta

-apparirà una nuova icona sulla barra laterale, cliccarci e creare la pull request

-adesso, per modificare un file, bisognerà semplicemente iterare 4 passaggi:

	1: pull (update della repository locale)
	2: stage changes (il + dei "Changes" che appariranno se si modifica un file)
	3: commit (la spunta V del source control, bisognerà scrivere poi un messaggio e premere invio)
	4: push (esegue upload della repository modificata su github

-come fare un invito per collaborare a una repository: andare sulla repository, cliccare su settings --> manage access --> Invite a collaborator

