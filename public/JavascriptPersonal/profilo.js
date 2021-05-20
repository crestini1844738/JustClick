function personalArea(utente)
{
    
    /*"<div class='card' ><div class='row g-0'><div class='col-md-3' id='fig'>"+
            "<img src='../img/user-icon.png' alt='...' width='179' height='179'> </p>"+
            <!-- <i class='fa fa-user' aria-hidden='true' id='user'></i> -->
            "<p id='nome'>"+nomeUtente+"</p></div><div class='col-md-9'><div class='card-body'>"+
            "<h2 class='card-title'>Informazioni</h2><hr><div class='row justify-content-evenly'>"+
            "<div class='col-6'><h5>Data di nascita:</h5>"+dataNascita+"</div><div class='col-6'>"+
            "<h5>Email:</h5><p>"+email+"</p></div></div><div class='row justify-content-evenly'>"+
            "<div class='col-6'><h5>Username:</h5>"+nomeUtente+"</div><div class='col-6'>"+
            "<h5>Password:</h5>"+password+"</div></div></div></div></div></div>" 

    var body="<div class='card' ><div class='row g-0'><div class='col-md-3' id='fig'>"+
    "<img src='../img/user-icon.png' alt='...' width='179' height='179'> </p>"+
    "<p id='nome'>"+nomeUtente+"</p></div><div class='col-md-9'><div class='card-body'>"+
    "<h2 class='card-title'>Informazioni</h2><hr><div class='row justify-content-evenly'>"+
    "<div class='col-6'><h5>Data di nascita:</h5>"+dataNascita+"</div><div class='col-6'>"+
    "<h5>Email:</h5><p>"+email+"</p></div></div><div class='row justify-content-evenly'>"+
    "<div class='col-6'><h5>Username:</h5>"+nomeUtente+"</div><div class='col-6'>"+
    "<h5>Password:</h5>"+password+"</div></div></div></div></div></div>";
    */
    var nomeUtente;
    var dataNascita;
    var email;
    var password;
    var nomecognome;



    var settings = {
    url: "/profiloUtente",
    type: "POST",
    dataType: 'JSON',
    success: function(response){
      //genero dati profilo utente
      nomeUtente=response.utente.Username;
      dataNascita=response.utente.Date;
      email=response.utente.Email;
      password=response.utente.Password;
      nomecognome=response.utente.Name+" "+response.utente.Surname;
      var bodyProfilo="<div class='card' ><div class='row g-0'><div class='col-md-3' id='fig'>"+
      "<img src='../img/user-icon.png' alt='...' width='179' height='179'> </p>"+
      "<p id='nome'>"+nomecognome+"</p></div><div class='col-md-9'><div class='card-body'>"+
      "<h2 class='card-title'>Informazioni</h2><hr><div class='row justify-content-evenly'>"+
      "<div class='col-6'><h5>Data di nascita:</h5>"+dataNascita+"</div><div class='col-6'>"+
      "<h5>Email:</h5><p>"+email+"</p></div></div><div class='row justify-content-evenly'>"+
      "<div class='col-6'><h5>Username:</h5>"+nomeUtente+"</div><div class='col-6'>"+
      "<h5>Password:</h5>"+password+"</div></div></div></div></div></div>";
      //var corsi=response.utente.Courses;//elenco in stringhe dei corsi

      var corsiProfilo="";

      var settingscorsi={
        url: "/corsiUtente",
        type: "POST",
        dataType: 'JSON',
        success: function(response2){
          //genero corsiPorfilo
          var tuttiicorsi=response2.tuttiICorsi;
                   
          for(j=0;j<tuttiicorsi.length;j++)
          {
            var courseName = tuttiicorsi[j].courseName;
            var author = tuttiicorsi[j].author;
            var follower = tuttiicorsi[j].courseFollower;
            var category=tuttiicorsi[j].category;
            var img;
            if(tuttiicorsi[j].image == 'loaded') img = "<img src='../img/courseImgs/"+author+"_"+courseName+".png' id='profilocorso'></div>";
            else img="<img src='../img/courseImgs/default_image.png' id='profilocorso'></div>";
            //var description="Some text about the course..";
            var description=tuttiicorsi[j].desc;
            /*var description;
            if(tuttiicorsi[j].desc === undefined) description="";
            else description=tuttiicorsi[j].desc;*/
            corsiProfilo=corsiProfilo+"<div class='card "+category+"' id='larghezza' ><div class='row g-0'>"+
            "<div class='col-md-3' id='imgcorso'>"+img+
            "<div class='col-md-9'><div class='card-body bkg bkg-"+category+"'><h1>"+courseName+"</h1>"+
            "<p class='categoria'>Categoria: "+category+", Follower: "+follower+"</p>"+
            "<hr><div class='row justify-content-evenly'><p>"+description+" </p>"+
            "<p><a href='/courses2/"+courseName+"'><button class='btn btn-dark'>Vai al corso</button></a></p>"+
            "</div></div></div></div></div><br>";
          }
        $("#corpoProfilo").append(bodyProfilo+"<br><h5 id='titolo'>I miei corsi</h5>"+corsiProfilo);
        }  
      };
      $.ajax( settingscorsi );
    }
  };
  $.ajax( settings );
  
}

