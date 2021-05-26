/*<div class="card" >
            <div class="row g-0">
              
              <div class="col-md-3" id="imgcorso">
                <img src="../logo/logo_small_icon_only.png" >
              </div>
              


              <div class="col-md-9">
                <div class="card-body">
                  <h1>Titolo corso</h1>
                  <p class="categoria">categoria,numeroiscritti</p>
                  <hr>
                  <div class="row justify-content-evenly">
                    
                    <p>Some text about the course.. </p>
                    <p><button>Vai al corso</button></p>
                  </div>
          
                </div>
              </div>
            </div>
          </div>
          <br>
*/


//html genera popolari
/*"<div class=card' ><div class='row g-0'>"+
  "<div class='col-md-3' id='imgcorso'><img src='../img/courseImgs/"+author+"_"+courseName+".png' ></div>"+
  "<div class='col-md-9'><div class='card-body'><h1>"+courseName+"</h1>"+
  "<p class='categoria'>categoria:"+category+" numeroiscritti:"+follower+"</p>"+
  "<hr><div class='row justify-content-evenly'><p>Some text about the course.. </p>"+
  "<p><button>Vai al corso</button></p>"+
  "</div></div></div></div></div><br>"
*/
function generaPopolari()
{
  corsi=new Array();
  var settings = {
  url: "/getPopolari",
  type: "GET",
  dataType: 'JSON',
  success: function(response){
    var len = response.corsi.length;
    var corso="";
    for(var i=0; i<len; i++){
        var courseName = response.corsi[i].courseName;
        var author = response.corsi[i].author;
        var follower = response.corsi[i].courseFollower;
        var category=response.corsi[i].category;
        var description=response.corsi[i].desc;
        var img;
        if(response.corsi[i].image == 'loaded') img = "<img src='../img/courseImgs/"+author+"_"+courseName+".png' id='profilocorso'></div>";
        else img="<img src='../img/courseImgs/default_image.png' id='profilocorso'></div>";
        
        //var descr = response[i].decription;
        corso =corso+ "<div class='card' id='sfondo'><div class='row g-0'>"+
        "<div class='col-md-3' id='imgcorso'>"+img+
        "<div class='col-md-9'><div class='card-body' id='riquadro'><h1>"+courseName+"</h1>"+
        "<p class='categoria'>Categoria: "+category+", Follower: "+follower+"</p>"+
        "<hr><div class='row justify-content-evenly'><p>"+description+" </p>"+
        "<p><a href='/courses2/"+courseName+"'><button class='btn btn-dark'>Vai al corso</button></a></p>"+
        "</div></div></div></div></div><br>";
        
        //<a href='/courses2/"+courseName+"'>
        
    }
    $("#bodypopolari").append(corso);
    }
  };
  $.ajax( settings );
}
