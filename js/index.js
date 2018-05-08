$(function() {
	populateSlideShow();
	if($("#slide img").next().size()) {
		$("#slide img:eq(0)").addClass("ativo").show();
		$("#slide > img").addClass("ativo").show();
		var texto = $(".ativo").attr("data-description");
		$("#slide").prepend("<p>" + texto + "</p>");
	}
	else
		slide(true);
	//computeSlideDimensions($("#slide"), $("#slide img.ativo"));
	setInterval(slide, 5000);
	
	$('li').click(function() {
		// custom handling here
		var src = $(this).attr("data-href");
		window.location.href = src;
		// attempt to load the contents of the links into an element on our page;
		// not really good, as modern browsers inhibit cross-domain page loading.
		//src = "https://cors-anywhere.herokuapp.com/" + src;
		//$('#showContent').load(src);
	});
});

function populateSlideShow() {
	$("#slide > img").remove();
	$.ajax({
	  url: "http://arqueologiadigital.org/slideshow.html",
	  crossDomain: true
	}).done(function(data) {
		var fileDom = $(data);
		//console.log(fileDom);
		$("#slide").append(fileDom);
	}).error(function() {
		$("#slide p").remove();
		$("#slide").prepend("<p>Não foi possível carregar o slideshow.</p>");
	});
}

function slide(isFirstLoad = false){
	$("#slide p").remove();
	if($(".ativo").next().size()) {
		$(".ativo").fadeOut("slow").removeClass("ativo").next().fadeIn("fast").addClass("ativo");
	} else {
		$(".ativo").fadeOut().removeClass("ativo");
		$("#slide img:eq(0)").fadeIn("fast").addClass("ativo");
	}
	computeSlideDimensions($("#slide"), $("#slide img.ativo"));
	var texto = $(".ativo").attr("data-description");
	if(texto && texto.length > 0) {
		$("#slide").prepend("<p>" + texto + "</p>");
		$("#slide p").hide().delay(500).fadeIn("fast");
	}
	else {
		if(isFirstLoad)
			$("#slide").prepend("<p>Carregando o slideshow, aguarde...</p>").show();
		else
			$("#slide").prepend("<p>Não foi possível carregar o slideshow.</p>").show();
	}
	//$("#slide p").hide().html(texto).delay(500).fadeIn("fast");
}

function computeSlideDimensions(slide, img) {
	var slideWidth = parseInt(slide.css("width"));
	var slideHeight = parseInt(slide.css("height"));
	var imgWidth = parseInt(img.css("width"));
	var imgHeight = parseInt(img.css("height"));
	if(imgWidth < slideWidth)
		img.css("left", (slideWidth - imgWidth) / 2);
	if(imgHeight < slideHeight)
		img.css("top", (slideHeight - imgHeight) / 2);
}
