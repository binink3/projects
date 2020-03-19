let all_fund_info;

$(document).ready(function() {
	$("#wrap").css("display", "none");
	$(".fund-name-search").on("click", function(){
		let fund_input_val = $("#fund-input").val();
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

  	// let inputEnter = document.getElementById("fund-input");
  	// inputEnter.addEventListener("keyup",function(event){
  	// 	if(event.keyCode === 13){
  	// 		event.preventDefault();
  	// 		document.getElementById("fund-name-search");
  	// 		alert("hi");
  	// 	}
  	// });

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
	//기준일을 "오늘" 날짜로 나타내줌
	let d = new Date();
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let dateStr = year + "-" + month + "-"+ date;

	let fund_manager_current_info_wrap = '<div class="current-info-box">\
											<div class="fund-info-current">\
												<p class="fund-name-info">\
												'+fund_name_input+' ('+company_name+')\
												</p>\
												<span class="fund-director">\
													<b>책임 운용역 : </b>'+manager_name+'\
												</span>\
												<span class="fund-invested-date">\
													<b>투자일 : </b>'+start_date+'\
												</span>\
												<span class="today-date">\
													<b>기준일 : </b>'+dateStr+'\
												</span>\
												<span class="fund-yield">\
													<b>누적 수익률 : </b>'+fund_yield+'\
												</span>\
											</div>\
										</div>'

	$(".fund-manager-current-info-wrap").html(fund_manager_current_info_wrap);
	$(".fund-manager-name > span").text(manager_name + " 펀드매니저의 과거 운영 수익률");

	$.ajax({
		type: "POST",
		url: "/fund",
		data: {fund_name_give:fund_name},
		success: function(response){
			// let mobileMediaQuery = window.matchMedia("(max-width: 600px)");
			$(".fund-track-records-wrap").empty();
			for(let i = 0; i < response.length; i++){
				let fund_name_db = response[i]["fund_name"];
				let start_date = response[i]["start_date"];
				let end_date = response[i]["end_date"];
				let fund_yield = response[i]["fund_yield"];

				// if (fund_yield > 0){
			 //    	$(".record-info-data-table-right").css("color", "#ff1515");
			 //    } else{
			 //    	$(".record-info-data-table-right").css("color", "#1212ff");
			 //    }

			    let mobileMediaQuery = window.matchMedia("(max-width: 600px)");

			    if(mobileMediaQuery.matches){
			    	let fund_track_record = '<div class="fund-track-record">\
											<div class="record-info">\
												<div class="record-info-data-table-left">\
													<p class="fund-name-data-table">'+fund_name_db+'</p>\
													<p>투자 날짜 : '+start_date+'</p>\
													<p>회수 날짜 : '+end_date+'</p>\
													<p>만기 수익률 : '+fund_yield+'</p>\
												</div>\
											</div>\
										</div>'
					$(".fund-track-records-wrap").append(fund_track_record);
			    } else{
			    	let fund_track_record = '<div class="fund-track-record">\
											<div class="record-info">\
												<div class="record-info-data-table-left">\
													<p class="fund-name-data-table">'+fund_name_db+'</p>\
													<p>투자 날짜 :' +start_date+'</p>\
													<p>회수 날짜 : ' +end_date+'</p>\
												</div>\
												<div class="record-info-data-table-right">\
													<p><b>'+fund_yield+'</b></p>\
												</div>\
											</div>\
										</div>'
					$(".fund-track-records-wrap").append(fund_track_record);
			    }
			}
			
		}
	});
}

// 과거 펀드 트랙 4개씩 보여준느 반응형
$(window).resize(function(){
	if ($(window).width() < 901) {
		$(".mobile-tablet-only").on("click", function(){
			$(".fund-track-records-wrap div:hidden").slice(0,4).show();
			if($(".fund-track-records-wrap div").length == $(".fund-track-records-wrap div:visible").length){
				$(".mobile-tablet-only").css("display", "none");
			}
		});
	}
});






























