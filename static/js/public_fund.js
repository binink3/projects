let all_fund_info;

$(document).ready(function() {

	$("#wrap").css("display", "none");
	$(".fund-name-search").on("click", function(){
		let fund_input_val = $("#fund-input").val();
		console.log(fund_input_val);
		$("#wrap").css("display", "block");
		$("html, body").animate(
			{scrollTop:$("#wrap").offset().top
		}, 1000, "swing");
		$(".fund-list-group").css("display", "none");
	});

	$("#first-page-scroll").css({ height: $(window).innerHeight() });
		$(window).resize(function(){
		$("#first-page-scroll").css({ height: $(window).innerHeight() });
	});

	$(".fund-list-group").css("display", "none");
	$("#fund-input").keyup(function(){
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
	    var fund_list_match = $(this).val();
	    $(".fund-list-group li").filter(function() {
	      $(this).toggle($(this).text().indexOf(fund_list_match) > -1)
	    });
  	});

	// 펀드 리스트 붙여주기
	$.ajax({
	    type: "GET",
	    url: "/fund",
	    data: {},
	    success: function(response){
	      	all_fund_info = response;
	       	for (let i = 0; i < response.length; i++) {
	       		let fund_name = response[i]["fund_name"];

	       		let fund_name_lists = '<li class="list-group-item" onclick="getfund(this)">'+fund_name+'</li>'
				$(".fund-list-group").append(fund_name_lists); 
	   		}
	    }
	});
});

function getfund(input){
	let fund_name = $(input).text();
	$("#fund-input").val(fund_name);
}

function setfund() {
	let fund_name = $("#fund-input").val();
	
	// 클릭한 펀드의 정보 채우기
	let this_fund_info;
	for (let i = 0 ; i < all_fund_info.length; i++) {
		if (all_fund_info[i]['fund_name'] == fund_name) {
			this_fund_info = all_fund_info[i];
		}
	}

	let company_name = this_fund_info["company_name"];
	let manager_name = this_fund_info["manager_name"];
	let fund_name_input = this_fund_info["fund_name"];
	let start_date = this_fund_info["start_date"];
	let end_date = this_fund_info["end_date"];
	let fund_yield = this_fund_info["fund_yield"];

	let fund_manager_current_info_wrap = '<div class="current-info-box">\
											<div>\
												<h2>\
													現 운용펀드\
												</h2>\
											</div>\
											<br>\
											<div class="fund-info-current">\
												<p>\
												<span>'+fund_name_input+'</span> ('+company_name+')\
												</p>\
												<span class="fund-director">\
													<b>책임 운용역 : </b>'+manager_name+'\
												</span>\
												<span class="fund-invested-date">\
													<b>투자일 : </b>'+start_date+'\
												</span>\
												<span class="today-date">\
													<b>기준일 : </b>'+end_date+'\
												</span>\
												<span class="fund-yield">\
													<b>누적 수익률 : </b>'+fund_yield+'\
												</span>\
											</div>\
										</div>'

	$(".fund-manager-current-info-wrap").html(fund_manager_current_info_wrap);
	$(".fund-manager-name > span").text(manager_name + " 펀드매니저의 旣 운영완료 펀드");


	$.ajax({
		type: "POST",
		url: "/fund",
		data: {fund_name_give:fund_name},
		success: function(response){
			$(".fund-track-records-wrap").empty();
			for(let i = 0; i < response.length; i++){
				let fund_name_db = response[i]["fund_name"];
				let start_date = response[i]["start_date"];
				let end_date = response[i]["end_date"];
				let fund_yield = response[i]["fund_yield"];

				let fund_track_record = '<div class="fund-track-record">\
											<div class="record-info">\
												<ul>\
													<li class="fund-name-padding-bottom"><b>펀드명 :</b> ' +fund_name_db+'</li>\
													<li><b>투자 날짜 :</b> ' +start_date+'</li>\
													<li><b>회수 날짜 :</b> ' +end_date+'</li>\
													<li><b>만기 수익률 :</b> ' +fund_yield+'</li>\
												</ul>\
											</div>\
										</div>'
				$(".fund-track-records-wrap").append(fund_track_record);
			}
			
		}
	});
}






























