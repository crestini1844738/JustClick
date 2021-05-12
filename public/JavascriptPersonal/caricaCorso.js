function validaForm(){
    if(document.formprova.titolo.value==""){
      alert("Inserisci il titolo del corso");
      document.formprova.titolo.focus();
      return false;
    }
    if(document.formprova.opt.value=="nessuna"){
      alert("Scegli la categoria del tuo corso");
      document.formprova.opt.focus();
      return false;

    }
    var file = document.getElementById("materiale").files;
    if((file.length==0) && (document.formprova.descMateriale.value!="")){
      alert("Non puoi inserire la descrizione senza caricare il materiale");
      document.formprova.materiale.focus();
      return false;

    }
    return true;
  }


  $(document).ready(function(){
    $("#validationTextarea").change(function(){
      $(".progress-bar").css("width","17%");
    });
    $("#exampleFormControlTextarea1").change(function(){
      $(".progress-bar").css("width","34%");
    });
    $("select").change(function(){
      $(".progress-bar").css("width","51%");
    });
    $("#image").change(function(){
      $(".progress-bar").css("width","68%");
    });
    $("#materiale").change(function(){
      $(".progress-bar").css("width","85%");
    });
    $("#descMateriale").change(function(){
      $(".progress-bar").css("width","100%");
    });
    $("#reset").click(function(){
      $(".progress-bar").css("width","0%");
    });



    
  });