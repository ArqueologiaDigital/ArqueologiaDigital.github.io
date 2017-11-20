$(function() {
	$("#slide img:eq(0)").addClass("ativo").show();
	var img = $("#slide img.ativo");
	var slideWidth = parseInt($("#slide").css("width"));
	var slideHeight = parseInt($("#slide").css("height"));
	var imgWidth = parseInt(img.css("width"));
	var imgHeight = parseInt(img.css("height"));
	if(imgWidth < $("#slide").css("width"))
		img.css("left", ($("#slide").css("width") - imgWidth) / 2);
	if(imgHeight < $("#slide").css("height"))
		img.css("top", ($("#slide").css("height") - imgHeight) / 2);

	var texto = $(".ativo").attr("data-description");
	$("#slide").prepend("<p>" + texto + "</p>");
	setInterval(slide, 5000);
	
	$('li').click(function() {
		// custom handling here
		var src = $(this).attr("data-href"); //$(e).prop("data-href");
		window.location.href = src;
		//src = "https://cors-anywhere.herokuapp.com/" + src;
		//$('#showContent').load(src);
	});
});

function slide(){
	if($(".ativo").next().size()){
		$(".ativo").fadeOut("slow").removeClass("ativo").next().fadeIn("fast").addClass("ativo");
	} else {
		$(".ativo").fadeOut().removeClass("ativo");
		$("#slide img:eq(0)").fadeIn("fast").addClass("ativo");
	}
	var slide = $("#slide");
	var img = $("#slide img.ativo");
	var slideWidth = parseInt(slide.css("width"));
	var slideHeight = parseInt(slide.css("height"));
	var imgWidth = parseInt(img.css("width"));
	var imgHeight = parseInt(img.css("height"));
	if(imgWidth < slideWidth)
		img.css("left", (slideWidth - imgWidth) / 2);
	if(imgHeight < slideHeight)
		img.css("top", (slideHeight - imgHeight) / 2);
	var texto = $(".ativo").attr("data-description");
	$("#slide p").hide().html(texto).delay(500).fadeIn("fast");
}