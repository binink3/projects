let all_fund_info = [];
$(document).ready(function() {

	$("#wrap").css("display", "none");
	$(".fund-name-search").on("click", function(){
		$("#wrap").css("display", "block");
		$("html, body").animate(
			{scrollTop:$("#wrap").offset().top
		}, 1000, "swing");
	});

	$("#first-page-scroll").css({ height: $(window).innerHeight() });
		$(window).resize(function(){
		$("#first-page-scroll").css({ height: $(window).innerHeight() });
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
				$(this).css("background-color", "#5a4a4a2e");
				$(this).css("cursor", "pointer");
			});
			$(".fund-list-group > li").mouseleave(function(){
				$(this).css("background-color", "transparent");
			});
		}	
	});

	$("#fund-input").on("keyup", function() {
	    var fund_list_match = $(this).val().toLowerCase();
	    $(".fund-list-group li").filter(function() {
	      $(this).toggle($(this).text().toLowerCase().indexOf(fund_list_match) > -1)
	    });
	  });

	// 펀드 리스트 붙여주기
	$.ajax({
	    type: "GET",
	    url: "/fund",
	    data: {},
	    success: function(response){
	      	all_fund_info = response
	       	for (let i = 0; i < response.length; i++) {
	       		let fund_name = response[i]["fund_name"];

	       		let fund_name_lists = '<li class="list-group-item" onclick="setfund(this)">'+fund_name+'</li>'
				$(".fund-list-group").append(fund_name_lists); 
	   		}
	    }
	 });
});