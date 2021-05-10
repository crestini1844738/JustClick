function personalArea(utente)
{
    /*var nomeUtente="Martina Tombolini";
    var dataNascita="30/10/1999";
    var email="tombolini.1844737@studenti.uniroma1.it";
    var password=0000;
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

    $("#corpoProfilo").append(body);*/




    var settings = {
    url: "/profiloUtente",
    type: "POST",
    dataType: 'JSON',
    success: function(response){
    /*var len = response.corsi.length;
    var corso="";
    for(var i=0; i<len; i++){
        var courseName = response.corsi[i].courseName;
        var author = response.corsi[i].author;
        var follower = response.corsi[i].courseFollower;
        var category=response.corsi[i].category;
        //var descr = response[i].decription;
        corso = "<div class='card' ><div class='row g-0'>"+
        "<div class='col-md-3' id='imgcorso'><img src='../img/courseImgs/"+author+"_"+courseName+".png' ></div>"+
        "<div class='col-md-9'><div class='card-body'><h1>"+courseName+"</h1>"+
        "<p class='categoria'>Categoria: "+category+", Follower: "+follower+"</p>"+
        "<hr><div class='row justify-content-evenly'><p>Some text about the course.. </p>"+
        "<p><button>Vai al corso</button></p>"+
        "</div></div></div></div></div><br>";
         $("#bodypopolari").append(corso);
        
    }
   */


    var nomeUtente=response.utente.Username;
    var dataNascita=response.utente.Date;
    var email=response.utente.Email;
    var password=response.utente.Password;
    var nomecognome=response.utente.Name+" "+response.utente.Surname;
    var body="<div class='card' ><div class='row g-0'><div class='col-md-3' id='fig'>"+
    "<img src='../img/user-icon.png' alt='...' width='179' height='179'> </p>"+
    "<p id='nome'>"+nomecognome+"</p></div><div class='col-md-9'><div class='card-body'>"+
    "<h2 class='card-title'>Informazioni</h2><hr><div class='row justify-content-evenly'>"+
    "<div class='col-6'><h5>Data di nascita:</h5>"+dataNascita+"</div><div class='col-6'>"+
    "<h5>Email:</h5><p>"+email+"</p></div></div><div class='row justify-content-evenly'>"+
    "<div class='col-6'><h5>Username:</h5>"+nomeUtente+"</div><div class='col-6'>"+
    "<h5>Password:</h5>"+password+"</div></div></div></div></div></div>";
    $("#corpoProfilo").append(body);

    }
  };
  $.ajax( settings );
}