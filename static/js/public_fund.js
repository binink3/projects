$(document).ready(function() {

	$(function(){
		$("#first-page-scroll").css({ height: $(window).innerHeight() });
		$(window).resize(function(){
			$("#first-page-scroll").css({ height: $(window).innerHeight() });
		});
	});
	
	$(".fund-name-search").on("click", function(event){ 
		event.preventDefault();
		$("#wrap").css("display", "block");
		$("html, body").animate(
			{scrollTop:$("#wrap").offset().top
		}, 1000, "swing");
	});

	$(".fund-list-group").css("display", "none");
	$("#fund-input").keyup(function(){
		let fund_name = $(this).val().toLowerCase();
		let fundTyped = $(this).val();
		if(fundTyped == ""){
			$(".fund-list-group").css("display", "none");
		} else{
			$(".fund-list-group").css("display", "block");
			$(".fund-list-group > li").mouseenter(function(){
				$(this).css("background-color", "grey");
				$(this).css("cursor", "pointer");
			});
			$(".fund-list-group > li").mouseleave(function(){
				$(this).css("background-color", "transparent");
			});
		}	
	});

	$("#fund-input").on("keyup", function() {
	    var value = $(this).val().toLowerCase();
	    $("#myList li").filter(function() {
	      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	    });
	  });
});



