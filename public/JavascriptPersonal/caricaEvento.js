function tendinaCaricaEventi()
{
var setting={
    url: "/corsiUtente",
    type: "POST",
    dataType: 'JSON',
    success: function(response){
      //genero corsiPorfilo
      var tuttiicorsi=response.tuttiICorsi;
      var html="<select class='form-select' name='course' aria-label='Default select example'>";
      html=html+"<option value='nessuna' selected>Seleziona il corso di cui fa parte l'evento</option>";
           
      for(j=0;j<tuttiicorsi.length;j++)
      {
        var courseName = tuttiicorsi[j].courseName;
        html=html+"<option value='"+courseName+"'>"+courseName+"</option>";
      }
      html=html+"</select>";
    $("#corpoScelta").html(html);
    }  
  };
  $.ajax( setting );
}