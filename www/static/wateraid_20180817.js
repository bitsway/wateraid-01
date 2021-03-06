
var latitude="";
var longitude="";

var latitudewq="";
var longitudewq="";

//==========Achievement
function getLocationInfoAch() {	
	var options = { enableHighAccuracy: true, timeout:30000};
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
	//alert(localStorage.latitudeAreaWq+'-'+localStorage.longitudeAreaWq);
   $("#ach_lat").val(localStorage.latitudeAreaWq);
   $("#ach_long").val(localStorage.longitudeAreaWq);
   
   $(".errorChk").html("Previous Location Confirmed");
}

//==========water Quality teset
function getLocationInfoWq() {	
	var options = { enableHighAccuracy: true, timeout:30000};
	navigator.geolocation.getCurrentPosition(onSuccessWq, onErrorWq, options);//,{timeout:3000};	
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
	//alert(localStorage.latitudeAreaWq+'-'+localStorage.longitudeAreaWq);
   $("#wq_lat").val(localStorage.latitudeAreaWq);
   $("#wq_long").val(localStorage.longitudeAreaWq);
   
   $(".errorChk").html("Previous Location Confirmed");
}
//==========3
//=======Area
function getLocationInfoAreaWq() {
	var options = { enableHighAccuracy: true, timeout:30000};
	navigator.geolocation.getCurrentPosition(onSuccessAreaWq, onErrorAreaWq, options);		
	$(".errorChk").html("Confirming location. Please wait.");
}

// onSuccess Geolocation
function onSuccessAreaWq(position) {
	$("#area_lat").val(position.coords.latitude);
	$("#area_long").val(position.coords.longitude);	
	localStorage.latitudeAreaWq=$("#area_lat").val();
	localStorage.longitudeAreaWq=$("#area_long").val();
	
	$(".errorChk").html("Location Confirmed");
	
}
// onError Callback receives a PositionError object
function onErrorAreaWq(error) {
   $("#area_lat").val(0);
   $("#area_long").val(0);
   /*localStorage.latitudeAreaWq=$("#area_lat").val();
	localStorage.longitudeAreaWq=$("#area_long").val();
   alert(localStorage.latitudeAreaWq+'-'+localStorage.longitudeAreaWq);*/
   $(".errorChk").html("Failed to Confirmed Location.");
}

var apipath="http://w05.yeapps.com/wateraid/syncmobile/";

//--- local
//var apipath="http://127.0.0.1:8000/wateraid/syncmobile/";


var planFlag=0;
var cboFlag=0;
var locationFlag=0;
var serTypeFlag=0;
var projectFlag=0;
var	domainFlag=0;
var sectorFlag=0;
var startDt='';
var syncResult='';

//var asinProject;asinDomain;servicType;serviceLevelWs;serviceLevelHy;achPlanId;achPlanActivities;typeOfFacility;exManagCon;typeOfActivity;availHandWashFac;availWaterSoapFac;typeOfEven;evenIssues;wordCode;achID;communityName;ownerName;sMale;sFemale;sBoys;sGirls;sBoysUnder;sGirlsUnder;sPopulation;sHouse_hold;bMale;bFemale;bBoys;bGirls;bBoysUnder;bGirlsUnder;bPopulation;bHouse_hold;lMale;lFemale;lBoys;lGirls;lBoysUnder;lGirlsUnder;lPopulation;lHouse_hold;achServiceRecpt;achSerType;

var asinProject='';
var asinDomain='';
var servicType='';
var serviceLevelWs='';
var serviceLevelHy='';
var achPlanId='';
var achPlanActivities='';
var typeOfFacility='';
var exManagCon='';
var typeOfActivity='';
var availHandWashFac='';
var availWaterSoapFac='';
var typeOfEven='';
var evenIssues='';
var wordCode='';
var achID='';
var communityName='';
var ownerName='';
var sMale='';
var sFemale='';
var sBoys='';
var sGirls='';
var sBoysUnder='';
var sGirlsUnder='';
var sPopulation='';
var sHouse_hold='';
var bMale='';
var bFemale='';
var bBoys='';
var bGirls='';
var bBoysUnder='';
var bGirlsUnder='';
var bPopulation='';
var bHouse_hold='';
var lMale='';
var lFemale='';
var lBoys='';
var lGirls='';
var lBoysUnder='';
var lGirlsUnder='';
var lPopulation='';
var lHouse_hold='';
var dapMale='';
var dapFemale='';
var totalWiBen='';
var totalInBen='';
var achServiceRecpt='';
var achSerType='';

//var achCBOid='';
//var achPopulation='';
//var achHousehold='';
//var achMale='';
//var achFemale='';
//var achGirlsUnder='';
//var achBoysUnder='';
//var achGirls='';
//var achBoys='';
//var achDapMale='';
//var achDapFemale='';
//var achPoorC='';
//var achPoorEx='';
//var achEthMale='';
//var achEthFemale='';
//var achServiceRecpt='';
//var achSerType='';
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
			
		 	//alert(apipath+'passwordCheck?cid=WAB&mobile='+mobile+'&password='+encodeURI(password)+'&sync_code='+localStorage.sync_code)
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
						localStorage.service_type=syncResultArray[8];
						localStorage.project=syncResultArray[9];
						localStorage.domain=syncResultArray[10];
						localStorage.sector=syncResultArray[11];
						
						localStorage.mobile_no=mobile;
						localStorage.ach_save="";
						localStorage.water_q_save="";
							
							
												
						$(".errorChk").html("Sync Successful");
						$('#syncBasic').show();
						
						if (projectFlag==0){
							$("#asignProject").html(localStorage.project);	
							projectFlag=1;
						}else{
							$('#asignProject').empty();
							$('#asignProject').append(localStorage.project).trigger('create');
						}
						if (domainFlag==0){
							$("#asignDomain").html(localStorage.domain);	
							domainFlag=1;
						}else{
							$('#asignDomain').empty();
							$('#asignDomain').append(localStorage.domain).trigger('create');
						}
						
						if (cboFlag==0){
							$("#cboIdDiv").html(localStorage.cbo_list);	
							cboFlag=1;
						}else{
							$('#cboIdDiv').empty();
							$('#cboIdDiv').append(localStorage.cbo_list).trigger('create');
						}
						
						if (sectorFlag==0){
							$("#serTyp").html(localStorage.sector);	
							sectorFlag=1;
						}else{
							$('#serTyp').empty();
							$('#serTyp').append(localStorage.sector).trigger('create');
						}
						
						
						if (locationFlag==0){			   
							$("#serResDiv").html(localStorage.ser_res_list);	
							locationFlag=1;
						}else{
							$('#serResDiv').empty();
							$('#serResDiv').append(localStorage.ser_res_list).trigger('create');
						}
						
						if (serTypeFlag==0){			   
							$("#serTypeDiv").html(localStorage.service_type);	
							serTypeFlag=1;
						}else{
							$('#serTypeDiv').empty();
							$('#serTypeDiv').append(localStorage.service_type).trigger('create');
						}
												
						
						$("#planWqlistDiv").html(localStorage.plan_wq);
						$("#wQCboIdDiv").html(localStorage.cbo_id_wq);
						$("#providedByDiv").html(localStorage.provided_by);
						$("#TestTypeDiv").html(localStorage.test_type_wq);
						
						
						var url = "#pagesync";
						$.mobile.navigate(url);
					}else{
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
	
	planFlag=0;
	cboFlag=0;
	locationFlag=0;
	serTypeFlag=0;
	projectFlag=0;
	domainFlag=0;
	sectorFlag=0;
	
	$.mobile.navigate("#reportType")
	location.reload();
}


	
$(document).ready(function(){	
	//$("#planlistDiv").html(localStorage.plan_list);
	
	$("#planlistDiv").html(localStorage.planStr);
		
	$("#asignProject").html(localStorage.project);
	$("#asignDomain").html(localStorage.domain);
	
	$("#serTyp").html(localStorage.sector);			
		
	$("#cboIdDiv").html(localStorage.cbo_list);					   
	$("#serResDiv").html(localStorage.ser_res_list);
	$("#serTypeDiv").html(localStorage.service_type);	
	$("#reviewAchList").html(localStorage.reviewDataDiv);
	
	$("#planWqlistDiv").html(localStorage.plan_wq);
	$("#wQCboIdDiv").html(localStorage.cbo_id_wq);
	
	$("#providedByDiv").html(localStorage.provided_by);
	$(".errorChk").text("");
	
	
//-------------------------------date format

//$( "#fstDate" ).datepicker( "option", "dateFormat", "dd/mm/yyyy");
	
//------------------------safe water -------------					   
	$(".dateErr").text("");
//-------------------------------------/portable
	$("#non_potbl_res").hide();	
	$("#non_potbl_res_followup_ac").hide();
	
	/*$("#st_non_potable").click(function(){					
		$("#non_potbl_res").show();
	});
	
	$("#st_potable").click(function(){					
		$("#non_potbl_res").hide();
		
	});*/
	
	//-------------------------------------/all test complete
	$("#newField").hide();		
	
	$("#all_test_y").click(function(){					
		$("#newField").hide();
		
	});
	
	$("#all_test_n").click(function(){					
		$("#newField").show();
		
	});
	
	//--------------------------------------/Safe water option
	$("#safW_altOption").hide();
	$("#sw_no").click(function(){					
		$("#safW_altOption").hide();
		$("#safW_dist").hide();		
		$("#saf_acT").hide();		
	});	
	$("#sw_green").click(function(){					
		$("#safW_altOption").show();
		$("#safW_dist").show();		
		$("#saf_acT").show();		
	});
	
		
	//-------------------------------------/manage comm trainee
	$("#m_comm_ori").hide();
	$("#isNotManagement").hide();
	$("#m_comm_ori_no").hide();	
	$("#monitoring_new_option").hide();	
	
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
	//test_type_val=="Pre Instalation"  
	$("#m_comm_ori_y").click(function(){
		if(test_type_val=="Monitoring" && wq_tw_color=="Green"){
			$("#m_comm_ori_no").hide();
			$("#monitoring_new_option").hide();
		}else{
			$("#m_comm_ori_no").hide();
			$("#monitoring_new_option").hide();
		}	
	});
	$("#m_comm_ori_n").click(function(){
		if(test_type_val=="Monitoring" && wq_tw_color=="Green"){
			$("#m_comm_ori_no").hide();
			$("#monitoring_new_option").show();
		}else{
			$("#m_comm_ori_no").show();
			$("#monitoring_new_option").hide();
		}
	});
	
	$("#caretaker_train_y").click(function(){
		$("#caretakerTrainedNo").hide();
	});	
	$("#caretaker_train_n").click(function(){
		$("#caretakerTrainedNo").show();
	});
	
	//--------------------------check urban acSectorNext
	$("#pipe_w_sup").hide();		
	
	$("#tr_assenic_patient").hide();

	$("#other_alt").hide();
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
				
		if (projectFlag==0){
			$("#asignProject").html(localStorage.project);	
			projectFlag=1;
		}else{
			$('#asignProject').empty();
			$('#asignProject').append(localStorage.project).trigger('create');
		}
		if (domainFlag==0){
			$("#asignDomain").html(localStorage.domain);	
			domainFlag=1;
		}else{
			$('#asignDomain').empty();
			$('#asignDomain').append(localStorage.domain).trigger('create');
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
		
		if (serTypeFlag==0){			   
			$("#serTypeDiv").html(localStorage.service_type);	
			serTypeFlag=1;
		}else{
			$('#serTypeDiv').empty();
			$('#serTypeDiv').append(localStorage.service_type).trigger('create');
		}
		
		if (sectorFlag==0){
			$("#serTyp").html(localStorage.sector);	
			sectorFlag=1;
		}else{
			$('#serTyp').empty();
			$('#serTyp').append(localStorage.sector).trigger('create');
		}
					
		$("#asign_project").val("");
		$("#asign_domain").val("");
		$("#service_type").val("");
		$("#service_level_ws").val("");
		$("#service_level_hy").val("");
		//$("input:radio[name='plan_select'][value='"+achPlanId+"']" ).attr('checked','');
		$("#typeOf_Facility").val("");
		$("#ex_manag_con").val("");
		$("#typeOf_activity").val("");
		$("#avail_handWash_fac").val("");
		$("#avail_WaterSoap_fac").val("");
		$("#typeOf_event").val("");
		$("#event_issues").val("");
		$("#cbo_combo").val("");
		$("#achID_show").val("");
		$("#ach_id").val("");
		$("#community_name").val("");
		$("#owner_name").val("");
		$("#s_male").val("");
		$("#s_female").val("");
		$("#s_boys").val("");
		$("#s_girls").val("");
		$("#s_boysUnder").val("");
		$("#s_girlsUnder").val("");
		$("#s_population").val("");
		$("#s_house_hold").val("");
		$("#b_male").val("");
		$("#b_female").val("");
		$("#b_boys").val("");
		$("#b_girls").val("");
		$("#b_boysUnder").val("");
		$("#b_girlsUnder").val("");
		$("#b_population").val("");
		$("#b_house_hold").val("");
		$("#l_male").val("");
		$("#l_female").val("");
		$("#l_boys").val("");
		$("#l_girls").val("");
		$("#l_boysUnder").val("");
		$("#l_girlsUnder").val("");
		$("#l_population").val("");
		$("#l_house_hold").val("");
		$("#dapMale").val("");
		$("#dapFemale").val("");
		$("#serRecpent").val("");
		$("#serType").val("");
		$("#achPhoto").val("");	
		$("#ach_lat").val("");
		$("#ach_long").val("");		
		
		reviewAchDisplayFlag==false;
		arrayId='';
				
		var url = "#servType";
		$.mobile.navigate(url);
	}
}
	
//------------------------------domain list 
function serviceType_wsh(){	
	var service_type=$("#service_type").val();
	if (service_type=='Water'){
		$("#ifHygiene").hide();		
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		$("#typeOf_act").hide();
		
		$("#ifWaterSani").show();		
	}else if (service_type=='Sanitation'){
		$("#typeOf_act").hide();
		$("#availHandWash_fac").hide();
		$("#availWaterSoap_fac").hide();		
		$("#ifHygiene").hide();
		
		serviceLevelHy="";				
		
		$("#ifWaterSani").show();
		$("#typeOfFac").show();
		$("#exManag_con").show();
	}else if(service_type=='Hygiene'){
		$("#ifWaterSani").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		
		$("#ifHygiene").show();
		$("#typeOf_act").show();
	}else if(service_type=='X-Sector'){
		$("#ifWaterSani").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		
		$("#ifHygiene").show();
		$("#typeOf_act").show();
	}else{
		$("#ifWaterSani").hide();
		$("#ifHygiene").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		$("#typeOf_act").hide();
		$("#availHandWash_fac").hide();
		$("#availWaterSoap_fac").hide();	
	}
}

function achNext(){	
	asinProject=$("#asign_project").val();
	asinDomain=$("#asign_domain").val();
	servicType=$("#service_type").val();
	serviceLevelWs=$("#service_level_ws").val();
	serviceLevelHy=$("#service_level_hy").val();
	sIndicator=$("#selectIndicator").val();
	
	if(asinProject==''){
		$(".errorChk").text("Required Project");		
	}else if(asinDomain==''){
		$(".errorChk").text("Required Domain");	
	}else if (servicType==''){
		$(".errorChk").text("Required Service Type");
	}else if((((servicType=='Water' || servicType=='Sanitation') && (serviceLevelWs=='')) || ((servicType=='Hygiene' || servicType=='X-Sector') && (serviceLevelHy=='')))){//&&(serviceLevelWs=='')
		$(".errorChk").text("Required Service Level");		
	}else{
		var planLst=localStorage.plan_list.split('|||');
		
		planStr='<ul data-role="listview" data-inset="true">'
		 for (i=0;i<eval(planLst.length);i++){
			planLi=planLst[i].split('||');
			activityName=planLi[0]
			activity_id=planLi[1]
			serviceType=planLi[2]
			serviceLevel=planLi[3]
			planId=planLi[4]
			
			//alert(servicType+'=='+serviceType+'||'+serviceLevelWs+'=='+serviceLevel+'|||'+serviceLevelHy+'=='+serviceLevel);
			if ((servicType==serviceType) && (serviceLevelWs==serviceLevel || serviceLevelHy==serviceLevel)){
				if ((sIndicator!='') && (sIndicator==planId)){					
					planStr+='<li class="ui-field-contain"><fieldset data-role="controlgroup">'
					planStr+='<input type="radio" name="plan_select"  id="'+planId+'" value="'+planId+'" checked>'
					planStr+='<label for="'+planId+'" style="color:#05940a;" >'+activity_id+'-'+activityName+'-'+planId+'-'+serviceType+'-'+serviceLevel+'</label>'
					planStr+='<input type="hidden" name="achActivityName"  id="achActivityName'+planId+'" value="'+activityName+'">'
					planStr+='</fieldset></li>'
				}else{
					planStr+='<li class="ui-field-contain"><fieldset data-role="controlgroup">'
					planStr+='<input type="radio" name="plan_select"  id="'+planId+'" value="'+planId+'" >'
					planStr+='<label for="'+planId+'" >'+activity_id+'-'+activityName+'-'+planId+'-'+serviceType+'-'+serviceLevel+'</label>'
					planStr+='<input type="hidden" name="achActivityName"  id="achActivityName'+planId+'" value="'+activityName+'">'
					planStr+='</fieldset></li>'
				}
			}
		}
		planStr+='</ul>'
		localStorage.planStr=planStr;
		
		//$("#selectIndicator").removeClass('ui-radio-off').addClass('ui-radio-on');
		if (localStorage.planStr.length >=50){
			if (planFlag==0){
				$("#planlistDiv").html(localStorage.planStr);
				planFlag=1;
			}else{
				$("#planlistDiv").empty();
				$("#planlistDiv").append(localStorage.planStr).trigger('create');
			}
			
			$(".errorChk").text("");	
			var url = "#planList";
			$.mobile.navigate(url);	
		}else{	
			$(".errorChk").text("Indicator not found");	
			var url = "#servType";
			$.mobile.navigate(url)
		}
	}
}


function achDataNext(){
	if($("#planlistDiv").find("input[name='plan_select']:checked").length==0){
		$(".errorChk").text("Required Indicator");
	}else{
		achPlanId=$("input[name='plan_select']:checked").val();
		achPlanActivities=$("#achActivityName"+achPlanId).val();
				
		if (startDt==""){
			var now = new Date();
			var month=now.getUTCMonth()+1;
			startDt = now.getUTCFullYear()+ "-" + month + "-" + now.getUTCDate()+" "+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
		}
		
		if (servicType=='Water'){
			$(".errorChk").text("");
			var url = "#achiveDataList";
			$.mobile.navigate(url);	
		}else{
			$(".errorChk").text("");
			var url = "#achiveEvent";
			$.mobile.navigate(url);
		}
	}
}

function type_ofActivity(){
	typeOf_activity=$("#typeOf_activity").val();
	if (typeOf_activity=='Basic'){
		$("#availHandWash_fac").show();
		$("#typeOfEvent").hide();
		$("#eventIssues").hide();
	}else if(typeOf_activity=='Event'){
		$("#availHandWash_fac").hide();
		$("#availWaterSoap_fac").hide();
		$("#typeOfEvent").show();		
	}else{
		$("#availHandWash_fac").hide();
		$("#typeOfEvent").hide();
		$("#availWaterSoap_fac").hide();
		$("#eventIssues").hide();
	}	
}
function avail_handWashFac(){
	var avail_handWash_fac=$("#avail_handWash_fac").val();
	if (avail_handWash_fac=='Yes'){
		$("#availWaterSoap_fac").show();
	}else if(avail_handWash_fac=='No'){
		$("#availWaterSoap_fac").hide();
		availWaterSoapFac="";
	}else{
		$("#availWaterSoap_fac").hide();
		availWaterSoapFac="";
	}	
}
function typeOf_Event(){
	var typeOf_event=$("#typeOf_event").val();
	if (typeOf_event=='Orientation' || typeOf_event=='Session' || typeOf_event=='Campaign'){
		$("#eventIssues").show();
	}else{
		$("#eventIssues").hide();
	}	
}


function achive_Event(){
	typeOfFacility=$("#typeOf_Facility").val();
	exManagCon=$("#ex_manag_con").val();
	typeOfActivity=$("#typeOf_activity").val();
	availHandWashFac=$("#avail_handWash_fac").val();
	availWaterSoapFac=$("#avail_WaterSoap_fac").val();
	typeOfEven=$("#typeOf_event").val();
	evenIssues=$("#event_issues").val();
	if (servicType=='Sanitation' && typeOfFacility==''){
		$(".errorChk").text("Required Type of Facility");
	}else if(servicType=='Sanitation' && exManagCon==''){
		$(".errorChk").text("Required Excreta management consent");
	}else if(servicType=='Hygiene' && typeOfActivity==''){
		$(".errorChk").text("Required Type of Activity ");
	}else if(servicType=='Hygiene' && typeOfActivity=='Basic' && availHandWashFac==''){
		$(".errorChk").text("Required Availability of Hand Washing Facility ");
	}else if(servicType=='Hygiene' && typeOfActivity=='Basic' && availHandWashFac=='Yes' && availWaterSoapFac==''){
		$(".errorChk").text("Required Availability of running water and soap is near to the facility ");
	}else if(servicType=='Hygiene' && typeOfActivity=='Event' && typeOfEven==''){
		$(".errorChk").text("Required Type of Event ");
	}else if(servicType=='Hygiene' && typeOfActivity=='Event' && typeOfEven !='' && evenIssues==''){
		$(".errorChk").text("Required Event issues");
	}else{
		$(".errorChk").text("");
		var url = "#achiveDataList";
		$.mobile.navigate(url);	
	}
}

function select_Wordcode(){
	var cboCombo=$("#cbo_combo").val();	
	$("#achID_show").val(cboCombo);
	
	
}

//-----------------------------achivement data people support
function achivementDataPSupport(){
	$(".errorChk").text("");
	wordCode=$("#cbo_combo").val();	
	achID=$("#ach_id").val();
	
	communityName=$("#community_name").val();
	ownerName=$("#owner_name").val();
		
	sMale=$("#s_male").val();
	sFemale=$("#s_female").val();
	sBoys=$("#s_boys").val();
	sGirls=$("#s_girls").val();
	sBoysUnder=$("#s_boysUnder").val();
	sGirlsUnder=$("#s_girlsUnder").val();
	sPopulation=$("#s_population").val();
	sHouse_hold=$("#s_house_hold").val();
	
	bMale=$("#b_male").val();
	bFemale=$("#b_female").val();
	bBoys=$("#b_boys").val();
	bGirls=$("#b_girls").val();
	bBoysUnder=$("#b_boysUnder").val();
	bGirlsUnder=$("#b_girlsUnder").val();
	bPopulation=$("#b_population").val();
	bHouse_hold=$("#b_house_hold").val();
	
	lMale=$("#l_male").val();
	lFemale=$("#l_female").val();
	lBoys=$("#l_boys").val();
	lGirls=$("#l_girls").val();
	lBoysUnder=$("#l_boysUnder").val();
	lGirlsUnder=$("#l_girlsUnder").val();
	lPopulation=$("#l_population").val();
	lHouse_hold=$("#l_house_hold").val();
	
	dapMale=$("#dapMale").val();
	dapFemale=$("#dapFemale").val();
	totalWiBen=$("#totalWiBen").val();
	totalInBen=$("#totalInBen").val();
	
	var regStr=/^[a-zA-Z\s]+$/;
	
	if(sBoys==''){
		sBoys=0;
	}
	if(sGirls==''){
		sGirls=0;
	}	
	if(sBoysUnder==''){
		sBoysUnder=0;
	}
	if(sGirlsUnder==''){
		sGirlsUnder=0;
	}
			
	if(bBoys==''){
		bBoys=0;
	}
	if(bGirls==''){
		bGirls=0;
	}	
	if(bBoysUnder==''){
		bBoysUnder=0;
	}
	if(bGirlsUnder==''){
		bGirlsUnder=0;
	}
	
	if(lBoys==''){
		lBoys=0;
	}
	if(lGirls==''){
		lGirls=0;
	}	
	if(lBoysUnder==''){
		lBoysUnder=0;
	}
	if(lGirlsUnder==''){
		lGirlsUnder=0;
	}
		
	if (wordCode=="" ){
		$(".errorChk").text("Required Ward Code ");
	}else if(achID==""){
		$(".errorChk").text("Required ID related to output");
	}else if(communityName==""){
		$(".errorChk").text("Required Community Name");	
	}else if (!communityName.match(regStr)){
		$(".errorChk").text("Community Name Only Alphabetic Character Allowed ");
	}else if (ownerName=="" ){
		$(".errorChk").text("Required Owner Name");
	}else if (!ownerName.match(regStr)){
		$(".errorChk").text("Owner Name Only Alphabetic Character Allowed ");	
	}else if (sMale=="" ){
		$(".errorChk").text("Required Male 17+ Safely ");
	}else if (sFemale=="" ){
		$(".errorChk").text("Required Female 17+ Safely ");
	}else if (bMale=="" ){
		$(".errorChk").text("Required Male 17+ Basic");
	}else if (bFemale=="" ){
		$(".errorChk").text("Required Female 17+ Basic");
	}else if (lMale=="" ){
		$(".errorChk").text("Required Male 17+ Limited");
	}else if (lFemale=="" ){
		$(".errorChk").text("Required Female 17+ Limited");
	}else{
		$(".errorChk").text("");
		var url="#achiveDataList2";
		$.mobile.navigate(url);
	}
}
	
//------------------ show population
function s_totalPopulation(){
	var s_male=$("#s_male").val();
	var s_female=$("#s_female").val();
	var s_boys=$("#s_boys").val();
	var s_girls=$("#s_girls").val();
	var s_boysUnder=$("#s_boysUnder").val();
	var s_girlsUnder=$("#s_girlsUnder").val();
	
	if(s_male==''){
			s_male=0;
			}
	if(s_female==''){
			s_female=0;
			}
	if(s_boys==''){
			s_boys=0;
			}
	if(s_girls==''){
			s_girls=0;
			}
	if(s_boysUnder==''){
			s_boysUnder=0;
			}
	if(s_girlsUnder==''){
			s_girlsUnder=0;
			}
			
	var totalMF_s=eval(s_male)+eval(s_female)+eval(s_boys)+eval(s_girls)+eval(s_boysUnder)+eval(s_girlsUnder);	
	$("#s_population").val(totalMF_s);
}
function b_totalPopulation(){
	var b_male=$("#b_male").val();
	var b_female=$("#b_female").val();
	var b_boys=$("#b_boys").val();
	var b_girls=$("#b_girls").val();
	var b_boysUnder=$("#b_boysUnder").val();
	var b_girlsUnder=$("#b_girlsUnder").val();
	
	if(b_male==''){
		b_male=0;
	}
	if(b_female==''){
		b_female=0;
	}
	if(b_boys==''){
		b_boys=0;
	}
	if(b_girls==''){
		b_girls=0;
	}
	if(b_boysUnder==''){
		b_boysUnder=0;
	}
	if(b_girlsUnder==''){
		b_girlsUnder=0;
	}
			
	var totalMF_b=eval(b_male)+eval(b_female)+eval(b_boys)+eval(b_girls)+eval(b_boysUnder)+eval(b_girlsUnder);	
	$("#b_population").val(totalMF_b);
}
function l_totalPopulation(){
	var l_male=$("#l_male").val();
	var l_female=$("#l_female").val();
	var l_boys=$("#l_boys").val();
	var l_girls=$("#l_girls").val();
	var l_boysUnder=$("#l_boysUnder").val();
	var l_girlsUnder=$("#l_girlsUnder").val();
	
	if(l_male==''){
			l_male=0;
			}
	if(l_female==''){
			l_female=0;
			}
	if(l_boys==''){
			l_boys=0;
			}
	if(l_girls==''){
			l_girls=0;
			}
	if(l_boysUnder==''){
			l_boysUnder=0;
			}
	if(l_girlsUnder==''){
			l_girlsUnder=0;
			}
			
	var totalMF_l=eval(l_male)+eval(l_female)+eval(l_boys)+eval(l_girls)+eval(l_boysUnder)+eval(l_girlsUnder);	
	$("#l_population").val(totalMF_l);
}


//------------------achivement sector next 
function serviceRecipentNext(){
	achServiceRecpt=$("#serRecpent").val();
	achSerType=$("#serType").val();
	
	if(achServiceRecpt=="" ){
		$(".errorChk").text("Select Location");
	}else if(achSerType==""){
		$(".errorChk").text("Select Service Type");
	}else{
		$(".errorChk").text("");
		var url="#inPhoto";	
		$.mobile.navigate(url);		
	}
}


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
	}else if((latitude==0 || longitude==0) || (localStorage.latitudeAreaWq==0 || localStorage.longitudeAreaWq==0)){
		$(".errorChk").text("Please confirm your location");
		$("#btn_ach_save").show();
		$("#btn_ach_submit").show();
	}else{
		if(latitude==0 || longitude==0){
			latitude=localStorage.latitudeAreaWq;
			longitude=localStorage.longitudeAreaWq;
		}	
		
		
		achivementSave=asinProject+'fdfd'+asinDomain+'fdfd'+servicType+'fdfd'+serviceLevelWs+'fdfd'+serviceLevelHy+'fdfd'+achPlanId+'fdfd'+achPlanActivities+'fdfd'+typeOfFacility+'fdfd'+exManagCon+'fdfd'+typeOfActivity+'fdfd'+availHandWashFac+'fdfd'+availWaterSoapFac+'fdfd'+typeOfEven+'fdfd'+evenIssues+'fdfd'+wordCode+'fdfd'+achID+'fdfd'+communityName+'fdfd'+ownerName+'fdfd'+sMale+'fdfd'+sFemale+'fdfd'+sBoys+'fdfd'+sGirls+'fdfd'+sBoysUnder+'fdfd'+sGirlsUnder+'fdfd'+sPopulation+'fdfd'+sHouse_hold+'fdfd'+bMale+'fdfd'+bFemale+'fdfd'+bBoys+'fdfd'+bGirls+'fdfd'+bBoysUnder+'fdfd'+bGirlsUnder+'fdfd'+bPopulation+'fdfd'+bHouse_hold+'fdfd'+lMale+'fdfd'+lFemale+'fdfd'+lBoys+'fdfd'+lGirls+'fdfd'+lBoysUnder+'fdfd'+lGirlsUnder+'fdfd'+lPopulation+'fdfd'+lHouse_hold+'fdfd'+dapMale+'fdfd'+dapFemale+'fdfd'+totalWiBen+'fdfd'+totalInBen+'fdfd'+achServiceRecpt+'fdfd'+achSerType+'fdfd'+achPhoto+'fdfd'+startDt+'fdfd'+latitude+'fdfd'+longitude;
		
		//alert(achivementSave);							
		//achivementSave=achPlanId+'fdfd'+achCBOid+'fdfd'+achID+'fdfd'+achPopulation+'fdfd'+achHousehold+'fdfd'+achMale+'fdfd'+achFemale+'fdfd'+achGirlsUnder+'fdfd'+achBoysUnder+'fdfd'+achGirls+'fdfd'+achBoys+'fdfd'+achDapMale+'fdfd'+achDapFemale+'fdfd'+achPoorA+'fdfd'+achPoorB+'fdfd'+achPoorC+'fdfd'+achPoorEx+'fdfd'+achEthMale+'fdfd'+achEthFemale+'fdfd'+achServiceRecpt+'fdfd'+achPlanActivities+'fdfd'+achPhoto+'fdfd'+startDt+'fdfd'+latitude+'fdfd'+longitude+'fdfd'+achSerType
		
		if (achPlanId=='' || wordCode==''){
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
				asinProject='';
				asinDomain='';
				servicType='';
				serviceLevelWs='';
				serviceLevelHy='';
				achPlanId='';
				achPlanActivities='';
				typeOfFacility='';
				exManagCon='';
				typeOfActivity='';
				availHandWashFac='';
				availWaterSoapFac='';
				typeOfEven='';
				evenIssues='';
				wordCode='';
				achID='';
				communityName='';
				ownerName='';
				sMale='';
				sFemale='';
				sBoys='';
				sGirls='';
				sBoysUnder='';
				sGirlsUnder='';
				sPopulation='';
				sHouse_hold='';
				bMale='';
				bFemale='';
				bBoys='';
				bGirls='';
				bBoysUnder='';
				bGirlsUnder='';
				bPopulation='';
				bHouse_hold='';
				lMale='';
				lFemale='';
				lBoys='';
				lGirls='';
				lBoysUnder='';
				lGirlsUnder='';
				lPopulation='';
				lHouse_hold='';
				dapMale='';
				dapFemale='';
				totalWiBen='';
				totalInBen='';
				achServiceRecpt='';
				achSerType='';
				achPhoto='';
				startDt='';
				latitude='';
				longitude='';
									
				$("#asign_project").val("");
				$("#asign_domain").val("");
				$("#service_type").val("");
				$("#service_level_ws").val("");
				$("#service_level_hy").val("");
				$("input:radio[name='plan_select'][value='"+achPlanId+"']" ).attr('checked','');
				$("#typeOf_Facility").val("");
				$("#ex_manag_con").val("");
				$("#typeOf_activity").val("");
				$("#avail_handWash_fac").val("");
				$("#avail_WaterSoap_fac").val("");
				$("#typeOf_event").val("");
				$("#event_issues").val("");
				$("#cbo_combo").val("");
				$("#achID_show").val("");
				$("#ach_id").val("");
				$("#community_name").val("");
				$("#owner_name").val("");
				$("#s_male").val("");
				$("#s_female").val("");
				$("#s_boys").val("");
				$("#s_girls").val("");
				$("#s_boysUnder").val("");
				$("#s_girlsUnder").val("");
				$("#s_population").val("");
				$("#s_house_hold").val("");
				$("#b_male").val("");
				$("#b_female").val("");
				$("#b_boys").val("");
				$("#b_girls").val("");
				$("#b_boysUnder").val("");
				$("#b_girlsUnder").val("");
				$("#b_population").val("");
				$("#b_house_hold").val("");
				$("#l_male").val("");
				$("#l_female").val("");
				$("#l_boys").val("");
				$("#l_girls").val("");
				$("#l_boysUnder").val("");
				$("#l_girlsUnder").val("");
				$("#l_population").val("");
				$("#l_house_hold").val("");
				$("#dapMale").val("");
				$("#dapFemale").val("");
				$("#totalWiBen").val("");
				$("#totalInBen").val("");
				$("#serRecpent").val("");
				$("#serType").val("");
				$("#achPhoto").val("");	
				$("#ach_lat").val("");
				$("#ach_long").val("");
									
				reviewAchDisplayFlag==false;
				arrayId=-1;					
				
				$(".errorChk").text("");
				$(".sucMsg").text("Successfully saved for review");
				$("#btn_take_pic").hide();
				$("#btn_ach_lat_long").hide();
			}
		}
	}
}

function deleteAchReview(){
	arrayId=eval($("input[name='achReviewRad']:checked").val());
	confirmDel=$("input[name='delConfirm']:checked").val();
	
	if (arrayId ==undefined){							
		$(".errorChk").text("Select a Record");
	}else if(confirmDel==undefined || confirmDel==""){
		$(".errorChk").text("Please Confirm Delete");
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
			planID=achiveArray[5];
			//cboID=achiveArray[1];
			achActivities=achiveArray[6];
			
			reviewDataDiv=reviewDataDiv+'<input type="radio" name="achReviewRad"  id="achReviewRad'+i+'"  value="'+i+'" /> <label for="achReviewRad'+i+'">'+achActivities+'-'+planID+'</label>'
			
			}
			reviewDataDiv=reviewDataDiv+'</fieldset></li></ul>'
			
			localStorage.reviewDataDiv=reviewDataDiv;
			if (reviewAchFlag==0){
				$("#reviewAchList").html(localStorage.reviewDataDiv);
				reviewAchFlag=1;
			}else{
				$('#reviewAchList').empty();
				$('#reviewAchList').append(localStorage.reviewDataDiv).trigger('create');
			}
						
		//-----------------------------
				
		if (projectFlag==0){
			$("#asignProject").html(localStorage.project);	
			projectFlag=1;
		}else{
			$('#asignProject').empty();
			$('#asignProject').append(localStorage.project).trigger('create');
		}
		if (domainFlag==0){
			$("#asignDomain").html(localStorage.domain);	
			domainFlag=1;
		}else{
			$('#asignDomain').empty();
			$('#asignDomain').append(localStorage.domain).trigger('create');
		}
		if (planFlag==0){
			$("#planlistDiv").html(localStorage.planStr);
			planFlag=1;
		}else{
			$('#planlistDiv').empty();
			$('#planlistDiv').append(localStorage.planStr).trigger('create');
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
		
		if (serTypeFlag==0){			   
			$("#serTypeDiv").html(localStorage.service_type);	
			serTypeFlag=1;
		}else{
			$('#serTypeDiv').empty();
			$('#serTypeDiv').append(localStorage.service_type).trigger('create');
		}
		
		$("#asign_project").val("");
		$("#asign_domain").val("");
		$("#service_type").val("");
		$("#service_level_ws").val("");
		$("#service_level_hy").val("");
		$("input:radio[name='plan_select'][value='"+planID+"']" ).attr('checked','');		
		$("#typeOf_Facility").val("");
		$("#ex_manag_con").val("");
		$("#typeOf_activity").val("");
		$("#avail_handWash_fac").val("");
		$("#avail_WaterSoap_fac").val("");
		$("#typeOf_event").val("");
		$("#event_issues").val("");
		$("#cbo_combo").val("");
		$("#achID_show").val("");
		$("#ach_id").val("");
		$("#community_name").val("");
		$("#owner_name").val("");
		$("#s_male").val("");
		$("#s_female").val("");
		$("#s_boys").val("");
		$("#s_girls").val("");
		$("#s_boysUnder").val("");
		$("#s_girlsUnder").val("");
		$("#s_population").val("");
		$("#s_house_hold").val("");
		$("#b_male").val("");
		$("#b_female").val("");
		$("#b_boys").val("");
		$("#b_girls").val("");
		$("#b_boysUnder").val("");
		$("#b_girlsUnder").val("");
		$("#b_population").val("");
		$("#b_house_hold").val("");
		$("#l_male").val("");
		$("#l_female").val("");
		$("#l_boys").val("");
		$("#l_girls").val("");
		$("#l_boysUnder").val("");
		$("#l_girlsUnder").val("");
		$("#l_population").val("");
		$("#l_house_hold").val("");
		$("#dapMale").val("");
		$("#dapFemale").val("");
		$("#totalWiBen").val("");
		$("#totalInBen").val("");		
		$("#serRecpent").val("");
		$("#serType").val("");
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
	$('#btn_ach_lat_long').hide();
	
	reviewAchDisplayFlag=true;
	arrayId=eval($("input[name='achReviewRad']:checked").val());
	
	var achivementRevArray2=localStorage.ach_save.split('rdrd');
	var achRevDetails=achivementRevArray2[arrayId];
	
	var achRevDetailsArray=achRevDetails.split('fdfd');
	
	$("#asign_project").val(achRevDetailsArray[0]);
	$("#asign_domain").val(achRevDetailsArray[1]);
	$("#service_type").val(achRevDetailsArray[2]);
	$("#service_level_ws").val(achRevDetailsArray[3]);
	$("#service_level_hy").val(achRevDetailsArray[4]);
	
	$("#selectIndicator").val(achRevDetailsArray[5]);//No Save
		
	$("input:radio[name='plan_select'][value='"+achRevDetailsArray[5]+"']").attr("checked","checked");
	
	//.removeClass('ui-radio-off').addClass('ui-radio-on');

	
	
	/*var test='<input type="radio" name="plan_select" id="'+achRevDetailsArray[5]+'"  value="'+achRevDetailsArray[5]+'" checked><label for="'+achRevDetailsArray[5]+'"></label>'
		
	$('#planlistDiv2').empty();
	$('#planlistDiv2').append(test).trigger('create');*/
	
	
		
	$("#typeOf_Facility").val(achRevDetailsArray[7]);
	$("#ex_manag_con").val(achRevDetailsArray[8]);
	$("#typeOf_activity").val(achRevDetailsArray[9]);
	$("#avail_handWash_fac").val(achRevDetailsArray[10]);
	$("#avail_WaterSoap_fac").val(achRevDetailsArray[11]);
	$("#typeOf_event").val(achRevDetailsArray[12]);
	$("#event_issues").val(achRevDetailsArray[13]);
	
	$("#cbo_combo").val(achRevDetailsArray[14]);
	$("#achID_show").val(achRevDetailsArray[14]);
	$("#ach_id").val(achRevDetailsArray[15]);
	
	$("#community_name").val(achRevDetailsArray[16]);
	$("#owner_name").val(achRevDetailsArray[17]);
		
	$("#s_male").val(achRevDetailsArray[18]);
	$("#s_female").val(achRevDetailsArray[19]);
	$("#s_boys").val(achRevDetailsArray[20]);
	$("#s_girls").val(achRevDetailsArray[21]);
	$("#s_boysUnder").val(achRevDetailsArray[22]);
	$("#s_girlsUnder").val(achRevDetailsArray[23]);
	$("#s_population").val(achRevDetailsArray[24]);
	$("#s_house_hold").val(achRevDetailsArray[25]);
	
	$("#b_male").val(achRevDetailsArray[26]);
	$("#b_female").val(achRevDetailsArray[27]);
	$("#b_boys").val(achRevDetailsArray[28]);
	$("#b_girls").val(achRevDetailsArray[29]);
	$("#b_boysUnder").val(achRevDetailsArray[30]);
	$("#b_girlsUnder").val(achRevDetailsArray[31]);
	$("#b_population").val(achRevDetailsArray[32]);
	$("#b_house_hold").val(achRevDetailsArray[33]);
	
	$("#l_male").val(achRevDetailsArray[34]);
	$("#l_female").val(achRevDetailsArray[35]);
	$("#l_boys").val(achRevDetailsArray[36]);
	$("#l_girls").val(achRevDetailsArray[37]);
	$("#l_boysUnder").val(achRevDetailsArray[38]);
	$("#l_girlsUnder").val(achRevDetailsArray[39]);
	$("#l_population").val(achRevDetailsArray[40]);
	$("#l_house_hold").val(achRevDetailsArray[41]);
	$("#dapMale").val(achRevDetailsArray[42]);
	$("#dapFemale").val(achRevDetailsArray[43]);
	$("#totalWiBen").val(achRevDetailsArray[44]);
	$("#totalInBen").val(achRevDetailsArray[45]);
	
	$("#serRecpent").val(achRevDetailsArray[46]);
	$("#serType").val(achRevDetailsArray[47]);
	
	$("#achPhoto").val(achRevDetailsArray[48]);	
	
	startDt=achRevDetailsArray[49]
	
	var achlat=$("#ach_lat").val(achRevDetailsArray[50]);
	var achlong=$("#ach_long").val(achRevDetailsArray[51]);
	
	var image = document.getElementById('myImageA');
    image.src = achRevDetailsArray[48];
    imagePathA = achRevDetailsArray[48];
	
	
	if (achRevDetailsArray[2]=='Water'){
		$("#ifHygiene").hide();		
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		$("#typeOf_act").hide();
		
		$("#ifWaterSani").show();
	}else if(achRevDetailsArray[2]=='Sanitation'){
		$("#typeOf_act").hide();
		$("#availHandWash_fac").hide();
		$("#availWaterSoap_fac").hide();		
		$("#ifHygiene").hide();	
		
		$("#ifWaterSani").show();
		$("#typeOfFac").show();
		$("#exManag_con").show();
	}else if(achRevDetailsArray[2]=='Hygiene'){
		$("#ifWaterSani").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		
		$("#ifHygiene").show();
		$("#typeOf_act").show();
	}else if(achRevDetailsArray[2]=='X-Sector'){
		$("#ifWaterSani").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		
		$("#ifHygiene").show();
		$("#typeOf_act").show();
	}else{
		$("#ifWaterSani").hide();
		$("#ifHygiene").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		$("#typeOf_act").hide();
		$("#availHandWash_fac").hide();
		$("#availWaterSoap_fac").hide();	
	}
	
	
	if (achRevDetailsArray[9]=='Basic'){
		$("#availHandWash_fac").show();
		$("#typeOfEvent").hide();
		$("#eventIssues").hide();
	}else if(achRevDetailsArray[9]=='Event'){
		$("#availHandWash_fac").hide();
		$("#availWaterSoap_fac").hide();
		$("#typeOfEvent").show();		
	}else{
		$("#availHandWash_fac").hide();
		$("#typeOfEvent").hide();
		$("#availWaterSoap_fac").hide();
		$("#eventIssues").hide();
	}	
	
	if(achRevDetailsArray[10]=='Yes'){
		$("#availWaterSoap_fac").show();
	}else if(achRevDetailsArray[10]=='No'){
		$("#availWaterSoap_fac").hide();
	}else{
		$("#availWaterSoap_fac").hide();
	}	
		
	if (achRevDetailsArray[12]=='Orientation' || achRevDetailsArray[12]=='Session' || achRevDetailsArray[12]=='Campaign'){
		$("#eventIssues").show();
	}else{
		$("#eventIssues").hide();
	}	
	
	
	/*if (achRevDetailsArray[48]==0 && achRevDetailsArray[49]==0){
		$('#btn_ach_lat_long').show();
	}*/
	
	$(".errorChk").text("");
	var url = "#servType";
	$.mobile.navigate(url);
}


function achiveDataSubmit(){
	$("#btn_ach_save").hide();
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
		$("#btn_ach_save").show();
		$("#btn_ach_submit").show();
	}else if((latitude==0 || longitude==0) ||(localStorage.latitudeAreaWq==0 || localStorage.longitudeAreaWq==0)){
			$(".errorChk").text("Please confirm your location");
			$("#btn_ach_save").show();
			$("#btn_ach_submit").show();
	}else{				
		if (achPlanId=='' || wordCode=='' ){
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
		//syncDataAch()
	}
}

function syncDataAch(){
	if(latitude==0 || longitude==0){
		latitude=localStorage.latitudeAreaWq;
		longitude=localStorage.longitudeAreaWq;
	}
	//alert(apipath+'submitAchiveData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&asinProject='+asinProject+'&asinDomain='+asinDomain+'&servicType='+servicType+'&serviceLevelWs='+serviceLevelWs+'&serviceLevelHy='+serviceLevelHy+'&achPlanId='+achPlanId+'&achPlanActivities='+achPlanActivities+'&typeOfFacility='+typeOfFacility+'&exManagCon='+exManagCon+'&typeOfActivity='+typeOfActivity+'&availHandWashFac='+availHandWashFac+'&availWaterSoapFac='+availWaterSoapFac+'&typeOfEven='+typeOfEven+'&evenIssues='+evenIssues+'&wordCode='+wordCode+'&achID='+achID+'&communityName='+communityName+'&ownerName='+ownerName+'&sMale='+sMale+'&sFemale='+sFemale+'&sBoys='+sBoys+'&sGirls='+sGirls+'&sBoysUnder='+sBoysUnder+'&sGirlsUnder='+sGirlsUnder+'&sPopulation='+sPopulation+'&sHouse_hold='+sHouse_hold+'&bMale='+bMale+'&bFemale='+bFemale+'&bBoys='+bBoys+'&bGirls='+bGirls+'&bBoysUnder='+bBoysUnder+'&bGirlsUnder='+bGirlsUnder+'&bPopulation='+bPopulation+'&bHouse_hold='+bHouse_hold+'&lMale='+lMale+'&lFemale='+lFemale+'&lBoys='+lBoys+'&lGirls='+lGirls+'&lBoysUnder='+lBoysUnder+'&lGirlsUnder='+lGirlsUnder+'&lPopulation='+lPopulation+'&lHouse_hold='+lHouse_hold+'&dapMale='+dapMale+'&dapFemale='+dapFemale+'&achServiceRecpt='+achServiceRecpt+'&achSerType='+achSerType+'&totalWiBen='+totalWiBen+'&totalInBen='+totalInBen+'&achPhoto='+achPhoto+'&startDt='+startDt+'&latitude='+latitude+'&longitude='+longitude)
	
	$.ajax({
		type: 'POST',
		url:apipath+'submitAchiveData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&asinProject='+asinProject+'&asinDomain='+asinDomain+'&servicType='+servicType+'&serviceLevelWs='+serviceLevelWs+'&serviceLevelHy='+serviceLevelHy+'&achPlanId='+achPlanId+'&achPlanActivities='+achPlanActivities+'&typeOfFacility='+typeOfFacility+'&exManagCon='+exManagCon+'&typeOfActivity='+typeOfActivity+'&availHandWashFac='+availHandWashFac+'&availWaterSoapFac='+availWaterSoapFac+'&typeOfEven='+typeOfEven+'&evenIssues='+evenIssues+'&wordCode='+wordCode+'&achID='+achID+'&communityName='+communityName+'&ownerName='+ownerName+'&sMale='+sMale+'&sFemale='+sFemale+'&sBoys='+sBoys+'&sGirls='+sGirls+'&sBoysUnder='+sBoysUnder+'&sGirlsUnder='+sGirlsUnder+'&sPopulation='+sPopulation+'&sHouse_hold='+sHouse_hold+'&bMale='+bMale+'&bFemale='+bFemale+'&bBoys='+bBoys+'&bGirls='+bGirls+'&bBoysUnder='+bBoysUnder+'&bGirlsUnder='+bGirlsUnder+'&bPopulation='+bPopulation+'&bHouse_hold='+bHouse_hold+'&lMale='+lMale+'&lFemale='+lFemale+'&lBoys='+lBoys+'&lGirls='+lGirls+'&lBoysUnder='+lBoysUnder+'&lGirlsUnder='+lGirlsUnder+'&lPopulation='+lPopulation+'&lHouse_hold='+lHouse_hold+'&dapMale='+dapMale+'&dapFemale='+dapFemale+'&achServiceRecpt='+achServiceRecpt+'&achSerType='+achSerType+'&totalWiBen='+totalWiBen+'&totalInBen='+totalInBen+'&achPhoto='+achPhoto+'&startDt='+startDt+'&latitude='+latitude+'&longitude='+longitude,
		
		
	   success: function(result) {
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
			
			$("input:radio[name='plan_select'][value='"+achPlanId+"']" ).attr('checked','');
			$("#wordCode").val("");
			
			achPlanId="";
			wordCode="";
			$(".errorChk").text('');
			$(".sucMsg").text('Successfully Submitted');
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


//======================================================================================Water quality data

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
//var user_w_payment="";

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
var wq_hach_fe="";
var wq_solinity_meter="";
var wq_mn_test_kit="";
var wq_test_kit_lab_test="";
var wq_micro_kit="";

var wq_ttc_cfu="";
//var wq_sl="";
var wq_as_ppb="";
//var wq_fe_ng="";
var wq_mn_ppb="";
var wq_chl_ppt="";
var wq_turb_ntu="";
//var wq_residual="";
var wq_chlorine="";
var wq_ph="";
var wq_boron="";
var wq_ironFe="";
var wq_c_bac="";
var wq_colour="";
var wq_odor="";
var wq_nitrate="";
var wq_zinc="";
var wq_condvity="";
//var wq_fluoride="";
var wq_fc="";

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
var wq_drinking_cooking="";
var wq_drinking_cooking_washing="";
var wq_others_option="";

var wq_potable_status="";
var wq_res_non_potable="";
var wq_no_potable_initiative_taken="";

var wq_wab_con="";
var wq_comm_con="";
var wq_total_cost="";

var wq_is_piped_W_connection="";
//var wq_piped_w_sup="";

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
			$(".errorChk").text("Required Ward Code ");
		}else if (wq_vill=="" ){
			$(".errorChk").text("Required Village/ward/slum Name ");
		}else if (test_type_val=="" ){
			$(".errorChk").text("Required Test Type ");
		}else if (type_of_wq_facility=="" ){
			$(".errorChk").text("Required Type of Water facility ");
		}else if (provided_by=="" ){
			$(".errorChk").text("Required Supported By ");
		}else{
			
			if(test_type_val=="Pre Instalation" ){
					
				$("#ironTest").hide();
				$("#isManagement").hide();
				$("#caretakerTrained").hide();
				var url="#waterData3";		
			}else if(test_type_val=="Monitoring"){
				var url="#waterData2";		
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
		//user_w_payment=$("input[name='user_w_payment']:checked").val();
		
		if (wq_maintain_by==undefined ){
			$(".errorChk").text("Required Maitained By ");
		/*}else if (user_w_payment==undefined ){
			$(".errorChk").text("Required user water payment ");*/
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
		
		wq_depth=$("#depthM").val();
				
		var last_d=$("#last_d").val();
		var last_m=$("#last_m").val();
		var last_y=$("#last_y").val();
		
		var sample_c_d=$("#sample_c_d").val();
		var sample_c_m=$("#sample_c_m").val();
		var sample_c_y=$("#sample_c_y").val();
			
		/*if(ins_d=="" || ins_m=="" || ins_y==""){
			$(".errorChk").text("Required Installation Date ");
		}else*/ 
		/*if (wq_depth=="" ){
			$(".errorChk").text("Required Depth ");
		}else if (first_d=="" || first_m=="" || first_y=="" ){
			$(".errorChk").text("Required Valid First Date ");
		}else*/ 
		if (last_d=="" || last_m=="" || last_y=="" ){
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
						
			//wq_first_date=first_y+"-"+first_m+"-"+first_d;
			wq_analysis_date=sample_c_y+"-"+sample_c_m+"-"+sample_c_d;	
			wq_last_date=last_y+"-"+last_m+"-"+last_d;				
			
			var wq_ins = new Date(wq_ins_date);
			//var wq_first = new Date(wq_first_date);
			var wq_last = new Date(wq_last_date);
			var wq_analysis = new Date(wq_analysis_date);
			
			var date_flag=true;
			var dateError="";
			
			/*if (wq_ins=='Invalid Date'){
				date_flag=false;
				dateError="Invalid installation Date "+wq_ins_date;
			}else if (wq_first=='Invalid Date'){
				date_flag=false;
				dateError="Invalid First Date "+wq_first_date;				
			}else */if(wq_last=='Invalid Date'){
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
					/*if (wq_first>currentDay){
						$(".errorChk").text("Required First Date Less Than Today");				
					}else*/ if(wq_last>currentDay){
						$(".errorChk").text("Required Last Date Less Than Today");
					}else if(wq_analysis>currentDay){
						$(".errorChk").text("Required Sample collection Date Less Than Today");
					}else{
						/*if(wq_first>wq_last){
							$(".errorChk").text("Required Last Date Greater Than First Date");				
						}else{*/
							/*if(wq_last<wq_analysis){
								$(".errorChk").text("Required sample collection Date Less then Last Date");
							}else{*/
								$(".errorChk").text("");
								if (test_type_val=="Pre Instalation"){
									var url="#waterData7";				
									$.mobile.navigate(url);								
								}else{
									var url="#waterData4";				
									$.mobile.navigate(url);
								}
								
								//$(location).attr('href',url);
								/*}*/
							  //} 
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

function testType(){
	provided_by=$("#providedBy").val();
	
	type_val=$("#test_type").val();
	if(type_val=="Pre Instalation"){
		$("#facility_Id").hide();
		
		//=========hide
		$("#tech_sl").hide();
		$("#tech_fe").hide();
		$("#tech_residual").hide();
		$("#tech_chl").hide();
		$("#tech_colour").hide();		
		$("#tech_mn").hide();		
		$("#iron_Fe").hide();
		$("#tech_clorine").hide();
		$("#tech_condvity").hide();
		$("#tech_odor").hide();
		$("#tech_zinc").hide();
		$("#tech_boron").hide();	
		$("#tech_c_bac").hide();
		$("#tech_nitrate").hide();
		$("#tech_fluoride").hide();	
		$("#tech_turb").hide();
		$("#tech_ph").hide();	
		//level
		$("#otherPartBoreDate").hide();
		//waterData3 
		$("#installation_date").hide();
		$("#depth").hide();
		$("#water_level").hide();
		$("#water_quantity").hide();
		$("#bore_hole").hide();
		$("#dont_pree_install").hide();
		$("#dont_pree_install_val").hide();
		$("#manu_dril_bore").hide();
		$("#mech_dril_bore").hide();
		
		//==========show
		$("#tech_ttc").show();
		$("#tech_as").show();
			
		$("#tube_Well").show();	
		$("#fc").show();
		//level	
		$("#pree_install").show();	
		$("#pree_install_val").show();	
	}else if(type_val=="During Instalation" ){		
		//hide
		$("#tech_sl").hide();
		$("#tech_fe").hide();						
		$("#tube_Well").hide();	
		$("#tech_residual").hide();
		$("#tech_fluoride").hide();		
		$("#water_level").hide();		
		$("#water_quantity").hide();
		//level	
		$("#otherPartBoreDate").hide();
		$("#renovationDate").hide();
		$("#pree_install").hide();	
		$("#pree_install_val").hide();		
		//==========show
		$("#facility_Id").show();	
		$("#depth").show();	
		$("#tech_ttc").show();
		$("#tech_as").show();
		$("#tech_mn").show();	
		$("#tech_turb").show();
		
		$("#tech_clorine").show();
		$("#tech_boron").show();
		$("#tech_c_bac").show();
		$("#tech_odor").show();
		$("#tech_nitrate").show();
		$("#tech_zinc").show();
		$("#tech_condvity").show();		
		$("#tech_colour").show();
		$("#iron_Fe").show();
		$("#installation_date").show();
		$("#installDate").show();
		$("#fc").show();
		$("#bore_hole").show()
		$("#manu_dril_bore").show();
		$("#mech_dril_bore").show();	
		$("#tech_ph").show();			
		//level		
		$("#dont_pree_install").show()
		$("#dont_pree_install_val").show()
	}else if(type_val=="Renovation Instalation"){
		//hide		
		$("#water_level").hide();
			
		$("#tech_sl").hide();
		$("#tech_fe").hide();			
		$("#tech_condvity").hide();
		$("#otherPart").hide();		
		$("#installDate").hide();		
		$("#water_quantity").hide();
		$("#tube_Well").hide();		
		$("#pree_install").hide();
		$("#pree_install_val").hide();	
		$("#tech_fluoride").hide();	
		$("#tech_residual").hide();
		$("#tech_nitrate").hide();
		//show
		$("#depth").show();
		$("#tech_ttc").show();
		$("#tech_as").show();
		$("#tech_mn").show();	
		$("#tech_turb").show();
		$("#tech_ph").show();			
		$("#tech_clorine").show();
		$("#tech_boron").show();
		$("#tech_c_bac").show();
		$("#tech_odor").show();		
		$("#tech_zinc").show();		
		$("#tech_colour").show();
		$("#iron_Fe").show();
		$("#manu_dril_bore").show();
		$("#mech_dril_bore").show();
		$("#facility_Id").show();	
		$("#tech_chl").show();
		$("#otherPartBoreDate").show();
		$("#renovationDate").show();
		$("#bore_hole").show()
		$("#dont_pree_install").show()	
		$("#dont_pree_install_val").show()
		$("#renovationDate").show()
	}else{
		//hide		
		$("#tech_sl").hide();
		$("#tech_fe").hide();
		$("#tech_residual").hide();		
		$("#tech_colour").hide();	
		
		$("#otherPartBoreDate").hide();
		$("#renovationDate").hide();
		$("#tube_Well").hide();	
		$("#pree_install").hide();
		$("#pree_install_val").hide();		
		//$("#installDate").hide();
		$("#water_level").hide();		
		$("#water_quantity").hide();	
		$("#tech_fluoride").hide();
		//show
		$("#facility_Id").show();		
		$("#tech_ttc").show();
		$("#tech_as").show();
		$("#tech_mn").show();	
		$("#tech_clorine").show();
		$("#tech_turb").show();
		$("#tech_chl").show();
		$("#iron_Fe").show();		
		$("#tech_boron").show();
		$("#tech_c_bac").show();
		$("#tech_odor").show();
		$("#tech_nitrate").show();
		$("#tech_zinc").show();
		$("#tech_condvity").show();		
		$("#tech_colour").show();
		$("#installation_date").show();
		$("#installDate").show();
		$("#otherPart").show();
		$("#bore_hole").show()
		$("#dont_pree_install").show()	
		$("#dont_pree_install_val").show()
		$("#manu_dril_bore").show();
		$("#mech_dril_bore").show();
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
			wq_hach_fe=$("input[name='hach_fe']:checked").val();
			wq_solinity_meter=$("input[name='solinity_meter']:checked").val();
			wq_mn_test_kit=$("input[name='mn_test_kit']:checked").val();
			wq_test_kit_lab_test=$("input[name='test_kit_lab_test']:checked").val();
			wq_micro_kit=$("input[name='micro_kit']:checked").val();
				
			wq_ttc_cfu=$("#ttc_cfu").val();
			//wq_sl=$("#sl").val();
			wq_as_ppb=$("#as_ppb").val();
			//wq_fe_ng=$("#fe_ng").val();
			wq_mn_ppb=$("#mn_ppb").val();
			wq_chl_ppt=$("#chl_ppt").val();
			wq_turb_ntu=$("#turb_ntu").val();
			//wq_residual=$("#residual").val();
			wq_chlorine=$("#clorine").val();
			wq_ph=$("#ph").val();
			wq_boron=$("#boron").val();
			wq_ironFe=$("#ironFe").val();
			wq_c_bac=$("#c_bac").val();
			wq_colour=$("#colour").val();
			wq_odor=$("#odor").val();
			wq_nitrate=$("#nitrate").val();
			wq_zinc=$("#zinc").val();
			wq_condvity=$("#condvity").val();
			//wq_fluoride=$("#fluoride").val();			
			wq_fc=$("#select_fc").val();
			
						
			$(".errorChk").text("");
			if(test_type_val=="Pre Instalation"){				
				$("#isManagement").hide();
				$("#m_comm_ori").hide();
				$("#m_comm_ori_no").hide();
				$("#caretakerTrained").hide();
				$("#caretakerTrainedNo").hide();
				$("#typeOfRenovation").hide();
				$("#other_alt").hide();
				$("#smpleAnaly").hide();	
				$("#installationDone").hide();	
				var url = "#waterData14";
			}else{
				var url = "#waterData8";
			}
			$.mobile.navigate(url);
			//$(location).attr('href',url);
		}
		
	};	



//---------------------- waterData8 Next

	
	//$("#waterData9").hide();
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
		
			if(test_type_val=="During Instalation" && wq_tw_color=="Red" ){	
					
				$("#managementCommittee").hide();
				$("#typeOfRenovation").hide();
				//show
				$("#safeWaterOPtion").show();	
				$("#safW_altOption").show();
				$("#safW_dist").show();
				$("#saf_acT").show();
				var url="#waterData9";
			}else if(test_type_val=="During Instalation" && wq_tw_color=="Green" ){				
				$("#managementCommittee").hide();
				$("#typeOfRenovation").hide();				
				var url="#waterData9_1";
			}else if(test_type_val=="During Instalation" && wq_tw_color=="NA" ){		
				$("#safeWaterOPtion").hide();	
				$("#safW_altOption").hide();
				$("#safW_dist").hide();
				$("#saf_acT").hide();
				var url="#waterData9";		
			}else if(test_type_val=="Renovation Instalation" && wq_tw_color=="Green"){
				//hide		
				$("#pipe_conc").hide();	
				$("#installationDone").hide();		
				$("#PreeInstallUseOfChk").hide();
				$("#managementCommittee").hide();
				//show
				$("#smpleAnaly").show();
				$("#typeOfRenovation").show();
				//var url="#waterData9";
				var url="#waterData9_1";
			}else if(test_type_val=="Renovation Instalation" && wq_tw_color=="Red"){
				//hide
				$("#pipe_conc").hide();	
				$("#installationDone").hide();		
				//show
				$("#safeWaterOPtion").show();	
				$("#safW_altOption").show();
				$("#safW_dist").show();
				$("#saf_acT").show();
				var url="#waterData9";
			}else if(test_type_val=="Renovation Instalation" && wq_tw_color=="NA"){	
				$("#pipe_conc").hide();	
				$("#installationDone").hide();						
				$("#safeWaterOPtion").hide();	
				$("#safW_altOption").hide();
				$("#safW_dist").hide();
				$("#saf_acT").hide();
				var url="#waterData9";		
			}else if(test_type_val=="Monitoring" && wq_tw_color=="Green"){
				//hide
				$("#pipe_conc").hide();	
				$("#PreeInstallUseOfChk").hide();
				$("#managementCommittee").hide();				
				$("#installationDone").hide();					
				//show
				$("#typeOfRenovation").show();
				//var url="#waterData9";
				var url="#waterData9_1";
			}else if(test_type_val=="Monitoring" && wq_tw_color=="Red"){			
				//hide
				$("#managementCommittee").hide();
				$("#typeOfRenovation").hide();
				$("#installationDone").hide();
				//show
				$("#safeWaterOPtion").show();	
				$("#safW_altOption").show();
				$("#safW_dist").show();
				$("#saf_acT").show();
				var url="#waterData9";
			}else{
				$("#typeOfRenovation").hide();
				$("#installationDone").hide();
				$("#safeWaterOPtion").hide();	
				$("#safW_altOption").hide();
				$("#safW_dist").hide();
				$("#saf_acT").hide();
								
				var url="#waterData9";	
			}
	
			$.mobile.navigate(url);
			//$(location).attr('href',url);
				
			}
			
		//}
		
	}
	


//----------------------------water quality data 9 

var arc_patient_yn="";	
function waterData9Next(){
	sw_option=$("input[name='sw_option']:checked").val();
	alt_option=$("input[name='alt_option']:checked").val();
	sw_distance=$("input[name='sw_distance']:checked").val();
	ac_taken=$("input[name='ac_taken']:checked").val();
	
	arc_patient_yn=$("#arc_patient_yn").val();
	arc_patient=$("#arc_patient").val();
	
	if(test_type_val=="During Instalation" && wq_tw_color=="Red" && sw_option=="Yes"){
			
		if(sw_option==undefined ){
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
	}else if(test_type_val=="During Instalation" && wq_tw_color=="NA" && sw_option=="NO"){
			
		if (arc_patient_yn=="YES" && arc_patient==""){
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
	}else{
		if (arc_patient_yn=="YES" && arc_patient==""){
			$(".errorChk").text("Required How many patient");
		}else{
			if(arc_patient==""){
				arc_patient=0;
				}
			$(".errorChk").text("");
			var url="#waterData9_1";
			$.mobile.navigate(url);		
		}		
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
	
	wq_functional=$("input[name='functionality']:checked").val();	
	
	wq_drinking=$("input[name='drinking']:checked").val();
	wq_cooking=$("input[name='cooking']:checked").val();
	wq_washing=$("input[name='washing']:checked").val();
	wq_drinking_cooking=$("input[name='drinking_cooking']:checked").val();
	wq_drinking_cooking_washing=$("input[name='drinking_cooking_washing']:checked").val();
	wq_others_option=$("input[name='others_option']:checked").val();
	//alert(wq_drinking+"-"+wq_cooking+"-"+wq_washing+"-"+wq_drinking_cooking+"-"+wq_drinking_cooking_washing+"-"+wq_others_option);
	if(wq_functional==undefined){
		$(".errorChk").text("Required functionality");
			
	/*}else if($("#useOfChk").find("input[type=checkbox]:checked").length==0 ){
			$(".errorChk").text("Select One use of ");	*/
	}else{
		$(".errorChk").text("");
		var url="#waterData11";
		//}
	}
	$.mobile.navigate(url);
	//$(location).attr('href',url);
	}

//----------------------------water quality data 11
function potableStatus(){
	wq_potable_status=$("input[name='potable_st']:checked").val();
	if(wq_tw_color == "Green"){
		if(wq_potable_status=="Yes"){
			$("#non_potbl_res").hide();
			$("#non_potbl_res_followup_ac").hide();
		}else{
			$("#non_potbl_res").show();
			$("#non_potbl_res_followup_ac").show();
		}
	}else{
		if(wq_potable_status=="Yes"){
			$("#non_potbl_res").hide();
			$("#non_potbl_res_followup_ac").hide();
		}else{
			$("#non_potbl_res").show();
			$("#non_potbl_res_followup_ac").hide();
		}
	}
}
		
function waterData11Next(){
	if($("#potableStatus").find("input[name=potable_st]:checked").length==0){
		$(".errorChk").text("Required Potable Status");
	}else{
		wq_potable_status=$("input[name='potable_st']:checked").val();
		wq_res_non_potable=$("#reason_non_potable").val();
		wq_no_potable_initiative_taken=$("#non_potable_ini").val();
		//|| test_type_val=="Monitoring" || test_type_val=="Cross Check" 
		/*if(test_type_val=="Pre Instalation" ){
			var url="#waterData13";
		}else{*/
		var url="#waterData12";
		//}
					
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
		//wq_piped_w_sup=$("#piped_w_sup").val();
		
		if(test_type_val=="Renovation Instalation" || test_type_val=="Monitoring"){
			if(wq_wab_con==""){
				$(".errorChk").text("Required WAB Contribution");
			}else if(wq_comm_con==""){
				$(".errorChk").text("Required Community Contribution");
			}else if(wq_total_cost==""){
				$(".errorChk").text("Required Total Cost");
			
			}else{						
				$(".errorChk").text("");
				var url="#waterData13";
				$.mobile.navigate(url);
				//$(location).attr('href',url);
			}
		}else{
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
			}
		}
}

//----------------------------water quality data 13 

function waterData13Next(){
		wq_all_test_complete=$("input[name='all_test_complt']:checked").val();
		//wq_res_n_test=$("#res_n_test").val();
		wq_res_n_test=$("input[name='res_n_test']:checked").val();
		
		if(wq_all_test_complete==undefined){
			$(".errorChk").text("Required all test complete");
		}else{
			$(".errorChk").text("");
			if (provided_by=='WAB' && test_type_val=="During Instalation" ){
				$("#installationDone").hide();
				var url="#waterData14";
			}else if(provided_by=='WAB' && test_type_val=="Renovation Instalation"){
				$("#isManagement").show();
				$("#m_comm_ori").show();
				$("#m_comm_ori_no").show();
				$("#caretakerTrained").show();
				$("#caretakerTrainedNo").show();
				$("#monitoring_new_option").hide();				
				$("#typeOfRenovation").hide();
				$("#other_alt").hide();
				$("#installationDone").hide();	
				var url="#waterData14";	
			}else if(provided_by=='WAB' && test_type_val=="Monitoring"){
				$("#isManagement").show();
				$("#m_comm_ori").show();
				//$("#m_comm_ori_no").show();
				$("#caretakerTrained").show();
				$("#caretakerTrainedNo").show();			
				$("#typeOfRenovation").hide();
				$("#other_alt").hide();
				$("#installationDone").hide();	
				var url="#waterData14";					
			}else{
				$("#isManagement").hide();
				$("#m_comm_ori").hide();
				$("#m_comm_ori_no").hide();
				$("#caretakerTrained").hide();
				$("#caretakerTrainedNo").hide();
				$("#typeOfRenovation").hide();
				$("#other_alt").hide();
				$("#installationDone").hide();	
				var url="#waterData14";	
			}
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
//test_type_val=="Pre Instalation" && wq_tw_color=="Red"
function renovationDone(){
	if(test_type_val=="Pre Instalation" && wq_tw_color=="Red"){
	
	}else {
		var renova_done=$("input[name='renovation_done']:checked").val();
		//alert(renova_done);
		if(renova_done=='Others'){
			$("#other_alt").show();
		}else{
			$("#other_alt").hide();
		}
}
}

//===========
function WaterQDataSave(){
		$(".errorChk").text("");		
		$("#btn_wq_save").hide();
		$("#btn_wq_submit").hide();
				
		wq_management_committee_exist=$("input[name='m_comm_ext']:checked").val();
		wq_management_committee_ori=$("input[name='m_comm_ori_complt']:checked").val();
		wq_management_committee_not_ori=$("input[name='m_comm_ori_no']:checked").val();
		wq_management_committee_not_new_option=$("input[name='new_option']:checked").val();//new
		wq_caretaker_trained=$("input[name='caretaker_train']:checked").val();
		wq_caretaker_trained_not=$("input[name='caretaker_train_no']:checked").val();
		alt_others=$("#alt").val();
		wq_sample_analysis=$("input[name='smpl_analy']:checked").val();
		wq_renovation_type=$("input[name='renovation_done']:checked").val();
		wq_installation_done=$("input[name='install_done']:checked").val();
		
					
		
		if(wq_sample_analysis=="" && test_type_val!="Pre Instalation"){
			$(".errorChk").text("Required Sample Analysis");
			$("#btn_wq_save").show();
		}else{
												
			if (type_of_wq_facility==undefined){
				type_of_wq_facility='';
			}
			if(wq_ref==undefined){
				wq_ref='';
			}		
			if(wq_id==undefined){
				wq_id='';
			}	
			if(wq_plat_condition==undefined){
				wq_plat_condition='';
			}
			if(drain_condition==undefined){
				drain_condition='';
			}
			if(wp_repair==undefined){
				wp_repair='';
			}
			if(chamber_condition==undefined){
				chamber_condition='';
			}	
			if(wq_ins_date==undefined){
				wq_ins_date='';
			}
			if(wq_depth==undefined){
				wq_depth='';
			}
			if(wq_appDate==undefined){
				wq_appDate='';
			}
			if(wq_siteSelectDate==undefined){
				wq_siteSelectDate='';
			}	
			if(wq_handOvrDate==undefined){
				wq_handOvrDate='';
			}
			if(wq_owner_name==undefined){
				wq_owner_name='';
			}
			if(wq_owner_phone==undefined){
				wq_owner_phone=0;
			}
			if(wq_caretaker==undefined){
				wq_caretaker='';
			}
			if (caretakerPhone==undefined){
				caretakerPhone=0;
			}
			if (wq_select_tech==undefined){
				wq_select_tech='';
			}
			if (wq_pota==undefined){
				wq_pota='';
			}
			if (wq_delAgua==undefined){
				wq_delAgua='';
			}
			if (wq_hach_ez_as==undefined){
				wq_hach_ez_as='';
			}
			if (wq_hach_fe==undefined){
				wq_hach_fe='';
			}
			if (wq_solinity_meter==undefined){
				wq_solinity_meter='';
			}
			if (wq_mn_test_kit==undefined){
				wq_mn_test_kit='';
			}
			if (wq_test_kit_lab_test==undefined){
				wq_test_kit_lab_test='';
			}
			if (wq_micro_kit==undefined){
				wq_micro_kit='';
			}
			if (sw_option==undefined){
				sw_option='';
			}
			if (alt_option==undefined){
				alt_option='';
			}
			if (sw_distance==undefined){
				sw_distance='';
			}
			if (ac_taken==undefined){
				ac_taken='';
			}
			if (arc_patient_yn==undefined){
				arc_patient_yn='';
			}
			if (arc_patient==undefined){
				arc_patient='';
			}
			if (wq_san_risk_sc==undefined){
				wq_san_risk_sc='';
			}
			if (wq_functional==undefined){
				wq_functional='';
			}
			if (wq_drinking==undefined){
				wq_drinking='';
			}
			if (wq_cooking==undefined){
				wq_cooking='';
			}
			if (wq_washing==undefined){
				wq_washing='';
			}
			if (wq_drinking_cooking==undefined){
				wq_drinking_cooking='';
			}
			if (wq_drinking_cooking_washing==undefined){
				wq_drinking_cooking_washing='';
			}
			if (wq_others_option==undefined){
				wq_others_option='';
			}
			if (wq_potable_status==undefined){
				wq_potable_status='';
			}
			if (wq_potable_status==undefined){
				wq_potable_status='';
			}
			if (wq_res_non_potable==undefined){
				wq_res_non_potable='';
			}
			if (wq_no_potable_initiative_taken==undefined){
				wq_no_potable_initiative_taken='';
			}
			if (wq_wab_con==undefined){
				wq_wab_con='';
			}
			if (wq_comm_con==undefined){
				wq_comm_con='';
			}
			if (wq_total_cost==undefined){
				wq_total_cost='';
			}
			if (wq_do_user_pay==undefined){
				wq_do_user_pay='';
			}
			if (wq_is_piped_W_connection==undefined){
				wq_is_piped_W_connection='';
			}
			if (wq_all_test_complete==undefined){
				wq_all_test_complete='';
			}
			if (wq_res_n_test==undefined){
				wq_res_n_test='';
			}
			if(wq_management_committee_exist==undefined){
				wq_management_committee_exist="";
			}
			if(wq_management_committee_ori==undefined){
				wq_management_committee_ori="";
			}					
			if(wq_management_committee_not_ori==undefined){
				wq_management_committee_not_ori="";
			}
			if(wq_management_committee_not_new_option==undefined){
				wq_management_committee_not_new_option="";
			}
			if(wq_caretaker_trained==undefined){
				wq_caretaker_trained="";
			}
			if(wq_caretaker_trained_not==undefined){
				wq_caretaker_trained_not="";
			}				
			if(alt_others==undefined){
				alt_others="";
			}
			if(wq_renovation_type==undefined){
				wq_renovation_type="";
			}
			if(wq_installation_done==undefined){
				wq_installation_done="";
			}
			if(wq_sample_analysis==undefined){
				wq_sample_analysis="";
			}
			
		}
			
			wq_photo=$("#wq_photo").val();
			
			latitudewq=$("#wq_lat").val();
			longitudewq=$("#wq_long").val();
			
						
			if (wq_photo=="" || wq_photo==undefined){
				$(".errorChk").text("Please confirm Photo");
				$("#btn_wq_save").show();
				$("#btn_wq_submit").show();
			}else if((latitudewq==0 || longitudewq==0) || (localStorage.latitudeAreaWq==0 || localStorage.longitudeAreaWq==0)){	
				$(".errorChk").text("Please confirm your location");
				$("#btn_wq_save").show();
				$("#btn_wq_submit").show();		
			}else{
				if(latitudewq==0 || longitudewq==0){
					latitudewq=localStorage.latitudeAreaWq;
					longitudewq=localStorage.longitudeAreaWq;
				}
																																																																																																																																																								
					waterQualitySave=wq_plan_id+'|||'+wq_CBO_id+'|||'+wq_vill+'|||'+provided_by+'|||'+test_type_val+'|||'+type_of_wq_facility+'|||'+wq_ref+'|||'+wq_id+'|||'+wq_plat_condition+'|||'+drain_condition+'|||'+wp_repair+'|||'+chamber_condition+'|||'+wq_maintain_by+'|||'+wq_ins_date+'|||'+wq_depth+'|||'+wq_analysis_date+'|||'+wq_last_date+'|||'+wq_appDate+'|||'+wq_siteSelectDate+'|||'+wq_handOvrDate+'|||'+wq_owner_name+'|||'+wq_owner_phone+'|||'+wq_caretaker+'|||'+caretakerPhone+'|||'+wq_select_tech+'|||'+wq_pota+'|||'+wq_delAgua+'|||'+wq_hach_ez_as+'|||'+wq_hach_fe+'|||'+wq_solinity_meter+'|||'+wq_mn_test_kit+'|||'+wq_test_kit_lab_test+'|||'+wq_micro_kit+'|||'+wq_ttc_cfu+'|||'+wq_as_ppb+'|||'+wq_mn_ppb+'|||'+wq_chl_ppt+'|||'+wq_chlorine+'|||'+wq_turb_ntu+'|||'+wq_ph+'|||'+wq_boron+'|||'+wq_ironFe+'|||'+wq_c_bac+'|||'+wq_colour+'|||'+wq_odor+'|||'+wq_nitrate+'|||'+wq_zinc+'|||'+wq_condvity+'|||'+wq_fc+'|||'+wq_tested_at+'|||'+wq_iron_test+'|||'+wq_tw_color+'|||'+sw_option+'|||'+alt_option+'|||'+sw_distance+'|||'+ac_taken+'|||'+arc_patient_yn+'|||'+arc_patient+'|||'+wq_san_ins+'|||'+wq_inspect_date+'|||'+wq_san_risk_sc+'|||'+wq_functional+'|||'+wq_drinking+'|||'+wq_cooking+'|||'+wq_washing+'|||'+wq_drinking_cooking+'|||'+wq_drinking_cooking_washing+'|||'+wq_others_option+'|||'+wq_potable_status+'|||'+wq_res_non_potable+'|||'+wq_no_potable_initiative_taken+'|||'+wq_wab_con+'|||'+wq_comm_con+'|||'+wq_total_cost+'|||'+wq_do_user_pay+'|||'+wq_is_piped_W_connection+'|||'+wq_all_test_complete+'|||'+wq_res_n_test+'|||'+wq_management_committee_exist+'|||'+wq_management_committee_ori+'|||'+wq_management_committee_not_ori+'|||'+wq_management_committee_not_new_option+'|||'+wq_caretaker_trained+'|||'+wq_caretaker_trained_not+'|||'+alt_others+'|||'+wq_sample_analysis+'|||'+wq_renovation_type+'|||'+wq_installation_done+'|||'+wq_photo+'|||'+wq_activities+'|||'+startDtWq+'|||'+latitudewq+'|||'+longitudewq;
				
	
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
					}//lat
			}
				
}

function deleteWqReview(){	
		arrayIdWq=eval($("input[name='wqReviewRad']:checked").val());
		confirmDelWQ=$("input[name='delConfirmWQ']:checked").val();
		
		if (arrayIdWq ==undefined){							
			$(".errorChk").text("Select a Record");
		}else if(confirmDelWQ==undefined || confirmDelWQ==""){
			$(".errorChk").text("Please Confirm Delete");
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
				wqArray=waterQSaveArray[m].split('|||');
				planIDWq=wqArray[0];
				//cboIDWq=wqArray[1];
				WqActivities=wqArray[89];
				
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
	$('#btn_take_wq_pic').hide();
			
	if($("#reviewWqList").find("input[name=wqReviewRad]:checked").length==0){
		$(".errorChk").text("Select a Record");
	}else{
	
		reviewWQDisplayFlag=true;
		arrayIdWq=eval($("input[name='wqReviewRad']:checked").val());
		
		
		var waterQRevArray2=localStorage.water_q_save.split('rdrd');
		
		var waterQRevDetails=waterQRevArray2[arrayIdWq]; 
		
		var waterQRevDetailsArray=waterQRevDetails.split('|||');
		
		
		//------------------
		$( "input:radio[name='plan_select_wq'][value='"+waterQRevDetailsArray[0]+"']" ).attr('checked','checked');
		//$("#plan_select").val(achRevDetailsArray[0])
		
		$("#wq_cbo_combo").val(waterQRevDetailsArray[1]);
		$("#wq_vill").val(waterQRevDetailsArray[2]);
		$("#providedBy").val(waterQRevDetailsArray[3]);
		$("#test_type").val(waterQRevDetailsArray[4]);
		$("#type_of_wq_facility").val(waterQRevDetailsArray[5]);				
		$("#wq_ref").val(waterQRevDetailsArray[6]);
		$("#wq_id").val(waterQRevDetailsArray[7]);
		//---------------------------------------------------
		$("#plat_condition").val(waterQRevDetailsArray[8]);
		$("#drain_condition").val(waterQRevDetailsArray[9]);
		$("#wp_repair").val(waterQRevDetailsArray[10]);
		$("#chamber_condition").val(waterQRevDetailsArray[11]);
		
		$( "input:radio[name='maintain_by'][value='"+waterQRevDetailsArray[12]+"']" ).attr('checked','checked');
		//$( "input:radio[name='user_w_payment'][value='"+waterQRevDetailsArray[11]+"']" ).attr('checked','checked');
		//---------------------------------------------------------------------------------------------------------------
					
		var install_date_array=waterQRevDetailsArray[13].split("-");
			
			$("#ins_d").val(install_date_array[2]);
			$("#ins_m").val(install_date_array[1]);
			$("#ins_y").val(install_date_array[0]);
		
		$("#depthM").val(waterQRevDetailsArray[14]);
		
		var collection_date_array=waterQRevDetailsArray[15].split("-");
			$("#sample_c_d").val(collection_date_array[2]);
			$("#sample_c_m").val(collection_date_array[1]);
			$("#sample_c_y").val(collection_date_array[0]);
		
		var sample_date_array=waterQRevDetailsArray[16].split("-");
			$("#last_d").val(sample_date_array[2]);
			$("#last_m").val(sample_date_array[1]);
			$("#last_y").val(sample_date_array[0]);
				
		var app_date_array=waterQRevDetailsArray[17].split("-");		
			$("#app_d").val(app_date_array[2]);
			$("#app_m").val(app_date_array[1]);
			$("#app_y").val(app_date_array[0]);
			
		var selectionDate=waterQRevDetailsArray[18].split("-");
			$("#site_sel_d").val(selectionDate[2]);
			$("#site_sel_m").val(selectionDate[1]);
			$("#site_sel_y").val(selectionDate[0]);
		
		var hand_date_array=waterQRevDetailsArray[19].split("-");
			$("#hnd_ovr_d").val(hand_date_array[2]);
			$("#hnd_ovr_m").val(hand_date_array[1]);
			$("#hnd_ovr_y").val(hand_date_array[0]);
		
		//--------------------
		$("#ownerName").val(waterQRevDetailsArray[20]);
		$("#ownerPhone").val(waterQRevDetailsArray[21]);		
		$("#caretaker").val(waterQRevDetailsArray[22]);
		$("#caretakerPhoneNo").val(waterQRevDetailsArray[23]);
		//--------------------
		$("#select_tech").val(waterQRevDetailsArray[24]);
		
		$( "input:checkbox[name='pota'][value='"+waterQRevDetailsArray[25]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='delAgua'][value='"+waterQRevDetailsArray[26]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='hach_ez_as'][value='"+waterQRevDetailsArray[27]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='hach_fe'][value='"+waterQRevDetailsArray[28]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='solinity_meter'][value='"+waterQRevDetailsArray[29]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='mn_test_kit'][value='"+waterQRevDetailsArray[30]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='test_kit_lab_test'][value='"+waterQRevDetailsArray[31]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='micro_kit'][value='"+waterQRevDetailsArray[32]+"']" ).attr('checked','checked');
						
		$("#ttc_cfu").val(waterQRevDetailsArray[33]);
		$("#as_ppb").val(waterQRevDetailsArray[34]);
		$("#mn_ppb").val(waterQRevDetailsArray[35]);
		$("#chl_ppt").val(waterQRevDetailsArray[36]);
		$("#chlorine").val(waterQRevDetailsArray[37]);
		$("#turb_ntu").val(waterQRevDetailsArray[38]);		
		$("#ph").val(waterQRevDetailsArray[39]);
		$("#boron").val(waterQRevDetailsArray[40]);
		$("#ironFe").val(waterQRevDetailsArray[41]);
		$("#c_bac").val(waterQRevDetailsArray[42]);
		$("#colour").val(waterQRevDetailsArray[43]);
		$("#odor").val(waterQRevDetailsArray[44]);
		$("#nitrate").val(waterQRevDetailsArray[45]);
		$("#zinc").val(waterQRevDetailsArray[46]);
		$("#condvity").val(waterQRevDetailsArray[47]);
		$("#select_fc").val(waterQRevDetailsArray[48]);
		//--------------------
		$( "input:radio[name='tested_at'][value='"+waterQRevDetailsArray[49]+"']" ).attr('checked','checked');
		$( "input:radio[name='iron_test'][value='"+waterQRevDetailsArray[50]+"']" ).attr('checked','checked');
		$( "input:radio[name='tw_painter'][value='"+waterQRevDetailsArray[51]+"']" ).attr('checked','checked');
		
		$( "input:radio[name='sw_option'][value='"+waterQRevDetailsArray[52]+"']" ).attr('checked','checked');
		$( "input:radio[name='alt_option'][value='"+waterQRevDetailsArray[53]+"']" ).attr('checked','checked');
		$( "input:radio[name='sw_distance'][value='"+waterQRevDetailsArray[54]+"']" ).attr('checked','checked');
		$( "input:radio[name='ac_taken'][value='"+waterQRevDetailsArray[55]+"']" ).attr('checked','checked');
				
		$("#arc_patient_yn").val(waterQRevDetailsArray[56]);
		$("#arc_patient").val(waterQRevDetailsArray[57]);
		//--------------------
		$("#san_ins_yn").val(waterQRevDetailsArray[58]);
		
		var sanInspecDate=waterQRevDetailsArray[59].split("-");
			$("#insp_d").val(sanInspecDate[2]);
			$("#insp_m").val(sanInspecDate[1]);
			$("#insp_y").val(sanInspecDate[0]);		
				
		$("#san_risk_sc").val(waterQRevDetailsArray[60]);
		//--------------------		
		$( "input:radio[name='functionality'][value='"+waterQRevDetailsArray[61]+"']" ).attr('checked','checked');
		
		$( "input:checkbox[name='drinking'][value='"+waterQRevDetailsArray[62]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='cooking'][value='"+waterQRevDetailsArray[63]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='washing'][value='"+waterQRevDetailsArray[64]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='drinking_cooking'][value='"+waterQRevDetailsArray[65]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='drinking_cooking_washing'][value='"+waterQRevDetailsArray[66]+"']" ).attr('checked','checked');
		$( "input:checkbox[name='others_option'][value='"+waterQRevDetailsArray[67]+"']" ).attr('checked','checked');		
		//--------------------	
		$( "input:radio[name='potable_st'][value='"+waterQRevDetailsArray[68]+"']" ).attr('checked','checked');		
		$("#reason_non_potable").val(waterQRevDetailsArray[69]);
		$("#non_potable_ini").val(waterQRevDetailsArray[70]);
			
		$("#wab_con").val(waterQRevDetailsArray[71]);
		$("#comm_con").val(waterQRevDetailsArray[72]);
		$("#total_cost").val(waterQRevDetailsArray[73]);
		
		$( "input:radio[name='do_user_pay'][value='"+waterQRevDetailsArray[74]+"']" ).attr('checked','checked');
		$( "input:radio[name='piped_w_conn'][value='"+waterQRevDetailsArray[75]+"']" ).attr('checked','checked');
		
		$( "input:radio[name='all_test_complt'][value='"+waterQRevDetailsArray[76]+"']" ).attr('checked','checked');
		$( "input:radio[name='res_n_test'][value='"+waterQRevDetailsArray[77]+"']" ).attr('checked','checked');
		
		$( "input:radio[name='m_comm_ext'][value='"+waterQRevDetailsArray[78]+"']" ).attr('checked','checked');
		$( "input:radio[name='m_comm_ori_complt'][value='"+waterQRevDetailsArray[79]+"']" ).attr('checked','checked');
		$( "input:radio[name='m_comm_ori_no'][value='"+waterQRevDetailsArray[80]+"']" ).attr('checked','checked');
		$( "input:radio[name='new_option'][value='"+waterQRevDetailsArray[81]+"']" ).attr('checked','checked');
		$( "input:radio[name='caretaker_train'][value='"+waterQRevDetailsArray[82]+"']" ).attr('checked','checked');
		$( "input:radio[name='caretaker_train_no'][value='"+waterQRevDetailsArray[83]+"']" ).attr('checked','checked');			
		$("#alt_others").val(waterQRevDetailsArray[84]);
		$( "input:radio[name='smpl_analy'][value='"+waterQRevDetailsArray[85]+"']" ).attr('checked','checked');
		$( "input:radio[name='renovation_done'][value='"+waterQRevDetailsArray[86]+"']" ).attr('checked','checked');
		$( "input:radio[name='install_done'][value='"+waterQRevDetailsArray[87]+"']" ).attr('checked','checked');
		
		$("#wq_photo").val(waterQRevDetailsArray[88]);
		wQactivities = waterQRevDetailsArray[89];
		startDtWq = waterQRevDetailsArray[90];
		
		latitudewq=$("#wq_lat").val(waterQRevDetailsArray[91]);
		longitudewq=$("#wq_long").val(waterQRevDetailsArray[92]);
		
		
		imagePathW = waterQRevDetailsArray[88];
		
		var image = document.getElementById('myImageW');
	    image.src = waterQRevDetailsArray[88];
		
		//-------------------------------------show
		if(waterQRevDetailsArray[4]=="Pre Instalation"){
						
			$("#facility_Id").hide();			
			$("#tech_chl").hide();
			$("#tech_colour").hide();		
			$("#tech_mn").hide();		
			$("#iron_Fe").hide();
			$("#tech_clorine").hide();
			$("#tech_condvity").hide();
			$("#tech_odor").hide();
			$("#tech_zinc").hide();
			$("#tech_boron").hide();	
			$("#tech_c_bac").hide();
			$("#tech_nitrate").hide();
			$("#tech_fluoride").hide();	
			$("#tech_turb").hide();
			$("#tech_ph").hide();	
			//level
			$("#otherPartBoreDate").hide();
			//waterData3 
			$("#installation_date").hide();
			$("#depth").hide();
			$("#water_level").hide();
			$("#water_quantity").hide();
			$("#bore_hole").hide();
			$("#dont_pree_install").hide();
			$("#dont_pree_install_val").hide();
			$("#manu_dril_bore").hide();
			$("#mech_dril_bore").hide();
			
			//==========show
			$("#tech_ttc").show();
			$("#tech_as").show();
				
			$("#tube_Well").show();	
			$("#fc").show();
			//level	
			$("#pree_install").show();	
			$("#pree_install_val").show();	
		}else if(waterQRevDetailsArray[4]=="During Instalation"){
			$("#tech_sl").hide();
			$("#tech_fe").hide();						
			$("#tube_Well").hide();	
			$("#tech_residual").hide();
			$("#tech_fluoride").hide();		
			$("#water_level").hide();		
			$("#water_quantity").hide();
			//level	
			$("#otherPartBoreDate").hide();
			$("#renovationDate").hide();
			$("#pree_install").hide();	
			$("#pree_install_val").hide();		
			//==========show
			$("#facility_Id").show();	
			$("#depth").show();	
			$("#tech_ttc").show();
			$("#tech_as").show();
			$("#tech_mn").show();	
			$("#tech_turb").show();
			
			$("#tech_clorine").show();
			$("#tech_boron").show();
			$("#tech_c_bac").show();
			$("#tech_odor").show();
			$("#tech_nitrate").show();
			$("#tech_zinc").show();
			$("#tech_condvity").show();		
			$("#tech_colour").show();
			$("#iron_Fe").show();
			$("#installation_date").show();
			$("#installDate").show();
			$("#fc").show();
			$("#bore_hole").show()
			$("#manu_dril_bore").show();
			$("#mech_dril_bore").show();	
			$("#tech_ph").show();			
			//level		
			$("#dont_pree_install").show()
			$("#dont_pree_install_val").show()
		}else if(waterQRevDetailsArray[4]=="Renovation Instalation"){
			//hide		
			$("#water_level").hide();
				
			$("#tech_sl").hide();
			$("#tech_fe").hide();			
			$("#tech_condvity").hide();
			$("#otherPart").hide();		
			$("#installDate").hide();		
			$("#water_quantity").hide();
			$("#tube_Well").hide();		
			$("#pree_install").hide();
			$("#pree_install_val").hide();	
			$("#tech_fluoride").hide();	
			$("#tech_residual").hide();
			$("#tech_nitrate").hide();
			//show
			$("#depth").show();
			$("#tech_ttc").show();
			$("#tech_as").show();
			$("#tech_mn").show();	
			$("#tech_turb").show();
			$("#tech_ph").show();			
			$("#tech_clorine").show();
			$("#tech_boron").show();
			$("#tech_c_bac").show();
			$("#tech_odor").show();		
			$("#tech_zinc").show();		
			$("#tech_colour").show();
			$("#iron_Fe").show();
			$("#manu_dril_bore").show();
			$("#mech_dril_bore").show();
			$("#facility_Id").show();	
			$("#tech_chl").show();
			$("#otherPartBoreDate").show();
			$("#renovationDate").show();
			$("#bore_hole").show()
			$("#dont_pree_install").show()	
			$("#dont_pree_install_val").show()
		}else{
			//hide		
			$("#tech_sl").hide();
			$("#tech_fe").hide();
			$("#tech_residual").hide();		
			$("#tech_colour").hide();	
			
			$("#otherPartBoreDate").hide();
			$("#renovationDate").hide();
			$("#tube_Well").hide();	
			$("#pree_install").hide();
			$("#pree_install_val").hide();		
			//$("#installDate").hide();
			$("#water_level").hide();		
			$("#water_quantity").hide();	
			$("#tech_fluoride").hide();
			//show
			$("#facility_Id").show();		
			$("#tech_ttc").show();
			$("#tech_as").show();
			$("#tech_mn").show();	
			$("#tech_clorine").show();
			$("#tech_turb").show();
			$("#tech_chl").show();
			$("#iron_Fe").show();		
			$("#tech_boron").show();
			$("#tech_c_bac").show();
			$("#tech_odor").show();
			$("#tech_nitrate").show();
			$("#tech_zinc").show();
			$("#tech_condvity").show();		
			$("#tech_colour").show();
			$("#installation_date").show();
			$("#installDate").show();
			$("#otherPart").show();
			$("#bore_hole").show()
			$("#dont_pree_install").show()	
			$("#dont_pree_install_val").show()
			$("#manu_dril_bore").show();
			$("#mech_dril_bore").show();
		}		
		if (waterQRevDetailsArray[56]=="YES"){
			$("#tr_assenic_patient").show();
		}else{
			$("#tr_assenic_patient").hide();
		}
		if(waterQRevDetailsArray[68]=='Yes'){
			$('#non_potbl_res').hide();
			$('#non_potbl_res_followup_ac').hide();
		}else{
			$('#non_potbl_res').show();
			$('#non_potbl_res_followup_ac').show();
		}	
		if(waterQRevDetailsArray[76]=='YES'){
			$('#newField').hide();
		}else{
			$('#newField').show();
		}
		if(waterQRevDetailsArray[78]=='YES'){
			$('#m_comm_ori').show();
		}else{
			$('#m_comm_ori').hide();
		}
		if(waterQRevDetailsArray[79]=='YES'){
			$('#m_comm_ori_no').hide();
		}else{
			$('#m_comm_ori_no').show();
		}
		if(waterQRevDetailsArray[82]=='YES'){
			$('#caretakerTrainedNo').hide();
		}else{
			$('#caretakerTrainedNo').show();
		}
		/*if (waterQRevDetailsArray[91]==0 && waterQRevDetailsArray[92]==0){
			$('#btn_wq_lat_long').show();
		}*/
		
		
		$(".errorChk").text("");
		var url = "#planListWq";
	}
	$.mobile.navigate(url);
	//$(location).attr('href',url);
}

var testKitChk="";
var useOfChk="";
var wq_management_committee_not_ori="";
var wq_management_committee_not_new_option="";
var wq_caretaker_trained_not="";
var wq_renovation_type="";
var alt_others="";
function waterQDataSubmit(){		
		$("#btn_wq_save").hide();		
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
		wq_management_committee_ori=$("input[name='m_comm_ori_complt']:checked").val();
		wq_management_committee_not_ori=$("input[name='m_comm_ori_no']:checked").val();
		wq_management_committee_not_new_option=$("input[name='new_option']:checked").val();//new
		wq_caretaker_trained=$("input[name='caretaker_train']:checked").val();
		wq_caretaker_trained_not=$("input[name='caretaker_train_no']:checked").val();
		alt_others=$("#alt").val();
		wq_sample_analysis=$("input[name='smpl_analy']:checked").val();		
		wq_renovation_type=$("input[name='renovation_done']:checked").val();
		wq_installation_done=$("input[name='install_done']:checked").val();
		
		
		if(test_type_val=="Pre Instalation"){
			
			wq_id="";
				
			wq_plat_condition="";
			drain_condition="";
			wp_repair="";
			chamber_condition="";
			wq_maintain_by="";
			//user_w_payment="";
			
			wq_ins_date="";				
			wq_depth="";
			//wq_last_date="";
			//wq_analysis_date="";
			
			wq_appDate="";
			wq_siteSelectDate="";
			wq_handOvrDate="";	
			
			wq_owner_name="";
			wq_owner_phone="";
			wq_caretaker="";
			caretakerPhone="";
			
			wq_odor="";
									
			wq_tested_at="";
			wq_iron_test="";		
			wq_tw_color="";
			
			//waterData9
			sw_option="";
			alt_option="";
			sw_distance="";
			ac_taken="";
			arc_patient_yn="";
			arc_patient="";		
			//waterData9_1
			wq_san_ins="";
			wq_inspect_date="";
			wq_san_risk_sc="";
			
			/*wq_functional="";
			wq_drinking="";
			wq_cooking="";
			wq_washing="";
			wq_drinking_cooking="";
			wq_drinking_cooking_washing="";
			wq_others_option="";*/
			
			wq_potable_status="";
			wq_res_non_potable="";
			wq_no_potable_initiative_taken="";			
			
			wq_wab_con="";
			wq_comm_con="";
			wq_total_cost="";
			
			wq_do_user_pay="";
			wq_is_piped_W_connection="";				
			//waterData13
						
		}			
		
		if(sw_option=="NO" || sw_option==undefined){
			sw_option=""
			alt_option="";
			sw_distance="";
			ac_taken="";
		}		
		if(arc_patient_yn=="" || arc_patient_yn==undefined){
			arc_patient_yn="";
		}
		if(arc_patient_yn=="NO" || arc_patient_yn==undefined){
			arc_patient="";
		}	
		if(wq_san_ins=="" || wq_san_ins==undefined){
			wq_san_ins="";	
		}	
		if(wq_inspect_date=="" || wq_inspect_date==undefined){
			wq_inspect_date="";	
		}						
		if(wq_san_risk_sc=="" || wq_san_risk_sc==undefined){
			wq_san_risk_sc="";	
		}			
		if(wq_potable_status=="Yes"){					
			wq_res_non_potable="";
			wq_no_potable_initiative_taken="";
		}	
		if(wq_is_piped_W_connection==undefined || wq_is_piped_W_connection==""){
			wq_is_piped_W_connection="";			
		}
		if(wq_all_test_complete=="YES"){
			wq_res_n_test="";
		}
		if(wq_management_committee_exist==undefined || wq_management_committee_exist==""){
			wq_management_committee_exist="";
		}			
		if(wq_management_committee_ori==undefined || wq_management_committee_ori==""){
			wq_management_committee_ori="";
		}			
		if(wq_management_committee_not_ori==undefined || wq_management_committee_not_ori==""){
			wq_management_committee_not_ori="";
		}
		if(wq_management_committee_not_new_option==undefined || wq_management_committee_not_new_option==""){
			wq_management_committee_not_new_option="";	
		}
		if(wq_caretaker_trained==undefined || wq_caretaker_trained==""){
			wq_caretaker_trained="";
		}
		if(wq_caretaker_trained_not==undefined || wq_caretaker_trained_not==""){
			wq_caretaker_trained_not="";
		}
		if(wq_sample_analysis==undefined || wq_sample_analysis==""){
			wq_sample_analysis=""	
		}
		if(wq_renovation_type==undefined || wq_renovation_type==""){
			wq_renovation_type="";
		}
		if(wq_installation_done==undefined || wq_installation_done==""){
			wq_installation_done="";
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
		if (wq_hach_fe!="" && wq_hach_fe!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_hach_fe
				}else{
					testKitChk+=","+wq_hach_fe
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
		if (wq_micro_kit!="" && wq_micro_kit!=undefined ){
			if(testKitChk==""){
				testKitChk=wq_micro_kit
				}else{
					testKitChk+=","+wq_micro_kit
					}
		}
				
		//=============
		if (wq_iron_test==undefined){
			wq_iron_test="";
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
		if (wq_drinking_cooking!="" && wq_drinking_cooking!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_drinking_cooking
				}else{
					useOfChk=useOfChk+","+wq_drinking_cooking
					}
		}		
		if (wq_drinking_cooking_washing!="" && wq_drinking_cooking_washing!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_drinking_cooking_washing
				}else{
					useOfChk=useOfChk+","+wq_drinking_cooking_washing
					}
		}
		if (wq_others_option!="" && wq_others_option!=undefined ){
			if(useOfChk==""){
				useOfChk=wq_others_option
				}else{
					useOfChk=useOfChk+","+wq_others_option
					}
		}	
		
		
		
		
//syncDataWQ();		
	wq_photo=$("#wq_photo").val();	
	if (wq_photo=="" || wq_photo==undefined){
		$(".errorChk").text("Please confirm Photo");
		$("#btn_wq_save").show();
		$("#btn_wq_submit").show();
	}else if((latitudewq==0 || longitudewq==0) || (localStorage.latitudeAreaWq==0 || localStorage.longitudeAreaWq==0)){
		$(".errorChk").text("Please confirm your location");
		$("#btn_wq_save").show();
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
		//syncDataWQ();
	}
}

function syncDataWQ(){	

		if(latitudewq==0 || longitudewq==0){
			latitudewq=localStorage.latitudeAreaWq;
			longitudewq=localStorage.longitudeAreaWq;
		}
		
		//alert(apipath+'submitWaterQualityData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&wq_plan_id='+wq_plan_id+'&wq_CBO_id='+wq_CBO_id+'&wq_vill='+encodeURIComponent(wq_vill)+'&provided_by='+provided_by+'&test_type_val='+test_type_val+'&type_of_wq_facility='+encodeURIComponent(type_of_wq_facility)+'&wq_ref='+encodeURIComponent(wq_ref)+'&wq_id='+encodeURIComponent(wq_id)+'&wq_plat_condition='+encodeURIComponent(wq_plat_condition)+'&drain_condition='+encodeURIComponent(drain_condition)+'&wp_repair='+encodeURIComponent(wp_repair)+'&chamber_condition='+encodeURIComponent(chamber_condition)+'&wq_maintain_by='+wq_maintain_by+'&wq_ins_date='+wq_ins_date+'&wq_depth='+wq_depth+'&wq_analysis_date='+wq_analysis_date+'&wq_last_date='+wq_last_date+'&wq_appDate='+wq_appDate+'&wq_siteSelectDate='+wq_siteSelectDate+'&wq_handOvrDate='+wq_handOvrDate+'&wq_owner_name='+encodeURIComponent(wq_owner_name)+'&wq_owner_phone='+encodeURIComponent(wq_owner_phone)+'&wq_caretaker='+encodeURIComponent(wq_caretaker)+'&caretakerPhone='+encodeURIComponent(caretakerPhone)+'&wq_select_tech='+encodeURIComponent(wq_select_tech)+'&testKitChk='+testKitChk+'&wq_ttc_cfu='+wq_ttc_cfu+'&wq_as_ppb='+wq_as_ppb+'&wq_mn_ppb='+wq_mn_ppb+'&wq_chl_ppt='+wq_chl_ppt+'&wq_chlorine='+wq_chlorine+'&wq_turb_ntu='+wq_turb_ntu+'&wq_ph='+wq_ph+'&wq_boron='+wq_boron+'&wq_ironFe='+wq_ironFe+'&wq_c_bac='+wq_c_bac+'&wq_colour='+wq_colour+'&wq_odor='+wq_odor+'&wq_nitrate='+wq_nitrate+'&wq_zinc='+wq_zinc+'&wq_condvity='+wq_condvity+'&wq_fc='+wq_fc+'&wq_tested_at='+wq_tested_at+'&wq_iron_test='+wq_iron_test+'&wq_tw_color='+wq_tw_color+'&sw_option='+encodeURIComponent(sw_option)+'&alt_option='+encodeURIComponent(alt_option)+'&sw_distance='+encodeURIComponent(sw_distance)+'&ac_taken='+encodeURIComponent(ac_taken)+'&arc_patient_yn='+arc_patient_yn+'&arc_patient='+arc_patient+'&wq_san_ins='+wq_san_ins+'&wq_inspect_date='+wq_inspect_date+'&wq_san_risk_sc='+wq_san_risk_sc+'&wq_functional='+wq_functional+'&useOfChk='+useOfChk+'&wq_potable_status='+wq_potable_status+'&wq_res_non_potable='+encodeURIComponent(wq_res_non_potable)+'&wq_no_potable_initiative_taken='+encodeURIComponent(wq_no_potable_initiative_taken)+'&wq_wab_con='+wq_wab_con+'&wq_comm_con='+wq_comm_con+'&wq_total_cost='+wq_total_cost+'&wq_do_user_pay='+wq_do_user_pay+'&wq_is_piped_W_connection='+wq_is_piped_W_connection+'&wq_all_test_complete='+wq_all_test_complete+'&wq_res_n_test='+encodeURIComponent(wq_res_n_test)+'&wq_management_committee_exist='+wq_management_committee_exist+'&wq_management_committee_ori='+wq_management_committee_ori+'&wq_management_committee_not_ori='+wq_management_committee_not_ori+'&wq_management_committee_not_new_option='+wq_management_committee_not_new_option+'&wq_caretaker_trained='+wq_caretaker_trained+'&wq_caretaker_trained_not='+wq_caretaker_trained_not+'&alt_others='+alt_others+'&wq_sample_analysis='+wq_sample_analysis+'&wq_renovation_type='+encodeURIComponent(wq_renovation_type)+'&wq_installation_done='+wq_installation_done+'&wq_photo='+imageName+'&wq_startDt='+startDtWq+'&latitude='+latitudewq+'&longitude='+longitudewq);
		
		$.ajax({
				type: 'POST',											
				url:apipath+'submitWaterQualityData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&wq_plan_id='+wq_plan_id+'&wq_CBO_id='+wq_CBO_id+'&wq_vill='+encodeURIComponent(wq_vill)+'&provided_by='+provided_by+'&test_type_val='+test_type_val+'&type_of_wq_facility='+encodeURIComponent(type_of_wq_facility)+'&wq_ref='+encodeURIComponent(wq_ref)+'&wq_id='+encodeURIComponent(wq_id)+'&wq_plat_condition='+encodeURIComponent(wq_plat_condition)+'&drain_condition='+encodeURIComponent(drain_condition)+'&wp_repair='+encodeURIComponent(wp_repair)+'&chamber_condition='+encodeURIComponent(chamber_condition)+'&wq_maintain_by='+wq_maintain_by+'&wq_ins_date='+wq_ins_date+'&wq_depth='+wq_depth+'&wq_analysis_date='+wq_analysis_date+'&wq_last_date='+wq_last_date+'&wq_appDate='+wq_appDate+'&wq_siteSelectDate='+wq_siteSelectDate+'&wq_handOvrDate='+wq_handOvrDate+'&wq_owner_name='+encodeURIComponent(wq_owner_name)+'&wq_owner_phone='+encodeURIComponent(wq_owner_phone)+'&wq_caretaker='+encodeURIComponent(wq_caretaker)+'&caretakerPhone='+encodeURIComponent(caretakerPhone)+'&wq_select_tech='+encodeURIComponent(wq_select_tech)+'&testKitChk='+testKitChk+'&wq_ttc_cfu='+wq_ttc_cfu+'&wq_as_ppb='+wq_as_ppb+'&wq_mn_ppb='+wq_mn_ppb+'&wq_chl_ppt='+wq_chl_ppt+'&wq_chlorine='+wq_chlorine+'&wq_turb_ntu='+wq_turb_ntu+'&wq_ph='+wq_ph+'&wq_boron='+wq_boron+'&wq_ironFe='+wq_ironFe+'&wq_c_bac='+wq_c_bac+'&wq_colour='+wq_colour+'&wq_odor='+wq_odor+'&wq_nitrate='+wq_nitrate+'&wq_zinc='+wq_zinc+'&wq_condvity='+wq_condvity+'&wq_fc='+wq_fc+'&wq_tested_at='+wq_tested_at+'&wq_iron_test='+wq_iron_test+'&wq_tw_color='+wq_tw_color+'&sw_option='+encodeURIComponent(sw_option)+'&alt_option='+encodeURIComponent(alt_option)+'&sw_distance='+encodeURIComponent(sw_distance)+'&ac_taken='+encodeURIComponent(ac_taken)+'&arc_patient_yn='+arc_patient_yn+'&arc_patient='+arc_patient+'&wq_san_ins='+wq_san_ins+'&wq_inspect_date='+wq_inspect_date+'&wq_san_risk_sc='+wq_san_risk_sc+'&wq_functional='+wq_functional+'&useOfChk='+useOfChk+'&wq_potable_status='+wq_potable_status+'&wq_res_non_potable='+encodeURIComponent(wq_res_non_potable)+'&wq_no_potable_initiative_taken='+encodeURIComponent(wq_no_potable_initiative_taken)+'&wq_wab_con='+wq_wab_con+'&wq_comm_con='+wq_comm_con+'&wq_total_cost='+wq_total_cost+'&wq_do_user_pay='+wq_do_user_pay+'&wq_is_piped_W_connection='+wq_is_piped_W_connection+'&wq_all_test_complete='+wq_all_test_complete+'&wq_res_n_test='+encodeURIComponent(wq_res_n_test)+'&wq_management_committee_exist='+wq_management_committee_exist+'&wq_management_committee_ori='+wq_management_committee_ori+'&wq_management_committee_not_ori='+wq_management_committee_not_ori+'&wq_management_committee_not_new_option='+wq_management_committee_not_new_option+'&wq_caretaker_trained='+wq_caretaker_trained+'&wq_caretaker_trained_not='+wq_caretaker_trained_not+'&alt_others='+alt_others+'&wq_sample_analysis='+wq_sample_analysis+'&wq_renovation_type='+encodeURIComponent(wq_renovation_type)+'&wq_installation_done='+wq_installation_done+'&wq_photo='+imageName+'&wq_startDt='+startDtWq+'&latitude='+latitudewq+'&longitude='+longitudewq,
				
								   
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
						$("#btn_wq_lat_long").hide();
					}else{
						//$(".errorChk").text('Failed to Submit');
						$(".errorChk").text('Try again after 5 minutes');
						$("#btn_wq_submit").show();
						$("#btn_wq_save").show();
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



