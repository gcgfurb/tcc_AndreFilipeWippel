﻿$(document).ready(function() {

	$('.modal-trigger').leanModal();
	
	var audioElement = document.createElement("audio");
	$.get();
            
	// Busca foto, info e planos do builder
	var dados = {
		"idUser" : localStorage.idUser,
		"perfil" : localStorage.perfil,	
		"idBuilder" : localStorage.idBuilder,
	};    
	$.ajax({
	    type     : "post",
	    url      : "http://tagarela-afwippel.rhcloud.com/scripts/builder.php",
	    data     : dados,
	    dataType : "json",
	    success  : function(ret) {
	    	$("body").removeClass("loading");
	   		if (ret.erro) {
		    	alert(ret.msg);
		    }
		    else {
		    	var corBorda;
				switch (ret.fotoCat) {
					case '1':
						corBorda = "yellow";
						break;
					case '2':
						corBorda = "red";
						break;
					case '3':
						corBorda = "green";
						break;
					case '4':
						corBorda = "blue";
						break;
					default:
						corBorda = "black";
						break;
				}
				$(".foto-img").html("<img src='img/"+ret.fotoImg+"' title='"+ret.fotoAudio+"' alt='' class='left' style='margin:25px; border:10px solid "+corBorda+"' height='175' width='175' />");
		    	
		    	$(".info-nome").html("<b>Nome: </b>"+ret.infoNome);
				$(".info-email").html("<b>E-Mail: </b>"+ret.infoEmail);
				$(".info-tel").html("<b>Telefone: </b>"+ret.infoTel);	
				
				for	(var i = 0; i < ret.planosId.length; i++) {
					var corBordaBuilder;
					switch (ret.planosCat[i]) {
						case '1':
							corBordaBuilder = "yellow";
							break;
						case '2':
							corBordaBuilder = "red";
							break;
						case '3':
							corBordaBuilder = "green";
							break;
						case '4':
							corBordaBuilder = "blue";
							break;
						default:
							corBordaBuilder = "black";
							break;
					}
					$(".planos").append("<li><a href='usar-plano.html'>"
										     +"<img src='img/"+ret.planosImg[i]+"' title='"+ret.planosAudio[i]+"' alt='"+ret.planosId[i]+"' style='border:10px solid "+corBordaBuilder+"' height='175' width='175' class='img-plano' />"
										 +"</a></li>");
				}
		    }
	    },
	    error    : function(ret) {
	    	$("body").removeClass("loading");
	   		alert("Erro no servidor (TIMEOUT)!");
	    },
	    beforeSend: function() {
	    	$("body").addClass("loading");
	    },
       	complete: function() { 
       		$("body").removeClass("loading");

			$(".img-plano").click(function() {
		  		var alt = $(this).attr("alt");
		  		localStorage.idPlano = Number(alt);
			});
       	}
	});
	
	$(".foto-img").click(function mostrarInfo() {
    	var src = "audio/"+$(this).children("img").attr("title");
  		audioElement.setAttribute("src",src);
    	audioElement.play();
    });

	$(".criar-prancha").click(function limparPrancha(){
		localStorage.simb1 = "../img/adicionar.png"; localStorage.simb2 = "../img/adicionar.png"; localStorage.simb3 = "../img/adicionar.png";
		localStorage.simb4 = "../img/adicionar.png"; localStorage.simb5 = "../img/adicionar.png"; localStorage.simb6 = "../img/adicionar.png";
		localStorage.simb7 = "../img/adicionar.png"; localStorage.simb8 = "../img/adicionar.png"; localStorage.simb9 = "../img/adicionar.png";
		localStorage.simb1Cat = 1; localStorage.simb2Cat = 1; localStorage.simb3Cat = 1;
		localStorage.simb4Cat = 1; localStorage.simb5Cat = 1; localStorage.simb6Cat = 1;
		localStorage.simb7Cat = 1; localStorage.simb8Cat = 1; localStorage.simb9Cat = 1;
		
		localStorage.idSimb1 = 0; localStorage.idSimb2 = 0; localStorage.idSimb3 = 0;
		localStorage.idSimb4 = 0; localStorage.idSimb5 = 0; localStorage.idSimb6 = 0;
		localStorage.idSimb7 = 0; localStorage.idSimb8 = 0; localStorage.idSimb9 = 0;
		
		localStorage.idSimbPrancha = 0;

		localStorage.idPlanoPrancha = 0;
	});

});