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
  url: "/homepage/popolari",
  type: "POST",
  dataType: 'JSON',
  success: function(response){
    var len = response.corsi.length;
    var corso="";
    for(var i=0; i<len; i++){
        var courseName = response.corsi[i].courseName;
        var author = response.corsi[i].author;
        var follower = response.corsi[i].courseFollower;
        var category=response.corsi[i].category;
        //var descr = response[i].decription;
        corso =corso+ "<div class='card' ><div class='row g-0'>"+
        "<div class='col-md-3' id='imgcorso'><img src='../img/courseImgs/"+author+"_"+courseName+".png' ></div>"+
        "<div class='col-md-9'><div class='card-body'><h1>"+courseName+"</h1>"+
        "<p class='categoria'>Categoria: "+category+", Follower: "+follower+"</p>"+
        "<hr><div class='row justify-content-evenly'><p>Some text about the course.. </p>"+
        "<p><button>Vai al corso</button></p>"+
        "</div></div></div></div></div><br>";

        
    }
    $("#bodypopolari").append(corso);
    }
  };
  $.ajax( settings );
}
