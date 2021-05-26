function tendinaCaricaEventi()
{
var setting={
    url: "/corsiUtente",
    type: "POST",
    dataType: 'JSON',
    success: function(response){
      //genero corsiPorfilo
      var tuttiicorsi=response.tuttiICorsi;
      var html="<select class='form-select' name='course' id='course' aria-label='Default select example'>";
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

function validaForm(){
  if(document.formprova.titolo.value==""){
    alert("Inserisci il nome dell'evento");
    document.formprova.titolo.focus();
    return false;
  }
  if(document.formprova.desc.value==""){
    alert("Inserisci la descrizione dell'evento");
    document.formprova.desc.focus();
    return false;
  }
  if(document.formprova.course.value=="nessuna"){
    alert("Seleziona il corso di cui fa parte un evento. Se non ci sono corsi presenti creane uno nuovo prima di aggiungere un evento");
    document.formprova.opt.focus();
    return false;

  }
  if(document.formprova.dataInizio.value==""){
    alert("Inserisci data e ora di INIZIO evento");
    document.formprova.dataInizio.focus();
    return false;
  }
  if(document.formprova.dataFine.value==""){
    alert("Inserisci data e ora di FINE evento");
    document.formprova.dataFine.focus();
    return false;
  }
  if(document.formprova.dataFine.value<=document.formprova.dataInizio.value){
    alert("ATTENZIONE: inserire data e ora di FINE successivi all'INIZIO dell'evento");
    document.formprova.via.focus();
    return false;
  }
  if(document.formprova.via.value==""){
    alert("Inserisci la via in cui si svolge l'evento");
    document.formprova.via.focus();
    return false;
  }
  if(document.formprova.citta.value==""){
    alert("Inserisci la città in cui si svolge l'evento");
    document.formprova.citta.focus();
    return false;
  }
  return true;
}

$(document).ready(function(){
  $("#validationTextarea").change(function(){
    $(".progress-bar").css("width","14%");
  });
  $("#exampleFormControlTextarea1").change(function(){
    $(".progress-bar").css("width","28%");
  });
  $("#course").change(function(){
    $(".progress-bar").css("width","42%");
  });
  $("#dataInizio").change(function(){
    $(".progress-bar").css("width","56%");
  });
  $("#dataFine").change(function(){
    $(".progress-bar").css("width","70%");
  });
  $("#validationTextarea1").change(function(){
    $(".progress-bar").css("width","84%");
  });
  $("#validationTextarea2").change(function(){
    $(".progress-bar").css("width","100%");
  });
  $("#reset").click(function(){
    $(".progress-bar").css("width","0%");
  });
});