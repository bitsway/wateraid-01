// report plan with progress
//var apipath1="http://e2.businesssolutionapps.com/wateraid/analysis/";
//local
//var apipath1="http://127.0.0.1:8000/welcome/wab_analysis/";
//var apipath1="http://127.0.0.1:8000/wateraid/analysis/";
//---- online
var apipath1="http://e2.businesssolutionapps.com/wateraid/analysis/";
//var apipath1="http://m.businesssolutionapps.com/welcome/wab_analysis/";




var plan_list="";
var ach_list="";

var plan_list_array=[];
var plan_array=[];
var ach_list_array=[];
var ach_array=[];


var plan_ach_array="";
var temp_ach_array="";

function field_force_detail(){	
	$(".errorChk").text("");
	//alert(apipath1+'sync_ff_detail?cid=WAB&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code);
		$.ajax({
				url:apipath1+'get_ff_detail?cid=WAB&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code,
			  	success: function(result) {
				ff_detail_Result=result;
				var ff_array=ff_detail_Result.split("fdfd");
				
				$.mobile.navigate("#reportPage");
			  			}
					
				   });
	}


var from_year="";
var from_month="";

var to_year="";
var to_month="";


		
function ff_plan_all_activity_progress() {		
		$('#loader').show();
		from_year=$("#from_year").val();
		from_month=$("#from_month").val();
		
		to_year=$("#to_year").val();
		to_month=$("#to_month").val();
		sector=$("#sector").val();		
		//alert(apipath+'sync_ff_plan_details_all_activity?cid=WAB&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code+'&from_year='+from_year+'&from_month='+from_month+'&to_year='+to_year+'&to_month='+to_month);
		
		if (from_year=="" || from_month=="" || to_year=="" || to_month=="" ){
			$('#loader').hide();
			$(".errorChk").html("Required date");
			
		}else{
			$(".errorChk").hide();
			$(".dataChk").hide();
			$("#btn_report_show").hide();
			
			$.ajax({
				url:apipath1+'get_ff_plan_details_all_activity?cid=WAB&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code+'&from_year='+from_year+'&from_month='+from_month+'&to_year='+to_year+'&to_month='+to_month+'&sector='+sector,
			  success: function(result) {
				plan_list=result;				
				ff_ach_all_activity_progress();
						}
				   });
		}
			
}



function ff_ach_all_activity_progress() {
		from_year=$("#from_year").val();
		from_month=$("#from_month").val();
		
		to_year=$("#to_year").val();
		to_month=$("#to_month").val();
		
		sector=$("#sector").val();
		//alert(apipath1+'sync_ff_achievement_details_all_activity?cid=WAB&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code+'&from_year='+from_year+'&from_month='+from_month+'&to_year='+to_year+'&to_month='+to_month+'&sector='+sector);
			$.ajax({
				url:apipath1+'get_ff_achievement_details_all_activity?cid=WAB&mobile='+localStorage.mobile_no+'&sync_code='+localStorage.sync_code+'&from_year='+from_year+'&from_month='+from_month+'&to_year='+to_year+'&to_month='+to_month+'&sector='+sector,
			  success: function(result) {
				ach_list=result
					//alert(ach_list);
					compare_data()
			  			}
				   });	   
							   
}

// compare

function compare_data() {
	
	// PREPARE aCHIVEMENT ARRAY ============================================
	ach_list_array=(ach_list).split("rdrd");
	var ach_list_count=ach_list_array.length;
	temp_ach_array=createArray(ach_list_count, 4);	
	
		
	for(j=0;j<ach_list_count;j++){
		ach_array=ach_list_array[j].split("fdfd");		
		temp_ach_array[j][0]=ach_array[0]; //activity
		temp_ach_array[j][1]=ach_array[1]; // achievement qty
		temp_ach_array[j][2]=ach_array[2]; // ach population		
		temp_ach_array[j][3]=0;	// flag
		
		}
	
	
	// PREPARE PLAN ARRAY ============================================
	plan_list_array=(plan_list).split("rdrd");
	var plan_list_count=plan_list_array.length;							
	plan_ach_array = createArray(plan_list_count, 6);
	var temp='';
	/* Activity, Output_Qty, OutputPopulation, AchQty , achPopulation */
	$('#plan_text').val('testaaa');
	for(i=0;i<plan_list_count;i++){
		plan_array=plan_list_array[i].split("fdfd")
		plan_ach_array[i][0]=plan_array[0]; //activity
		plan_ach_array[i][1]=plan_array[1]; //output qty
		plan_ach_array[i][2]=plan_array[2]; //output population
		plan_ach_array[i][3]=0;	//AchQty
		plan_ach_array[i][4]=0;	//achPopulation	
				
		for(j=0;j<ach_list_count;j++){
			if ((plan_ach_array[i][0]==temp_ach_array[j][0])){
				
				plan_ach_array[i][3]=temp_ach_array[j][1];	//AchQty
				plan_ach_array[i][4]=temp_ach_array[j][2];	//achPopulation
				temp_ach_array[j][3] = 1;
				}
				/*else
					{
					plan_ach_array[i][4]=0;	//AchQty
					plan_ach_array[i][5]=0;	//achPopulation
				}		*/
			
			}
		}
	
//	plan_ach_array.push(['00','test','test','test','test','test','test']);
//	plan_ach_array.push(['00','abc','test','test','test','test','test']);
	
	//Push the Records those are in achivement, but not im plan	
	for(j=0;j<ach_list_count;j++){
			if (temp_ach_array[j][3] == 0){
				plan_ach_array.push([temp_ach_array[j][0],temp_ach_array[j][1],0,0,temp_ach_array[j][2],temp_ach_array[j][3]]);
			}
		}
	
	plan_ach_array.sort();
	
	$('#plan_text').val(plan_ach_array);
	$('#ach_text').val(temp_ach_array);
	
	show_report()
	
	
}


// show report
function show_report(){
	
	
	//plan_ach_array
	var plan_ach_array_count = plan_ach_array.length;
	var plan_show_array="";
		
	for (i=0;i<plan_ach_array_count;i++){		
		plan_show_array=plan_ach_array[i];
		if(plan_show_array[1]!=undefined){
			$('#plan_details_progress_all_activity').append('<tr class="plan_tr" style="font-size:11px;"><td >'+plan_show_array[0]+'</td><td>'+plan_show_array[1]+'</td><td>'+plan_show_array[2]+'</td><td>'+plan_show_array[3]+'</td><td>'+plan_show_array[4]+'</td></tr>');
			$('#loader').hide();
		}else{
			$('#loader').hide();
			$('.dataChk').text("No data available");
			}
		}
	
}




function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}