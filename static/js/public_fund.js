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

	/*
	$(".fund-name-search").on("click", function(){
		$.ajax({
	    type: "GET",
	    url: "/fund",
	    data: {},
	    success: function(response){
	       console.log(response)
	       for (let i = 0; i < response.length; i++) {
	       		let status = response[i]["Status"];
	       		let company_name = response[i]["company_name"];
	       		let end_date = response[i]["-"];
	       		let fund_id = response[i]["fund_id"];
	       		let fund_name = response[i]["fund_name"];
	       		let fund_yield = response[i]["fund_yield"];
	       		let manager_name = response[i]["manager_name"];
	       		let start_date = response[i]["start_date"];

	       		let fund_info = '<div class="fund-info-current">\
									<p>\
										'+fund_name+'\
									</p>\
									<span class="fund-director">\
										<b>책임 운용사 : </b>'+manager_name+'\
									</span>\
									<span class="fund-invested-date">\
										<b>투자일 : </b>'+start_date+'\
									</span>\
									<span class="today-date">\
										<b>기준일 : </b>'+start_date+'\
									</span>\
									<span class="fund-yield">\
										<b>수익률 : </b>'+fund_yield+'\
									</span>\
							</div>'
					if(status == "Active"){
						$(".fund-manager-current-info-wrap").append(fund_info); 
						$(".fund-manager-name > span").append(manager_name + " 펀드 매니저 과거 Track Record");
					}
   				}
	    	}
	 	});
	});

	$(".fund-name-search").on("click", function(){
		$.ajax({
	    type: "POST",
	    url: "/fund",
	    data: {  },
	    success: function(response){
	       console.log(response)
	       for (let i = 0; i < 4; i++) {
	       		let status = response[i]["Status"];
	       		let company_name = response[i]["company_name"];
	       		let end_date = response[i]["-"];
	       		let fund_id = response[i]["fund_id"];
	       		let fund_name = response[i]["fund_name"];
	       		let fund_yield = response[i]["fund_yield"];
	       		let manager_name = response[i]["manager_name"];
	       		let start_date = response[i]["start_date"];

	       		let fund_info_past_record = '<div class="fund-track-record">\
												<div class="record-info">\
													<div class="record-info-left">\
														<p><b>펀드 이름 : </b></p>\
														<p><b>투자 날짜 : </b></p>\
														<p><b>회수 날짜 : </b></p>\
														<p><b>달성 수익률 : </b></p>\
													</div>\
													<div class="record-info-right">\
														<p>'+fund_name+'</p>\
														<p class="invested-date">'+start_date+'</p>\
														<p>'+start_date+'</p>\
														<p>'+fund_yield+'</p>\
													</div>\
												</div>\
											</div>'
											$(".fund-track-records-wrap").append(fund_info_past_record);
   				}
	    	}
	 	});
	});
	*/
});