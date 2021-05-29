$(document).ready(function(){
    $("#staffCard1").mouseenter(function(){
      $("#staffCard1").css("width", "340");
    }); 
    $("#staffCard1").mouseleave(function(){
      $("#staffCard1").css("width","320");
    });
    $("#staffCard2").mouseenter(function(){
      $("#staffCard2").css("width", "340");
    }); 
    $("#staffCard2").mouseleave(function(){
      $("#staffCard2").css("width","320");
    });
    $("#staffCard3").mouseenter(function(){
      $("#staffCard3").css("width", "340");
    }); 
    $("#staffCard3").mouseleave(function(){
      $("#staffCard3").css("width","320");
    });
    $("#staff").hide();
    $("#freccia1").hide();
    $("#freccia").click(function(){
      $("#staff").show()
      $("#freccia").hide();
      $("#freccia1").show();
      

    });
    $("#freccia1").click(function(){
      $("#staff").hide();
      $("#freccia").show();
      $("#freccia1").hide();
    })
});