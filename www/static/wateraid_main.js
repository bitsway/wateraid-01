
var latitude="";
var longitude="";

var latitudewq="";
var longitudewq="";

function getLocationInfoAch() {	
	var options = { enableHighAccuracy: false};	
	navigator.geolocation.getCurrentPosition(onSuccess, onError, options);		
	$(".errorChk").html("Confirming location. Please wait.");
}
// onSuccess Geolocation
function onSuccess(position) {
	$("#ach_lat").val(position.coords.latitude);
	$("#ach_long").val(position.coords.longitude);
	$(".errorChk").html("Location Confirmed");
}
// onError Callback receives a PositionError object
function onError(error) {
   $("#ach_lat").val(0);
   $("#ach_long").val(0);
   $(".errorChk").html("Failed to Confirmed Location.");
}

function getLocationInfoWq() {
	//$("#wq_lat").val(11111);
   	//$("#wq_long").val(11111);
	navigator.geolocation.getCurrentPosition(onSuccessWq, onErrorWq);		
	$(".errorChk").html("Confirming location. Please wait.");
}

// onSuccess Geolocation
function onSuccessWq(position) {
	$("#wq_lat").val(position.coords.latitude);
	$("#wq_long").val(position.coords.longitude);
	$(".errorChk").html("Location Confirmed");
}
// onError Callback receives a PositionError object
function onErrorWq(error) {
   $("#wq_lat").val(0);
   $("#wq_long").val(0);
   $(".errorChk").html("Failed to Confirmed Location.");
}

var apipath="http://e2.businesssolutionapps.com/wateraid/syncmobile_new_160109/";

//---- online x
//var apipath="http://m.businesssolutionapps.com/welcome/wab_sync_new_140918/";

//--- local
//var apipath="http://127.0.0.1:8000/wateraid/syncmobile_new_160109/";


var planFlag=0;
var cboFlag=0;
var locationFlag=0;

var startDt='';
var syncResult='';
var achPlanId='';
var achPlanActivities='';
var achCBOid='';
var achPopulation='';
var achHousehold='';
var achMale='';
var achFemale='';
var achGirlsUnder='';
var achBoysUnder='';
var achGirls='';
var achBoys='';
var achDapMale='';
var achDapFemale='';
var achPoorC='';
var achPoorEx='';
var achEthMale='';
var achEthFemale='';
var achServiceRecpt='';
var achPhoto='';
var wqPhoto='';
var reviewAchFlag=0; //used for html triger
var reviewAchDisplayFlag=false; //used for save data from review
var arrayId=-1;

var imageName = "";
var imagePathA="";
var imagePathW="";

$(function(){
	
	$('#syncBasic').click(function() {
					
						  
		var mobile=$("#mobile").val() ;
	 	var password=$("#password").val() ;
		
		if (mobile=="" || password==""){
			 $(".errorChk").html("Required mobile no and password");	
		 }else{	
			 $('#syncBasic').hide();			 
			 $(".errorChk").html("Sync in progress. Please wait...");
			if(localStorage.sync_code==undefined || localStorage.sync_code==""){
					localStorage.sync_code=0
				}
			
		 	//alert(apipath+'passwordCheck?cid=WAB&mobile='+mobile+'&password='+encodeURI(password)+'&sync_code='+localStorage.sync_code);
			$.ajax({				   
//			  url:apipath+'dataSyncCheck?cid=WAB&mobile='+mobile+'&password='+encodeURI(password)+'&sync_code='+localStorage.sync_code,
				url:apipath+'passwordCheck?cid=WAB&mobile='+mobile+'&password='+encodeURI(password)+'&sync_code='+localStorage.sync_code,
			  success: function(result) {
				syncResult=result
				//alert(syncResult);
				var syncResultArray = syncResult.split('rdrd');
					if (syncResultArray[0]=='YES'){	
						localStorage.sync_code=syncResultArray[1];
						localStorage.plan_list=syncResultArray[2];
						localStorage.provided_by=syncResultArray[3];
						localStorage.cbo_list=syncResultArray[4];
						localStorage.ser_res_list=syncResultArray[5];
						localStorage.plan_wq=syncResultArray[6];
						localStorage.cbo_id_wq=syncResultArray[7];
						
						localStorage.mobile_no=mobile;
						
						
						localStorage.ach_save="";
						localStorage.water_q_save="";
						
						$(".errorChk").html("Sync Successful");
						//alert('aa');
						
						$('#syncBasic').show();
						
						if (planFlag==0){
							$("#planlistDiv").html(localStorage.plan_list);
							planFlag=1;
						}else{
							$('#planlistDiv').empty();
							$('#planlistDiv').append(localStorage.plan_list).trigger('create');
						}
						
						if (cboFlag==0){
							$("#cboIdDiv").html(localStorage.cbo_list);	
							cboFlag=1;
						}else{
							$('#cboIdDiv').empty();
							$('#cboIdDiv').append(localStorage.cbo_list).trigger('create');
						}
						
						if (locationFlag==0){			   
							$("#serResDiv").html(localStorage.ser_res_list);	
							locationFlag=1;
						}else{
							$('#serResDiv').empty();
							$('#serResDiv').append(localStorage.ser_res_list).trigger('create');
						}
												
						/*$("#planlistDiv").html(localStorage.plan_list);					
						$("#cboIdDiv").html(localStorage.cbo_list);
						$("#serResDiv").html(localStorage.ser_res_list);*/
						
						$("#planWqlistDiv").html(localStorage.plan_wq);
						$("#wQCboIdDiv").html(localStorage.cbo_id_wq);
						$("#providedByDiv").html(localStorage.provided_by);
						$("#TestTypeDiv").html(localStorage.test_type_wq);
											
						/*$('.planlistDiv').empty();
						$('.planlistDiv').append(localStorage.plan_list).trigger('create');*/
						
						
						var url = "#pagesync";
						$.mobile.navigate(url);
						//$(location).attr('href',url);
//						location.reload();
					}
					else {
						
						$(".errorChk").html("Sync Failed. Authorization or Network Error.");
						$('#syncBasic').show();
					}
				
			  }//----/success f
			});//------/ajax
		 
		 }//-----/field
			
	});//-----/basic
	
});//------/func

//------------------water aid button click

function waterAidClick(){
	$(".errorChk").text("");
	
	planFlag=0
	cboFlag=0
	locationFlag=0
	
	//var url = "#reportType";
	//$(location).attr('href',url);
	
	$.mobile.navigate("#reportType")
	location.reload();
	
	}
	
$(document).ready(function(){	
	$("#planlistDiv").html(localStorage.plan_list);	
	$("#cboIdDiv").html(localStorage.cbo_list);					   
	$("#serResDiv").html(localStorage.ser_res_list);
	
	$("#planWqlistDiv").html(localStorage.plan_wq);
	$("#wQCboIdDiv").html(localStorage.cbo_id_wq);
	//$("#reviewList").html(localStorage.reviewDataDiv);
	$("#providedByDiv").html(localStorage.provided_by);
	
	$(".errorChk").text("");
	
//-------------------------------date format

//$( "#fstDate" ).datepicker( "option", "dateFormat", "dd/mm/yyyy");
	
//------------------------safe water -------------					   
	$(".dateErr").text("");
//-------------------------------------/portable
	$("#non_potbl_res").hide();	
	
	$("#st_non_potable").click(function(){					
		$("#non_potbl_res").show();
	});
	
	$("#st_potable").click(function(){					
		$("#non_potbl_res").hide();
		
	});
	
	//-------------------------------------/all test complete
		$("#all_test_n_res").hide();		
	
		$("#all_test_y").click(function(){					
		$("#all_test_n_res").hide();
		
	});
	
	$("#all_test_n").click(function(){					
		$("#all_test_n_res").show();
		
	});
	
	//-------------------------------------/manage comm trainee
	$("#m_comm_ori").hide();
	$("#isNotManagement").hide();
	$("#m_comm_ori_no").hide();	
		
	
	$("#m_comm_ext_y").click(function(){
		$("#m_comm_ori").show();
		$("#m_comm_ori_no").hide();	
		$("#isNotManagement").hide();
	});		
	$("#m_comm_ext_n").click(function(){
		$("#m_comm_ori").hide();
		$("#m_comm_ori_no").hide();	
		$("#isNotManagement").show();
	});
	
	$("#m_comm_ori_y").click(function(){				
		$("#m_comm_ori_no").hide();
	});
	$("#m_comm_ori_n").click(function(){				
		$("#m_comm_ori_no").show();
	});
	
	$("#caretaker_train_y").click(function(){
		$("#caretakerTrainedNo").hide();
	});	
	$("#caretaker_train_n").click(function(){
		$("#caretakerTrainedNo").show();
	});
	
	
	//--------------------------check urban acSectorNext
	$("#pipe_w_sup").hide();		
	
	$("#piped_w_conn_y").click(function(){					
		$("#pipe_w_sup").show();		
	});
	
	$("#piped_w_conn_n").click(function(){					
		$("#pipe_w_sup").hide();
	});
	/*$("#pipe_conc").hide();
	$("#pipe_w_sup").hide();*/
	
	$("#tech_ttc").hide();
	$("#tech_sl").hide();
	$("#tech_as").hide();
	$("#tech_fe").hide();
	$("#tech_mn").hide();
	$("#tech_chl").hide();
	$("#tech_turb").hide();
	$("#tech_chlorine").hide();
	$("#tech_ph").hide();
	$("#tech_boron").hide();
	$("#tech_c_bac").hide();
	$("#tech_odor").hide();
	$("#tech_nitrate").hide();
	$("#tech_zinc").hide();
	$("#tech_condvity").hide();
	$("#tech_fluoride").hide();
	
	$("#tr_assenic_patient").hide();

	
});


//----------------back button
function backClick(){
	$(".errorChk").text("");
	}

//---------------------report Type list	
function achivementclick(){
	$(".errorChk").text("");
	
	if(localStorage.plan_list==undefined || localStorage.plan_list==""){
		$(".errorChk").text("Required Sync");
	}else{
		if (planFlag==0){
			$("#planlistDiv").html(localStorage.plan_list);
			planFlag=1;
		}else{
			$('#planlistDiv').empty();
			$('#planlistDiv').append(localStorage.plan_list).trigger('create');
		}
		
		if (cboFlag==0){
			$("#cboIdDiv").html(localStorage.cbo_list);	
			cboFlag=1;
		}else{
			$('#cboIdDiv').empty();
			$('#cboIdDiv').append(localStorage.cbo_list).trigger('create');
		}
		
		if (locationFlag==0){			   
			$("#serResDiv").html(localStorage.ser_res_list);	
			locationFlag=1;
		}else{
			$('#serResDiv').empty();
			$('#serResDiv').append(localStorage.ser_res_list).trigger('create');
		}
		
		/*$("#planlistDiv").html(localStorage.plan_list);	
		$("#cboIdDiv").html(localStorage.cbo_list);					   
		$("#serResDiv").html(localStorage.ser_res_list);*/
			
		$("#achID").val("");
		
		$("#population").val("");
		$("#household").val("");
		$("#male").val("");
		$("#female").val("");
		$("#girlsUnder").val("");
		$("#boysUnder").val("");
		$("#girls").val("");
		$("#boys").val("");
		$("#dapMale").val("");
		$("#dapFemale").val("");
		$("#poorA").val("");
		$("#poorB").val("");
		$("#poorC").val("");
		$("#poorEx").val("");
		$("#ethMale").val("");
		$("#ethFemale").val("");	
		$("#serRecpent").val("");	
		$("#achPhoto").val("");	
		
		$("#ach_lat").val("");
		$("#ach_long").val("");			
		
		reviewAchDisplayFlag==false;
		arrayId='';
		
		
		var url = "#planList";
		$.mobile.navigate(url);
		//$(location).attr('href',url);
		//location.reload();
	}
}
	
//------------------------------domain list 
function achDataNext(){
	if($("#planlistDiv").find("input[name='plan_select']:checked").length==0){
		$(".errorChk").text("Required Plan");
	}else{
		var ach_plan_id=$("input[name='plan_select']:checked").val();
		var ach_plan_activities=$("#achActivityName"+ach_plan_id).val();
		
		
		achPlanId=ach_plan_id;
		achPlanActivities=ach_plan_activities;
		
		
		if (startDt==""){
			var now = new Date();
			var month=now.getUTCMonth()+1;
			startDt = now.getUTCFullYear()+ "-" + month + "-" + now.getUTCDate()+" "+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
		}
		
		$(".errorChk").text("");
		
		
		var url = "#achiveDataList";
		$.mobile.navigate(url);
		//$(location).attr('href',url);
	}
}

//-----------------------------achivement data people support
function achivementDataPSupport(){
	$(".errorChk").text("");
	var cbo_id=$("#cbo_combo").val();
	
	var ach_id=$("#achID").val();
	
	
	var population=$("#population").val();
	var household=$("#household").val();
	var male=$("#male").val();
	var female=$("#female").val();
	var girlsUnder=$("#girlsUnder").val();
	var boysUnder=$("#boysUnder").val();
	var girls=$("#girls").val();
	var boys=$("#boys").val();
	var dapMale=$("#dapMale").val();
	var dapFemale=$("#dapFemale").val();
	var poorA=$("#poorA").val();
	var poorB=$("#poorB").val();
	var poorC=$("#poorC").val();
	var poorEx=$("#poorEx").val();
	var ethMale=$("#ethMale").val();
	var ethFemale=$("#ethFemale").val();
	
	if(girlsUnder==''){
			girlsUnder=0;
			}
	if(boysUnder==''){
			boysUnder=0;
			}	
	if(girls==''){
			girls=0;
			}
	if(boys==''){
			boys=0;
			}
	if(dapMale==''){
			dapMale=0;
			}
	if(dapFemale==''){
			dapFemale=0;
			}
	if(poorA==''){
			poorA=0;
			}
	if(poorB==''){
			poorB=0;
			}
	if(ethMale==''){
			ethMale=0;
			}
	if(ethFemale==''){
			ethFemale=0;
			}
	
	if (cbo_id=="" ){
		$(".errorChk").text("Required CBO ID ");
	}else if (male=="" ){
		$(".errorChk").text("Required Male ");
	}else if (female=="" ){
		$(".errorChk").text("Required Female ");
	}else if (poorC=="" ){
		$(".errorChk").text("Required Poor C category ");
	}else if (poorEx=="" ){
		$(".errorChk").text("Required Poor D category ");
	}else{
			var totalMF=eval(male)+eval(female)+eval(girlsUnder)+eval(boysUnder)+eval(girls)+eval(boys);
			var population=eval(population);
			var totalPoor=eval(poorA)+eval(poorB)+eval(poorC)+eval(poorEx);
			
				
			achCBOid=cbo_id
			achID=ach_id
			achPopulation=population
			achHousehold=household
			achMale=male
			achFemale=female
			achGirlsUnder=girlsUnder
			achBoysUnder=boysUnder
			achGirls=girls
			achBoys=boys
			achDapMale=dapMale
			achDapFemale=dapFemale
			achPoorA=poorA
			achPoorB=poorB
			achPoorC=poorC
			achPoorEx=poorEx
			achEthMale=ethMale
			achEthFemale=ethFemale
			
			var ach_plan_id=$("input[name='plan_select']:checked").val();
			//alert(ach_plan_id);
			
			$(".errorChk").text("");
			
			
			var url="#achiveDataList2";
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		}
	}
	
//------------------ show population
function totalPopulation(){
	var male=$("#male").val();
	var female=$("#female").val();
	var girlsUnder=$("#girlsUnder").val();
	var boysUnder=$("#boysUnder").val();
	var girls=$("#girls").val();
	var boys=$("#boys").val();
	
	if(male==''){
			male=0;
			}
	if(female==''){
			female=0;
			}
	if(girlsUnder==''){
			girlsUnder=0;
			}
	if(boysUnder==''){
			boysUnder=0;
			}
	if(girls==''){
			girls=0;
			}
	if(boys==''){
			boys=0;
			}
			
	var totalMF=eval(male)+eval(female)+eval(girlsUnder)+eval(boysUnder)+eval(girls)+eval(boys);
	
	$("#population").val(totalMF);
	}

//------------------ show Household
function totalhousehold(){
	var poorA=$("#poorA").val();
	
	var poorB=$("#poorB").val();
	var poorC=$("#poorC").val();
	var poorEx=$("#poorEx").val();
	
	if(poorA==''){
			poorA=0;
			}
	if(poorB==''){
			poorB=0;
			}
	if(poorC==''){
			poorC=0;
			}
	if(poorEx==''){
			poorEx=0;
			}
			
	var totalHH=eval(poorA)+eval(poorB)+eval(poorC)+eval(poorEx);
	
	$("#household").val(totalHH);
	}

//------------------achivement sector next 
function serviceRecipentNext(){
	var chk_service_r=$("#serRecpent").val();
	
	
	if(chk_service_r=="" ){
		$(".errorChk").text("Select One");
		var url="#achiveDataList2";		
		//alert("select sector");
	}else{
		achServiceRecpt=chk_service_r;
		
		$(".errorChk").text("");
		var url="#inPhoto";			
		}
	
	$.mobile.navigate(url);
	//$(location).attr('href',url);
	
}

	
//-----------------------------planid,CBO ID, ID, Population, Household,male,Female,girls Under, boys Under,girls,boys,DAP male, DAP Female,Poor A,Poor B ,Poor C, Poor D, Ethnic Male, Ethnic Female, service Recepent, service recepent value
function achiveDataSave(){
		$(".errorChk").text("");		
		$("#btn_ach_save").hide();
		$("#btn_ach_submit").hide();
		
		latitude=$("#ach_lat").val();
		longitude=$("#ach_long").val();
		
		achPhoto=$("#achPhoto").val();		
		
		
		if (latitude==undefined || latitude==''){
			latitude=0;
			}
		if (longitude==undefined || longitude==''){
			longitude=0;
			}
		
		if (achPhoto=='' || achPhoto==undefined){
			$(".errorChk").text("Please confirm Photo ");
			$("#btn_ach_save").show();
			$("#btn_ach_submit").show();
		}else{
		
			/*if(latitude==0 || longitude==0){
				$(".errorChk").text("Please confirm your location ");
				$("#btn_ach_save").show();
				$("#btn_ach_submit").show();
			}else{*/
												
				achivementSave=achPlanId+'fdfd'+achCBOid+'fdfd'+achID+'fdfd'+achPopulation+'fdfd'+achHousehold+'fdfd'+achMale+'fdfd'+achFemale+'fdfd'+achGirlsUnder+'fdfd'+achBoysUnder+'fdfd'+achGirls+'fdfd'+achBoys+'fdfd'+achDapMale+'fdfd'+achDapFemale+'fdfd'+achPoorA+'fdfd'+achPoorB+'fdfd'+achPoorC+'fdfd'+achPoorEx+'fdfd'+achEthMale+'fdfd'+achEthFemale+'fdfd'+achServiceRecpt+'fdfd'+achPlanActivities+'fdfd'+achPhoto+'fdfd'+startDt+'fdfd'+latitude+'fdfd'+longitude
				
				if (achPlanId=='' || achCBOid==''){
					$(".errorChk").text("New records not available");
					$("#btn_ach_save").show();
				}else{
					
					achivementStr=localStorage.ach_save;		
					var addFlag=true;			
					
					if (achivementStr==undefined || achivementStr==''){			
						localStorage.ach_save=achivementSave
					}else{
						var achiveSavArray=achivementStr.split('rdrd');
						
						if (reviewAchDisplayFlag==true){					
							if (arrayId ==-1){							
									$(".errorChk").text("Review Index value Error");
									$("#btn_ach_save").show();
							}else{
								achiveSavArray[arrayId]=achivementSave
								
								
								var achTemp="";
								var achTempStr="";
								for (i=0;i<achiveSavArray.length;i++){
									accTemp=achiveSavArray[i]
									
									if (achTempStr==""){
										achTempStr=accTemp
									}else{
										achTempStr=achTempStr+'rdrd'+accTemp
										}
									
								}
								if (achTempStr==""){
									$(".errorChk").text("Review Index Error" );
									$("#btn_ach_save").show();
								}else{
									localStorage.ach_save=achTempStr;
									}
								
								}
						}else{				
							if (achiveSavArray.length >= 10){
								addFlag=false;					
							}else{
								localStorage.ach_save=achivementStr+'rdrd'+achivementSave
								
							}
						}
					}
					
					if (addFlag==false){
						$(".errorChk").text("Maximum 10 records allowed to be saved for review");
						$("#btn_ach_save").show();
					}else{
						achPlanId='';
						achID='';
						achCBOid='';
						achPopulation='';
						achHousehold='';
						vachMale='';
						achFemale='';
						achGirlsUnder='';
						achBoysUnder='';
						achGirls='';
						achBoys='';
						achDapMale='';
						achDapFemale='';
						achPoorA='';
						achPoorB='';
						achPoorC='';
						achPoorEx='';
						achEthMale='';
						achEthFemale='';
						
						achServiceRecpt='';
						
						achPhoto='';
						startDt='';
						
						latitude='';
						longitude='';
						
						
						
						$("#achID").val("");
						
						$("#population").val("");
						$("#household").val("");
						$("#male").val("");
						$("#female").val("");
						$("#girlsUnder").val("");
						$("#boysUnder").val("");
						$("#girls").val("");
						$("#boys").val("");
						$("#dapMale").val("");
						$("#dapFemale").val("");
						$("#poorA").val("");
						$("#poorB").val("");
						$("#poorC").val("");
						$("#poorEx").val("");
						$("#ethMale").val("");
						$("#ethFemale").val("");
						
						$("#achPhoto").val("");
						
						$("#ach_lat").val("");
						$("#ach_long").val("");
						
						reviewAchDisplayFlag==false;
						arrayId=-1;
						
						
						$(".errorChk").text("Successfully saved for review");
						$("#btn_take_pic").hide();
						$("#btn_ach_lat_long").hide();
						
						}
				}
			/*}*/
		}
	}

function deleteAchReview(){	
		arrayId=eval($("input[name='achReviewRad']:checked").val());
		
		if (arrayId ==undefined){							
				$(".errorChk").text("Select a Record");
				
		}else{
				var achiveSavArray3=localStorage.ach_save.split('rdrd');
				
				achiveSavArray3.splice(arrayId,1);
				
				var achTemp3="";
				var achTempStr3="";
				for (k=0;k<achiveSavArray3.length;k++){
					accTemp3=achiveSavArray3[k];
					
					if (achTempStr3==""){
						achTempStr3=accTemp3
					}else{
						achTempStr3=achTempStr3+'rdrd'+accTemp3
						}
					
				}				
				localStorage.ach_save=achTempStr3;				
				
				var url = "#reportType";
				//$(location).attr('href',url);
				$.mobile.navigate(url);
				location.reload();
			}
	
	}
//Review Data List
function reviewAchiveData(){
		//listOfReviewData='';
		var achivement=localStorage.ach_save
		
		if (achivement==undefined || achivement==''){
			$(".errorChk").text("Review data not available");
		}else{
			var achivementSaveArray=achivement.split('rdrd');
			
			var achiveSaveCount=achivementSaveArray.length;
			
			var achiveArray=[];
			var reviewDataDiv="";
			var planID="";
			var cboID="";
			var achActivities="";
			
			reviewDataDiv='<ul data-role="listview" data-inset="true"><li style="background-color:#F2F2F2;">Review </li><li class="ui-field-contain"><fieldset data-role="controlgroup">'
			for (i=0;i<achiveSaveCount;i++){
				achiveArray=achivementSaveArray[i].split('fdfd');
				planID=achiveArray[0];
				cboID=achiveArray[1];
				achActivities=achiveArray[20];
				
				reviewDataDiv=reviewDataDiv+'<input type="radio" name="achReviewRad"  id="achReviewRad'+i+'"  value="'+i+'"/> <label for="achReviewRad'+i+'">'+achActivities+'-'+planID+'</label>'
				
				}
			
			reviewDataDiv=reviewDataDiv+'</fieldset></li></ul>'
			
			if (reviewAchFlag==0){
				$("#reviewAchList").html(reviewDataDiv);
				reviewAchFlag=1;
			}else{
				$('#reviewAchList').empty();
				$('#reviewAchList').append(reviewDataDiv).trigger('create');
				}
			
			//-----------------------------
			if (planFlag==0){
				$("#planlistDiv").html(localStorage.plan_list);
				planFlag=1;
			}else{
				$('#planlistDiv').empty();
				$('#planlistDiv').append(localStorage.plan_list).trigger('create');
			}
			
			if (cboFlag==0){
				$("#cboIdDiv").html(localStorage.cbo_list);	
				cboFlag=1;
			}else{
				$('#cboIdDiv').empty();
				$('#cboIdDiv').append(localStorage.cbo_list).trigger('create');
			}
			
			if (locationFlag==0){			   
				$("#serResDiv").html(localStorage.ser_res_list);	
				locationFlag=1;
			}else{
				$('#serResDiv').empty();
				$('#serResDiv').append(localStorage.ser_res_list).trigger('create');
			}
			
			$("#achID").val("");
	
			$("#population").val("");
			$("#household").val("");
			$("#male").val("");
			$("#female").val("");
			$("#girlsUnder").val("");
			$("#boysUnder").val("");
			$("#girls").val("");
			$("#boys").val("");
			$("#dapMale").val("");
			$("#dapFemale").val("");
			$("#poorA").val("");
			$("#poorB").val("");
			$("#poorC").val("");
			$("#poorEx").val("");
			$("#ethMale").val("");
			$("#ethFemale").val("");	
			$("#serRecpent").val("");	
			$("#achPhoto").val("");				
			
			$("#ach_lat").val("");
			$("#ach_long").val("");
			
			reviewAchDisplayFlag==false;
			arrayId=-1;
			
			
			var url = "#reviewDataList";
			//$(location).attr('href',url);
			$.mobile.navigate(url);
		}	
		
	}

	
function reviewDataNext(){
	$('#btn_take_pic').hide();
	$('#btn_ach_lat_long').show();
	
	reviewAchDisplayFlag=true;
	arrayId=eval($("input[name='achReviewRad']:checked").val());
	
	var achivementRevArray2=localStorage.ach_save.split('rdrd');
	var achRevDetails=achivementRevArray2[arrayId];
	
	var achRevDetailsArray=achRevDetails.split('fdfd');
	
	//------------------
	$( "input:radio[name='plan_select'][value='"+achRevDetailsArray[0]+"']" ).attr('checked','checked');
	//$("#plan_select").val(achRevDetailsArray[0])
	
	
	$("#cbo_combo").val(achRevDetailsArray[1]);
	
	$("#achID").val(achRevDetailsArray[2]);				
	$("#population").val(achRevDetailsArray[3]);
	$("#household").val(achRevDetailsArray[4]);
	$("#male").val(achRevDetailsArray[5]);
	$("#female").val(achRevDetailsArray[6]);
	$("#girlsUnder").val(achRevDetailsArray[7]);
	$("#boysUnder").val(achRevDetailsArray[8]);
	$("#girls").val(achRevDetailsArray[9]);
	$("#boys").val(achRevDetailsArray[10]);
	$("#dapMale").val(achRevDetailsArray[11]);
	$("#dapFemale").val(achRevDetailsArray[12]);
	$("#poorA").val(achRevDetailsArray[13]);
	$("#poorB").val(achRevDetailsArray[14]);
	$("#poorC").val(achRevDetailsArray[15]);
	$("#poorEx").val(achRevDetailsArray[16]);
	$("#ethMale").val(achRevDetailsArray[17]);
	$("#ethFemale").val(achRevDetailsArray[18]);
	
	$("#serRecpent").val(achRevDetailsArray[19]);
	
	$("#achPhoto").val(achRevDetailsArray[21]);
	
	var achlat=$("#ach_lat").val(achRevDetailsArray[23]);
	var achlong=$("#ach_long").val(achRevDetailsArray[24]);
				
    var image = document.getElementById('myImageA');
    image.src = achRevDetailsArray[21];
    imagePathA = achRevDetailsArray[21];
	
	startDt=achRevDetailsArray[22]
	
	if (achRevDetailsArray[23]==0 && achRevDetailsArray[24]==0){
		$('#btn_ach_lat_long').show();
	}
	
	

	$(".errorChk").text("");
	var url = "#planList";
	//$(location).attr('href',url);
	$.mobile.navigate(url);
}



function achiveDataSubmit(){
		$("#btn_ach_submit").hide();
		
		var d = new Date();	
		var get_time=d.getTime();		

		
		latitude=$("#ach_lat").val();
		longitude=$("#ach_long").val();
		
		achPhoto=$("#achPhoto").val();

		
		if (latitude==undefined || latitude==''){
			latitude=0;
			}
		if (longitude==undefined || longitude==''){
			longitude=0;
			}
		
		if (achPhoto=='' || achPhoto==undefined){
			$(".errorChk").text("Please confirm Photo ");
			$("#btn_ach_submit").show();
		}else{		
			if(latitude==0 || longitude==0){
				$(".errorChk").text("Please confirm your location ");
				$("#btn_ach_submit").show();
			}else{				
				if (achPlanId=='' || achCBOid=='' ){
					$(".errorChk").text("New records not available");
					$("#btn_ach_submit").show();
				}else{
					//imagePathA="test"
					if (imagePathA!=""){
						$(".errorChk").text("Syncing photo..")
						imageName = localStorage.mobile_no+"_"+get_time+".jpg";						
						uploadPhotoAch(imagePathA, imageName);
					}
					
				}
			}//end check location
		}//chk photo
	}

function syncDataAch(){
	
			$.ajax({
					type: 'POST',
					url:apipath+'submitAchiveData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&ach_plan_id='+achPlanId+'&ach_cbo_id='+achCBOid+'&ach_id='+achID+'&ach_population='+achPopulation+'&ach_household='+achHousehold+'&ach_male='+achMale+'&ach_female='+achFemale+'&ach_girlsUnder='+achGirlsUnder+'&ach_boysUnder='+achBoysUnder+'&ach_girls='+achGirls+'&ach_boys='+achBoys+'&ach_dapMale='+achDapMale+'&ach_dapFemale='+achDapFemale+'&ach_poorA='+achPoorA+'&ach_poorB='+achPoorB+'&ach_poorC='+achPoorC+'&ach_poorEx='+achPoorEx+'&ach_ethMale='+achEthMale+'&ach_ethFemale='+achEthFemale+'&ach_service_recpient='+achServiceRecpt+'&latitude='+latitude+'&longitude='+longitude+'&ach_photo='+imageName+'&ach_startDt='+startDt,
					   
					   success: function(result) {
							//alert(result);
						if(result=='Success'){							
							//------------------------
							
							if (reviewAchDisplayFlag==true){					
								if (arrayId ==-1){							
										$(".errorChk").text("Review Index value Error");
								}else{	
										var achiveSavArray2=localStorage.ach_save.split('rdrd');
										//alert(achiveSavArray2.length+','+arrayId);
										achiveSavArray2.splice(arrayId,1);
										
										var achTemp2="";
										var achTempStr2="";
										for (j=0;j<achiveSavArray2.length;j++){
											accTemp2=achiveSavArray2[j];
											
											if (achTempStr2==""){
												achTempStr2=accTemp2
											}else{
												achTempStr2=achTempStr2+'rdrd'+accTemp2
												}
											
										}										
										localStorage.ach_save=achTempStr2;
									}
									
							}
							//----------------
							$("#ach_lat").val("");
							$("#ach_long").val("");
							
							$( "input:radio[name='plan_select'][value='"+achPlanId+"']" ).attr('checked','');
							$("#cbo_combo").val("");
							
							achPlanId="";
							achCBOid="";
							$(".errorChk").text('Successfully Submitted');
							$("#btn_ach_save").hide();
							$("#btn_take_pic").hide();
							$("#btn_ach_lat_long").hide();
							//$("#achlocation").val('Successfully Submited');
							
						}else if(result=='Failed4'){
							//$(".errorChk").text('Failed to Submit');
							$(".errorChk").text('Achievement ID Already Exists');									
							$("#btn_ach_submit").show();
						}else{
							$(".errorChk").text('Try again after 5 minutes');																		
							$("#btn_ach_submit").show();
							}
							
					   }//end result
			});//end ajax
	
	}


//=====================================================================================================================Water quality data

var wq_plan_id="";
var startDtWq='';

var wq_CBO_id="";
var wq_vill="";
var test_type_val="";
var type_of_wq_facility="";
var provided_by="";
var wq_ref="";
var wq_id="";

var wq_plat_condition="";
var drain_condition="";
var wp_repair="";
var chamber_condition="";
var wq_maintain_by="";
var user_w_payment="";

var wq_depth="";
var wq_static_w_l="";
var wq_first_date="";
var wq_last_date="";
var wq_analysis_date="";

var wq_appDate="";
var wq_handOvrDate="";

var wq_owner_name="";
var wq_owner_phone="";
var wq_caretaker="";
var caretakerPhone="";

var wq_select_tech="";

var wq_pota="";
var wq_delAgua="";
var wq_hach_ez_as="";
var wq_solinity_meter="";
var wq_mn_test_kit="";
var wq_test_kit_lab_test="";
var wq_tst_kit_cloride="";
var wq_tst_kit_oth="";

var wq_ttc_cfu="";
var wq_sl="";
var wq_as_ppb="";
var wq_fe_ng="";
var wq_mn_ppb="";
var wq_chl_ppt="";
var wq_turb_ntu="";
var wq_residual="";
var wq_chlorine="";
var wq_ph="";
var wq_boron="";
var wq_c_bac="";
var wq_colour="";
var wq_odor="";
var wq_nitrate="";
var wq_zinc="";
var wq_condvity="";
var wq_fluoride="";
var wq_fc="";
var wq_chloride="";

var wq_tested_at="";
var wq_iron_test="";
var wq_tw_color="";

var sw_option="";
var alt_option="";
var sw_distance="";
var ac_taken="";
var arc_patient="";

var wq_functional="";

var wq_drinking="";
var wq_cooking="";
var wq_washing="";
var wq_Others="";
var wq_all_purpose="";

var wq_potable_status="";
var wq_res_non_potable="";
var wq_no_potable_initiative_taken="";

var wq_wab_con="";
var wq_comm_con="";
var wq_total_cost="";

var wq_is_piped_W_connection="";
var wq_piped_w_sup="";

var wq_all_test_complete="";
var wq_res_n_test="";

var wq_management_committee_exist="";
var wq_management_committee_ori="";
var wq_caretaker_trained="";

var wq_sample_analysis="";

var wq_installation_done="";

var wq_photo="";

var wq_activities="";

var reviewWQDisplayFlag=false;
var reviewWqhFlag=0;



function waterQtyClick(){
	$(".errorChk").text("");
	
	if(localStorage.plan_wq==undefined || localStorage.plan_wq==""){
		$(".errorChk").text("Required Sync");
	}else{
		
		//----------------
		$("#ach_lat").val("");
		$("#ach_long").val("");
		
		//------------------		
		var url = "#planListWq";
		//$(location).attr('href',url);
		$.mobile.navigate(url);
		
		}
	}
	
function wQLocationNext(){
	
	if($("#planWqlistDiv").find("input[name='plan_select_wq']:checked").length==0){
		$(".errorChk").text("Required Plan");
	}else{
		wq_plan_id=$("input[name='plan_select_wq']:checked").val();
		wq_activities=$("#activityNameWq"+wq_plan_id).val();
		
		if (startDtWq==""){
			var now = new Date();
			var month=now.getUTCMonth()+1;
			startDtWq = now.getUTCFullYear()+ "-" + month + "-" + now.getUTCDate()+" "+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
		}
		
		$(".errorChk").text("");
		var url = "#waterData";
		$.mobile.navigate(url);
		//$(location).attr('href',url);
	}
}

//---------------------------Water quality data page 

function waterDataNext(){
		wq_CBO_id=$("#wq_cbo_combo").val();
		wq_vill=$("#wq_vill").val();
		test_type_val=$("#test_type").val();
		type_of_wq_facility=$("#type_of_wq_facility").val();
		provided_by=$("#providedBy").val();
		
		wq_ref=$("#wq_ref").val();
		wq_id=$("#wq_id").val();
		
				
		if (wq_CBO_id=="" ){
			$(".errorChk").text("Required CBO ID ");
		}else if (wq_vill=="" ){
			$(".errorChk").text("Required Village/ward/slum Name ");
		}else if (test_type_val=="" ){
			$(".errorChk").text("Required Test Type ");
		}else if (type_of_wq_facility=="" ){
			$(".errorChk").text("Required Type of Water facility ");
		}else if (provided_by=="" ){
			$(".errorChk").text("Required Supported By ");
		}else{
			
			if(test_type_val=="Pre Instalation" || test_type_val=="Monitoring" || test_type_val=="Cross Check" ){
					
					$("#ironTest").hide();
					$("#isManagement").hide();
					$("#caretakerTrained").hide();
					var url="#waterData7";
				}else{
					$("#ironTest").show();
					$("#isManagement").show();
					$("#caretakerTrained").show();					
					var url="#waterData2";
				}
								
				$(".errorChk").text("");
				$.mobile.navigate(url);
				//$(location).attr('href',url);
				
			}
	
	};	

//---------------------------Water quality data page 2  



function waterData2Next(){
		wq_plat_condition=$("#plat_condition").val();
		drain_condition=$("#drain_condition").val();
		wp_repair=$("#wp_repair").val();
		chamber_condition=$("#chamber_condition").val();
		
		wq_maintain_by=$("input[name='maintain_by']:checked").val();
		user_w_payment=$("input[name='user_w_payment']:checked").val();
		
		if (wq_maintain_by==undefined ){
			$(".errorChk").text("Required Maitained By ");
		}else if (user_w_payment==undefined ){
			$(".errorChk").text("Required user water payment ");
		}else{	
			var url="#waterData3";
			$(".errorChk").text("");
			$.mobile.navigate(url);
			//$(location).attr('href',url);
		}
	
	};	


//---------------------------Water quality data3 page 
var currentDay = "";
var wq_ins_date="";

function waterData3Next(){
		var ins_d=$("#ins_d").val();
		var ins_m=$("#ins_m").val();
		var ins_y=$("#ins_y").val();
		
		wq_depth=$("#depth").val();
		wq_static_w_l=$("#sWaterL").val();
		
		var first_d=$("#first_d").val();
		var first_m=$("#first_m").val();
		var first_y=$("#first_y").val();
		
		var last_d=$("#last_d").val();
		var last_m=$("#last_m").val();
		var last_y=$("#last_y").val();
		
		var sample_c_d=$("#sample_c_d").val();
		var sample_c_m=$("#sample_c_m").val();
		var sample_c_y=$("#sample_c_y").val();
			
		/*if(ins_d=="" || ins_m=="" || ins_y==""){
			$(".errorChk").text("Required Installation Date ");
		}else*/ 
		if (wq_depth=="" ){
			$(".errorChk").text("Required Depth ");
		}else if (first_d=="" || first_m=="" || first_y=="" ){
			$(".errorChk").text("Required Valid First Date ");
		}else if (last_d=="" || last_m=="" || last_y=="" ){
			$(".errorChk").text("Required Valid Last Date ");
		/*}else if (sample_c_d=="" || sample_c_m=="" || sample_c_y=="" ){
			$(".errorChk").text("Required Valid Sample Collection Date ");*/
		}else{
			
			var now = new Date();
			var month=now.getUTCMonth()+1;
			if (month<10){
				month="0"+month
				}
			var day=now.getUTCDate();
			if (day<10){
				day="0"+day
				}
				
			var year=now.getUTCFullYear();
			
			var currentDay = new Date(year+ "-" + month + "-" + day);	
	
			//---------------------
			wq_ins_date=ins_y+"-"+ins_m+"-"+ins_d;
						
			wq_first_date=first_y+"-"+first_m+"-"+first_d;
			wq_last_date=last_y+"-"+last_m+"-"+last_d;
			wq_analysis_date=sample_c_y+"-"+sample_c_m+"-"+sample_c_d;		
			
			var wq_ins = new Date(wq_ins_date);
			var wq_first = new Date(wq_first_date);
			var wq_last = new Date(wq_last_date);
			var wq_analysis = new Date(wq_analysis_date);
			
			var date_flag=true;
			var dateError="";
			
			if (wq_ins=='Invalid Date'){
				date_flag=false;
				dateError="Invalid installation Date "+wq_ins_date;
			}else if (wq_first=='Invalid Date'){
				date_flag=false;
				dateError="Invalid First Date "+wq_first_date;				
			}else if(wq_last=='Invalid Date'){
				date_flag=false;
				dateError="Invalid Last Date "+wq_last_date;	
			}else if(wq_analysis=='Invalid Date'){
				date_flag=false;
				dateError="Invalid Sample Collection Date "+wq_analysis_date;;	
			}
						
			//------------------------
			if (date_flag==false){				
				$(".errorChk").text(dateError);
			}else{			
					if (wq_first>currentDay){
						$(".errorChk").text("Required First Date Less Than Today");				
					}else if(wq_last>currentDay){
						$(".errorChk").text("Required Last Date Less Than Today");
					}else if(wq_analysis>currentDay){
						$(".errorChk").text("Required Sample collection Date Less Than Today");
					}else{
						if(wq_first>wq_last){
							$(".errorChk").text("Required Last Date Greater Than First Date");				
						}else{
							/*if(wq_last<wq_analysis){
								$(".errorChk").text("Required sample collection Date Less then Last Date");
							}else{*/
								$(".errorChk").text("");
								var url="#waterData4";				
								$.mobile.navigate(url);
								//$(location).attr('href',url);
								/*}*/
							  } 
							}
					}//
			}
	
	};	


//----------------------------water quality data 4
var wq_siteSelectDate="";
function waterData4Next(){
		//wq_appDate=$("#appDate").val();
		//wq_handOvrDate=$("#handOvrDate").val();
		
		var app_d=$("#app_d").val();
		var app_m=$("#app_m").val();
		var app_y=$("#app_y").val();
		
		var site_sel_d=$("#site_sel_d").val();
		var site_sel_m=$("#site_sel_m").val();
		var site_sel_y=$("#site_sel_y").val();
		
		var hnd_ovr_d=$("#hnd_ovr_d").val();
		var hnd_ovr_m=$("#hnd_ovr_m").val();
		var hnd_ovr_y=$("#hnd_ovr_y").val();
		
		
		if(app_d!="" || app_m!="" || app_y!=""){
			var now = new Date();
			var month=now.getUTCMonth()+1;
			if (month<10){
				month="0"+month
				}
			var day=now.getUTCDate();
			if (day<10){
				day="0"+day
				}
				
			var year=now.getUTCFullYear();
			
			var currentDay = new Date(year+ "-" + month + "-" + day);
			
			wq_appDate=app_y+"-"+app_m+"-"+app_d;
			wq_siteSelectDate=site_sel_y+"-"+site_sel_m+"-"+site_sel_d;
			wq_handOvrDate=hnd_ovr_y+"-"+hnd_ovr_m+"-"+hnd_ovr_d;
			
					
			var wq_app_d = new Date(wq_appDate);
			var wq_site_select_d = new Date(wq_siteSelectDate);
			var wq_hand_d = new Date(wq_handOvrDate);
			
			var date_flag=true;
			var dateError="";
			
			
			if (wq_app_d=='Invalid Date'){
				date_flag=false;
				dateError="Invalid Application Date "+wq_appDate;				
			}else if(hnd_ovr_d=="" || hnd_ovr_m=="" || hnd_ovr_y==""){
				var url="#waterData5";				
				$.mobile.navigate(url);
			}else{
				if(wq_hand_d=='Invalid Date'){
					date_flag=false;
					dateError="Invalid Handover Date "+wq_handOvrDate;
				}else if(wq_site_select_d=='Invalid Date'){
					date_flag=false;
					dateError="Invalid site Selection Date "+wq_site_select_d;
				}
			}
			
			if (date_flag==false){				
				$(".errorChk").text(dateError);
			}else{
				if (wq_app_d>currentDay){
					$(".errorChk").text("Required Application date Less than Today");				
				}else if(wq_hand_d>currentDay){
					$(".errorChk").text("Required Handover date Less Than Today");
				}else{
					if(wq_app_d>wq_hand_d){
						$(".errorChk").text("Required Handover Date greater than Application Date");
					}else{
						$(".errorChk").text("");
						var url="#waterData5";						
						//$(location).attr('href',url);
						$.mobile.navigate(url);
						}
					}
				
			}					
		}else{
			wq_siteSelectDate="";
			wq_handOvrDate="";
			var url="#waterData5";				
			$.mobile.navigate(url);
			
		}
	
}


//---------------------------Water quality data5 page 
function waterData5Next(){
		wq_owner_name=$("#ownerName").val();
		wq_owner_phone=$("#ownerPhone").val();
		
		
		wq_caretaker=$("#caretaker").val();
		caretakerPhone=$("#caretakerPhoneNo").val();
		
		
		$(".errorChk").text("");
		var url="#waterData7";				
		$.mobile.navigate(url);
		//$(location).attr('href',url);
		
	};	

  
//----------------------check waterData6 Next 
	
function waterData6Next(){
	var wq_select_tech=$("#select_tech").val();
		var url="#waterData7";
		$.mobile.navigate(url);
		//$(location).attr('href',url);
	}


//----------------------technology
function technology(){
	var tech_combo=$("#select_tech").val();
	
	if (tech_combo=="TW renovation" || tech_combo=="TW upgradation"){
		$("#tech_ttc").hide();
		$("#tech_sl").show();
		$("#tech_as").show();
		$("#tech_fe").hide();
		$("#tech_mn").hide();
		$("#tech_chl").hide();
		$("#tech_turb").hide();
		$("#tech_chlorine").hide();
		$("#tech_ph").hide();
		$("#tech_boron").hide();
		$("#tech_c_bac").hide();
		$("#tech_odor").hide();
		$("#tech_nitrate").hide();
		$("#tech_zinc").hide();
		$("#tech_condvity").hide();
		$("#tech_fluoride").hide();
	}else if(tech_combo=="Borehole"){
		$("#tech_ttc").show();
		$("#tech_sl").show();
		$("#tech_as").show();
		$("#tech_fe").show();
		$("#tech_mn").show();
		$("#tech_chl").show();
		$("#tech_turb").hide();
		$("#tech_chlorine").hide();
		$("#tech_ph").hide();
		$("#tech_boron").show();
		$("#tech_c_bac").hide();
		$("#tech_odor").hide();
		$("#tech_nitrate").hide();
		$("#tech_zinc").hide();
		$("#tech_condvity").hide();
		$("#tech_fluoride").hide();
	}else if(tech_combo=="Dugwell/ Ringwell"){
		$("#tech_ttc").show();
		$("#tech_sl").show();
		$("#tech_as").show();
		$("#tech_fe").show();
		$("#tech_mn").show();
		$("#tech_chl").hide();
		$("#tech_turb").hide();
		$("#tech_chlorine").hide();
		$("#tech_ph").hide();
		$("#tech_boron").hide();
		$("#tech_c_bac").hide();
		$("#tech_odor").hide();
		$("#tech_nitrate").hide();
		$("#tech_zinc").hide();
		$("#tech_condvity").hide();
		$("#tech_fluoride").hide();
	}else if(tech_combo=="PSF"){
		$("#tech_ttc").show();
		$("#tech_sl").show();
		$("#tech_as").show();
		$("#tech_fe").hide();
		$("#tech_mn").show();
		$("#tech_chl").hide();
		$("#tech_turb").show();
		$("#tech_chlorine").hide();
		$("#tech_ph").hide();
		$("#tech_boron").hide();
		$("#tech_c_bac").show();
		$("#tech_odor").hide();
		$("#tech_nitrate").show();
		$("#tech_zinc").hide();
		$("#tech_condvity").hide();
		$("#tech_fluoride").hide();
	}else if(tech_combo=="RWH"){
		$("#tech_ttc").show();
		$("#tech_sl").show();
		$("#tech_as").hide();
		$("#tech_fe").hide();
		$("#tech_mn").hide();
		$("#tech_chl").hide();
		$("#tech_turb").hide();
		$("#tech_chlorine").hide();
		$("#tech_ph").show();
		$("#tech_boron").hide();
		$("#tech_c_bac").hide();
		$("#tech_odor").hide();
		$("#tech_nitrate").hide();
		$("#tech_zinc").hide();
		$("#tech_condvity").hide();
		$("#tech_fluoride").hide();
	}else if(tech_combo=="GFS"){
		$("#tech_ttc").show();
		$("#tech_sl").show();
		$("#tech_as").hide();
		$("#tech_fe").hide();
		$("#tech_mn").hide();
		$("#tech_chl").hide();
		$("#tech_turb").show();
		$("#tech_chlorine").hide();
		$("#tech_ph").show();
		$("#tech_boron").hide();
		$("#tech_c_bac").hide();
		$("#tech_odor").hide();
		$("#tech_nitrate").show();
		$("#tech_zinc").hide();
		$("#tech_condvity").hide();
		$("#tech_fluoride").hide();
	}else if(tech_combo=="IFG"){
		$("#tech_ttc").show();
		$("#tech_sl").show();
		$("#tech_as").hide();
		$("#tech_fe").show();
		$("#tech_mn").hide();
		$("#tech_chl").hide();
		$("#tech_turb").show();
		$("#tech_chlorine").hide();
		$("#tech_ph").hide();
		$("#tech_boron").hide();
		$("#tech_c_bac").hide();
		$("#tech_odor").hide();
		$("#tech_nitrate").hide();
		$("#tech_zinc").hide();
		$("#tech_condvity").hide();
		$("#tech_fluoride").hide();	
	}else if(tech_combo=="UWP"){
		$("#tech_ttc").show();
		$("#tech_sl").show();
		$("#tech_as").show();
		$("#tech_fe").hide();
		$("#tech_mn").hide();
		$("#tech_chl").hide();
		$("#tech_turb").hide();
		$("#tech_chlorine").hide();
		$("#tech_ph").hide();
		$("#tech_boron").hide();
		$("#tech_c_bac").hide();
		$("#tech_odor").hide();
		$("#tech_nitrate").hide();
		$("#tech_zinc").hide();
		$("#tech_condvity").hide();
		$("#tech_fluoride").hide();
		
		}
	
	
	}


//---------------------------Water quality data7 page 


function waterData7Next(){
		
		wq_select_tech=$("#select_tech").val();
		
		if($("#typeOfTestKit").find("input[type=checkbox]:checked").length==0){
			$(".errorChk").text("Required Type of Test kit");
		}else{
			wq_pota=$("input[name='pota']:checked").val();
			wq_delAgua=$("input[name='delAgua']:checked").val();
			wq_hach_ez_as=$("input[name='hach_ez_as']:checked").val();
			wq_solinity_meter=$("input[name='solinity_meter']:checked").val();
			wq_mn_test_kit=$("input[name='mn_test_kit']:checked").val();
			wq_test_kit_lab_test=$("input[name='test_kit_lab_test']:checked").val();
			wq_tst_kit_cloride=$("input[name='tst_kit_cloride']:checked").val();
			wq_tst_kit_oth=$("input[name='tst_kit_oth']:checked").val();
			
			
			wq_ttc_cfu=$("#ttc_cfu").val();
			wq_sl=$("#sl").val();
			wq_as_ppb=$("#as_ppb").val();
			wq_fe_ng=$("#fe_ng").val();
			wq_mn_ppb=$("#mn_ppb").val();
			wq_chl_ppt=$("#chl_ppt").val();
			wq_turb_ntu=$("#turb_ntu").val();
			wq_residual=$("#residual").val();
			wq_chlorine=$("#chlorine").val();
			wq_ph=$("#ph").val();
			wq_boron=$("#boron").val();
			wq_c_bac=$("#c_bac").val();
			wq_colour=$("#colour").val();
			wq_odor=$("#odor").val();
			wq_nitrate=$("#nitrate").val();
			wq_zinc=$("#zinc").val();
			wq_condvity=$("#condvity").val();
			wq_fluoride=$("#fluoride").val();			
			wq_fc=$("#select_fc").val();
			
						
			$(".errorChk").text("");
			var url = "#waterData8";
			$.mobile.navigate(url);
			//$(location).attr('href',url);
		}
		
	};	



//---------------------- waterData8 Next

	
	$("#waterData9").hide();
function waterData8Next(){
		wq_tested_at=$("input[name='tested_at']:checked").val();
		wq_iron_test=$("input[name='iron_test']:checked").val();		
		wq_tw_color=$("input[name='tw_painter']:checked").val();
		
		if(wq_tested_at==undefined){
			$(".errorChk").text("Required Tested At");
		}
		else if(wq_tw_color==undefined){
			$(".errorChk").text("Required TW painter");
		}
		else{
			var iron_test_flag=true;
			
			if(test_type_val=="New Instalation" || test_type_val=="Renovation Instalation"){
				if(wq_iron_test==undefined){
					$(".errorChk").text("Required iron test");
					iron_test_flag=false;
				}
			}
			
			if (iron_test_flag==true){
				if(wq_tw_color=="Red" ){
					var url="#waterData9";
				}else{
					var url="#waterData10";
				}
				$.mobile.navigate(url);
				//$(location).attr('href',url);
				
			}
			
		}
		
	}
	


//----------------------------water quality data 9 

	
function waterData9Next(){
	sw_option=$("input[name='sw_option']:checked").val();
	alt_option=$("input[name='alt_option']:checked").val();
	sw_distance=$("input[name='sw_distance']:checked").val();
	ac_taken=$("input[name='ac_taken']:checked").val();
	
	arc_patient_yn=$("#arc_patient_yn").val();
	arc_patient=$("#arc_patient").val();
	
	if(sw_option==undefined){
			$(".errorChk").text("Required Safe water option");
	}else if(alt_option==undefined){
		$(".errorChk").text("Required alt option");
	}else if(sw_distance==undefined){
		$(".errorChk").text("Required TW safe water distance");
	}else if(ac_taken==undefined){
		$(".errorChk").text("Required action taken");
	}else if (arc_patient_yn=="YES" && arc_patient==""){
			$(".errorChk").text("Required How many patient");
	}else{
		if(arc_patient==""){
			arc_patient=0;
			}
		$(".errorChk").text("");
		var url="#waterData9_1";
		$.mobile.navigate(url);
		//$(location).attr('href',url);
	}
}

var wq_san_ins="";
var wq_inspect_date="";
var wq_san_risk_sc="";

function waterData9_1Next(){
		wq_san_ins=$("#san_ins_yn").val();		
		
		var insp_d=$("#insp_d").val();
		var insp_m=$("#insp_m").val();
		var insp_y=$("#insp_y").val();		
		
		wq_san_risk_sc=$("#san_risk_sc").val();
		
		//---------------------
		wq_inspect_date=insp_y+"-"+insp_m+"-"+insp_d;		
		var wq_insp = new Date(wq_inspect_date);		
		 
		var date_flag=true;
		var dateError="";
		
		if (wq_insp=='Invalid Date'){
			date_flag=false;
			dateError="Invalid inspection Date "+wq_inspect_date;
		}
		
		if (date_flag==false){				
			$(".errorChk").text(dateError);
		}else{			
			$(".errorChk").text("");
			var url="#waterData10";
			$.mobile.navigate(url);
			//$(location).attr('href',url);
		}
		
}

//----------------------------water quality data 10 check


function waterData10Next(){
	//alert("ok");
	wq_functional=$("input[name='functionality']:checked").val();
	
	
	wq_drinking=$("input[name='drinking']:checked").val();
	wq_cooking=$("input[name='cooking']:checked").val();
	wq_washing=$("input[name='washing']:checked").val();
	wq_Others=$("input[name='others']:checked").val();
	wq_all_purpose=$("input[name='all_purpose']:checked").val();
	
	if(wq_functional==undefined){
			$(".errorChk").text("Required functionality");
	}else if($("#useOfChk").find("input[type=checkbox]:checked").length==0){
		$(".errorChk").text("Select One use of");
	}else{
		$(".errorChk").text("");
		var url="#waterData11";
		}
	
	$.mobile.navigate(url);
	//$(location).attr('href',url);
	}

//----------------------------water quality data 11

		
function waterData11Next(){
	if($("#potableStatus").find("input[name=potable_st]:checked").length==0){
		$(".errorChk").text("Required Potable Status");
	}else{
		wq_potable_status=$("input[name='potable_st']:checked").val();
		wq_res_non_potable=$("#reason_non_potable").val();
		wq_no_potable_initiative_taken=$("#non_potable_ini").val();
		
		if(test_type_val=="Pre Instalation" || test_type_val=="Monitoring" || test_type_val=="Cross Check" ){
			var url="#waterData13";
		}else{
			var url="#waterData12";
		}
					
		$(".errorChk").text("");
		$.mobile.navigate(url);
		//$(location).attr('href',url);
		
	}
	
}

var wq_do_user_pay="";
//----------------------------water quality data 12
function waterData12Next(){
		wq_wab_con=$("#wab_con").val();
		wq_comm_con=$("#comm_con").val();
		wq_total_cost=$("#total_cost").val();
		
		wq_do_user_pay=$("input[name='do_user_pay']:checked").val();		
		wq_is_piped_W_connection=$("input[name='piped_w_conn']:checked").val();
		wq_piped_w_sup=$("#piped_w_sup").val();
		
		if(wq_wab_con==""){
			$(".errorChk").text("Required WAB Contribution");
		}else if(wq_comm_con==""){
			$(".errorChk").text("Required Community Contribution");
		}else if(wq_total_cost==""){
			$(".errorChk").text("Required Total Cost");
		}else if(wq_is_piped_W_connection==undefined){
			$(".errorChk").text("Required is piped water connection");
		}else{
						
			$(".errorChk").text("");
			var url="#waterData13";
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			}
		
}


//----------------------------water quality data 13 

function waterData13Next(){
		wq_all_test_complete=$("input[name='all_test_complt']:checked").val();
		wq_res_n_test=$("#res_n_test").val();
		
		if(wq_all_test_complete==undefined){
			$(".errorChk").text("Required all test complete");
		}else{
			$(".errorChk").text("");
			var url="#waterData14";
			$.mobile.navigate(url);
			//$(location).attr('href',url);
		}
}

var wq_arc_patient_yn='';
function ChkArsenicPatient(){
	wq_arc_patient_yn=$("#arc_patient_yn").val();
	
	if (wq_arc_patient_yn=="YES"){		
		$("#tr_assenic_patient").show();
	}else{
		$("#arc_patient").val("")
		$("#tr_assenic_patient").hide();
		}
	
	}
//----------------------------water quality data 14 


function WaterQDataSave(){
		
		$(".errorChk").text("");
		$("#btn_wq_save").hide();
		
		
		wq_management_committee_exist=$("input[name='m_comm_ext']:checked").val();
		wq_management_committee_not_exist=$("input[name='isNotManagement']:checked").val();
		wq_management_committee_ori=$("input[name='m_comm_ori_complt']:checked").val();
		wq_management_committee_not_ori=$("input[name='m_comm_ori_no']:checked").val();
		wq_caretaker_trained=$("input[name='caretaker_train']:checked").val();
		wq_caretaker_trained_not=$("input[name='caretaker_train_no']:checked").val();
		
		wq_sample_analysis=$("#smpl_analy").val();
		wq_renovation_type=$("input[name='renovation_done']:checked").val();
		wq_installation_done=$("input[name='install_done']:checked").val();
		
					
		
		if(wq_installation_done==undefined){
			$(".errorChk").text("Required installation Done");
			$("#btn_wq_save").show();
		}else if(wq_sample_analysis==""){
			$(".errorChk").text("Required Sample Analysis");
			$("#btn_wq_save").show();
		}else{
			
			var management_caretaker_flag=true;
			
			if(test_type_val=="New Instalation" || test_type_val=="Renovation Instalation"){
				if(wq_management_committee_exist==undefined){
					$(".errorChk").text("Required management committee exist");
					$("#btn_wq_save").show();
				}else if(wq_caretaker_trained==undefined){
					$(".errorChk").text("Required caretaker trained");
					$("#btn_wq_save").show();
					management_caretaker_flag=false;
				}
			}
			
			
			if (management_caretaker_flag==true){
		
				if(wq_potable_status=="Potable"){
					$("#reason_non_potable").val("");
					$("#non_potable_ini").val("");
					
					wq_res_non_potable="";
					wq_no_potable_initiative_taken="";
				}
				
				if(wq_all_test_complete=="YES"){
					$("#res_n_test").val("");
					wq_res_n_test="";
					}
							
			
				if(test_type_val=="Pre Instalation" || test_type_val=="Monitoring" || test_type_val=="Cross Check"){
					
					/*wq_siteSelectDate="";
					wq_ins_date="";
					wq_san_ins="";
					wq_inspect_date="";
					wq_san_risk_sc="";*/
									
					wq_plat_condition="";
					drain_condition="";
					wp_repair="";
					chamber_condition="";
					wq_maintain_by="";
					user_w_payment="";
					
					wq_depth="";
					wq_static_w_l="";
					wq_first_date="";
					wq_last_date="";
					wq_analysis_date="";
					
					wq_appDate="";
					wq_handOvrDate="";
					
	
					wq_wab_con="";
					wq_comm_con="";
					wq_total_cost="";
					
					wq_do_user_pay="";
					wq_is_piped_W_connection="";
					wq_piped_w_sup="";
					
					if(wq_is_piped_W_connection=="NO"){
						$("#piped_w_sup").val("");
						wq_piped_w_sup="";
					}
					
					
					if (wq_iron_test==undefined){
						wq_iron_test="";
						}
				
					if(wq_management_committee_exist==undefined){
					wq_management_committee_exist="";
					}
				
					if(wq_management_committee_not_exist==undefined){
						wq_management_committee_not_exist="";
						}
					
					if(wq_caretaker_trained==undefined){
						wq_caretaker_trained="";
						}
					
					if(wq_management_committee_ori==undefined){
						wq_management_committee_ori="";
						}
					
					if(wq_management_committee_not_ori==undefined){
						wq_management_committee_not_ori="";
						}
					
					if(wq_management_committee_exist=="NO"){
						wq_management_committee_ori="";
						$( "input:radio[name='m_comm_ori_complt'][value='"+wq_management_committee_ori+"']" ).attr('checked','');
					}else{
						wq_management_committee_not_exist="";
						$( "input:radio[name='isNotManagement'][value='"+wq_management_committee_not_exist+"']" ).attr('checked','');
						
					}
					
					if(wq_management_committee_ori=="YES"){
						wq_management_committee_not_ori="";
						$( "input:radio[name='m_comm_ori_no'][value='"+wq_management_committee_ori+"']" ).attr('checked','');
					}
					
					if(wq_caretaker_trained_not==undefined){
						wq_caretaker_trained_not="";
						}
					
					if(wq_caretaker_trained=="NO"){
							wq_caretaker_trained_not="";
							$( "input:radio[name='m_comm_ori_complt'][value='"+wq_caretaker_trained_not+"']" ).attr('checked','');
						}
					
					
					
					$("#plat_condition").val("");
					$("#drain_condition").val("");
					$("#wp_repair").val("");
					$("#chamber_condition").val("");
					
					$( "input:radio[name='maintain_by'][value='"+wq_maintain_by+"']" ).attr('checked','');
					
					
					$("#depth").val("");
					$("#sWaterL").val("");
					$("#fstDate").val("");
					$("#lastDate").val("");
					$("#aDate").val("");
					
					$("#appDate").val("");
					$("#handOvrDate").val("");
					
					
					
					$("#wab_con").val("");
					$("#comm_con").val("");
					$("#total_cost").val("");
					$( "input:radio[name='piped_w_conn'][value='"+wq_is_piped_W_connection+"']" ).attr('checked','');
					$("#piped_w_sup").val("");
				
				}
			}
			
			if(wq_tw_color=="Green" || wq_tw_color=="NA" ){
				
				sw_option="";
				alt_option="";
				sw_distance="";
				ac_taken="";
				
				arc_patient_yn="";
				arc_patient="";
				
				$( "input:radio[name='sw_option'][value='"+sw_option+"']" ).attr('checked','');
				$( "input:radio[name='alt_option'][value='"+alt_option+"']" ).attr('checked','');
				$( "input:radio[name='sw_distance'][value='"+sw_distance+"']" ).attr('checked','');
				$( "input:radio[name='ac_taken'][value='"+ac_taken+"']" ).attr('checked','');
				
				$("#arc_patient_yn").val("");
				$("#arc_patient").val("");
				
			}
			
			wq_photo=$("#wq_photo").val();
			
			latitudewq=$("#wq_lat").val();
			longitudewq=$("#wq_long").val();
			
			if (wq_photo=="" || wq_photo==undefined){
				$(".errorChk").text("Please confirm Photo");
				$("#btn_wq_submit").show();
			}else{	
				/*if(latitudewq==0 || longitudewq==0){
						$(".errorChk").text("Please confirm your location");
						$("#btn_wq_submit").show();
					}else{*/
			
						waterQualitySave=wq_plan_id+'fdfd'+wq_CBO_id+'fdfd'+test_type_val+'fdfd'+provided_by+'fdfd'+wq_ref+'fdfd'+wq_id+'fdfd'+wq_plat_condition+'fdfd'+drain_condition+'fdfd'+wp_repair+'fdfd'+chamber_condition+'fdfd'+wq_maintain_by+'fdfd'+user_w_payment+'fdfd'+wq_depth+'fdfd'+wq_static_w_l+'fdfd'+wq_first_date+'fdfd'+wq_last_date+'fdfd'+wq_analysis_date+'fdfd'+wq_appDate+'fdfd'+wq_handOvrDate+'fdfd'+wq_owner_name+'fdfd'+wq_owner_phone+'fdfd'+wq_caretaker+'fdfd'+caretakerPhone+'fdfd'+
				wq_select_tech+'fdfd'+wq_pota+'fdfd'+wq_delAgua+'fdfd'+wq_hach_ez_as+'fdfd'+wq_solinity_meter+'fdfd'+wq_mn_test_kit+'fdfd'+wq_test_kit_lab_test+'fdfd'+wq_tst_kit_cloride+'fdfd'+wq_tst_kit_oth+'fdfd'+wq_ttc_cfu+'fdfd'+wq_sl+'fdfd'+wq_as_ppb+'fdfd'+wq_fe_ng+'fdfd'+wq_mn_ppb+'fdfd'+wq_chl_ppt+'fdfd'+wq_turb_ntu+'fdfd'+wq_chlorine+'fdfd'+wq_ph+'fdfd'+wq_boron+'fdfd'+wq_c_bac+'fdfd'+wq_odor+'fdfd'+wq_nitrate+'fdfd'+wq_zinc+'fdfd'+wq_condvity+'fdfd'+wq_fluoride+'fdfd'+wq_tested_at+'fdfd'+wq_iron_test+'fdfd'+wq_tw_color+'fdfd'+sw_option+'fdfd'+alt_option+'fdfd'+sw_distance+'fdfd'+ac_taken+'fdfd'+arc_patient+'fdfd'+wq_functional+'fdfd'+wq_drinking+'fdfd'+wq_cooking+'fdfd'+wq_washing+'fdfd'+wq_Others+'fdfd'+wq_all_purpose+'fdfd'+wq_potable_status+'fdfd'+wq_res_non_potable+'fdfd'+wq_no_potable_initiative_taken+'fdfd'+wq_wab_con+'fdfd'+wq_comm_con+'fdfd'+wq_total_cost+'fdfd'+wq_is_piped_W_connection+'fdfd'+wq_piped_w_sup+'fdfd'+wq_all_test_complete+'fdfd'+wq_res_n_test+'fdfd'+wq_management_committee_exist+'fdfd'+wq_management_committee_ori+'fdfd'+wq_caretaker_trained+'fdfd'+wq_sample_analysis+'fdfd'+wq_installation_done+'fdfd'+wq_photo+'fdfd'+wq_activities+'fdfd'+startDtWq+'fdfd'+latitudewq+'fdfd'+longitudewq+'fdfd'+wq_vill+'fdfd'+type_of_wq_facility+'fdfd'+arc_patient_yn+'fdfd'+wq_san_ins+'fdfd'+wq_inspect_date+'fdfd'+wq_san_risk_sc+'fdfd'+wq_ins_date+'fdfd'+wq_siteSelectDate+'fdfd'+wq_residual+'fdfd'+wq_colour+'fdfd'+wq_fc+'fdfd'+wq_management_committee_not_exist+'fdfd'+wq_management_committee_not_ori+'fdfd'+wq_caretaker_trained_not+'fdfd'+wq_renovation_type
				
						//alert(waterQualitySave);
						
						if (wq_plan_id=='' || wq_CBO_id==''){
							$(".errorChk").text("New records not available");
							$("#btn_wq_save").show();
						}else{
							
							waterQStr=localStorage.water_q_save;		
							var addFlag=true;			
							
							if (waterQStr==undefined || waterQStr==''){			
								localStorage.water_q_save=waterQualitySave
							}else{
								var waterQSavArray=waterQStr.split('rdrd');
								
								if (reviewWQDisplayFlag==true){					
									if (arrayIdWq ==-1){							
											$(".errorChk").text("Review Index value Error");
											$("#btn_wq_save").show();
									}else{
										waterQSavArray[arrayIdWq]=waterQualitySave
										
										var wqTemp="";
										var wqTempStr="";
										for (i=0;i<waterQSavArray.length;i++){
											wqqTemp=waterQSavArray[i]
											
											if (wqTempStr==""){
												wqTempStr=wqqTemp
											}else{
												wqTempStr=wqTempStr+'rdrd'+wqqTemp
												}
											
										}
										if (wqTempStr==""){
											$(".errorChk").text("Review Index Error" );
											$("#btn_wq_save").show();
										}else{
											localStorage.water_q_save=wqTempStr;
											}
										
										}
								}else{				
									if (waterQSavArray.length >= 10){
										addFlag=false;					
									}else{
										localStorage.water_q_save=waterQStr+'rdrd'+waterQualitySave
										
									}
								}
							}
							
							if (addFlag==false){
								$(".errorChk").text("Maximum 10 records allowed to be saved for review");
								$("#btn_wq_save").show();
							}else{
								wq_plan_id="";
								wq_CBO_id=="";
								
								reviewWQDisplayFlag==false;
								arrayIdWq=-1;
								
								$(".errorChk").text("Successfully saved for review");
								$("#btn_take_wq_pic").hide();
								$("#btn_wq_lat_long").hide();
								//location.reload();
								}
						}
			
	//-------------
				/*}*/
		}
	//---------
	}
}

function deleteWqReview(){	
		arrayIdWq=eval($("input[name='wqReviewRad']:checked").val());
		
		if (arrayIdWq ==undefined){							
				$(".errorChk").text("Select a Record");
				
		}else{
				var waterqSavArray3=localStorage.water_q_save.split('rdrd');
				
				waterqSavArray3.splice(arrayIdWq,1);
				
				var wqTemp3="";
				var wqTempStr3="";
				for (n=0;n<waterqSavArray3.length;n++){
					wqTemp3=waterqSavArray3[n];
					
					if (wqTempStr3==""){
						wqTempStr3=wqTemp3
					}else{
						wqTempStr3=wqTempStr3+'rdrd'+wqTemp3
						}
					
				}				
				localStorage.water_q_save=wqTempStr3;				
				
				var url = "#reportType";
				$.mobile.navigate(url);
				//$(location).attr('href',url);
				location.reload();
			}
	
	}
//Review Data List Water Quality
function reviewWaterQData(){
		//listOfReviewData='';
		var waterQuality=localStorage.water_q_save
		
		if (waterQuality==undefined || waterQuality==''){
			$(".errorChk").text("Review data not available");
		}else{
			var waterQSaveArray=waterQuality.split('rdrd');
			
			var waterSaveCount=waterQSaveArray.length;
			
			var wqArray=[];
			var reviewWqDataDiv="";
			var planIDWq="";
			var cboIDWq="";
			var WqActivities="";
			
			reviewWqDataDiv='<ul data-role="listview" data-inset="true"><li style="background-color:#F2F2F2;">Review</li><li class="ui-field-contain"><fieldset data-role="controlgroup">'
			for (m=0;m<waterSaveCount;m++){
				wqArray=waterQSaveArray[m].split('fdfd');
				planIDWq=wqArray[0];
				//cboIDWq=wqArray[1];
				WqActivities=wqArray[78];
				
				reviewWqDataDiv=reviewWqDataDiv+'<input type="radio" name="wqReviewRad"  id="wqReviewRad'+m+'"  value="'+m+'"/> <label for="wqReviewRad'+m+'">'+WqActivities+'-'+planIDWq+'</label>'
				
				}
			
			reviewWqDataDiv=reviewWqDataDiv+'</fieldset></li></ul>'
			
			if (reviewWqhFlag==0){
				$("#reviewWqList").html(reviewWqDataDiv);
				reviewWqhFlag=1;
			}else{
				$('#reviewWqList').empty();
				$('#reviewWqList').append(reviewWqDataDiv).trigger('create');
				}
			
			//-----------------------------
			reviewWQDisplayFlag==false;
			arrayIdWq=-1;
			
			$(".errorChk").text("");
			var url = "#reviewWqDataList";
			$.mobile.navigate(url);
			//$(location).attr('href',url);
			
		}	
		
	}

	
function reviewWqDataNext(){
	$('#btn_wq_lat_long').hide();
	$('#btn_take_wq_pic').show();
	
	
	if($("#reviewWqList").find("input[name=wqReviewRad]:checked").length==0){
		$(".errorChk").text("Select a Record");
	}else{
	
		reviewWQDisplayFlag=true;
		arrayIdWq=eval($("input[name='wqReviewRad']:checked").val());
		
		
		
		var waterQRevArray2=localStorage.water_q_save.split('rdrd');
		var waterQRevDetails=waterQRevArray2[arrayIdWq]; 
		
		var waterQRevDetailsArray=waterQRevDetails.split('fdfd');
		
		
		//------------------
		$( "input:radio[name='plan_select_wq'][value='"+waterQRevDetailsArray[0]+"']" ).attr('checked','checked');
		//$("#plan_select").val(achRevDetailsArray[0])
		
		$("#wq_cbo_combo").val(waterQRevDetailsArray[1]);
		$("#test_type").val(waterQRevDetailsArray[2]);
		$("#providedBy").val(waterQRevDetailsArray[3]);
		
		$("#wq_ref").val(waterQRevDetailsArray[4]);
		$("#wq_id").val(waterQRevDetailsArray[5]);
		//---------------------------------------------------
		$("#plat_condition").val(waterQRevDetailsArray[6]);
		$("#drain_condition").val(waterQRevDetailsArray[7]);
		$("#wp_repair").val(waterQRevDetailsArray[8]);
		$("#chamber_condition").val(waterQRevDetailsArray[9]);
		
		$( "input:radio[name='maintain_by'][value='"+waterQRevDetailsArray[10]+"']" ).attr('checked','checked');
		$( "input:radio[name='user_w_payment'][value='"+waterQRevDetailsArray[11]+"']" ).attr('checked','checked');
		//---------------------------------------------------------------------------------------------------------------
		
		$("#depth").val(waterQRevDetailsArray[12]);
		$("#sWaterL").val(waterQRevDetailsArray[13]);
		
		var first_date_array=waterQRevDetailsArray[14].split("-");
		
		$("#first_d").val(first_date_array[2]);
		$("#first_m").val(first_date_array[1]);
		$("#first_y").val(first_date_array[0]);
		
		var last_date_array=waterQRevDetailsArray[15].split("-");
		$("#last_d").val(last_date_array[2]);
		$("#last_m").val(last_date_array[1]);
		$("#last_y").val(last_date_array[0]);
		
		var sample_date_array=waterQRevDetailsArray[16].split("-");
		$("#sample_c_d").val(sample_date_array[2]);
		$("#sample_c_m").val(sample_date_array[1]);
		$("#sample_c_y").val(sample_date_array[0]);
		

		
		var app_date_array=waterQRevDetailsArray[17].split("-");		
		$("#app_d").val(app_date_array[2]);
		$("#app_m").val(app_date_array[1]);
		$("#app_y").val(app_date_array[0]);
		
		var hand_date_array=waterQRevDetailsArray[18].split("-");
		$("#hnd_ovr_d").val(hand_date_array[2]);
		$("#hnd_ovr_m").val(hand_date_array[1]);
		$("#hnd_ovr_y").val(hand_date_array[0]);
		
		//------------------------------------------------------------
		$("#ownerName").val(waterQRevDetailsArray[19]);
		$("#ownerPhone").val(waterQRevDetailsArray[20]);		
		$("#caretaker").val(waterQRevDetailsArray[21]);
		$("#caretakerPhoneNo").val(waterQRevDetailsArray[22]);
		
		$("#select_tech").val(waterQRevDetailsArray[23]);
		
		$( "input:checkbox[name='pota'][value='"+waterQRevDetailsArray[24]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='delAgua'][value='"+waterQRevDetailsArray[25]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='hach_ez_as'][value='"+waterQRevDetailsArray[26]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='solinity_meter'][value='"+waterQRevDetailsArray[27]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='mn_test_kit'][value='"+waterQRevDetailsArray[28]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='test_kit_lab_test'][value='"+waterQRevDetailsArray[29]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='tst_kit_cloride'][value='"+waterQRevDetailsArray[30]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='tst_kit_oth'][value='"+waterQRevDetailsArray[31]+"']" ).attr('checked','checked');
		
		
		$("#ttc_cfu").val(waterQRevDetailsArray[32]);
		$("#sl").val(waterQRevDetailsArray[33]);
		$("#as_ppb").val(waterQRevDetailsArray[34]);
		$("#fe_ng").val(waterQRevDetailsArray[35]);
		$("#mn_ppb").val(waterQRevDetailsArray[36]);
		$("#chl_ppt").val(waterQRevDetailsArray[37]);
		$("#turb_ntu").val(waterQRevDetailsArray[38]);
		$("#chlorine").val(waterQRevDetailsArray[39]);
		$("#ph").val(waterQRevDetailsArray[40]);
		$("#boron").val(waterQRevDetailsArray[41]);
		$("#c_bac").val(waterQRevDetailsArray[42]);
		$("#odor").val(waterQRevDetailsArray[43]);
		$("#nitrate").val(waterQRevDetailsArray[44]);
		$("#zinc").val(waterQRevDetailsArray[45]);
		$("#condvity").val(waterQRevDetailsArray[46]);
		$("#fluoride").val(waterQRevDetailsArray[47]);
		
		$( "input:radio[name='tested_at'][value='"+waterQRevDetailsArray[48]+"']" ).attr('checked','checked');
		$( "input:radio[name='iron_test'][value='"+waterQRevDetailsArray[49]+"']" ).attr('checked','checked');
		$( "input:radio[name='tw_painter'][value='"+waterQRevDetailsArray[50]+"']" ).attr('checked','checked');
		
		$( "input:radio[name='sw_option'][value='"+waterQRevDetailsArray[51]+"']" ).attr('checked','checked');
		$( "input:radio[name='alt_option'][value='"+waterQRevDetailsArray[52]+"']" ).attr('checked','checked');
		$( "input:radio[name='sw_distance'][value='"+waterQRevDetailsArray[53]+"']" ).attr('checked','checked');
		$( "input:radio[name='ac_taken'][value='"+waterQRevDetailsArray[54]+"']" ).attr('checked','checked');
		
		$("#arc_patient").val(waterQRevDetailsArray[55]);
		
		$( "input:radio[name='functionality'][value='"+waterQRevDetailsArray[56]+"']" ).attr('checked','checked');
		
		$( "input:checkbox[name='drinking'][value='"+waterQRevDetailsArray[57]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='cooking'][value='"+waterQRevDetailsArray[58]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='washing'][value='"+waterQRevDetailsArray[59]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='others'][value='"+waterQRevDetailsArray[60]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='all_purpose'][value='"+waterQRevDetailsArray[61]+"']" ).attr('checked','checked');
		
		$( "input:radio[name='potable_st'][value='"+waterQRevDetailsArray[62]+"']" ).attr('checked','checked');
		
		$("#reason_non_potable").val(waterQRevDetailsArray[63]);
		$("#non_potable_ini").val(waterQRevDetailsArray[64]);
		
		$("#wab_con").val(waterQRevDetailsArray[65]);
		$("#comm_con").val(waterQRevDetailsArray[66]);
		$("#total_cost").val(waterQRevDetailsArray[67]);
		
		$( "input:radio[name='piped_w_conn'][value='"+waterQRevDetailsArray[68]+"']" ).attr('checked','checked');
		$("#piped_w_sup").val(waterQRevDetailsArray[69]);
		
		$( "input:radio[name='all_test_complt'][value='"+waterQRevDetailsArray[70]+"']" ).attr('checked','checked');
		$("#res_n_test").val(waterQRevDetailsArray[71]);
		
		$( "input:radio[name='m_comm_ext'][value='"+waterQRevDetailsArray[72]+"']" ).attr('checked','checked');
		$( "input:radio[name='m_comm_ori_complt'][value='"+waterQRevDetailsArray[73]+"']" ).attr('checked','checked');
		$( "input:radio[name='caretaker_train'][value='"+waterQRevDetailsArray[74]+"']" ).attr('checked','checked');
		
		
		$("#smpl_analy").val(waterQRevDetailsArray[75]);
		
		$( "input:radio[name='install_done'][value='"+waterQRevDetailsArray[76]+"']" ).attr('checked','checked');
		
		$("#wq_photo").val(waterQRevDetailsArray[77]);
		
		latitudewq=$("#wq_lat").val(waterQRevDetailsArray[80]);
		longitudewq=$("#wq_long").val(waterQRevDetailsArray[81]);
		
		$("#wq_vill").val(waterQRevDetailsArray[82]);
		$("#type_of_wq_facility").val(waterQRevDetailsArray[83]);
		
		$("#arc_patient_yn").val(waterQRevDetailsArray[84]);
		
		$("#san_ins_yn").val(waterQRevDetailsArray[85]);
			
		var sanInspecDate=waterQRevDetailsArray[86].split("-");
		$("#insp_d").val(sanInspecDate[2]);
		$("#insp_m").val(sanInspecDate[1]);
		$("#insp_y").val(sanInspecDate[0]);
		
				
		$("#san_risk_sc").val(waterQRevDetailsArray[87]);
		
		var installationDate=waterQRevDetailsArray[88].split("-");
		$("#ins_d").val(installationDate[2]);
		$("#ins_m").val(installationDate[1]);
		$("#ins_y").val(installationDate[0]);
		
		var selectionDate=waterQRevDetailsArray[89].split("-");
		$("#site_sel_d").val(selectionDate[2]);
		$("#site_sel_m").val(selectionDate[1]);
		$("#site_sel_y").val(selectionDate[0]);
		
		
		$("#residual").val(waterQRevDetailsArray[90]);
		$("#colour").val(waterQRevDetailsArray[91]);
		$("#select_fc").val(waterQRevDetailsArray[92]);
		
		$( "input:radio[name='isNotManagement'][value='"+waterQRevDetailsArray[93]+"']" ).attr('checked','checked');
		$( "input:radio[name='m_comm_ori_no'][value='"+waterQRevDetailsArray[94]+"']" ).attr('checked','checked');
		$( "input:radio[name='caretaker_train_no'][value='"+waterQRevDetailsArray[95]+"']" ).attr('checked','checked');
		$( "input:radio[name='renovation_done'][value='"+waterQRevDetailsArray[96]+"']" ).attr('checked','checked');
		
		
		imagePathW = waterQRevDetailsArray[77];
		
		var image = document.getElementById('myImageW');
	    image.src = waterQRevDetailsArray[77];
		
		startDtWq = waterQRevDetailsArray[79];
		//-------------------------------------show
		var chk_potable_st=$("input[name='potable_st']:checked").val();
		
		if(waterQRevDetailsArray[77]!=''){
			$('#btn_take_wq_pic').hide();
		}
		
		if (waterQRevDetailsArray[80]==0 && waterQRevDetailsArray[81]==0){
			$('#btn_wq_lat_long').show();
			}
		
		
		if (waterQRevDetailsArray[84]=="YES"){
			$("#tr_assenic_patient").show();
		}else{
			$("#tr_assenic_patient").hide();
			}
		
		if(chk_potable_st=="Non Potable"){
			$("#non_potbl_res").show();
		}else{
			$("#non_potbl_res").hide();
			}
		
		var chk_all_test_complete=$("input[name='all_test_complt']:checked").val();
		
		if(chk_all_test_complete=="NO"){
			$("#all_test_n_res").show();
		}else{
			$("#all_test_n_res").hide();
			}
		
		var chk_wq_management_committee_exist=$("input[name='m_comm_ext']:checked").val();
		
		if(chk_wq_management_committee_exist=="YES"){
			$("#m_comm_ori").show();
		}else{
			$("#m_comm_ori").hide();
			}	
		
		var chk_wq_is_piped_W_connection=$("input[name='piped_w_conn']:checked").val();
		
		if(chk_wq_is_piped_W_connection=="YES"){
			$("#pipe_w_sup").show();
		}else{
			$("#pipe_w_sup").hide();
		}
		
		/*if (waterQRevDetailsArray[80]!='' && waterQRevDetailsArray[81]!=''){
			$('#btn_wq_lat_long').hide();
		}*/
		
		$(".errorChk").text("");
		var url = "#planListWq";
	}
	$.mobile.navigate(url);
	//$(location).attr('href',url);
}

var testKitChk="";
var useOfChk="";
var wq_management_committee_not_exist="";
var wq_management_committee_not_ori="";
var wq_caretaker_trained_not="";
var wq_renovation_type="";

function waterQDataSubmit(){
		//$(".errorChk").text("submit Data...");
		$("#btn_wq_submit").hide();
		latitudewq=$("#wq_lat").val();
		longitudewq=$("#wq_long").val();
		
		var d = new Date();	
		var get_time=d.getTime();	
		
		if (latitudewq==undefined || latitudewq==''){
			latitude=0;
			}
		if (longitudewq==undefined || longitudewq==''){
			longitudewq=0;
			}
		
		wq_management_committee_exist=$("input[name='m_comm_ext']:checked").val();
		wq_management_committee_not_exist=$("input[name='isNotManagement']:checked").val();
		wq_management_committee_ori=$("input[name='m_comm_ori_complt']:checked").val();
		wq_management_committee_not_ori=$("input[name='m_comm_ori_no']:checked").val();
		wq_caretaker_trained=$("input[name='caretaker_train']:checked").val();
		wq_caretaker_trained_not=$("input[name='caretaker_train_no']:checked").val();
		
		wq_sample_analysis=$("#smpl_analy").val();
		wq_renovation_type=$("input[name='renovation_done']:checked").val();
		wq_installation_done=$("input[name='install_done']:checked").val();
		
		
		 if(wq_sample_analysis==""){
			$(".errorChk").text("Required Sample Analysis");
			$("#btn_wq_submit").show();
		}else if(wq_installation_done==undefined){
			$(".errorChk").text("Required installation Done");
			$("#btn_wq_submit").show();
		}else{
			 var management_caretaker_flag=true;
			
			if(test_type_val=="New Instalation" || test_type_val=="Renovation Instalation"){
				if(wq_management_committee_exist==undefined){
					$(".errorChk").text("Required management committee exist");
					$("#btn_wq_submit").show();
				}else if(wq_caretaker_trained==undefined){
					$(".errorChk").text("Required caretaker trained");
					$("#btn_wq_submit").show();
					management_caretaker_flag=false;
				}
			}
			
			
		if (management_caretaker_flag==true){
						
			if(wq_potable_status=="Potable"){
				$("#reason_non_potable").val("");
				$("#non_potable_ini").val("");
				
				wq_res_non_potable="";
				wq_no_potable_initiative_taken="";
			}
			
			if(wq_all_test_complete=="YES"){
				$("#res_n_test").val("");
				wq_res_n_test="";
				}
			
		
			if(test_type_val=="Pre Instalation" || test_type_val=="Monitoring" || test_type_val=="Cross Check"){
				
				/*wq_siteSelectDate="";
				wq_ins_date="";
				wq_san_ins="";
				wq_inspect_date="";
				wq_san_risk_sc="";*/
					
				wq_plat_condition="";
				drain_condition="";
				wp_repair="";
				chamber_condition="";
				wq_maintain_by="";
				user_w_payment="";
				
				wq_depth="";
				wq_static_w_l="";
				wq_first_date="";
				wq_last_date="";
				wq_analysis_date="";
				
				wq_appDate="";
				wq_handOvrDate="";
				
				
				wq_wab_con="";
				wq_comm_con="";
				wq_total_cost="";
				
				wq_do_user_pay="";
				wq_is_piped_W_connection="";
				wq_piped_w_sup="";
				
				if(wq_is_piped_W_connection=="NO"){
					$("#piped_w_sup").val("");
					wq_piped_w_sup="";
				}
				
				if (wq_iron_test==undefined){
					wq_iron_test="";
					}
				
				if(wq_management_committee_exist==undefined){
					wq_management_committee_exist="";
					}
				
				if(wq_management_committee_not_exist==undefined){
					wq_management_committee_not_exist="";
					}
				
				if(wq_caretaker_trained==undefined){
					wq_caretaker_trained="";
					}
				
				if(wq_management_committee_ori==undefined){
					wq_management_committee_ori="";
					}
				
				if(wq_management_committee_not_ori==undefined){
					wq_management_committee_not_ori="";
					}
				
				if(wq_management_committee_exist=="NO"){
					wq_management_committee_ori="";
					$( "input:radio[name='m_comm_ori_complt'][value='"+wq_management_committee_ori+"']" ).attr('checked','');
				}else{
					wq_management_committee_not_exist="";
					$( "input:radio[name='isNotManagement'][value='"+wq_management_committee_not_exist+"']" ).attr('checked','');
					
				}
				
				
				if(wq_management_committee_ori=="YES"){
					wq_management_committee_not_ori="";
					$( "input:radio[name='m_comm_ori_no'][value='"+wq_management_committee_ori+"']" ).attr('checked','');
				}
				
				if(wq_caretaker_trained_not==undefined){
					wq_caretaker_trained_not="";
					}
				
				if(wq_caretaker_trained=="NO"){
						wq_caretaker_trained_not="";
						$( "input:radio[name='m_comm_ori_complt'][value='"+wq_caretaker_trained_not+"']" ).attr('checked','');
					}
				
				
				$("#plat_condition").val("");
				$("#drain_condition").val("");
				$("#wp_repair").val("");
				$("#chamber_condition").val("");
				
				$( "input:radio[name='maintain_by'][value='"+wq_maintain_by+"']" ).attr('checked','');
				$( "input:radio[name='user_w_payment'][value='"+user_w_payment+"']" ).attr('checked','');
				
				$("#depth").val("");
				$("#sWaterL").val("");
				$("#fstDate").val("");
				$("#lastDate").val("");
				$("#aDate").val("");
				
				$("#appDate").val("");
				$("#handOvrDate").val("");
				
				$("#wab_con").val("");
				$("#comm_con").val("");
				$("#total_cost").val("");
				$( "input:radio[name='piped_w_conn'][value='"+wq_is_piped_W_connection+"']" ).attr('checked','');
				$("#piped_w_sup").val("");
				
			}
			
			//--------------------------------------------------------------
			if(wq_management_committee_exist==undefined){
					wq_management_committee_exist="";
					}
				
				if(wq_management_committee_not_exist==undefined){
					wq_management_committee_not_exist="";
					}
				
				if(wq_caretaker_trained==undefined){
					wq_caretaker_trained="";
					}
				
				if(wq_management_committee_ori==undefined){
					wq_management_committee_ori="";
					}
				
				if(wq_management_committee_not_ori==undefined){
					wq_management_committee_not_ori="";
					}
				
				
				if(wq_management_committee_exist=="NO"){
					wq_management_committee_ori="";
					$( "input:radio[name='m_comm_ori_complt'][value='"+wq_management_committee_ori+"']" ).attr('checked','');
				}else{
					wq_management_committee_not_exist="";
					$( "input:radio[name='isNotManagement'][value='"+wq_management_committee_not_exist+"']" ).attr('checked','');
					
				}
				
				
				if(wq_management_committee_ori=="YES"){
					wq_management_committee_not_ori="";
					$( "input:radio[name='m_comm_ori_no'][value='"+wq_management_committee_ori+"']" ).attr('checked','');
				}
				
			//-----------------------------------------------------------------------
			
			if(wq_tw_color=="Green" || wq_tw_color=="NA" ){
				
				sw_option="";
				alt_option="";
				sw_distance="";
				ac_taken="";
				
				arc_patient_yn="";
				arc_patient="";
				
				$( "input:radio[name='sw_option'][value='"+sw_option+"']" ).attr('checked','');
				$( "input:radio[name='alt_option'][value='"+alt_option+"']" ).attr('checked','');
				$( "input:radio[name='sw_distance'][value='"+sw_distance+"']" ).attr('checked','');
				$( "input:radio[name='ac_taken'][value='"+ac_taken+"']" ).attr('checked','');
				
				$("#arc_patient_yn").val("");
				$("#arc_patient").val("");
				
				
			}
		}
		
		//----------- Test Kit chkbox
		
		if (wq_pota!="" && wq_pota!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_pota
				}else{
					testKitChk+=","+wq_pota
					}
		}
		if (wq_delAgua!="" && wq_delAgua!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_delAgua
				}else{
					testKitChk+=","+wq_delAgua
					}
		}
		if (wq_hach_ez_as!="" && wq_hach_ez_as!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_hach_ez_as
				}else{
					testKitChk+=","+wq_hach_ez_as
					}
		}
		if (wq_solinity_meter!="" && wq_solinity_meter!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_solinity_meter
				}else{
					testKitChk+=","+wq_solinity_meter
					}
		}
		if (wq_mn_test_kit!="" && wq_mn_test_kit!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_mn_test_kit
				}else{
					testKitChk+=","+wq_mn_test_kit
					}
		}
		if (wq_test_kit_lab_test!="" && wq_test_kit_lab_test!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_test_kit_lab_test
				}else{
					testKitChk+=","+wq_test_kit_lab_test
					}
		}
		if (wq_tst_kit_cloride!="" && wq_tst_kit_cloride!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_tst_kit_cloride
				}else{
					testKitChk+=","+wq_tst_kit_cloride
					}
		}
		if (wq_tst_kit_oth!="" && wq_tst_kit_oth!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_tst_kit_oth
				}else{
					testKitChk+=","+wq_tst_kit_oth
					}
		}
				
		if (wq_drinking!="" && wq_drinking!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_drinking
				}else{
					useOfChk=useOfChk+","+wq_drinking
					}
		}
		if (wq_cooking!="" && wq_cooking!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_cooking
				}else{
					useOfChk=useOfChk+","+wq_cooking
					}
		}
		if (wq_washing!="" && wq_washing!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_washing
				}else{
					useOfChk=useOfChk+","+wq_washing
					}
		}
		if (wq_Others!="" && wq_Others!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_Others
				}else{
					useOfChk=useOfChk+","+wq_Others
					}
		}
		if (wq_all_purpose!="" && wq_all_purpose!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_all_purpose
				}else{
					useOfChk=useOfChk+","+wq_all_purpose
					}
		}
		
		wq_photo=$("#wq_photo").val();

if (wq_photo=="" || wq_photo==undefined){
	$(".errorChk").text("Please confirm Photo");
	$("#btn_wq_submit").show();
}else{	
	if(latitudewq==0 || longitudewq==0){
			$(".errorChk").text("Please confirm your location");
			$("#btn_wq_submit").show();
		}else{
			
			if (wq_plan_id=='' || wq_CBO_id==''){
				$(".errorChk").text("New records not available");
				$("#btn_wq_submit").show();
			}else{
				//imagePathW="test1";
				if (imagePathW!=""){
					$(".errorChk").text("Syncing photo..")
					imageName = localStorage.mobile_no+'_'+get_time+".jpg";					
					uploadPhotoWQ(imagePathW, imageName);
				}
								
				
				
				}
			}
		}
	}
}



function syncDataWQ(){	
		
		
		$.ajax({
				type: 'POST',
				url:apipath+'submitWaterQualityData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&wq_plan_id='+wq_plan_id+'&wq_CBO_id='+wq_CBO_id+'&wq_vill='+encodeURIComponent(wq_vill)+'&test_type_val='+test_type_val+'&type_of_wq_facility='+encodeURIComponent(type_of_wq_facility)+'&provided_by='+provided_by+'&wq_ref='+encodeURIComponent(wq_ref)+'&wq_id='+encodeURIComponent(wq_id)+'&wq_plat_condition='+encodeURIComponent(wq_plat_condition)+'&drain_condition='+encodeURIComponent(drain_condition)+'&wp_repair='+encodeURIComponent(wp_repair)+'&chamber_condition='+encodeURIComponent(chamber_condition)+'&wq_maintain_by='+wq_maintain_by+'&user_w_payment='+user_w_payment+'&wq_ins_date='+wq_ins_date+'&wq_depth='+wq_depth+'&wq_static_w_l='+wq_static_w_l+'&wq_first_date='+wq_first_date+'&wq_last_date='+wq_last_date+'&wq_analysis_date='+wq_analysis_date+'&wq_appDate='+wq_appDate+'&wq_siteSelectDate='+wq_siteSelectDate+'&wq_handOvrDate='+wq_handOvrDate+'&wq_owner_name='+encodeURIComponent(wq_owner_name)+'&wq_owner_phone='+encodeURIComponent(wq_owner_phone)+'&wq_caretaker='+encodeURIComponent(wq_caretaker)+'&caretakerPhone='+encodeURIComponent(caretakerPhone)+'&wq_select_tech='+encodeURIComponent(wq_select_tech)+'&testKitChk='+testKitChk+'&wq_ttc_cfu='+wq_ttc_cfu+'&wq_sl='+wq_sl+'&wq_as_ppb='+wq_as_ppb+'&wq_fe_ng='+wq_fe_ng+'&wq_mn_ppb='+wq_mn_ppb+'&wq_chl_ppt='+wq_chl_ppt+'&wq_turb_ntu='+wq_turb_ntu+'&wq_chlorine='+wq_chlorine+'&wq_ph='+wq_ph+'&wq_boron='+wq_boron+'&wq_c_bac='+wq_c_bac+'&wq_odor='+wq_odor+'&wq_nitrate='+wq_nitrate+'&wq_zinc='+wq_zinc+'&wq_condvity='+wq_condvity+'&wq_fluoride='+wq_fluoride+'&wq_residual='+wq_residual+'&wq_colour='+wq_colour+'&wq_fc='+wq_fc+'&wq_tested_at='+wq_tested_at+'&wq_iron_test='+wq_iron_test+'&wq_tw_color='+wq_tw_color+'&sw_option='+encodeURIComponent(sw_option)+'&alt_option='+encodeURIComponent(alt_option)+'&sw_distance='+encodeURIComponent(sw_distance)+'&ac_taken='+encodeURIComponent(ac_taken)+'&arc_patient_yn='+arc_patient_yn+'&arc_patient='+arc_patient+'&wq_san_ins='+wq_san_ins+'&wq_inspect_date='+wq_inspect_date+'&wq_san_risk_sc='+wq_san_risk_sc+'&wq_functional='+wq_functional+'&useOfChk='+useOfChk+'&wq_potable_status='+wq_potable_status+'&wq_res_non_potable='+encodeURIComponent(wq_res_non_potable)+'&wq_no_potable_initiative_taken='+encodeURIComponent(wq_no_potable_initiative_taken)+'&wq_wab_con='+wq_wab_con+'&wq_comm_con='+wq_comm_con+'&wq_total_cost='+wq_total_cost+'&wq_do_user_pay='+wq_do_user_pay+'&wq_is_piped_W_connection='+wq_is_piped_W_connection+'&wq_piped_w_sup='+wq_piped_w_sup+'&wq_all_test_complete='+wq_all_test_complete+'&wq_res_n_test='+encodeURIComponent(wq_res_n_test)+'&wq_management_committee_exist='+wq_management_committee_exist+'&wq_management_committee_not_exist='+encodeURIComponent(wq_management_committee_not_exist)+'&wq_management_committee_ori='+wq_management_committee_ori+'&wq_management_committee_not_ori='+wq_management_committee_not_ori+'&wq_caretaker_trained='+wq_caretaker_trained+'&wq_sample_analysis='+wq_sample_analysis+'&wq_renovation_type='+encodeURIComponent(wq_renovation_type)+'&wq_installation_done='+wq_installation_done+'&latitude='+latitudewq+'&longitude='+longitudewq+'&wq_photo='+imageName+'&wq_startDt='+startDtWq,
				   
				   success: function(result) {
						//alert(result);
					if(result=='Success'){							
						//------------------------							
						if (reviewWQDisplayFlag==true){					
							if (arrayIdWq ==-1){							
									$(".errorChk").text("Review Index value Error");
									$("#btn_wq_submit").show();
							}else{	
								var waterSavArray2=localStorage.water_q_save.split('rdrd');
									//alert(achiveSavArray2.length+','+arrayId);
									waterSavArray2.splice(arrayIdWq,1);
									
									var wqTemp2="";
									var wqTempStr2="";
									for (p=0;p<waterSavArray2.length;p++){
										wqTemp2=waterSavArray2[p];
										
										if (wqTempStr2==""){
											wqTempStr2=wqTemp2
										}else{
											wqTempStr2=wqTempStr2+'rdrd'+wqTemp2
											}
										
									}
									//alert(achiveSavArray2.length+','+arrayId);
									//alert(achTempStr2);
									localStorage.water_q_save=wqTempStr2;
								}
								
						}
						//----------------
						$("#ach_lat").val("");
						$("#ach_long").val("");
						
						$( "input:radio[name='plan_select_wq'][value='"+wq_plan_id+"']" ).attr('checked','');
						$("#wq_cbo_combo").val("");
						
						wq_plan_id="";
						wq_CBO_id="";
						
						$(".errorChk").text('Successfully Submited');
					}else{
						//$(".errorChk").text('Failed to Submit');
						$(".errorChk").text('Try again after 5 minutes');
						$("#btn_wq_submit").show();
						}
					
					
				 }
			});
	
	}



function exit() {
navigator.app.exitApp();
//navigator.device.exitApp();
}

function showLatLong(){
	alert ($("#ach_lat").val());
	}

// ----------------Camera-----------------------------------------------


//Acheivement
function getAchivementImage() {
	navigator.camera.getPicture(onSuccessA, onFailA, { quality: 50,
	targetWidth: 300,
	destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
}

function onSuccessA(imageURI) {
    var image = document.getElementById('myImageA');
    image.src = imageURI;
	imagePathA = imageURI;
	$("#achPhoto").val(imagePathA);
	
}

function onFailA(message) {
	imagePathA="";
    alert('Failed because: ' + message);
}


//Water
function getWaterImage() {
	navigator.camera.getPicture(onSuccessW, onFailW, { quality: 50,
	targetWidth: 300,
	destinationType: Camera.DestinationType.FILE_URI,correctOrientation: true });
}

function onSuccessW(imageURI) {
    var image = document.getElementById('myImageW');
    image.src = imageURI;
	imagePathW = imageURI;
	$("#wq_photo").val(imagePathW);
	
}

function onFailW(message) {
	imagePathW="";
    alert('Failed because: ' + message);
}


//------------------------------------------------------------------------------
//File upload 
function uploadPhotoAch(imageURI, imageName) {	
	//winAch();
    var options = new FileUploadOptions();
    options.fileKey="upload";
//    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.fileName=imageName;
//	options.fileName = options.fileName
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
	options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://m.businesssolutionapps.com/welcome/wab_sync/fileUploader/"),winAch,fail,options);
	//ft.upload(imageURI, encodeURI("http://127.0.0.1:8000/welcome/wab_sync/fileUploader/"),winAch,fail,options);
	
}

function winAch(r) {
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
	$(".errorChk").text('File upload Successful. Syncing Data...');
	syncDataAch();
}




//File upload 
function uploadPhotoWQ(imageURI, imageName) {
	//$(".errorChk").text('Inside Upload Photo...');
	//winWQ();
    var options = new FileUploadOptions();
    options.fileKey="upload";
//    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.fileName=imageName;
//	options.fileName = options.fileName
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
	options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://m.businesssolutionapps.com/welcome/wab_sync/fileUploader/"),winWQ,fail,options);
	//ft.upload(imageURI, encodeURI("http://127.0.0.1:8000/welcome/wab_sync/fileUploader/"),win,fail,options);	
}

function winWQ(r) {
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
	$(".errorChk").text('File upload Successful. Syncing Data...');
	syncDataWQ();
}

function fail(error) {
	$(".errorChk").text('Memory or Network Error. Please Save and try to Submit later');
    //alert("An error has occurred: Code = " + error.code);
//    console.log("upload error source " + error.source);
//    console.log("upload error target " + error.target);
}



