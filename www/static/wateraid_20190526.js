
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
   $("#area_lat").val(1);
   $("#area_long").val(1);
   /*localStorage.latitudeAreaWq=$("#area_lat").val();
	localStorage.longitudeAreaWq=$("#area_long").val();
   alert(localStorage.latitudeAreaWq+'-'+localStorage.longitudeAreaWq);*/
   $(".errorChk").html("Failed to Confirmed Location.");
}



//---Online
var apipath="http://w05.yeapps.com/wateraid/syncmobile_wq_20190320/";

//--- local
//var apipath="http://127.0.0.1:8000/wateraid/syncmobile/";


var planFlag=0;
var cboFlag=0;
var locationFlag=0;
var serTypeFlag=0;
var projectFlag=0;
var	domainFlag=0;
var domainFlagWq=0;
var sectorFlag=0;
var typeOFEvent=0;
var eventIssue=0;

var planFlagWq=0;
var cboFlagWq=0;

var startDt='';
var syncResult='';

var asinProject='';
var asinDomain='';
var interventionArea='';
var servicType='';
var service_type_ot='';
var	service_type_hh='';

var serviceLevelWs='';
var serviceLevelHy='';
var serviceLevelXsector='';
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
var sDisabilityM='';
var sDisabilityF='';

var bMale='';
var bFemale='';
var bBoys='';
var bGirls='';
var bBoysUnder='';
var bGirlsUnder='';
var bPopulation='';
var bHouse_hold='';
var bDisabilityM='';
var bDisabilityF='';

var lMale='';
var lFemale='';
var lBoys='';
var lGirls='';
var lBoysUnder='';
var lGirlsUnder='';
var lPopulation='';
var lHouse_hold='';
var lDisabilityM='';
var lDisabilityF='';

var dMale='';
var dFemale='';
var dBoys='';
var dGirls='';
var dBoysUnder='';
var dGirlsUnder='';
var dPopulation='';
var dHouse_hold='';
var dDisabilityM='';
var dDisabilityF='';

var iMale='';
var iFemale='';
var iBoys='';
var iGirls='';
var iBoysUnder='';
var iGirlsUnder='';
var iPopulation='';
var iHouse_hold='';
var iDisability='';

var dapMale='';
var dapFemale='';
var eMale='';
var eFemale='';
var totalWiBen='';
var totalInBen='';
var achServiceRecpt='';

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

var imageNameAch = "";
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
				var syncResultArray = result.split('rdrd');
					if (syncResultArray[0]=='YES'){	
						localStorage.sync_code=syncResultArray[1];
						localStorage.plan_list=syncResultArray[2];
						localStorage.provided_by=syncResultArray[3];
						localStorage.cbo_list=syncResultArray[4];
						localStorage.ser_res_list=syncResultArray[5];
						localStorage.plan_wq=syncResultArray[6];
						localStorage.cbo_id_wq=syncResultArray[7];
						localStorage.service_type=syncResultArray[8];
						//localStorage.project=syncResultArray[9];
						localStorage.domain=syncResultArray[9];
						localStorage.sector=syncResultArray[10];
						
						localStorage.typeOfEvents=syncResultArray[11];
						localStorage.eventIssuse=syncResultArray[12];
						localStorage.domainWq=syncResultArray[13];
						
						localStorage.mobile_no=mobile;
						localStorage.ach_save="";
						localStorage.water_q_save="";
										
						$(".errorChk").html("Sync Successful");
						$('#syncBasic').show();
						
						/*if (projectFlag==0){
							$("#asignProject").html(localStorage.project);	
							projectFlag=1;
						}else{
							$('#asignProject').empty();
							$('#asignProject').append(localStorage.project).trigger('create');
						}*/
						if (domainFlag==0){
							$("#asignDomain").html(localStorage.domain);	
							domainFlag=1;
						}else{
							$('#asignDomain').empty();
							$('#asignDomain').append(localStorage.domain).trigger('create');
						}
						
						if (domainFlagWq==0){
							$("#asignDomainWq").html(localStorage.domainWq);	
							domainFlagWq=1;
						}else{
							$('#asignDomainWq').empty();
							$('#asignDomainWq').append(localStorage.domainWq).trigger('create');
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
						
						if (typeOFEvent==0){
							$('#typeOfEventDiv').html(localStorage.typeOfEvents);
							typeOFEvent=1;
						}else{
							$('#typeOfEventDiv').empty();
							$('#typeOfEventDiv').append(localStorage.typeOfEvents).trigger('create');
						}						
						
						if (eventIssue==0){
							$('#eventIssuesDiv').html(localStorage.eventIssuse);
							eventIssue=1;
						}else{
							$('#eventIssuesDiv').empty();
							$('#eventIssuesDiv').append(localStorage.eventIssuse).trigger('create');
						}
						
						
						/*if (serTypeFlag==0){			   
							$("#serTypeDiv").html(localStorage.service_type);	
							serTypeFlag=1;
						}else{
							$('#serTypeDiv').empty();
							$('#serTypeDiv').append(localStorage.service_type).trigger('create');
						}*/
												
						
						//$("#planWqlistDiv").html(localStorage.planWqStr);
						
						//$("#wQCboIdDiv").html(localStorage.cbo_id_wq);
						$("#providedByDiv").html(localStorage.provided_by);
						$("#TestTypeDiv").html(localStorage.test_type_wq);
						
						//========
						$("#parameter_label").hide();
						$("#div_si").hide();
						$("#div_arsenic").hide();
						$("#div_fc").hide();
						$("#div_ttc").hide()
						$("#div_iron").hide();
						$("#div_ph").hide()
						$("#div_mn").hide();
						$("#div_chloride").hide();
						$("#div_bn").hide();
						
						$("#div_sn_bacteria").hide()
						$("#div_turbidity").hide();
						$("#div_conductivity").hide()		
						//=========
						$("#table_si").hide();
						$("#table_arsenic").hide();	
						$("#table_fc").hide();	
						$("#table_ttc").hide();	
						$("#table_iron").hide();
						$("#table_ph").hide();		
						$("#table_mn").hide();		
						$("#table_chloride").hide();		
						$("#table_bn").hide();		
						$("#table_sn_bacteria").hide();
						$("#table_turbidity").hide();
						$("#table_conductivity").hide();
						
						
						var url = "#pagesync";
						$.mobile.navigate(url);
					}else{
						$(".errorChk").html("Sync Failed. Authorization or Network Error.");
						$('#syncBasic').show();
					}
				
			  },error:function(result){
				 	$(".errorChk").text('Network timeout. Please ensure you have good network signal and working Internet.'); 
					$('#syncBasic').show();
				 }
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
	domainFlagWq=0;
	sectorFlag=0;
	planFlagWq=0;
	cboFlagWq=0;
	$.mobile.navigate("#reportType")
	location.reload();
}


	
$(document).ready(function(){	
	//$("#planlistDiv").html(localStorage.plan_list);
	
	$("#planlistDiv").html(localStorage.planStr);
		
	//$("#asignProject").html(localStorage.project);
	$("#asignDomain").html(localStorage.domain);
	
	$("#asignDomainWq").html(localStorage.domainWq);	
	
	$("#serTyp").html(localStorage.sector);			
		
	$("#cboIdDiv").html(localStorage.cboStr);					   
	$("#serResDiv").html(localStorage.ser_res_list);
	
	$('#typeOfEventDiv').html(localStorage.typeOfEvents);
	
	$('#eventIssuesDiv').html(localStorage.eventIssuse);
	
	//$("#serTypeDiv").html(localStorage.service_type);	
	$("#reviewAchList").html(localStorage.reviewDataDiv);
	
	$("#planWqlistDiv").html(localStorage.planWqStr);
	$("#wQCboIdDiv").html(localStorage.cboStrWq);
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
	
	//========
	$("#parameter_label").hide();
	$("#div_si").hide();
	$("#div_arsenic").hide();
	$("#div_fc").hide();
	$("#div_ttc").hide()
	$("#div_iron").hide();
	$("#div_ph").hide()
	$("#div_mn").hide();
	$("#div_chloride").hide();
	$("#div_bn").hide();
	
	$("#div_sn_bacteria").hide()
	$("#div_turbidity").hide();
	$("#div_conductivity").hide()		
	//=========
	$("#table_si").hide();
	$("#table_arsenic").hide();	
	$("#table_fc").hide();	
	$("#table_ttc").hide();	
	$("#table_iron").hide();
	$("#table_ph").hide();		
	$("#table_mn").hide();		
	$("#table_chloride").hide();		
	$("#table_bn").hide();		
	$("#table_sn_bacteria").hide();
	$("#table_turbidity").hide();
	$("#table_conductivity").hide();
	
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
		
		if (domainFlag==0){
			$("#asignDomain").html(localStorage.domain);	
			domainFlag=1;
		}else{
			$('#asignDomain').empty();
			$('#asignDomain').append(localStorage.domain).trigger('create');
		}
		
		if (locationFlag==0){			   
			$("#serResDiv").html(localStorage.ser_res_list);	
			locationFlag=1;
		}else{
			$('#serResDiv').empty();
			$('#serResDiv').append(localStorage.ser_res_list).trigger('create');
		}
		
		if (typeOFEvent==0){
			$('#typeOfEventDiv').html(localStorage.typeOfEvents);
			typeOFEvent=1;
		}else{
			$('#typeOfEventDiv').empty();
			$('#typeOfEventDiv').append(localStorage.typeOfEvents).trigger('create');
		}						
		
		if (eventIssue==0){
			$('#eventIssuesDiv').html(localStorage.eventIssuse);
			eventIssue=1;
		}else{
			$('#eventIssuesDiv').empty();
			$('#eventIssuesDiv').append(localStorage.eventIssuse).trigger('create');
		}
		
		if (sectorFlag==0){
			$("#serTyp").html(localStorage.sector);	
			sectorFlag=1;
		}else{
			$('#serTyp').empty();
			$('#serTyp').append(localStorage.sector).trigger('create');
		}
					
		$("#asign_domain").val("");
		$("#intervention_area").val("")
		$("#service_type_ot").val("");
		$("#service_type_hh").val("");
		$("#service_level_ws").val("");
		$("#service_level_hy").val("");
		$("#service_level_xsector").val("");
		$("input:radio[name='plan_select'][value='"+achPlanId+"']" ).attr('checked','');
		$("#typeOf_Facility").val("");
		$("#ex_manag_con").val("");
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
		$("#s_disability_m").val("");
		$("#s_disability_f").val("");
		
		$("#b_male").val("");
		$("#b_female").val("");
		$("#b_boys").val("");
		$("#b_girls").val("");
		$("#b_boysUnder").val("");
		$("#b_girlsUnder").val("");
		$("#b_population").val("");
		$("#b_house_hold").val("");
		$("#b_disability_m").val("");
		$("#b_disability_f").val("");
		
		$("#l_male").val("");
		$("#l_female").val("");
		$("#l_boys").val("");
		$("#l_girls").val("");
		$("#l_boysUnder").val("");
		$("#l_girlsUnder").val("");
		$("#l_population").val("");
		$("#l_house_hold").val("");
		$("#l_disability_m").val("");
		$("#l_disability_f").val("");
		
		$("#d_male").val("");
		$("#d_female").val("");
		$("#d_boys").val("");
		$("#d_girls").val("");
		$("#d_boysUnder").val("");
		$("#d_girlsUnder").val("");
		$("#d_population").val("");
		$("#d_house_hold").val("");
		$("#d_disability_m").val("");
		$("#d_disability_f").val("");
		
		$("#eMale").val("");
		$("#eFemale").val("");
		$("#totalWiBen").val("");
		$("#totalInBen").val("");
		$("#serRecpent").val("");
		//$("#serType").val("");
		$("#achPhoto").val("");	
		$("#ach_lat").val("");
		$("#ach_long").val("");	
		
		reviewAchDisplayFlag==false;
		arrayId='';
				
		var url = "#servType";
		$.mobile.navigate(url);
	}
}

function select_indicator(){	
	var intervention_area=$("#intervention_area").val();
	if (intervention_area=='Watsan'){
		serviceLevelWs='';
		serviceLevelHy='';
		serviceLevelXsector='';
		$("#service_level_ws").val("");
		$("#service_level_hy").val("");
		$("#service_level_xsector").val("");
		
		$("#ifWaterSani").hide();
		$("#ifHygiene").hide();
		$("#ifXsector").hide();
		
		$("#ifOthers").hide();
		$("#ifWatsan").show();	
	}else{
		serviceLevelWs='';
		serviceLevelHy='';
		serviceLevelXsector='';
		
		$("#service_level_ws").val("");
		$("#service_level_hy").val("");
		$("#service_level_xsector").val("");
		
		$("#ifWaterSani").hide();
		$("#ifHygiene").hide();
		$("#ifXsector").hide();
		
		$("#ifWatsan").hide();	
		$("#ifOthers").show();
	}
}
function serviceType_wsh(){	
	var intervention_area=$("#intervention_area").val();
	
	if (intervention_area=='Watsan'){
		service_type=$("#service_type_hh").val();
		$("#service_type_ot").val("");	
	}else{
		service_type=$("#service_type_ot").val();
		$("#service_type_hh").val("");	
	}
	
	if (service_type=='Water'){
		$("#ifHygiene").hide();		
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		$("#ifXsector").hide();
		
		serviceLevelHy='';
		serviceLevelXsector='';	
		$("#service_level_hy").val("");	
		$("#service_level_xsector").val("");	
		
		$("#ifWaterSani").show();		
	}else if (service_type=='Sanitation'){	
		$("#ifHygiene").hide();
		$("#ifXsector").hide();
		
		serviceLevelHy="";	
		serviceLevelXsector="";	
		$("#service_level_hy").val("");	
		$("#service_level_xsector").val("");
			
		$("#ifWaterSani").show();
	}else if(service_type=='Hygiene'){
		$("#ifWaterSani").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		$("#ifXsector").hide();
		
		serviceLevelWs="";
		serviceLevelXsector="";		
		$("#service_level_ws").val("");
		$("#service_level_xsector").val("");
		
		$("#ifHygiene").show();	
	}else if(service_type=='X-Sector'){
		$("#ifWaterSani").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		$("#ifHygiene").hide();	
		
		serviceLevelWs="";
		serviceLevelHy="";
		$("#service_level_ws").val("");
		$("#service_level_hy").val("");	
		
		$("#ifXsector").show();
	}else{
		$("#ifWaterSani").hide();
		$("#ifHygiene").hide();
		$("#ifXsector").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		$("#service_level_ws").val("");
		$("#service_level_hy").val("");	
		$("#service_level_xsector").val("");
	}
}

function achNext(){	
	asinDomain=$("#asign_domain").val();	
	interventionArea=$("#intervention_area").val()
	//servicType=$("#service_type").val();
	service_type_ot=$("#service_type_ot").val();
	service_type_hh=$("#service_type_hh").val();
	
	serviceLevelWs=$("#service_level_ws").val();
	serviceLevelHy=$("#service_level_hy").val();
	serviceLevelXsector=$("#service_level_xsector").val();
	sIndicator=$("#selectIndicator").val();
	
	asinDomainStr=asinDomain.lastIndexOf('/');
	projectDomain=asinDomain.substr(0,asinDomainStr);
	
	
	if (interventionArea=='Watsan'){
		servicType=$("#service_type_hh").val();	
	}else{
		servicType=$("#service_type_ot").val();	
	}
	
	if(asinDomain==''){
		$(".errorChk").text("Required Domain");	
	}else if (interventionArea==''){
		$(".errorChk").text("Required Indicator Type");	
	}else if (servicType==''){
		$(".errorChk").text("Required Sector");
	}else if((((servicType=='Water' || servicType=='Sanitation') && (serviceLevelWs=='')) || ((servicType=='Hygiene') && (serviceLevelHy=='')) || ((servicType=='X-Sector') && (serviceLevelXsector=='')))){
		$(".errorChk").text("Required Service Type");		
	}else{		
		//--------indicator
		var planLst=localStorage.plan_list.split('|||');
		planStr='<ul data-role="listview" data-inset="true">'
		 for (i=0;i<eval(planLst.length);i++){
			planLi=planLst[i].split('||');
			activityName=planLi[0]
			activity_id=planLi[1]
			intervention_Area=planLi[2]
			serviceType=planLi[3]
			serviceLevel=planLi[4]
			planId=planLi[5]
			projectName=planLi[6]
			
			//alert(servicType+'=='+serviceType+'||'+serviceLevelWs+'=='+serviceLevel+'|||'+serviceLevelHy+'=='+serviceLevel);
			if ((servicType==serviceType) && (projectDomain==projectName) && (interventionArea==intervention_Area) && (serviceLevelWs==serviceLevel || serviceLevelHy==serviceLevel || serviceLevelXsector==serviceLevel)){
				if ((sIndicator!='') && (sIndicator==planId)){					
					planStr+='<li class="ui-field-contain"><fieldset data-role="controlgroup">'
					planStr+='<input type="radio" name="plan_select"  id="'+planId+'" value="'+planId+'" checked>'
					planStr+='<label for="'+planId+'" style="color:#05940a;" >'+activity_id+'-'+activityName+'-'+planId+'</label>'
					planStr+='<input type="hidden" name="achActivityName"  id="achActivityName'+planId+'" value="'+activityName+'">'
					planStr+='</fieldset></li>'
				}else{
					planStr+='<li class="ui-field-contain"><fieldset data-role="controlgroup">'
					planStr+='<input type="radio" name="plan_select"  id="'+planId+'" value="'+planId+'" >'
					planStr+='<label for="'+planId+'" >'+activity_id+'-'+activityName+'-'+planId+'</label>'
					planStr+='<input type="hidden" name="achActivityName"  id="achActivityName'+planId+'" value="'+activityName+'">'
					planStr+='</fieldset></li>'
				}
			}
		}//for
		planStr+='</ul>'
		localStorage.planStr=planStr;
		//alert(localStorage.planStr);
		//$("#selectIndicator").removeClass('ui-radio-off').addClass('ui-radio-on');
		if (localStorage.planStr.length >=100){
			if (planFlag==0){
				$("#planlistDiv").html(localStorage.planStr);
				planFlag=1;
			}else{
				$("#planlistDiv").empty();
				$("#planlistDiv").append(localStorage.planStr).trigger('create');
			}
			
			
			if((servicType=='Water' || servicType=='Sanitation') && (interventionArea=='Watsan')){
				//$("#sShow").show();
				//$("#bShow").show();
				//$("#lShow").show();
				$("#sbl_btn").show();
				$("#directShow").hide();	
				$("#ethnic").show();
			}else{
				$("#sShow").hide();
				$("#bShow").hide();
				$("#lShow").hide();
				$("#sbl_btn").hide();
				$("#directShow").show();
				$("#ethnic").show();				
			}		
			
			
			//--------wordCode
			var selectWardCode=$("#selectWardCode").val();
			var domainN='';
			var wordCodeList=localStorage.cbo_list.split('|||');			
			cboStr='<select name="cbo_combo" id="cbo_combo" onchange="select_Wordcode()">'	//data-native-menu="false"	
			cboStr+='<option value="">Select Ward Code</option><sup class="reqField">*</sup>'
			for (j=0;j<eval(wordCodeList.length);j++){
				wordCodeLi=wordCodeList[j].split('||');
				wordC=wordCodeLi[0]
				wordN=wordCodeLi[1]
				domainN=wordCodeLi[2]
				
				if (asinDomain==domainN){
					if ((selectWardCode !='') && (selectWardCode==wordC)){
						cboStr+='<option value="'+wordC+'" selected="selected">'+wordC+'-'+wordN+'</option>'
					}else{
						cboStr+='<option value="'+wordC+'">'+wordC+'-'+wordN+'</option>'
					}
				}
			}
			cboStr+='</select>'  
			localStorage.cboStr=cboStr;
			//alert(localStorage.cboStr);
			if (cboFlag==0){
				$("#cboIdDiv").html(localStorage.cboStr);	
				cboFlag=1;
			}else{
				$('#cboIdDiv').empty();
				$('#cboIdDiv').append(localStorage.cboStr).trigger('create');
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
		
		
		var serviceTypeHX='';
		var service_level_hy=$("#service_level_hy").val();
		var service_level_xsector=$("#service_level_xsector").val();
		if (servicType=='Hygiene'){
			serviceTypeHX=service_level_hy;
		}else{
			serviceTypeHX=service_level_xsector;
		}
		if(servicType=='Sanitation'){			
			$("#typeOfEvent").hide();
			$("#eventIssues").hide();
			$("#availHandWash_fac").hide();
			$("#availWaterSoap_fac").hide();
			
			$("#typeOfFac").show();
			$("#exManag_con").show();			
		}else if (servicType=='Hygiene' && serviceTypeHX=='Handwashing F'){
			$("#typeOfEvent").hide();
			$("#eventIssues").hide();
			$("#typeOfFac").hide();
			$("#exManag_con").hide();
			
			$("#availHandWash_fac").show();
			$("#availWaterSoap_fac").show();			
		}else if ((servicType=='Hygiene' && serviceTypeHX=='Event') || (servicType=='X-Sector' && serviceTypeHX=='Event')){
			$("#availHandWash_fac").hide();
			$("#availWaterSoap_fac").hide();
			$("#typeOfFac").hide();
			$("#exManag_con").hide();
			
			$("#typeOfEvent").show();
			$("#eventIssues").show();	
		}else{
			$("#availHandWash_fac").hide();
			$("#typeOfEvent").hide();
			$("#availWaterSoap_fac").hide();
			$("#eventIssues").hide();
			$("#typeOfFac").hide();
			$("#exManag_con").hide();
		}	
		
		
		if (servicType=='Water'){
			$(".errorChk").text("");
			var url = "#achiveDataList";
			$.mobile.navigate(url);				
		}else if(interventionArea=='Watsan'  && servicType=='Sanitation'){
			
			$(".errorChk").text("");
			var url = "#achiveEvent";
			$.mobile.navigate(url);
		}else if(interventionArea=='Others'  && servicType=='Sanitation'){
			$(".errorChk").text("");
			var url = "#achiveDataList";
			$.mobile.navigate(url);	
		}else if(serviceLevelHy=='Others' || serviceLevelXsector=='Others'){
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

/*function typeOf_Event(){
	var typeOf_event=$("#typeOf_event").val();
	if (typeOf_event=='Orientation' || typeOf_event=='Session' || typeOf_event=='Campaign'){
		$("#eventIssues").show();
	}else{
		$("#eventIssues").hide();
	}	
}*/


function achive_Event(){
	typeOfFacility=$("#typeOf_Facility").val();
	exManagCon=$("#ex_manag_con").val();
	//typeOfActivity=$("#typeOf_activity").val();
	availHandWashFac=$("#avail_handWash_fac").val();
	availWaterSoapFac=$("#avail_WaterSoap_fac").val();
	typeOfEven=$("#typeOf_event").val();
	evenIssues=$("#event_issues").val();
	if (servicType=='Sanitation' && typeOfFacility==''){
		$(".errorChk").text("Required Type of Facility");
	}else if(servicType=='Sanitation' && exManagCon==''){
		$(".errorChk").text("Required Excreta management consent");
	/*}else if(servicType=='Hygiene' && typeOfActivity==''){
		$(".errorChk").text("Required Type of Activity ");*/
	}else if(servicType=='Hygiene' && serviceLevelHy=='Handwashing F' && availHandWashFac==''){
		$(".errorChk").text("Required Availability of running water is near to the Facility ");
	}else if(servicType=='Hygiene' && serviceLevelHy=='Handwashing F' && availWaterSoapFac==''){
		$(".errorChk").text("Required Availability of soap is near to the facility ");
	}else if((servicType=='Hygiene' && serviceLevelHy=='Event' && typeOfEven=='') || (servicType=='X-Sector' && serviceLevelXsector=='Event' && typeOfEven=='')){
		$(".errorChk").text("Required Type of Event ");
	}else if((servicType=='Hygiene' && serviceLevelHy=='Event' && typeOfEven !='' && evenIssues=='') || (servicType=='X-Sector' && serviceLevelXsector=='Event' && typeOfEven !='' && evenIssues=='')){
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
function sbl_p(){
	var sbl=$("input[name='radio_b']:checked").val();
	if(sbl=='safely'){
		$("#sShow").show();
		$("#bShow").hide();
		$("#lShow").hide();
	}else if(sbl=='basic'){
		$("#sShow").hide();
		$("#bShow").show();
		$("#lShow").hide();
	}else{
		$("#sShow").hide();
		$("#bShow").hide();
		$("#lShow").show();
	}
}

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
	sDisabilityM=$("#s_disability_m").val();
	sDisabilityF=$("#s_disability_f").val();
		
	bMale=$("#b_male").val();
	bFemale=$("#b_female").val();
	bBoys=$("#b_boys").val();
	bGirls=$("#b_girls").val();
	bBoysUnder=$("#b_boysUnder").val();
	bGirlsUnder=$("#b_girlsUnder").val();
	bPopulation=$("#b_population").val();
	bHouse_hold=$("#b_house_hold").val();
	bDisabilityM=$("#b_disability_m").val();
	bDisabilityF=$("#b_disability_f").val();
	
	lMale=$("#l_male").val();
	lFemale=$("#l_female").val();
	lBoys=$("#l_boys").val();
	lGirls=$("#l_girls").val();
	lBoysUnder=$("#l_boysUnder").val();
	lGirlsUnder=$("#l_girlsUnder").val();
	lPopulation=$("#l_population").val();
	lHouse_hold=$("#l_house_hold").val();
	lDisabilityM=$("#l_disability_m").val();
	lDisabilityF=$("#l_disability_f").val();
	
	dMale=$("#d_male").val();
	dFemale=$("#d_female").val();
	dBoys=$("#d_boys").val();
	dGirls=$("#d_girls").val();
	dBoysUnder=$("#d_boysUnder").val();
	dGirlsUnder=$("#d_girlsUnder").val();
	dPopulation=$("#d_population").val();
	dHouse_hold=$("#d_house_hold").val();
	dDisabilityM=$("#d_disability_m").val();
	dDisabilityF=$("#d_disability_f").val();
	
	/*iMale=$("#i_male").val();
	iFemale=$("#i_female").val();
	iBoys=$("#i_boys").val();
	iGirls=$("#i_girls").val();
	iBoysUnder=$("#i_boysUnder").val();
	iGirlsUnder=$("#i_girlsUnder").val();
	iPopulation=$("#i_population").val();
	iHouse_hold=$("#i_house_hold").val();
	iDisability=$("#i_disability").val();*/
	
	eMale=$("#eMale").val();
	eFemale=$("#eFemale").val();
	totalWiBen=$("#totalWiBen").val();
	totalInBen=$("#totalInBen").val();
	
	var regStr=/^[a-zA-Z\s]+$/;
	
	if(sMale==''){
		sMale=0;	
	}
	if(sFemale==''){
		sFemale=0;	
	}
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
	if(sPopulation==''){
		sPopulation=0;	
	}
	if(sHouse_hold==''){
		sHouse_hold=0;
	}
	if(sDisabilityM==''){
		sDisabilityM=0;
	}
	if(sDisabilityF==''){
		sDisabilityF=0;
	}
	
	
	if(bMale==''){
		bMale=0;	
	}
	if(bFemale==''){
		bFemale=0;	
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
	if(bPopulation==''){
		bPopulation=0;	
	}
	if(bHouse_hold==''){
		bHouse_hold=0;
	}
	if(bDisabilityM==''){
		bDisabilityM=0;
	}
	if(bDisabilityF==''){
		bDisabilityF=0;
	}
	
	
	if(lMale==''){
		lMale=0;	
	}
	if(lFemale==''){
		lFemale=0;	
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
	if(lPopulation==''){
		lPopulation=0;	
	}
	if(lHouse_hold==''){
		lHouse_hold=0;
	}
	if(lDisabilityM==''){
		lDisabilityM=0;
	}
	if(lDisabilityF==''){
		lDisabilityF=0;
	}
	
	/*=====direct=======*/
	if(dMale==''){
		dMale=0;	
	}
	if(dFemale==''){
		dFemale=0;	
	}
	if(dBoys==''){
		dBoys=0;
	}
	if(dGirls==''){
		dGirls=0;
	}	
	if(dBoysUnder==''){
		dBoysUnder=0;
	}
	if(dGirlsUnder==''){
		dGirlsUnder=0;
	}	
	if(dPopulation==''){
		dPopulation=0;	
	}	
	if(dHouse_hold==''){
		dHouse_hold=0;
	}
	if(dDisabilityM==''){
		dDisabilityM=0;
	}
	if(dDisabilityF==''){
		dDisabilityF=0;
	}
	
	/*=====Indirect=======*/
	/*if(iMale==''){
		iMale=0;	
	}
	if(iFemale==''){
		iFemale=0;	
	}
	if(iBoys==''){
		iBoys=0;
	}
	if(iGirls==''){
		iGirls=0;
	}	
	if(iBoysUnder==''){
		iBoysUnder=0;
	}
	if(iGirlsUnder==''){
		iGirlsUnder=0;
	}	
	if(iPopulation==''){
		iPopulation=0;
	}	
	if(iHouse_hold==''){
		iHouse_hold=0;
	}
	if(iDisability==''){
		iDisability=0;
	}*/
	
		
	if (wordCode=="" ){
		$(".errorChk").text("Required Ward Code ");
	}else if(achID==""){
		$(".errorChk").text("Required ID related to output");
	/*}else if ((!communityName.match(regStr)) && (communityName!='')){
		$(".errorChk").text("Village/Community/Slum Name Only Alphabetic Character Allowed ");
	}else if ((!ownerName.match(regStr)) && (ownerName !='')){
		$(".errorChk").text("Owner Name Only Alphabetic Character Allowed ");*/
	}else if (interventionArea=='Watsan' && sPopulation==0 && bPopulation==0 && lPopulation==0){
		$(".errorChk").text("Required Minimum Safely/Basic/Limited");
	/*}else if (sMale=="" ){
		$(".errorChk").text("Required Male 18+ Safely ");
	}else if (sFemale=="" ){
		$(".errorChk").text("Required Female 18+ Safely ");
	}else if (bMale=="" ){
		$(".errorChk").text("Required Male 18+ Basic");
	}else if (bFemale=="" ){
		$(".errorChk").text("Required Female 18+ Basic");
	}else if (lMale=="" ){
		$(".errorChk").text("Required Male 18+ Limited");
	}else if (lFemale=="" ){
		$(".errorChk").text("Required Female 18+ Limited");*/
/*	}else if (interventionArea=='Watsan' && sMale=="" && sPopulation==0 && bPopulation==0 && lPopulation==0){
		$(".errorChk").text("Required Male 18+ Safely ");
	}else if (interventionArea=='Watsan' && sFemale=="" && sPopulation==0 && bPopulation==0 && lPopulation==0){
		$(".errorChk").text("Required Female 18+ Safely ");
	}else if (interventionArea=='Watsan' && bMale=="" && sPopulation==0 && bPopulation==0 && lPopulation==0){
		$(".errorChk").text("Required Male 18+ Basic");
	}else if (interventionArea=='Watsan' && bFemale=="" && sPopulation==0 && bPopulation==0 && lPopulation==0){
		$(".errorChk").text("Required Female 18+ Basic");
	}else if (interventionArea=='Watsan' && lMale=="" && sPopulation==0 && bPopulation==0 && lPopulation==0){
		$(".errorChk").text("Required Male 18+ Limited");
	}else if (interventionArea=='Watsan' && lFemale=="" && sPopulation==0 && bPopulation==0 && lPopulation==0){
		$(".errorChk").text("Required Female 18+ Limited");*/
		
	/*}else if (interventionArea=='Others' && dMale==0 ){
		$(".errorChk").text("Required Male 18+ Direct");
	}else if (interventionArea=='Others' && dFemale==0 ){
		$(".errorChk").text("Required Female 18+ Direct");*/		
	}else if (interventionArea=='Others' && dPopulation==0 ){
		$(".errorChk").text("Required Direct");
		
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

function d_totalPopulation(){
	var d_male=$("#d_male").val();
	var d_female=$("#d_female").val();
	var d_boys=$("#d_boys").val();
	var d_girls=$("#d_girls").val();
	var d_boysUnder=$("#d_boysUnder").val();
	var d_girlsUnder=$("#d_girlsUnder").val();
	
	if(d_male==''){
		d_male=0;
	}
	if(d_female==''){
		d_female=0;
	}
	if(d_boys==''){
		d_boys=0;
	}
	if(d_girls==''){
		d_girls=0;
	}
	if(d_boysUnder==''){
		d_boysUnder=0;
	}
	if(d_girlsUnder==''){
		d_girlsUnder=0;
	}
			
	var totalMF_d=eval(d_male)+eval(d_female)+eval(d_boys)+eval(d_girls)+eval(d_boysUnder)+eval(d_girlsUnder);	
	$("#d_population").val(totalMF_d);
}

/*function i_totalPopulation(){
	var i_male=$("#i_male").val();
	var i_female=$("#i_female").val();
	var i_boys=$("#i_boys").val();
	var i_girls=$("#i_girls").val();
	var i_boysUnder=$("#i_boysUnder").val();
	var i_girlsUnder=$("#i_girlsUnder").val();
	
	if(i_male==''){
		i_male=0;
	}
	if(i_female==''){
		i_female=0;
	}
	if(i_boys==''){
		i_boys=0;
	}
	if(i_girls==''){
		i_girls=0;
	}
	if(i_boysUnder==''){
		i_boysUnder=0;
	}
	if(i_girlsUnder==''){
		i_girlsUnder=0;
	}
			
	var totalMF_i=eval(i_male)+eval(i_female)+eval(i_boys)+eval(i_girls)+eval(i_boysUnder)+eval(i_girlsUnder);	
	$("#i_population").val(totalMF_i);
}*/

//------------------achivement sector next 
function serviceRecipentNext(){
	achServiceRecpt=$("#serRecpent").val();	
	if(achServiceRecpt=="" ){
		$(".errorChk").text("Select Location");
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
	
	/*if (achPhoto=='' || achPhoto==undefined){
		$(".errorChk").text("Please confirm Photo ");
		$("#btn_ach_save").show();
		$("#btn_ach_submit").show();
	}else if((latitude==0 || longitude==0) || (localStorage.latitudeAreaWq==0 || localStorage.longitudeAreaWq==0)){
		$(".errorChk").text("Please confirm your location");
		$("#btn_ach_save").show();
		$("#btn_ach_submit").show();
	}else{*/
		if(latitude==0 || longitude==0){
			latitude=localStorage.latitudeAreaWq;
			longitude=localStorage.longitudeAreaWq;
		}	
		
				
		achivementSave=asinDomain+'fdfd'+interventionArea+'fdfd'+service_type_ot+'fdfd'+service_type_hh+'fdfd'+serviceLevelWs+'fdfd'+serviceLevelHy+'fdfd'+serviceLevelXsector+'fdfd'+achPlanId+'fdfd'+achPlanActivities+'fdfd'+typeOfFacility+'fdfd'+exManagCon+'fdfd'+availHandWashFac+'fdfd'+availWaterSoapFac+'fdfd'+typeOfEven+'fdfd'+evenIssues+'fdfd'+wordCode+'fdfd'+achID+'fdfd'+communityName+'fdfd'+ownerName+'fdfd'+sMale+'fdfd'+sFemale+'fdfd'+sBoys+'fdfd'+sGirls+'fdfd'+sBoysUnder+'fdfd'+sGirlsUnder+'fdfd'+sPopulation+'fdfd'+sHouse_hold+'fdfd'+sDisabilityM+'fdfd'+sDisabilityF+'fdfd'+bMale+'fdfd'+bFemale+'fdfd'+bBoys+'fdfd'+bGirls+'fdfd'+bBoysUnder+'fdfd'+bGirlsUnder+'fdfd'+bPopulation+'fdfd'+bHouse_hold+'fdfd'+bDisabilityM+'fdfd'+bDisabilityF+'fdfd'+lMale+'fdfd'+lFemale+'fdfd'+lBoys+'fdfd'+lGirls+'fdfd'+lBoysUnder+'fdfd'+lGirlsUnder+'fdfd'+lPopulation+'fdfd'+lHouse_hold+'fdfd'+lDisabilityM+'fdfd'+lDisabilityF+'fdfd'+dMale+'fdfd'+dFemale+'fdfd'+dBoys+'fdfd'+dGirls+'fdfd'+dBoysUnder+'fdfd'+dGirlsUnder+'fdfd'+dPopulation+'fdfd'+dHouse_hold+'fdfd'+dDisabilityM+'fdfd'+dDisabilityF+'fdfd'+eMale+'fdfd'+eFemale+'fdfd'+totalWiBen+'fdfd'+totalInBen+'fdfd'+achServiceRecpt+'fdfd'+achPhoto+'fdfd'+startDt+'fdfd'+latitude+'fdfd'+longitude;
		
		//alert(achivementSave);							

		
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
					if (achiveSavArray.length >= 30){
						addFlag=false;					
					}else{
						localStorage.ach_save=achivementStr+'rdrd'+achivementSave							
					}
				}
			}
			
			if (addFlag==false){
				$(".errorChk").text("Maximum 30 records allowed to be saved for review");
				$("#btn_ach_save").show();
			}else{
				//asinProject='';
				asinDomain='';
				intervention_area='';
				servicType='';
				service_type_ot='';
				service_type_hh='';
				serviceLevelWs='';
				serviceLevelHy='';
				serviceLevelXsector='';
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
				sDisabilityM='';
				sDisabilityF='';
				
				bMale='';
				bFemale='';
				bBoys='';
				bGirls='';
				bBoysUnder='';
				bGirlsUnder='';
				bPopulation='';
				bHouse_hold='';
				bDisabilityM='';
				bDisabilityF='';
				
				lMale='';
				lFemale='';
				lBoys='';
				lGirls='';
				lBoysUnder='';
				lGirlsUnder='';
				lPopulation='';
				lHouse_hold='';
				lDisabilityM='';
				lDisabilityF='';
				
				dMale='';
				dFemale='';
				dBoys='';
				dGirls='';
				dBoysUnder='';
				dGirlsUnder='';
				dPopulation='';
				dHouse_hold='';
				dDisabilityM='';
				dDisabilityF='';
				
				/*iMale='';
				iFemale='';
				iBoys='';
				iGirls='';
				iBoysUnder='';
				iGirlsUnder='';
				iPopulation='';
				iHouse_hold='';
				iDisability='';*/
				
				/*dapMale='';
				dapFemale='';*/
				eMale='';
				eFemale='';
				totalWiBen='';
				totalInBen='';
				achServiceRecpt='';
				achPhoto='';
				startDt='';
				latitude='';
				longitude='';
									
				//$("#asign_project").val("");
				$("#asign_domain").val("");
				$("#intervention_area").val("")
				$("#service_type_ot").val("");
				$("#service_type_hh").val("");
				$("#service_level_ws").val("");
				$("#service_level_hy").val("");
				$("#service_level_xsector").val("");
				$("input:radio[name='plan_select'][value='"+achPlanId+"']" ).attr('checked','');
				$("#typeOf_Facility").val("");
				$("#ex_manag_con").val("");
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
				$("#s_disability_m").val("");
				$("#s_disability_f").val("");
				
				$("#b_male").val("");
				$("#b_female").val("");
				$("#b_boys").val("");
				$("#b_girls").val("");
				$("#b_boysUnder").val("");
				$("#b_girlsUnder").val("");
				$("#b_population").val("");
				$("#b_house_hold").val("");
				$("#b_disability_m").val("");
				$("#b_disability_f").val("");
				
				$("#l_male").val("");
				$("#l_female").val("");
				$("#l_boys").val("");
				$("#l_girls").val("");
				$("#l_boysUnder").val("");
				$("#l_girlsUnder").val("");
				$("#l_population").val("");
				$("#l_house_hold").val("");
				$("#l_disability_m").val("");
				$("#l_disability_f").val("");
				
				$("#d_male").val("");
				$("#d_female").val("");
				$("#d_boys").val("");
				$("#d_girls").val("");
				$("#d_boysUnder").val("");
				$("#d_girlsUnder").val("");
				$("#d_population").val("");
				$("#d_house_hold").val("");
				$("#d_disability_m").val("");
				$("#d_disability_f").val("");
				
				/*$("#i_male").val("");
				$("#i_female").val("");
				$("#i_boys").val("");
				$("#i_girls").val("");
				$("#i_boysUnder").val("");
				$("#i_girlsUnder").val("");
				$("#i_population").val("");
				$("#i_house_hold").val("");
				$("#i_disability").val("");*/
				
				/*$("#dapMale").val("");
				$("#dapFemale").val("");*/
				$("#eMale").val("");
				$("#eFemale").val("");
				$("#totalWiBen").val("");
				$("#totalInBen").val("");
				$("#serRecpent").val("");
				//$("#serType").val("");
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
	//}
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
			planID=achiveArray[7];
			//cboID=achiveArray[1];
			achActivities=achiveArray[8];
			//alert(achiveArray[1]+'|'+achiveArray[2]+'|'+achiveArray[3]+'|'+achiveArray[4]+'|'+achiveArray[5]+'|'+achiveArray[6])
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
			$("#cboIdDiv").html(localStorage.cboStr);	
			cboFlag=1;
		}else{
			$('#cboIdDiv').empty();
			$('#cboIdDiv').append(localStorage.cboStr).trigger('create');
		}
		
		if (locationFlag==0){			   
			$("#serResDiv").html(localStorage.ser_res_list);	
			locationFlag=1;
		}else{
			$('#serResDiv').empty();
			$('#serResDiv').append(localStorage.ser_res_list).trigger('create');
		}
				
		//$("#asign_project").val("");
		$("#asign_domain").val("");
		$("#intervention_area").val("")
		$("#service_type_ot").val("");
		$("#service_type_hh").val("");
		$("#service_level_ws").val("");
		$("#service_level_hy").val("");
		$("#service_level_xsector").val("");
		$("input:radio[name='plan_select'][value='"+achPlanId+"']" ).attr('checked','');
		$("#typeOf_Facility").val("");
		$("#ex_manag_con").val("");
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
		$("#s_disability_m").val("");
		$("#s_disability_f").val("");
		
		$("#b_male").val("");
		$("#b_female").val("");
		$("#b_boys").val("");
		$("#b_girls").val("");
		$("#b_boysUnder").val("");
		$("#b_girlsUnder").val("");
		$("#b_population").val("");
		$("#b_house_hold").val("");
		$("#b_disability_m").val("");
		$("#b_disability_f").val("");
		
		$("#l_male").val("");
		$("#l_female").val("");
		$("#l_boys").val("");
		$("#l_girls").val("");
		$("#l_boysUnder").val("");
		$("#l_girlsUnder").val("");
		$("#l_population").val("");
		$("#l_house_hold").val("");
		$("#l_disability_m").val("");
		$("#l_disability_f").val("");
		
		$("#d_male").val("");
		$("#d_female").val("");
		$("#d_boys").val("");
		$("#d_girls").val("");
		$("#d_boysUnder").val("");
		$("#d_girlsUnder").val("");
		$("#d_population").val("");
		$("#d_house_hold").val("");
		$("#d_disability_m").val("");
		$("#d_disability_f").val("");
		
		/*$("#i_male").val("");
		$("#i_female").val("");
		$("#i_boys").val("");
		$("#i_girls").val("");
		$("#i_boysUnder").val("");
		$("#i_girlsUnder").val("");
		$("#i_population").val("");
		$("#i_house_hold").val("");
		$("#i_disability").val("");*/
		
		/*$("#dapMale").val("");
		$("#dapFemale").val("");*/
		$("#eMale").val("");
		$("#eFemale").val("");
		$("#totalWiBen").val("");
		$("#totalInBen").val("");
		$("#serRecpent").val("");
		//$("#serType").val("");
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
	
	
	//achivementSave=asinDomain+'fdfd'+interventionArea+'fdfd'+service_type_ot+'fdfd'+service_type_hh+'fdfd'+serviceLevelWs+'fdfd'+serviceLevelHy+'fdfd'+serviceLevelXsector+'fdfd'+achPlanId+'fdfd'+achPlanActivities+'fdfd'+typeOfFacility+'fdfd'+exManagCon+'fdfd'+availHandWashFac+'fdfd'+availWaterSoapFac+'fdfd'+typeOfEven+'fdfd'+evenIssues+'fdfd'+wordCode+'fdfd'+achID+'fdfd'+communityName+'fdfd'+ownerName+'fdfd'+sMale+'fdfd'+sFemale+'fdfd'+sBoys+'fdfd'+sGirls+'fdfd'+sBoysUnder+'fdfd'+sGirlsUnder+'fdfd'+sPopulation+'fdfd'+sHouse_hold+'fdfd'+sDisabilityM+'fdfd'+sDisabilityF+'fdfd'+bMale+'fdfd'+bFemale+'fdfd'+bBoys+'fdfd'+bGirls+'fdfd'+bBoysUnder+'fdfd'+bGirlsUnder+'fdfd'+bPopulation+'fdfd'+bHouse_hold+'fdfd'+bDisabilityM+'fdfd'+bDisabilityF+'fdfd'+lMale+'fdfd'+lFemale+'fdfd'+lBoys+'fdfd'+lGirls+'fdfd'+lBoysUnder+'fdfd'+lGirlsUnder+'fdfd'+lPopulation+'fdfd'+lHouse_hold+'fdfd'+lDisabilityM+'fdfd'+lDisabilityF+'fdfd'+dMale+'fdfd'+dFemale+'fdfd'+dBoys+'fdfd'+dGirls+'fdfd'+dBoysUnder+'fdfd'+dGirlsUnder+'fdfd'+dPopulation+'fdfd'+dHouse_hold+'fdfd'+dDisabilityM+'fdfd'+dDisabilityF+'fdfd'+eMale+'fdfd'+eFemale+'fdfd'+totalWiBen+'fdfd'+totalInBen+'fdfd'+achServiceRecpt+'fdfd'+achPhoto+'fdfd'+startDt+'fdfd'+latitude+'fdfd'+longitude;
	
	$("#asign_domain").val(achRevDetailsArray[0]);
	$("#intervention_area").val(achRevDetailsArray[1]);
	if (achRevDetailsArray[1]=='Others'){
		$("#ifOthers").show();
		$("#service_type_ot").val(achRevDetailsArray[2]);		
	}else{
		$("#ifWatsan").show();
		$("#service_type_hh").val(achRevDetailsArray[3]);
	}
	
	if (achRevDetailsArray[3]=='Water' || achRevDetailsArray[3]=='Sanitation'){
		$("#ifWaterSani").show();
		$("#service_level_ws").val(achRevDetailsArray[4]);
	}else if (achRevDetailsArray[2]=='Water' || achRevDetailsArray[2]=='Sanitation'){
		$("#ifWaterSani").show();
		$("#service_level_ws").val(achRevDetailsArray[4]);
	}else if (achRevDetailsArray[2]=='Hygiene'){
		$("#ifHygiene").show();
		$("#service_level_hy").val(achRevDetailsArray[5]);		
	}else{
		$("#ifXsector").show();
		$("#service_level_xsector").val(achRevDetailsArray[6]);	
	}
	
	
	$("#selectIndicator").val(achRevDetailsArray[7]);//No Save
		
	$("input:radio[name='plan_select'][value='"+achRevDetailsArray[8]+"']").attr("checked","checked");
	
	
	$("#typeOf_Facility").val(achRevDetailsArray[9]);
	$("#ex_manag_con").val(achRevDetailsArray[10]);
	$("#avail_handWash_fac").val(achRevDetailsArray[11]);
	$("#avail_WaterSoap_fac").val(achRevDetailsArray[12]);
	$("#typeOf_event").val(achRevDetailsArray[13]);
	$("#event_issues").val(achRevDetailsArray[14]);
	
	$("#selectWardCode").val(achRevDetailsArray[15]);//No Save
	$("#cbo_combo").val(achRevDetailsArray[15]);
	$("#achID_show").val(achRevDetailsArray[15]);
	$("#ach_id").val(achRevDetailsArray[16]);
	
	$("#community_name").val(achRevDetailsArray[17]);
	$("#owner_name").val(achRevDetailsArray[18]);
		
	$("#s_male").val(achRevDetailsArray[19]);
	$("#s_female").val(achRevDetailsArray[20]);
	$("#s_boys").val(achRevDetailsArray[21]);
	$("#s_girls").val(achRevDetailsArray[22]);
	$("#s_boysUnder").val(achRevDetailsArray[23]);
	$("#s_girlsUnder").val(achRevDetailsArray[24]);
	$("#s_population").val(achRevDetailsArray[25]);
	$("#s_house_hold").val(achRevDetailsArray[26]);
	$("#s_disability_m").val(achRevDetailsArray[27]);
	$("#s_disability_f").val(achRevDetailsArray[28]);
	
	$("#b_male").val(achRevDetailsArray[29]);
	$("#b_female").val(achRevDetailsArray[30]);
	$("#b_boys").val(achRevDetailsArray[31]);
	$("#b_girls").val(achRevDetailsArray[32]);
	$("#b_boysUnder").val(achRevDetailsArray[33]);
	$("#b_girlsUnder").val(achRevDetailsArray[34]);
	$("#b_population").val(achRevDetailsArray[35]);
	$("#b_house_hold").val(achRevDetailsArray[36]);
	$("#b_disability_m").val(achRevDetailsArray[37]);
	$("#b_disability_f").val(achRevDetailsArray[38]);
	
	$("#l_male").val(achRevDetailsArray[39]);
	$("#l_female").val(achRevDetailsArray[40]);
	$("#l_boys").val(achRevDetailsArray[41]);
	$("#l_girls").val(achRevDetailsArray[42]);
	$("#l_boysUnder").val(achRevDetailsArray[43]);
	$("#l_girlsUnder").val(achRevDetailsArray[44]);
	$("#l_population").val(achRevDetailsArray[45]);
	$("#l_house_hold").val(achRevDetailsArray[46]);
	$("#l_disability_m").val(achRevDetailsArray[47]);
	$("#l_disability_f").val(achRevDetailsArray[48]);
	
	$("#d_male").val(achRevDetailsArray[49]);
	$("#d_female").val(achRevDetailsArray[50]);
	$("#d_boys").val(achRevDetailsArray[51]);
	$("#d_girls").val(achRevDetailsArray[52]);
	$("#d_boysUnder").val(achRevDetailsArray[53]);
	$("#d_girlsUnder").val(achRevDetailsArray[54]);
	$("#d_population").val(achRevDetailsArray[55]);
	$("#d_house_hold").val(achRevDetailsArray[56]);
	$("#d_disability_m").val(achRevDetailsArray[57]);
	$("#d_disability_f").val(achRevDetailsArray[58]);
	
	$("#eMale").val(achRevDetailsArray[59]);
	$("#eFemale").val(achRevDetailsArray[60]);
	$("#totalWiBen").val(achRevDetailsArray[61]);
	$("#totalInBen").val(achRevDetailsArray[62]);
	
	$("#serRecpent").val(achRevDetailsArray[63]);	
	$("#achPhoto").val(achRevDetailsArray[64]);	
	
	startDt=achRevDetailsArray[65]
	
	var achlat=$("#ach_lat").val(achRevDetailsArray[66]);
	var achlong=$("#ach_long").val(achRevDetailsArray[67]);
	
	var image = document.getElementById('myImageA');
    image.src = achRevDetailsArray[64];
    imagePathA = achRevDetailsArray[64];
	
	
	if((achRevDetailsArray[3]=='Water' || achRevDetailsArray[3]=='Sanitation') && (achRevDetailsArray[1]=='Watsan')){
		$("#sbl_btn").show();
		$("#directShow").hide();	
		$("#ethnic").show();
	}else{
		$("#sShow").hide();
		$("#bShow").hide();
		$("#lShow").hide();
		$("#sbl_btn").hide();
		$("#directShow").show();
		$("#ethnic").show();				
	}
	
	if (achRevDetailsArray[2]=='Water' || achRevDetailsArray[3]=='Water'){
		$("#ifHygiene").hide();		
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		$("#ifXsector").hide();
		
		serviceLevelHy='';
		serviceLevelXsector='';	
		$("#service_level_hy").val("");	
		$("#service_level_xsector").val("");	
		
		$("#ifWaterSani").show();		
	}else if (achRevDetailsArray[2]=='Sanitation' || achRevDetailsArray[3]=='Sanitation'){
		$("#ifHygiene").hide();
		$("#ifXsector").hide();
		
		serviceLevelHy="";	
		serviceLevelXsector="";	
		$("#service_level_hy").val("");	
		$("#service_level_xsector").val("");
			
		$("#ifWaterSani").show();
	}else if (achRevDetailsArray[2]=='Hygiene'){
		$("#ifWaterSani").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		$("#ifXsector").hide();
		
		serviceLevelWs="";
		serviceLevelXsector="";		
		$("#service_level_ws").val("");
		$("#service_level_xsector").val("");
		
		$("#ifHygiene").show();	
	}else if(achRevDetailsArray[2]=='X-Sector'){
		$("#ifWaterSani").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		$("#ifHygiene").hide();	
		
		serviceLevelWs="";
		serviceLevelHy="";
		$("#service_level_ws").val("");
		$("#service_level_hy").val("");	
		
		$("#ifXsector").show();
	}else{
		$("#ifWaterSani").hide();
		$("#ifHygiene").hide();
		$("#ifXsector").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		
		$("#service_level_ws").val("");
		$("#service_level_hy").val("");	
		$("#service_level_xsector").val("");
	}
		
	if(achRevDetailsArray[2]=='Sanitation' || achRevDetailsArray[3]=='Sanitation'){			
		$("#typeOfEvent").hide();
		$("#eventIssues").hide();
		$("#availHandWash_fac").hide();
		$("#availWaterSoap_fac").hide();
		
		$("#typeOfFac").show();
		$("#exManag_con").show();			
	}else if (achRevDetailsArray[2]=='Hygiene' && achRevDetailsArray[5]=='Handwashing F'){
		$("#typeOfEvent").hide();
		$("#eventIssues").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		
		$("#availHandWash_fac").show();
		$("#availWaterSoap_fac").show();			
	}else if ((achRevDetailsArray[2]=='Hygiene' && achRevDetailsArray[5]=='Event') || (achRevDetailsArray[2]=='X-Sector' && achRevDetailsArray[5]=='Event')){
		$("#availHandWash_fac").hide();
		$("#availWaterSoap_fac").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
		
		$("#typeOfEvent").show();		
	}else{
		$("#availHandWash_fac").hide();
		$("#typeOfEvent").hide();
		$("#availWaterSoap_fac").hide();
		$("#eventIssues").hide();
		$("#typeOfFac").hide();
		$("#exManag_con").hide();
	}		
	
	if (achRevDetailsArray[13]=='Orientation' || achRevDetailsArray[13]=='Session' || achRevDetailsArray[13]=='Campaign'){
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
	
	/*if (achPhoto=='' || achPhoto==undefined){
		$(".errorChk").text("Please confirm Photo ");
		$("#btn_ach_save").show();
		$("#btn_ach_submit").show();
	}else if((latitude==0 || longitude==0) ||(localStorage.latitudeAreaWq==0 || localStorage.longitudeAreaWq==0)){
			$(".errorChk").text("Please confirm your location");
			$("#btn_ach_save").show();
			$("#btn_ach_submit").show();
	}else{*/				
		if (achPlanId=='' || wordCode=='' ){
			$(".errorChk").text("New records not available");
			$("#btn_ach_submit").show();
		}else{
			//imagePathA="test"
			if (imagePathA!=""){
				$(".errorChk").text("Syncing photo..")
				imageNameAch = localStorage.mobile_no+"_"+get_time+".jpg";						
				uploadPhotoAch(imagePathA, imageNameAch);
			}
		}
		syncDataAch()
	//}
}

function syncDataAch(){
	if(latitude==0 || longitude==0){
		latitude=localStorage.latitudeAreaWq;
		longitude=localStorage.longitudeAreaWq;
	}
	
	//alert(apipath+'submitAchiveData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&asinDomain='+asinDomain+'&interventionArea='+interventionArea+'&service_type_ot='+service_type_ot+'&service_type_hh='+service_type_hh+'&serviceLevelWs='+serviceLevelWs+'&serviceLevelHy='+serviceLevelHy+'&serviceLevelXsector='+serviceLevelXsector+'&achPlanId='+achPlanId+'&achPlanActivities='+achPlanActivities+'&typeOfFacility='+typeOfFacility+'&exManagCon='+exManagCon+'&availHandWashFac='+availHandWashFac+'&availWaterSoapFac='+availWaterSoapFac+'&typeOfEven='+typeOfEven+'&evenIssues='+evenIssues+'&wordCode='+wordCode+'&achID='+achID+'&communityName='+communityName+'&ownerName='+ownerName+'&sMale='+sMale+'&sFemale='+sFemale+'&sBoys='+sBoys+'&sGirls='+sGirls+'&sBoysUnder='+sBoysUnder+'&sGirlsUnder='+sGirlsUnder+'&sPopulation='+sPopulation+'&sHouse_hold='+sHouse_hold+'&sDisabilityM='+sDisabilityM+'&sDisabilityF='+sDisabilityF+'&bMale='+bMale+'&bFemale='+bFemale+'&bBoys='+bBoys+'&bGirls='+bGirls+'&bBoysUnder='+bBoysUnder+'&bGirlsUnder='+bGirlsUnder+'&bPopulation='+bPopulation+'&bHouse_hold='+bHouse_hold+'&bDisabilityM='+bDisabilityM+'&bDisabilityF='+bDisabilityF+'&lMale='+lMale+'&lFemale='+lFemale+'&lBoys='+lBoys+'&lGirls='+lGirls+'&lBoysUnder='+lBoysUnder+'&lGirlsUnder='+lGirlsUnder+'&lPopulation='+lPopulation+'&lHouse_hold='+lHouse_hold+'&lDisabilityM='+lDisabilityM+'&lDisabilityF='+lDisabilityF+'&dMale='+dMale+'&dFemale='+dFemale+'&dBoys='+dBoys+'&dGirls='+dGirls+'&dBoysUnder='+dBoysUnder+'&dGirlsUnder='+dGirlsUnder+'&dPopulation='+dPopulation+'&dHouse_hold='+dHouse_hold+'&dDisabilityM='+dDisabilityM+'&dDisabilityF='+dDisabilityF+'&eMale='+eMale+'&eFemale='+eFemale+'&totalWiBen='+totalWiBen+'&totalInBen='+totalInBen+'&achServiceRecpt='+achServiceRecpt+'&achPhoto='+imageNameAch+'&startDt='+startDt+'&latitude='+latitude+'&longitude='+longitude);
	$.ajax({
		type: 'POST',
		url:apipath+'submitAchiveData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&asinDomain='+asinDomain+'&interventionArea='+interventionArea+'&service_type_ot='+service_type_ot+'&service_type_hh='+service_type_hh+'&serviceLevelWs='+serviceLevelWs+'&serviceLevelHy='+serviceLevelHy+'&serviceLevelXsector='+serviceLevelXsector+'&achPlanId='+achPlanId+'&achPlanActivities='+achPlanActivities+'&typeOfFacility='+typeOfFacility+'&exManagCon='+exManagCon+'&availHandWashFac='+availHandWashFac+'&availWaterSoapFac='+availWaterSoapFac+'&typeOfEven='+typeOfEven+'&evenIssues='+evenIssues+'&wordCode='+wordCode+'&achID='+achID+'&communityName='+communityName+'&ownerName='+ownerName+'&sMale='+sMale+'&sFemale='+sFemale+'&sBoys='+sBoys+'&sGirls='+sGirls+'&sBoysUnder='+sBoysUnder+'&sGirlsUnder='+sGirlsUnder+'&sPopulation='+sPopulation+'&sHouse_hold='+sHouse_hold+'&sDisabilityM='+sDisabilityM+'&sDisabilityF='+sDisabilityF+'&bMale='+bMale+'&bFemale='+bFemale+'&bBoys='+bBoys+'&bGirls='+bGirls+'&bBoysUnder='+bBoysUnder+'&bGirlsUnder='+bGirlsUnder+'&bPopulation='+bPopulation+'&bHouse_hold='+bHouse_hold+'&bDisabilityM='+bDisabilityM+'&bDisabilityF='+bDisabilityF+'&lMale='+lMale+'&lFemale='+lFemale+'&lBoys='+lBoys+'&lGirls='+lGirls+'&lBoysUnder='+lBoysUnder+'&lGirlsUnder='+lGirlsUnder+'&lPopulation='+lPopulation+'&lHouse_hold='+lHouse_hold+'&lDisabilityM='+lDisabilityM+'&lDisabilityF='+lDisabilityF+'&dMale='+dMale+'&dFemale='+dFemale+'&dBoys='+dBoys+'&dGirls='+dGirls+'&dBoysUnder='+dBoysUnder+'&dGirlsUnder='+dGirlsUnder+'&dPopulation='+dPopulation+'&dHouse_hold='+dHouse_hold+'&dDisabilityM='+dDisabilityM+'&dDisabilityF='+dDisabilityF+'&eMale='+eMale+'&eFemale='+eFemale+'&totalWiBen='+totalWiBen+'&totalInBen='+totalInBen+'&achServiceRecpt='+achServiceRecpt+'&achPhoto='+imageNameAch+'&startDt='+startDt+'&latitude='+latitude+'&longitude='+longitude,
				
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
			$("#btn_ach_submit").hide();
			$("#btn_take_pic").hide();
			$("#btn_ach_lat_long").hide();
			//$("#achlocation").val('Successfully Submited');
			
		/*}else if(result=='Failed4'){
			//$(".errorChk").text('Failed to Submit');
			$(".errorChk").text('Achievement ID Already Exists');									
			$("#btn_ach_submit").show();
		}else{
			$(".errorChk").text('Try again after 5 minutes');																		
			$("#btn_ach_submit").show();
		}*/
		
		}else if(result=='Failed1'){
			$(".errorChk").text('Try again after 5 minutes');	
			$("#btn_ach_submit").show();
			$("#btn_ach_save").show();
		}else if(result=='Failed2'){
			$(".errorChk").text('Authorization Error');	
			$("#btn_ach_submit").show();
			$("#btn_ach_save").show();
		}else if(result=='Failed3'){
			$(".errorChk").text('Invalid Domain & Indicator');	
			$("#btn_ach_submit").show();
			$("#btn_ach_save").show();					
		}else if(result=='Failed4'){
			$(".errorChk").text('Achievement ID Already Exists');	
			$("#btn_ach_submit").show();
			$("#btn_ach_save").show();
		}else if(result=='Failed5'){
			$(".errorChk").text('Invalid Domain & Ward Code');	
			$("#btn_ach_submit").show();
			$("#btn_ach_save").show();
		/*}else if(result=='Failed6'){
			$(".errorChk").text('Invalid Facility ID & Ward Code');	
			$("#btn_ach_submit").show();
			$("#btn_ach_save").show();	*/
		}else{
			$(".errorChk").text('Please Save and try to Submit later');
			$("#btn_ach_submit").show();
			$("#btn_ach_save").show();
		}
	 },error: function(result){
			 $(".errorChk").text('Network timeout. Please ensure you have good network signal and working Internet.');
			 $("#btn_ach_submit").show();
			 $("#btn_ach_save").show();
		}
	});//end ajax
}


//======================================================================================Water quality data
var asinDomainWaterQ="";
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


var projectWq="";
function waterQtyClick(){
	$(".errorChk").text("");
	$(".sucMsg").text("");
	if(localStorage.plan_wq==undefined || localStorage.plan_wq==""){
		$(".errorChk").text("Required Sync");
	}else{
		
		if (domainFlagWq==0){
			$("#asignDomainWq").html(localStorage.domainWq);	
			domainFlagWq=1;
		}else{
			$('#asignDomainWq').empty();
			$('#asignDomainWq').append(localStorage.domainWq).trigger('create');
		}
		//----------------
		$("#ach_lat").val("");
		$("#ach_long").val("");
		
		//------------------	
		
		var url = "#setDomain";
		//$(location).attr('href',url);
		$.mobile.navigate(url);
		
		}
	}
	
function select_domainWq(){
	asinDomainWaterQ=$("#asign_domainWq").val();
	intervention_area_wq=$("#intervention_area_wq").val();
	test_type_wq=$("#test_type").val();
	var selectIndicatorWq=$("#selectIndicatorWq").val();

	wqAsinDomainStr=asinDomainWaterQ.lastIndexOf('/');
	projectWq=asinDomainWaterQ.substr(0,wqAsinDomainStr);
	
	if(asinDomainWaterQ==''){
		$(".errorChk").text("Required Domain");	
	}else if (intervention_area_wq==''){
		$(".errorChk").text("Required Indicator Type");
	}else if (test_type_wq==''){
		$(".errorChk").text("Required Test Type");	
	}else{
		var planWqLst=localStorage.plan_wq.split('|||');
		planWqStr='<ul data-role="listview" data-inset="true">'
		 for (i=0;i<eval(planWqLst.length);i++){
			planWqLi=planWqLst[i].split('||');
			activityNameWq=planWqLi[0]
			activity_idWq=planWqLi[1]
			indicatorTypeWq=planWqLi[2]
			sectorWq=planWqLi[3]
			planWq_id=planWqLi[4]
			planWq_project=planWqLi[5]
			
			if ((projectWq==planWq_project) && (indicatorTypeWq==intervention_area_wq)){
				if ((selectIndicatorWq!='') && (selectIndicatorWq==planWq_id)){		
					planWqStr+='<li class="ui-field-contain"><fieldset data-role="controlgroup">'
					planWqStr+='<input type="radio" name="plan_select_wq"  id="'+planWq_id+'" value="'+planWq_id+'" checked>'
					planWqStr+='<label for="'+planWq_id+'" style="color:#05940a;">'+activity_idWq+'-'+activityNameWq+'-'+planWq_id+'</label>'
					planWqStr+='<input type="hidden" name="activityNameWq"  id="activityNameWq'+planWq_id+'" value="'+activityNameWq+'">'
					planWqStr+='</fieldset></li>'
				}else{
					planWqStr+='<li class="ui-field-contain"><fieldset data-role="controlgroup">'
					planWqStr+='<input type="radio" name="plan_select_wq"  id="'+planWq_id+'" value="'+planWq_id+'" >'
					planWqStr+='<label for="'+planWq_id+'" >'+activity_idWq+'-'+activityNameWq+'-'+planWq_id+'</label>'
					planWqStr+='<input type="hidden" name="activityNameWq"  id="activityNameWq'+planWq_id+'" value="'+activityNameWq+'">'
					planWqStr+='</fieldset></li>'
				}
			}
			
		}//for
		planWqStr+='</ul>'
		localStorage.planWqStr=planWqStr;
		if (localStorage.planWqStr.length >=100){
			if (planFlagWq==0){
				$('#planWqlistDiv').html(localStorage.planWqStr);
				planFlagWq=1;
			}else{
				$('#planWqlistDiv').empty();
				$('#planWqlistDiv').append(localStorage.planWqStr).trigger('create');
			}
			
			//=============ward			
			var selectWardCodeWq=$("#selectWardCodeWq").val();
			var wordCodeListWq=localStorage.cbo_id_wq.split('|||');			
			cboStrWq='<select name="wq_cbo_combo" id="wq_cbo_combo" onchange="select_Wordcode_wq()">'	//data-native-menu="false"	
			cboStrWq+='<option value="">Select Ward Code</option><sup class="reqField">*</sup>'
			for (j=0;j<eval(wordCodeListWq.length);j++){
				wordCodeWqLi=wordCodeListWq[j].split('||');
				wordCWq=wordCodeWqLi[0]
				wordNWq=wordCodeWqLi[1]
				project_nameWq=wordCodeWqLi[2]
				
				//alert(project_nameWq +'|||'+asinDomainWaterQ);
				if (project_nameWq==asinDomainWaterQ){
					if ((selectWardCodeWq !='') && (selectWardCodeWq==wordCWq)){
						cboStrWq+='<option value="'+wordCWq+'" selected="selected">'+wordCWq+'-'+wordNWq+'</option>'
					}else{
						cboStrWq+='<option value="'+wordCWq+'" >'+wordCWq+'-'+wordNWq+'</option>'  //+'-'+project_nameWq+'||||'+test
					}
				}
			}
			cboStrWq+='</select>'  
			localStorage.cboStrWq=cboStrWq;
			
			if (cboFlagWq==0){
				$('#wQCboIdDiv').html(localStorage.cboStrWq);
				cboFlagWq=1;
			}else{
				$('#wQCboIdDiv').empty();
				$('#wQCboIdDiv').append(localStorage.cboStrWq).trigger('create');
			}
			
			$(".errorChk").text("");
			var url = "#planListWq";
			$.mobile.navigate(url);
		}else{
			$(".errorChk").text("Indicator not found");	
			var url = "#setDomain";
			$.mobile.navigate(url);
		}
	}
}	

function select_Wordcode_wq(){
	var wq_cbo_combo=$("#wq_cbo_combo").val();	
	$("#wardCode_show").val(wq_cbo_combo);
}

	
function wQLocationNext(){
	if($("#planWqlistDiv").find("input[name='plan_select_wq']:checked").length==0){
		$(".errorChk").text("Required Indicator");
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
		/*}else if (test_type_val=="" ){
			$(".errorChk").text("Required Test Type ");*/
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
	select_tech_wq=$("#select_tech").val();
	select_water_facility_wq=$("#select_water_facility").val();
	depthM_wq=$("#depthM").val();
	test_parameter_wq=water_facility;//$("input[name='radio_c']:checked").val();
	//====SI
	tKit_si=$("#tKit_si").val();
	tScore_si=$("#tScore_si").val();
	tDate_si=$("#tDate_si").val();
	tBy_si=$("#tBy_si").val();
	//====Arsenic
	tKit_as=$("#tKit_as").val();
	tScore_as=$("#tScore_as").val();
	tAt_as=$("#tAt_as").val();
	tDate_as=$("#tDate_as").val();
	tBy_as=$("#tBy_as").val();
	//====FC
	tKit_fc=$("#tKit_fc").val();
	tScore_fc=$("#tScore_fc").val();
	tAt_fc=$("#tAt_fc").val();
	tDate_fc=$("#tDate_fc").val();
	tBy_fc=$("#tBy_fc").val();
	//====TTC
	tKit_ttc=$("#tKit_ttc").val();
	tScore_ttc=$("#tScore_ttc").val();
	tAt_ttc=$("#tAt_ttc").val();
	tDate_ttc=$("#tDate_ttc").val();
	tBy_ttc=$("#tBy_ttc").val();
	//====Iron
	tKit_iron=$("#tKit_iron").val();
	tScore_iron=$("#tScore_iron").val();
	tAt_iron=$("#tAt_iron").val();
	tDate_iron=$("#tDate_iron").val();
	tBy_iron=$("#tBy_iron").val();
	//====pH
	tKit_ph=$("#tKit_ph").val();
	tScore_ph=$("#tScore_ph").val();
	tAt_ph=$("#tAt_ph").val();
	tDate_ph=$("#tDate_ph").val();
	tBy_ph=$("#tBy_ph").val();
	//====Mn
	tKit_mn=$("#tKit_mn").val();
	tScore_mn=$("#tScore_mn").val();
	tAt_mn=$("#tAt_mn").val();
	tDate_mn=$("#tDate_mn").val();
	tBy_mn=$("#tBy_mn").val();
	//====Chloride
	tKit_chloride=$("#tKit_chloride").val();
	tScore_chloride=$("#tScore_chloride").val();
	tAt_chloride=$("#tAt_chloride").val();
	tDate_chloride=$("#tDate_chloride").val();
	tBy_chloride=$("#tBy_chloride").val();
	//====Bn
	tKit_bn=$("#tKit_bn").val();
	tScore_bn=$("#tScore_bn").val();
	tAt_bn=$("#tAt_bn").val();
	tDate_bn=$("#tDate_bn").val();
	tBy_bn=$("#tBy_bn").val();
	//====Cyanobacteria
	tKit_sn_bacteria=$("#tKit_sn_bacteria").val();
	tScore_sn_bacteria=$("#tScore_sn_bacteria").val();
	tAt_sn_bacteria=$("#tAt_sn_bacteria").val();
	tDate_sn_bacteria=$("#tDate_sn_bacteria").val();
	tBy_sn_bacteria=$("#tBy_sn_bacteria").val();
	//====Turbidity
	tKit_turbidity=$("#tKit_turbidity").val();
	tScore_turbidity=$("#tScore_turbidity").val();
	tAt_turbidity=$("#tAt_turbidity").val();
	tDate_turbidity=$("#tDate_turbidity").val();
	tBy_turbidity=$("#tBy_turbidity").val();
	//====Conductivity
	tKit_conductivity=$("#tKit_conductivity").val();
	tScore_conductivity=$("#tScore_conductivity").val();
	tAt_conductivity=$("#tAt_conductivity").val();
	tDate_conductivity=$("#tDate_conductivity").val();
	tBy_conductivity=$("#tBy_conductivity").val();
	
	
	//alert(test_parameter_wq);
	if (select_tech_wq==''){
		$(".errorChk").text("Required Technology Type");
	}else if (select_water_facility_wq==''){
		$(".errorChk").text("Required Water Facility Type");
	/*}else if (depthM_wq==''){
		$(".errorChk").text("Required Depth(in meter)");		*/
	}else if (test_parameter_wq==undefined || test_parameter_wq==''){
		$(".errorChk").text("Required Test Parameter");
	//=====SI
	}else if ((test_parameter_wq=='SI') && (tKit_si=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='SI') && (tScore_si=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='SI') && (tDate_si=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='SI') && (tBy_si=='')){
		$(".errorChk").text("Required Tested by");
	//=====Arsenic
	}else if ((test_parameter_wq=='Arsenic') && (tKit_as=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='Arsenic') && (tScore_as=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='Arsenic') && (tAt_as=='')){
		$(".errorChk").text("Required Tested At");		
	}else if ((test_parameter_wq=='Arsenic') && (tDate_as=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='Arsenic') && (tBy_as=='')){
		$(".errorChk").text("Required Tested by");
	//=====FC
	}else if ((test_parameter_wq=='FC') && (tKit_fc=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='FC') && (tScore_fc=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='FC') && (tAt_fc=='')){
		$(".errorChk").text("Required Tested At");		
	}else if ((test_parameter_wq=='FC') && (tDate_fc=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='FC') && (tBy_fc=='')){
		$(".errorChk").text("Required Tested by");	
	//=====TTC
	}else if ((test_parameter_wq=='TTC') && (tKit_ttc=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='TTC') && (tScore_ttc=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='TTC') && (tAt_ttc=='')){
		$(".errorChk").text("Required Tested At");		
	}else if ((test_parameter_wq=='TTC') && (tDate_ttc=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='TTC') && (tBy_ttc=='')){
		$(".errorChk").text("Required Tested by");	
	//=====Iron
	}else if ((test_parameter_wq=='Iron') && (tKit_iron=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='Iron') && (tScore_iron=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='Iron') && (tAt_iron=='')){
		$(".errorChk").text("Required Tested At");		
	}else if ((test_parameter_wq=='Iron') && (tDate_iron=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='Iron') && (tBy_iron=='')){
		$(".errorChk").text("Required Tested by");		
	//=====PH
	}else if ((test_parameter_wq=='PH') && (tKit_ph=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='PH') && (tScore_ph=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='PH') && (tAt_ph=='')){
		$(".errorChk").text("Required Tested At");		
	}else if ((test_parameter_wq=='PH') && (tDate_ph=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='PH') && (tBy_ph=='')){
		$(".errorChk").text("Required Tested by");	
	//=====Mn
	}else if ((test_parameter_wq=='Mn') && (tKit_mn=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='Mn') && (tScore_mn=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='Mn') && (tAt_mn=='')){
		$(".errorChk").text("Required Tested At");		
	}else if ((test_parameter_wq=='Mn') && (tDate_mn=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='Mn') && (tBy_mn=='')){
		$(".errorChk").text("Required Tested by");		
	//=====Chloride
	}else if ((test_parameter_wq=='Chloride') && (tKit_chloride=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='Chloride') && (tScore_chloride=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='Chloride') && (tAt_chloride=='')){
		$(".errorChk").text("Required Tested At");		
	}else if ((test_parameter_wq=='Chloride') && (tDate_chloride=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='Chloride') && (tBy_chloride=='')){
		$(".errorChk").text("Required Tested by");		
	//=====Bn
	}else if ((test_parameter_wq=='Bn') && (tKit_bn=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='Bn') && (tScore_bn=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='Bn') && (tAt_bn=='')){
		$(".errorChk").text("Required Tested At");		
	}else if ((test_parameter_wq=='Bn') && (tDate_bn=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='Bn') && (tBy_bn=='')){
		$(".errorChk").text("Required Tested by");	
	//=====Cyanobacteria
	}else if ((test_parameter_wq=='Cyanobacteria') && (tKit_sn_bacteria=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='Cyanobacteria') && (tScore_sn_bacteria=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='Cyanobacteria') && (tAt_sn_bacteria=='')){
		$(".errorChk").text("Required Tested At");		
	}else if ((test_parameter_wq=='Cyanobacteria') && (tDate_sn_bacteria=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='Cyanobacteria') && (tBy_sn_bacteria=='')){
		$(".errorChk").text("Required Tested by");	
	//=====Turbidity
	}else if ((test_parameter_wq=='Turbidity') && (tKit_turbidity=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='Turbidity') && (tScore_turbidity=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='Turbidity') && (tAt_turbidity=='')){
		$(".errorChk").text("Required Tested At");		
	}else if ((test_parameter_wq=='Turbidity') && (tDate_turbidity=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='Turbidity') && (tBy_turbidity=='')){
		$(".errorChk").text("Required Tested by");	
	//=====Conductivity
	}else if ((test_parameter_wq=='Conductivity') && (tKit_conductivity=='')){
		$(".errorChk").text("Required Test Kit");	
	}else if ((test_parameter_wq=='Conductivity') && (tScore_conductivity=='')){
		$(".errorChk").text("Required Test Score");	
	}else if ((test_parameter_wq=='Conductivity') && (tAt_conductivity=='')){
		$(".errorChk").text("Required Tested At");		
	}else if ((test_parameter_wq=='Conductivity') && (tDate_conductivity=='')){
		$(".errorChk").text("Required Tested Date");		
	}else if ((test_parameter_wq=='Conductivity') && (tBy_conductivity=='')){
		$(".errorChk").text("Required Tested by");	
		
	}else{
		var url="#waterData3";
		$(".errorChk").text("");
		$.mobile.navigate(url);
	};
};	


//---------------------------Water quality data3 page 
var currentDay = "";
var wq_ins_date="";

function waterData3Next(){
	wq_add_info=$("input[name='add_info']:checked").val();	
	if (wq_add_info==undefined){
		$(".errorChk").text("Required Additional Information");
	}else{
		if (wq_add_info=='Yes'){
			var url="#waterData4";
		}else{
			var url="#waterDataPhoto";
		}
		$.mobile.navigate(url);
	}
};	


//----------------------------water quality data 4
var wq_siteSelectDate="";
function waterData4Next(){
	
	$(".errorChk").text("");
	var url="#waterData5";				
	$.mobile.navigate(url);
}


//---------------------------Water quality data5 page 
function waterData5Next(){
		wq_owner_name=$("#ownerName").val();
		wq_owner_phone=$("#ownerPhone").val();		
		
		wq_caretaker=$("#caretaker").val();
		caretakerPhone=$("#caretakerPhoneNo").val();		
		
		$(".errorChk").text("");
		var url="#waterData6";				
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

/*function selectWaterFacility(){
	select_water_facility=$("#select_water_facility").val();
	if (select_water_facility=='Tubewell'){	
		//=====hide
		//Turbidity
		$("#turbidity_row_label").hide();
		$("#tKit_turbidity_row").hide();
		$("#tScore_turbidity_row").hide();
		$("#tAt_turbidity_row").hide();
		$("#tDate_turbidity_row").hide();
		$("#tBy_turbidity_row").hide();
		//Sn Bacteria
		$("#sn_bacteria_row_label").hide();
		$("#tKit_sn_bacteria_row").hide();
		$("#tScore_sn_bacteria_row").hide();
		$("#tAt_sn_bacteria_row").hide();
		$("#tDate_sn_bacteria_row").hide();
		$("#tBy_sn_bacteria_row").hide();
		//Conductivity
		$("#conductivity_row_label").hide();
		$("#tKit_conductivity_row").hide();		
		$("#tScore_conductivity_row").hide();
		$("#tAt_conductivity_row").hide();
		$("#tDate_conductivity_row").hide();
		$("#tBy_conductivity_row").hide();
		//=====show
		//TTC
		$("#ttc_row_label").show();
		$("#tKit_ttc_row").show();
		$("#tScore_ttc_row").show();
		$("#tAt_ttc_row").show();
		$("#tDate_ttc_row").show();
		$("#tBy_ttc_row").show();
		//AS
		$("#as_row_label").show();
		$("#tKit_as_row").show();
		$("#tScore_as_row").show();
		$("#tAt_as_row").show();
		$("#tDate_as_row").show();
		$("#tBy_as_row").show();
		//FC
		$("#fc_row_label").show();
		$("#tKit_fc_row").show();
		$("#tScore_fc_row").show();
		$("#tAt_fc_row").show();
		$("#tDate_fc_row").show();
		$("#tBy_fc_row").show();
		//Iron
		$("#iron_row_label").show();
		$("#tKit_iron_row").show();
		$("#tScore_iron_row").show();
		$("#tAt_iron_row").show();
		$("#tDate_iron_row").show();
		$("#tBy_iron_row").show();
		//Mn
		$("#mn_row_label").show();
		$("#tKit_mn_row").show();
		$("#tScore_mn_row").show();
		$("#tAt_mn_row").show();
		$("#tDate_mn_row").show();
		$("#tBy_mn_row").show();
		//Chloride
		$("#chloride_row_label").show();
		$("#tKit_chloride_row").show();
		$("#tScore_chloride_row").show();
		$("#tAt_chloride_row").show();
		$("#tDate_chloride_row").show();
		$("#tBy_chloride_row").show();
		//Bn
		$("#bn_row_label").show();
		$("#tKit_bn_row").show();
		$("#tScore_bn_row").show();
		$("#tAt_bn_row").show();
		$("#tDate_bn_row").show();
		$("#tBy_bn_row").show();
		//pH
		$("#ph_row_label").show();
		$("#tKit_ph_row").show();
		$("#tScore_ph_row").show();
		$("#tAt_ph_row").show();	
		$("#tDate_ph_row").show();	
		$("#tBy_ph_row").show();	
		//SI
		$("#si_row_label").show();
		$("#tKit_si_row").show();
		$("#tScore_si_row").show();
		$("#tDate_si_row").show();
		$("#tBy_si_row").show();			
	}else if (select_water_facility=='PSF'){	
		//=====hide
		//Mn
		$("#mn_row_label").hide();
		$("#tKit_mn_row").hide();
		$("#tScore_mn_row").hide();
		$("#tAt_mn_row").hide();
		$("#tDate_mn_row").hide();
		$("#tBy_mn_row").hide();
		//Chloride
		$("#chloride_row_label").hide();
		$("#tKit_chloride_row").hide();
		$("#tScore_chloride_row").hide();
		$("#tAt_chloride_row").hide();
		$("#tDate_chloride_row").hide();
		$("#tBy_chloride_row").hide();
		//Bn
		$("#bn_row_label").hide();
		$("#tKit_bn_row").hide();
		$("#tScore_bn_row").hide();
		$("#tAt_bn_row").hide();
		$("#tDate_bn_row").hide();
		$("#tBy_bn_row").hide();
		//Conductivity
		$("#conductivity_row_label").hide();
		$("#tKit_conductivity_row").hide();
		$("#tScore_conductivity_row").hide();
		$("#tAt_conductivity_row").hide();
		$("#tDate_conductivity_row").hide();
		$("#tBy_conductivity_row").hide();
		//=====show
		//TTC
		$("#ttc_row_label").show();
		$("#tKit_ttc_row").show();
		$("#tScore_ttc_row").show();
		$("#tAt_ttc_row").show();
		$("#tDate_ttc_row").show();
		$("#tBy_ttc_row").show();
		//AS
		$("#as_row_label").show();
		$("#tKit_as_row").show();
		$("#tScore_as_row").show();
		$("#tAt_as_row").show();
		$("#tDate_as_row").show();
		$("#tBy_as_row").show();
		//FC
		$("#fc_row_label").show();
		$("#tKit_fc_row").show();
		$("#tScore_fc_row").show();
		$("#tAt_fc_row").show();
		$("#tDate_fc_row").show();
		$("#tBy_fc_row").show();
		//Iron
		$("#iron_row_label").show();
		$("#tKit_iron_row").show();
		$("#tScore_iron_row").show();
		$("#tAt_iron_row").show();
		$("#tDate_iron_row").show();
		$("#tBy_iron_row").show();
		//pH
		$("#ph_row_label").show();
		$("#tKit_ph_row").show();
		$("#tScore_ph_row").show();
		$("#tAt_ph_row").show();	
		$("#tDate_ph_row").show();	
		$("#tBy_ph_row").show();	
		//SI
		$("#si_row_label").show();
		$("#tKit_si_row").show();
		$("#tScore_si_row").show();
		$("#tDate_si_row").show();
		$("#tBy_si_row").show();
		//Sn Bacteria
		$("#sn_bacteria_row_label").show();
		$("#tKit_sn_bacteria_row").show();
		$("#tScore_sn_bacteria_row").show();
		$("#tAt_sn_bacteria_row").show();
		$("#tDate_sn_bacteria_row").show();
		$("#tBy_sn_bacteria_row").show();
		//Turbidity
		$("#turbidity_row_label").show();
		$("#tKit_turbidity_row").show();
		$("#tScore_turbidity_row").show();
		$("#tAt_turbidity_row").show();
		$("#tDate_turbidity_row").show();
		$("#tBy_turbidity_row").show();					
	}else if (select_water_facility=='RO'){	
		//=====hide
		//Turbidity
		$("#turbidity_row_label").hide();
		$("#tKit_turbidity_row").hide();
		$("#tScore_turbidity_row").hide();
		$("#tAt_turbidity_row").hide();
		$("#tDate_turbidity_row").hide();
		$("#tBy_turbidity_row").hide();
		//Sn Bacteria
		$("#sn_bacteria_row_label").hide();
		$("#tKit_sn_bacteria_row").hide();
		$("#tScore_sn_bacteria_row").hide();
		$("#tAt_sn_bacteria_row").hide();
		$("#tDate_sn_bacteria_row").hide();
		$("#tBy_sn_bacteria_row").hide();
		//Conductivity
		$("#conductivity_row_label").hide();
		$("#tKit_conductivity_row").hide();
		$("#tScore_conductivity_row").hide();
		$("#tAt_conductivity_row").hide();
		$("#tDate_conductivity_row").hide();
		$("#tBy_conductivity_row").hide();
		//=====show
		//TTC
		$("#ttc_row_label").show();
		$("#tKit_ttc_row").show();
		$("#tScore_ttc_row").show();
		$("#tAt_ttc_row").show();
		$("#tDate_ttc_row").show();
		$("#tBy_ttc_row").show();
		//AS
		$("#as_row_label").show();
		$("#tKit_as_row").show();
		$("#tScore_as_row").show();
		$("#tAt_as_row").show();
		$("#tDate_as_row").show();
		$("#tBy_as_row").show();
		//FC
		$("#fc_row_label").show();
		$("#tKit_fc_row").show();
		$("#tScore_fc_row").show();
		$("#tAt_fc_row").show();
		$("#tDate_fc_row").show();
		$("#tBy_fc_row").show();
		//Iron
		$("#iron_row_label").show();
		$("#tKit_iron_row").show();
		$("#tScore_iron_row").show();
		$("#tAt_iron_row").show();
		$("#tDate_iron_row").show();
		$("#tBy_iron_row").show();
		//pH
		$("#ph_row_label").show();
		$("#tKit_ph_row").show();
		$("#tScore_ph_row").show();
		$("#tAt_ph_row").show();	
		$("#tDate_ph_row").show();	
		$("#tBy_ph_row").show();	
		//SI
		$("#si_row_label").show();
		$("#tKit_si_row").show();
		$("#tScore_si_row").show();
		$("#tDate_si_row").show();
		$("#tBy_si_row").show();
		//Mn
		$("#mn_row_label").show();
		$("#tKit_mn_row").show();
		$("#tScore_mn_row").show();
		$("#tAt_mn_row").show();
		$("#tDate_mn_row").show();
		$("#tBy_mn_row").show();
		//Chloride
		$("#chloride_row_label").show();
		$("#tKit_chloride_row").show();
		$("#tScore_chloride_row").show();
		$("#tAt_chloride_row").show();
		$("#tDate_chloride_row").show();
		$("#tBy_chloride_row").show();
		//Bn
		$("#bn_row_label").show();
		$("#tKit_bn_row").show();
		$("#tScore_bn_row").show();
		$("#tAt_bn_row").show();
		$("#tDate_bn_row").show();
		$("#tBy_bn_row").show();
	}else if (select_water_facility=='GFS'){	
		//=====hide
		//AS
		$("#as_row_label").hide();
		$("#tKit_as_row").hide();
		$("#tScore_as_row").hide();
		$("#tAt_as_row").hide();
		$("#tDate_as_row").hide();
		$("#tBy_as_row").hide();
		//Sn Bacteria
		$("#sn_bacteria_row_label").hide();
		$("#tKit_sn_bacteria_row").hide();
		$("#tScore_sn_bacteria_row").hide();
		$("#tAt_sn_bacteria_row").hide();
		$("#tDate_sn_bacteria_row").hide();
		$("#tBy_sn_bacteria_row").hide();
		//Conductivity
		$("#conductivity_row_label").hide();
		$("#tKit_conductivity_row").hide();
		$("#tScore_conductivity_row").hide();
		$("#tAt_conductivity_row").hide();
		$("#tDate_conductivity_row").hide();
		$("#tBy_conductivity_row").hide();
		//Iron
		$("#iron_row_label").hide();
		$("#tKit_iron_row").hide();
		$("#tScore_iron_row").hide();
		$("#tAt_iron_row").hide();
		$("#tDate_iron_row").hide();
		$("#tBy_iron_row").hide();
		//Mn
		$("#mn_row_label").hide();
		$("#tKit_mn_row").hide();
		$("#tScore_mn_row").hide();
		$("#tAt_mn_row").hide();
		$("#tDate_mn_row").hide();
		$("#tBy_mn_row").hide();
		//Chloride
		$("#chloride_row_label").hide();
		$("#tKit_chloride_row").hide();
		$("#tScore_chloride_row").hide();
		$("#tAt_chloride_row").hide();
		$("#tDate_chloride_row").hide();
		$("#tBy_chloride_row").hide();
		//Bn
		$("#bn_row_label").hide();
		$("#tKit_bn_row").hide();
		$("#tScore_bn_row").hide();
		$("#tAt_bn_row").hide();
		$("#tDate_bn_row").hide();
		$("#tBy_bn_row").hide();
		//=====show
		//TTC
		$("#ttc_row_label").show();
		$("#tKit_ttc_row").show();
		$("#tScore_ttc_row").show();
		$("#tAt_ttc_row").show();
		$("#tDate_ttc_row").show();
		$("#tBy_ttc_row").show();
		//FC
		$("#fc_row_label").show();
		$("#tKit_fc_row").show();
		$("#tScore_fc_row").show();
		$("#tAt_fc_row").show();
		$("#tDate_fc_row").show();
		$("#tBy_fc_row").show();
		//Turbidity
		$("#turbidity_row_label").show();
		$("#tKit_turbidity_row").show();
		$("#tScore_turbidity_row").show();
		$("#tAt_turbidity_row").show();
		$("#tDate_turbidity_row").show();
		$("#tBy_turbidity_row").show();
		//pH
		$("#ph_row_label").show();
		$("#tKit_ph_row").show();
		$("#tScore_ph_row").show();
		$("#tAt_ph_row").show();	
		$("#tDate_ph_row").show();	
		$("#tBy_ph_row").show();	
		//SI
		$("#si_row_label").show();
		$("#tKit_si_row").show();
		$("#tScore_si_row").show();
		$("#tDate_si_row").show();
		$("#tBy_si_row").show();
	}else if (select_water_facility=='AIRP'){	
		//=====hide
		//Sn Bacteria
		$("#sn_bacteria_row_label").hide();
		$("#tKit_sn_bacteria_row").hide();
		$("#tScore_sn_bacteria_row").hide();
		$("#tAt_sn_bacteria_row").hide();
		$("#tDate_sn_bacteria_row").hide();
		$("#tBy_sn_bacteria_row").hide();
		//Turbidity
		$("#turbidity_row_label").hide();
		$("#tKit_turbidity_row").hide();
		$("#tScore_turbidity_row").hide();
		$("#tAt_turbidity_row").hide();
		$("#tDate_turbidity_row").hide();
		$("#tBy_turbidity_row").hide();
		//Conductivity
		$("#conductivity_row_label").hide();
		$("#tKit_conductivity_row").hide();
		$("#tScore_conductivity_row").hide();
		$("#tAt_conductivity_row").hide();
		$("#tDate_conductivity_row").hide();
		$("#tBy_conductivity_row").hide();
		//Mn
		$("#mn_row_label").hide();
		$("#tKit_mn_row").hide();
		$("#tScore_mn_row").hide();
		$("#tAt_mn_row").hide();
		$("#tDate_mn_row").hide();
		$("#tBy_mn_row").hide();
		//Chloride
		$("#chloride_row_label").hide();
		$("#tKit_chloride_row").hide();
		$("#tScore_chloride_row").hide();
		$("#tAt_chloride_row").hide();
		$("#tDate_chloride_row").hide();
		$("#tBy_chloride_row").hide();
		//Bn
		$("#bn_row_label").hide();
		$("#tKit_bn_row").hide();
		$("#tScore_bn_row").hide();
		$("#tAt_bn_row").hide();
		$("#tDate_bn_row").hide();
		$("#tBy_bn_row").hide();
		//=====show
		//TTC
		$("#ttc_row_label").show();
		$("#tKit_ttc_row").show();
		$("#tScore_ttc_row").show();
		$("#tAt_ttc_row").show();
		$("#tDate_ttc_row").show();
		$("#tBy_ttc_row").show();
		//AS
		$("#as_row_label").show();
		$("#tKit_as_row").show();
		$("#tScore_as_row").show();
		$("#tAt_as_row").show();
		$("#tDate_as_row").show();
		$("#tBy_as_row").show();
		//FC
		$("#fc_row_label").show();
		$("#tKit_fc_row").show();
		$("#tScore_fc_row").show();
		$("#tAt_fc_row").show();
		$("#tDate_fc_row").show();
		$("#tBy_fc_row").show();
		//Iron
		$("#iron_row_label").show();
		$("#tKit_iron_row").show();
		$("#tScore_iron_row").show();
		$("#tAt_iron_row").show();
		$("#tDate_iron_row").show();
		$("#tBy_iron_row").show();
		//pH
		$("#ph_row_label").show();
		$("#tKit_ph_row").show();
		$("#tScore_ph_row").show();
		$("#tAt_ph_row").show();	
		$("#tDate_ph_row").show();	
		$("#tBy_ph_row").show();	
		//SI
		$("#si_row_label").show();
		$("#tKit_si_row").show();
		$("#tScore_si_row").show();
		$("#tDate_si_row").show();
		$("#tBy_si_row").show();				
	}else if (select_water_facility=='Ringwell/Dugwell'){	
		//=====hide
		//Sn Bacteria
		$("#sn_bacteria_row_label").hide();
		$("#tKit_sn_bacteria_row").hide();
		$("#tScore_sn_bacteria_row").hide();
		$("#tAt_sn_bacteria_row").hide();
		$("#tDate_sn_bacteria_row").hide();
		$("#tBy_sn_bacteria_row").hide();
		//Conductivity
		$("#conductivity_row_label").hide();
		$("#tKit_conductivity_row").hide();
		$("#tScore_conductivity_row").hide();
		$("#tAt_conductivity_row").hide();
		$("#tDate_conductivity_row").hide();
		$("#tBy_conductivity_row").hide();
		//Chloride
		$("#chloride_row_label").hide();
		$("#tKit_chloride_row").hide();
		$("#tScore_chloride_row").hide();
		$("#tAt_chloride_row").hide();
		$("#tDate_chloride_row").hide();
		$("#tBy_chloride_row").hide();
		//Bn
		$("#bn_row_label").hide();
		$("#tKit_bn_row").hide();
		$("#tScore_bn_row").hide();
		$("#tAt_bn_row").hide();
		$("#tDate_bn_row").hide();
		$("#tBy_bn_row").hide();
		//=====show
		//TTC
		$("#ttc_row_label").show();
		$("#tKit_ttc_row").show();
		$("#tScore_ttc_row").show();
		$("#tAt_ttc_row").show();
		$("#tDate_ttc_row").show();
		$("#tBy_ttc_row").show();
		//AS
		$("#as_row_label").show();
		$("#tKit_as_row").show();
		$("#tScore_as_row").show();
		$("#tAt_as_row").show();
		$("#tDate_as_row").show();
		$("#tBy_as_row").show();
		//FC
		$("#fc_row_label").show();
		$("#tKit_fc_row").show();
		$("#tScore_fc_row").show();
		$("#tAt_fc_row").show();
		$("#tDate_fc_row").show();
		$("#tBy_fc_row").show();
		//Iron
		$("#iron_row_label").show();
		$("#tKit_iron_row").show();
		$("#tScore_iron_row").show();
		$("#tAt_iron_row").show();
		$("#tDate_iron_row").show();
		$("#tBy_iron_row").show();
		//Turbidity
		$("#turbidity_row_label").show();
		$("#tKit_turbidity_row").show();
		$("#tScore_turbidity_row").show();
		$("#tAt_turbidity_row").show();
		$("#tDate_turbidity_row").show();
		$("#tBy_turbidity_row").show();
		//Mn
		$("#mn_row_label").show();
		$("#tKit_mn_row").show();
		$("#tScore_mn_row").show();
		$("#tAt_mn_row").show();
		$("#tDate_mn_row").show();
		$("#tBy_mn_row").show();
		//pH
		$("#ph_row_label").show();
		$("#tKit_ph_row").show();
		$("#tScore_ph_row").show();
		$("#tAt_ph_row").show();	
		$("#tDate_ph_row").show();	
		$("#tBy_ph_row").show();	
		//SI
		$("#si_row_label").show();
		$("#tKit_si_row").show();
		$("#tScore_si_row").show();
		$("#tDate_si_row").show();
		$("#tBy_si_row").show();				
	}else if (select_water_facility=='RWH'){	
		//=====hide
		//AS
		$("#as_row_label").hide();
		$("#tKit_as_row").hide();
		$("#tScore_as_row").hide();
		$("#tAt_as_row").hide();
		$("#tDate_as_row").hide();
		$("#tBy_as_row").hide();
		//Iron
		$("#iron_row_label").hide();
		$("#tKit_iron_row").hide();
		$("#tScore_iron_row").hide();
		$("#tAt_iron_row").hide();
		$("#tDate_iron_row").hide();
		$("#tBy_iron_row").hide();
		//Turbidity
		$("#turbidity_row_label").hide();
		$("#tKit_turbidity_row").hide();
		$("#tScore_turbidity_row").hide();
		$("#tAt_turbidity_row").hide();
		$("#tDate_turbidity_row").hide();
		$("#tBy_turbidity_row").hide();
		//Mn
		$("#mn_row_label").hide();
		$("#tKit_mn_row").hide();
		$("#tScore_mn_row").hide();
		$("#tAt_mn_row").hide();
		$("#tDate_mn_row").hide();
		$("#tBy_mn_row").hide();
		//Sn Bacteria
		$("#sn_bacteria_row_label").hide();
		$("#tKit_sn_bacteria_row").hide();
		$("#tScore_sn_bacteria_row").hide();
		$("#tAt_sn_bacteria_row").hide();
		$("#tDate_sn_bacteria_row").hide();
		$("#tBy_sn_bacteria_row").hide();
		//Conductivity
		$("#conductivity_row_label").hide();
		$("#tKit_conductivity_row").hide();
		$("#tScore_conductivity_row").hide();
		$("#tAt_conductivity_row").hide();
		$("#tDate_conductivity_row").hide();
		$("#tBy_conductivity_row").hide();
		//Chloride
		$("#chloride_row_label").hide();
		$("#tKit_chloride_row").hide();
		$("#tScore_chloride_row").hide();
		$("#tAt_chloride_row").hide();
		$("#tDate_chloride_row").hide();
		$("#tBy_chloride_row").hide();
		//Bn
		$("#bn_row_label").hide();
		$("#tKit_bn_row").hide();
		$("#tScore_bn_row").hide();
		$("#tAt_bn_row").hide();
		$("#tDate_bn_row").hide();
		$("#tBy_bn_row").hide();
		//=====show
		//TTC
		$("#ttc_row_label").show();
		$("#tKit_ttc_row").show();
		$("#tScore_ttc_row").show();
		$("#tAt_ttc_row").show();
		$("#tDate_ttc_row").show();
		$("#tBy_ttc_row").show();
		//FC
		$("#fc_row_label").show();
		$("#tKit_fc_row").show();
		$("#tScore_fc_row").show();
		$("#tAt_fc_row").show();
		$("#tDate_fc_row").show();
		$("#tBy_fc_row").show();
		//pH
		$("#ph_row_label").show();
		$("#tKit_ph_row").show();
		$("#tScore_ph_row").show();
		$("#tAt_ph_row").show();	
		$("#tDate_ph_row").show();	
		$("#tBy_ph_row").show();	
		//SI
		$("#si_row_label").show();
		$("#tKit_si_row").show();
		$("#tScore_si_row").show();
		$("#tDate_si_row").show();
		$("#tBy_si_row").show();				
	}else if (select_water_facility=='Stand Post'){	
		//=====hide
		//AS
		$("#as_row_label").hide();
		$("#tKit_as_row").hide();
		$("#tScore_as_row").hide();
		$("#tAt_as_row").hide();
		$("#tDate_as_row").hide();
		$("#tBy_as_row").hide();
		//Iron
		$("#iron_row_label").hide();
		$("#tKit_iron_row").hide();
		$("#tScore_iron_row").hide();
		$("#tAt_iron_row").hide();
		$("#tDate_iron_row").hide();
		$("#tBy_iron_row").hide();
		//Turbidity
		$("#turbidity_row_label").hide();
		$("#tKit_turbidity_row").hide();
		$("#tScore_turbidity_row").hide();
		$("#tAt_turbidity_row").hide();
		$("#tDate_turbidity_row").hide();
		$("#tBy_turbidity_row").hide();
		//Mn
		$("#mn_row_label").hide();
		$("#tKit_mn_row").hide();
		$("#tScore_mn_row").hide();
		$("#tAt_mn_row").hide();
		$("#tDate_mn_row").hide();
		$("#tBy_mn_row").hide();
		//Sn Bacteria
		$("#sn_bacteria_row_label").hide();
		$("#tKit_sn_bacteria_row").hide();
		$("#tScore_sn_bacteria_row").hide();
		$("#tAt_sn_bacteria_row").hide();
		$("#tDate_sn_bacteria_row").hide();
		$("#tBy_sn_bacteria_row").hide();
		//Conductivity
		$("#conductivity_row_label").hide();
		$("#tKit_conductivity_row").hide();
		$("#tScore_conductivity_row").hide();
		$("#tAt_conductivity_row").hide();
		$("#tDate_conductivity_row").hide();
		$("#tBy_conductivity_row").hide();
		//Chloride
		$("#chloride_row_label").hide();
		$("#tKit_chloride_row").hide();
		$("#tScore_chloride_row").hide();
		$("#tAt_chloride_row").hide();
		$("#tDate_chloride_row").hide();
		$("#tBy_chloride_row").hide();
		//Bn
		$("#bn_row_label").hide();
		$("#tKit_bn_row").hide();
		$("#tScore_bn_row").hide();
		$("#tAt_bn_row").hide();
		$("#tDate_bn_row").hide();
		$("#tBy_bn_row").hide();
		//pH
		$("#ph_row_label").hide();
		$("#tKit_ph_row").hide();
		$("#tScore_ph_row").hide();
		$("#tAt_ph_row").hide();	
		$("#tDate_ph_row").hide();	
		$("#tBy_ph_row").hide();
		//=====show
		//TTC
		$("#ttc_row_label").show();
		$("#tKit_ttc_row").show();
		$("#tScore_ttc_row").show();
		$("#tAt_ttc_row").show();
		$("#tDate_ttc_row").show();
		$("#tBy_ttc_row").show();
		//FC
		$("#fc_row_label").show();
		$("#tKit_fc_row").show();
		$("#tScore_fc_row").show();
		$("#tAt_fc_row").show();
		$("#tDate_fc_row").show();
		$("#tBy_fc_row").show();
		//SI
		$("#si_row_label").show();
		$("#tKit_si_row").show();
		$("#tScore_si_row").show();
		$("#tDate_si_row").show();
		$("#tBy_si_row").show();				
	}else if (select_water_facility=='Piped Water Supply System'){	
		//=====hide
		//AS
		$("#as_row_label").hide();
		$("#tKit_as_row").hide();
		$("#tScore_as_row").hide();
		$("#tAt_as_row").hide();
		$("#tDate_as_row").hide();
		$("#tBy_as_row").hide();
		//Iron
		$("#iron_row_label").hide();
		$("#tKit_iron_row").hide();
		$("#tScore_iron_row").hide();
		$("#tAt_iron_row").hide();
		$("#tDate_iron_row").hide();
		$("#tBy_iron_row").hide();
		//Turbidity
		$("#turbidity_row_label").hide();
		$("#tKit_turbidity_row").hide();
		$("#tScore_turbidity_row").hide();
		$("#tAt_turbidity_row").hide();
		$("#tDate_turbidity_row").hide();
		$("#tBy_turbidity_row").hide();
		//Mn
		$("#mn_row_label").hide();
		$("#tKit_mn_row").hide();
		$("#tScore_mn_row").hide();
		$("#tAt_mn_row").hide();
		$("#tDate_mn_row").hide();
		$("#tBy_mn_row").hide();
		//Sn Bacteria
		$("#sn_bacteria_row_label").hide();
		$("#tKit_sn_bacteria_row").hide();
		$("#tScore_sn_bacteria_row").hide();
		$("#tAt_sn_bacteria_row").hide();
		$("#tDate_sn_bacteria_row").hide();
		$("#tBy_sn_bacteria_row").hide();
		//Conductivity
		$("#conductivity_row_label").hide();
		$("#tKit_conductivity_row").hide();
		$("#tScore_conductivity_row").hide();
		$("#tAt_conductivity_row").hide();
		$("#tDate_conductivity_row").hide();
		$("#tBy_conductivity_row").hide();
		//Chloride
		$("#chloride_row_label").hide();
		$("#tKit_chloride_row").hide();
		$("#tScore_chloride_row").hide();
		$("#tAt_chloride_row").hide();
		$("#tDate_chloride_row").hide();
		$("#tBy_chloride_row").hide();
		//Bn
		$("#bn_row_label").hide();
		$("#tKit_bn_row").hide();
		$("#tScore_bn_row").hide();
		$("#tAt_bn_row").hide();
		$("#tDate_bn_row").hide();
		$("#tBy_bn_row").hide();
		//pH
		$("#ph_row_label").hide();
		$("#tKit_ph_row").hide();
		$("#tScore_ph_row").hide();
		$("#tAt_ph_row").hide();	
		$("#tDate_ph_row").hide();	
		$("#tBy_ph_row").hide();
		//=====show
		//TTC
		$("#ttc_row_label").show();
		$("#tKit_ttc_row").show();
		$("#tScore_ttc_row").show();
		$("#tAt_ttc_row").show();
		$("#tDate_ttc_row").show();
		$("#tBy_ttc_row").show();
		//FC
		$("#fc_row_label").show();
		$("#tKit_fc_row").show();
		$("#tScore_fc_row").show();
		$("#tAt_fc_row").show();
		$("#tDate_fc_row").show();
		$("#tBy_fc_row").show();
		//SI
		$("#si_row_label").show();
		$("#tKit_si_row").show();
		$("#tScore_si_row").show();
		$("#tDate_si_row").show();
		$("#tBy_si_row").show();				
	}else if (select_water_facility=='IFG'){	
		//=====hide
		//AS
		$("#as_row_label").hide();
		$("#tKit_as_row").hide();
		$("#tScore_as_row").hide();
		$("#tAt_as_row").hide();
		$("#tDate_as_row").hide();
		$("#tBy_as_row").hide();
		//FC
		$("#fc_row_label").hide();
		$("#tKit_fc_row").hide();
		$("#tScore_fc_row").hide();
		$("#tAt_fc_row").hide();
		$("#tDate_fc_row").hide();
		$("#tBy_fc_row").hide();
		//Mn
		$("#mn_row_label").hide();
		$("#tKit_mn_row").hide();
		$("#tScore_mn_row").hide();
		$("#tAt_mn_row").hide();
		$("#tDate_mn_row").hide();
		$("#tBy_mn_row").hide();
		//Sn Bacteria
		$("#sn_bacteria_row_label").hide();
		$("#tKit_sn_bacteria_row").hide();
		$("#tScore_sn_bacteria_row").hide();
		$("#tAt_sn_bacteria_row").hide();
		$("#tDate_sn_bacteria_row").hide();
		$("#tBy_sn_bacteria_row").hide();
		//Conductivity
		$("#conductivity_row_label").hide();
		$("#tKit_conductivity_row").hide();
		$("#tScore_conductivity_row").hide();
		$("#tAt_conductivity_row").hide();
		$("#tDate_conductivity_row").hide();
		$("#tBy_conductivity_row").hide();
		//Chloride
		$("#chloride_row_label").hide();
		$("#tKit_chloride_row").hide();
		$("#tScore_chloride_row").hide();
		$("#tAt_chloride_row").hide();
		$("#tDate_chloride_row").hide();
		$("#tBy_chloride_row").hide();
		//Bn
		$("#bn_row_label").hide();
		$("#tKit_bn_row").hide();
		$("#tScore_bn_row").hide();
		$("#tAt_bn_row").hide();
		$("#tDate_bn_row").hide();
		$("#tBy_bn_row").hide();
		//=====show
		//TTC
		$("#ttc_row_label").show();
		$("#tKit_ttc_row").show();
		$("#tScore_ttc_row").show();
		$("#tAt_ttc_row").show();
		$("#tDate_ttc_row").show();
		$("#tBy_ttc_row").show();
		//Iron
		$("#iron_row_label").show();
		$("#tKit_iron_row").show();
		$("#tScore_iron_row").show();
		$("#tAt_iron_row").show();
		$("#tDate_iron_row").show();
		$("#tBy_iron_row").show();
		//Turbidity
		$("#turbidity_row_label").show();
		$("#tKit_turbidity_row").show();
		$("#tScore_turbidity_row").show();
		$("#tAt_turbidity_row").show();
		$("#tDate_turbidity_row").show();
		$("#tBy_turbidity_row").show();
		//pH
		$("#ph_row_label").show();
		$("#tKit_ph_row").show();
		$("#tScore_ph_row").show();
		$("#tAt_ph_row").show();	
		$("#tDate_ph_row").show();	
		$("#tBy_ph_row").show();
		//SI
		$("#si_row_label").show();
		$("#tKit_si_row").show();
		$("#tScore_si_row").show();
		$("#tDate_si_row").show();
		$("#tBy_si_row").show();						
	}else{
		//=====show
		//TTC
		$("#ttc_row_label").show();
		$("#tKit_ttc_row").show();
		$("#tScore_ttc_row").show();
		$("#tAt_ttc_row").show();
		$("#tDate_ttc_row").show();
		$("#tBy_ttc_row").show();
		//AS
		$("#as_row_label").show();
		$("#tKit_as_row").show();
		$("#tScore_as_row").show();
		$("#tAt_as_row").show();
		$("#tDate_as_row").show();
		$("#tBy_as_row").show();
		//FC
		$("#fc_row_label").show();
		$("#tKit_fc_row").show();
		$("#tScore_fc_row").show();
		$("#tAt_fc_row").show();
		$("#tDate_fc_row").show();
		$("#tBy_fc_row").show();
		//Mn
		$("#mn_row_label").show();
		$("#tKit_mn_row").show();
		$("#tScore_mn_row").show();
		$("#tAt_mn_row").show();
		$("#tDate_mn_row").show();
		$("#tBy_mn_row").show();
		//Iron
		$("#iron_row_label").show();
		$("#tKit_iron_row").show();
		$("#tScore_iron_row").show();
		$("#tAt_iron_row").show();
		$("#tDate_iron_row").show();
		$("#tBy_iron_row").show();
		//Turbidity
		$("#turbidity_row_label").show();
		$("#tKit_turbidity_row").show();
		$("#tScore_turbidity_row").show();
		$("#tAt_turbidity_row").show();
		$("#tDate_turbidity_row").show();
		$("#tBy_turbidity_row").show();
		//pH
		$("#ph_row_label").show();
		$("#tKit_ph_row").show();
		$("#tScore_ph_row").show();
		$("#tAt_ph_row").show();	
		$("#tDate_ph_row").show();	
		$("#tBy_ph_row").show();
		//SI
		$("#si_row_label").show();
		$("#tKit_si_row").show();
		$("#tScore_si_row").show();
		$("#tDate_si_row").show();
		$("#tBy_si_row").show();
		//Sn Bacteria
		$("#sn_bacteria_row_label").show();
		$("#tKit_sn_bacteria_row").show();
		$("#tScore_sn_bacteria_row").show();
		$("#tAt_sn_bacteria_row").show();
		$("#tDate_sn_bacteria_row").show();
		$("#tBy_sn_bacteria_row").show();
		//Chloride
		$("#chloride_row_label").show();
		$("#tKit_chloride_row").show();
		$("#tScore_chloride_row").show();
		$("#tAt_chloride_row").show();
		$("#tDate_chloride_row").show();
		$("#tBy_chloride_row").show();
		//Bn
		$("#bn_row_label").show();
		$("#tKit_bn_row").show();
		$("#tScore_bn_row").show();
		$("#tAt_bn_row").show();
		$("#tDate_bn_row").show();
		$("#tBy_bn_row").show();
		//Conductivity
		$("#conductivity_row_label").show();
		$("#tKit_conductivity_row").show();
		$("#tScore_conductivity_row").show();
		$("#tAt_conductivity_row").show();
		$("#tDate_conductivity_row").show();
		$("#tBy_conductivity_row").show();			
	}
}*/


function selectWaterFacility(){
	select_water_facility=$("#select_water_facility").val();
	if (select_water_facility=='Tubewell'){	
		$("#div_sn_bacteria").hide()
		$("#div_turbidity").hide();
		$("#div_conductivity").hide()
		
		$("#parameter_label").show();
		$("#div_si").show();
		$("#div_arsenic").show();
		$("#div_fc").show();
		$("#div_ttc").show()
		$("#div_iron").show();
		$("#div_ph").show()
		$("#div_mn").show();
		$("#div_chloride").show();
		$("#div_bn").show();
			
	}else if (select_water_facility=='Piped Water Supply System'){	
		$("#div_arsenic").hide();
		$("#div_iron").hide();
		$("#div_ph").hide()
		$("#div_mn").hide();
		$("#div_chloride").hide();
		$("#div_bn").hide();
		$("#div_sn_bacteria").hide()
		$("#div_turbidity").hide();
		$("#div_conductivity").hide()
		
		$("#parameter_label").show();	
		$("#div_si").show();
		$("#div_fc").show();
		$("#div_ttc").show()
			
	}else if (select_water_facility=='AIRP'){	
		$("#div_mn").hide();
		$("#div_chloride").hide();
		$("#div_bn").hide();
		$("#div_sn_bacteria").hide()
		$("#div_turbidity").hide();
		$("#div_conductivity").hide()
		
		$("#parameter_label").show();
		$("#div_si").show();
		$("#div_arsenic").show();
		$("#div_fc").show();
		$("#div_ttc").show()
		$("#div_iron").show();
		$("#div_ph").show()
		
	}else if (select_water_facility=='RO'){	
		$("#div_sn_bacteria").hide()
		$("#div_turbidity").hide();
		$("#div_conductivity").hide()
		
		$("#parameter_label").show();
		$("#div_si").show();
		$("#div_arsenic").show();
		$("#div_fc").show();
		$("#div_ttc").show()
		$("#div_iron").show();
		$("#div_ph").show()
		$("#div_mn").show();
		$("#div_chloride").show();
		$("#div_bn").show();
		
	}else if (select_water_facility=='RWH'){
		$("#div_arsenic").hide();
		$("#div_iron").hide();
		$("#div_mn").hide();
		$("#div_chloride").hide();
		$("#div_bn").hide();
		$("#div_sn_bacteria").hide()
		$("#div_turbidity").hide();
		$("#div_conductivity").hide()
		
		$("#parameter_label").show();
		$("#div_si").show();
		$("#div_fc").show();
		$("#div_ttc").show()
		$("#div_ph").show()
			
	}else if (select_water_facility=='Stand Post'){		
		$("#div_arsenic").hide();
		$("#div_iron").hide();
		$("#div_ph").hide()
		$("#div_mn").hide();
		$("#div_chloride").hide();
		$("#div_bn").hide();
		$("#div_sn_bacteria").hide()
		$("#div_turbidity").hide();
		$("#div_conductivity").hide()
			
		$("#parameter_label").show();
		$("#div_si").show();
		$("#div_fc").show();
		$("#div_ttc").show()
			
	}else if (select_water_facility=='GFS'){	
		$("#div_arsenic").hide();
		$("#div_iron").hide();
		$("#div_mn").hide();
		$("#div_chloride").hide();
		$("#div_bn").hide();
		$("#div_sn_bacteria").hide()
		$("#div_conductivity").hide()		
		
		$("#parameter_label").show();
		$("#div_si").show();
		$("#div_fc").show();
		$("#div_ttc").show()
		$("#div_ph").show()
		$("#div_turbidity").show();
		
	}else if (select_water_facility=='Ringwell/Dugwell'){	
		$("#div_chloride").hide();
		$("#div_bn").hide();
		$("#div_sn_bacteria").hide()
		$("#div_conductivity").hide()	
		
		$("#parameter_label").show();
		$("#div_si").show();
		$("#div_arsenic").show();
		$("#div_fc").show();
		$("#div_ttc").show()
		$("#div_iron").show();
		$("#div_ph").show()
		$("#div_mn").show();
		$("#div_turbidity").show();
		
	}else if (select_water_facility=='IFG'){
		$("#div_arsenic").hide();
		$("#div_fc").hide();
		$("#div_mn").hide();
		$("#div_chloride").hide();
		$("#div_bn").hide();
		$("#div_sn_bacteria").hide()
		$("#div_conductivity").hide()	
		
		$("#parameter_label").show();
		$("#div_si").show();
		$("#div_ttc").show()
		$("#div_iron").show();
		$("#div_ph").show()
		$("#div_turbidity").show();
		
	}else if (select_water_facility=='PSF'){
		$("#div_mn").hide();
		$("#div_chloride").hide();
		$("#div_bn").hide();
		$("#div_sn_bacteria").hide()
		
		$("#parameter_label").show();
		$("#div_conductivity").show()	
		$("#div_arsenic").show();
		$("#div_fc").show();
		$("#div_si").show();
		$("#div_ttc").show()
		$("#div_iron").show();
		$("#div_ph").show()
		$("#div_turbidity").show();
				
	}else if (select_water_facility=='Others'){
		$("#parameter_label").show();
		$("#div_si").show();
		$("#div_arsenic").show();
		$("#div_fc").show();
		$("#div_ttc").show()
		$("#div_iron").show();
		$("#div_ph").show()
		$("#div_mn").show();
		$("#div_chloride").show();
		$("#div_bn").show();
		$("#div_sn_bacteria").show()
		$("#div_turbidity").show();
		$("#div_conductivity").show()
		
	}else{
		$("#parameter_label").hide();	
		$("#div_si").hide();
		$("#div_arsenic").hide();
		$("#div_fc").hide();
		$("#div_ttc").hide()
		$("#div_iron").hide();
		$("#div_ph").hide()
		$("#div_mn").hide();
		$("#div_chloride").hide();
		$("#div_bn").hide();
		
		$("#div_sn_bacteria").hide()
		$("#div_turbidity").hide();
		$("#div_conductivity").hide()
	}
}
var water_facility;
function waterFacilityType(parameter){
	water_facility=parameter;//$("input[name='radio_c']:checked").val();
	/*if(water_facility=='SI'){
		
	}else if(water_facility=='Arsenic'){
		
	}else if(water_facility=='FC'){
		
	}else if(water_facility=='TTC'){
		
	}else if(water_facility=='Iron'){
		
	}else if(water_facility=='PH'){
		
	}else if(water_facility=='Mn'){
		
	}else if(water_facility=='Chloride'){
		
	}else if(water_facility=='Bn'){
		
	}else if(water_facility=='Cyanobacteria'){
		
	}else if(water_facility=='Turbidity'){		
		
	}else{
		
	}*/
}


function waterData7Next(){
	
	$(".errorChk").text("");
	var url="#waterDataPhoto";
	$.mobile.navigate(url);
	
};	



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
			var url="#waterData10";
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
			var url="#waterData10";
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
			var url="#waterData10";
			$.mobile.navigate(url);		
		}		
	}		
}

//----------------------------water quality data 10 check


function waterData10Next(){
	
	/*wq_functional=$("input[name='functionality']:checked").val();	
	
	wq_drinking=$("input[name='drinking']:checked").val();
	wq_cooking=$("input[name='cooking']:checked").val();
	wq_washing=$("input[name='washing']:checked").val();
	wq_drinking_cooking=$("input[name='drinking_cooking']:checked").val();
	wq_drinking_cooking_washing=$("input[name='drinking_cooking_washing']:checked").val();
	wq_others_option=$("input[name='others_option']:checked").val();

	if(wq_functional==undefined){
		$(".errorChk").text("Required functionality");
			

	}else{*/
		$(".errorChk").text("");
		var url="#waterDataPhoto";
	
	//}
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
		
//function waterData11Next(){
//	/*if($("#potableStatus").find("input[name=potable_st]:checked").length==0){
//		$(".errorChk").text("Required Potable Status");
//	}else{
//		wq_potable_status=$("input[name='potable_st']:checked").val();
//		wq_res_non_potable=$("#reason_non_potable").val();
//		wq_no_potable_initiative_taken=$("#non_potable_ini").val();
//		*/
//		var url="#waterDataPhoto";
//		//}
//					
//		$(".errorChk").text("");
//		$.mobile.navigate(url);
//		//$(location).attr('href',url);
//		
//	//}
//	
//}



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
			
						
			/*if (wq_photo=="" || wq_photo==undefined){
				$(".errorChk").text("Please confirm Photo");
				$("#btn_wq_save").show();
				$("#btn_wq_submit").show();
			}else if((latitudewq==0 || longitudewq==0) || (localStorage.latitudeAreaWq==0 || localStorage.longitudeAreaWq==0)){	
				$(".errorChk").text("Please confirm your location");
				$("#btn_wq_save").show();
				$("#btn_wq_submit").show();		
			}else{*/
				if(latitudewq==0 || longitudewq==0){
					latitudewq=localStorage.latitudeAreaWq;
					longitudewq=localStorage.longitudeAreaWq;
				}
																																																																																																																																																								
					waterQualitySave=wq_plan_id+'|||'+wq_CBO_id+'|||'+wq_vill+'|||'+provided_by+'|||'+test_type_val+'|||'+type_of_wq_facility+'|||'+wq_ref+'|||'+wq_id+'|||'+wq_plat_condition+'|||'+drain_condition+'|||'+wp_repair+'|||'+chamber_condition+'|||'+wq_maintain_by+'|||'+wq_ins_date+'|||'+wq_depth+'|||'+wq_analysis_date+'|||'+wq_last_date+'|||'+wq_appDate+'|||'+wq_siteSelectDate+'|||'+wq_handOvrDate+'|||'+wq_owner_name+'|||'+wq_owner_phone+'|||'+wq_caretaker+'|||'+caretakerPhone+'|||'+wq_select_tech+'|||'+wq_pota+'|||'+wq_delAgua+'|||'+wq_hach_ez_as+'|||'+wq_hach_fe+'|||'+wq_solinity_meter+'|||'+wq_mn_test_kit+'|||'+wq_test_kit_lab_test+'|||'+wq_micro_kit+'|||'+wq_ttc_cfu+'|||'+wq_as_ppb+'|||'+wq_mn_ppb+'|||'+wq_chl_ppt+'|||'+wq_chlorine+'|||'+wq_turb_ntu+'|||'+wq_ph+'|||'+wq_boron+'|||'+wq_ironFe+'|||'+wq_c_bac+'|||'+wq_colour+'|||'+wq_odor+'|||'+wq_nitrate+'|||'+wq_zinc+'|||'+wq_condvity+'|||'+wq_fc+'|||'+wq_tested_at+'|||'+wq_iron_test+'|||'+wq_tw_color+'|||'+sw_option+'|||'+alt_option+'|||'+sw_distance+'|||'+ac_taken+'|||'+arc_patient_yn+'|||'+arc_patient+'|||'+wq_san_ins+'|||'+wq_inspect_date+'|||'+wq_san_risk_sc+'|||'+wq_functional+'|||'+wq_drinking+'|||'+wq_cooking+'|||'+wq_washing+'|||'+wq_drinking_cooking+'|||'+wq_drinking_cooking_washing+'|||'+wq_others_option+'|||'+wq_potable_status+'|||'+wq_res_non_potable+'|||'+wq_no_potable_initiative_taken+'|||'+wq_wab_con+'|||'+wq_comm_con+'|||'+wq_total_cost+'|||'+wq_do_user_pay+'|||'+wq_is_piped_W_connection+'|||'+wq_all_test_complete+'|||'+wq_res_n_test+'|||'+wq_management_committee_exist+'|||'+wq_management_committee_ori+'|||'+wq_management_committee_not_ori+'|||'+wq_management_committee_not_new_option+'|||'+wq_caretaker_trained+'|||'+wq_caretaker_trained_not+'|||'+alt_others+'|||'+wq_sample_analysis+'|||'+wq_renovation_type+'|||'+wq_installation_done+'|||'+wq_photo+'|||'+wq_activities+'|||'+startDtWq+'|||'+latitudewq+'|||'+longitudewq+'|||'+asinDomainWaterQ;
				
	
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
								if (waterQSavArray.length >= 30){
									addFlag=false;					
								}else{
									localStorage.water_q_save=waterQStr+'rdrd'+waterQualitySave
									
								}
							}
						}
						
						if (addFlag==false){
							$(".errorChk").text("Maximum 30 records allowed to be saved for review");
							$("#btn_wq_save").show();
						}else{
							wq_plan_id="";
							wq_CBO_id=="";
							
							reviewWQDisplayFlag==false;
							arrayIdWq=-1;
							
							$(".errorChk").text("");
							$(".sucMsg").text("Successfully saved for review");
							$("#btn_take_wq_pic").hide();
							$("#btn_wq_lat_long").hide();
							//location.reload();
							}
					}//lat
			//}
				
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
			
			if (planFlagWq==0){
				$('#planWqlistDiv').html(localStorage.planWqStr);
				planFlagWq=1;
			}else{
				$('#planWqlistDiv').empty();
				$('#planWqlistDiv').append(localStorage.planWqStr).trigger('create');
			}
			if (cboFlagWq==0){
				$('#wQCboIdDiv').html(localStorage.cboStrWq);
				cboFlagWq=1;
			}else{
				$('#wQCboIdDiv').empty();
				$('#wQCboIdDiv').append(localStorage.cboStrWq).trigger('create');
			}
			
			if (domainFlagWq==0){
				$("#asign_domainWq").html(localStorage.domainWq);	
				domainFlagWq=1;
			}else{
				$('#asign_domainWq').empty();
				$('#asign_domainWq').append(localStorage.domainWq).trigger('create');
			}
			
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
		$("#selectIndicatorWq").val(waterQRevDetailsArray[0])//dont save
		$("#selectWardCodeWq").val(waterQRevDetailsArray[1]);
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
		$("#asign_domainWq").val(waterQRevDetailsArray[93]);
		
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
		var url = "#setDomain";
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
	/*wq_photo=$("#wq_photo").val();	
	if (wq_photo=="" || wq_photo==undefined){
		$(".errorChk").text("Please confirm Photo");
		$("#btn_wq_save").show();
		$("#btn_wq_submit").show();
	}else
	if((latitudewq==0 || longitudewq==0) || (localStorage.latitudeAreaWq==0 || localStorage.longitudeAreaWq==0)){
		$(".errorChk").text("Please confirm your location");
		$("#btn_wq_save").show();
		$("#btn_wq_submit").show();		
	}else{*/ 			
		if (wq_plan_id=='' || wq_CBO_id==''){
			$(".errorChk").text("New records not available");
			$("#btn_wq_submit").show();
		}else{
			if (imagePathW!=""){
				$(".errorChk").text("Syncing photo..")
				imageName = localStorage.mobile_no+'_'+get_time+".jpg";					
				uploadPhotoWQ(imagePathW, imageName);
			}
				
		}
		syncDataWQ();
	}
//}

function syncDataWQ(){	

		if(latitudewq==0 || longitudewq==0){
			latitudewq=localStorage.latitudeAreaWq;
			longitudewq=localStorage.longitudeAreaWq;
		}
		
		//alert(apipath+'submitWaterQualityData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&wq_plan_id='+wq_plan_id+'&wq_CBO_id='+wq_CBO_id+'&wq_vill='+encodeURIComponent(wq_vill)+'&provided_by='+provided_by+'&test_type_val='+test_type_val+'&type_of_wq_facility='+encodeURIComponent(type_of_wq_facility)+'&wq_ref='+encodeURIComponent(wq_ref)+'&wq_id='+encodeURIComponent(wq_id)+'&wq_plat_condition='+encodeURIComponent(wq_plat_condition)+'&drain_condition='+encodeURIComponent(drain_condition)+'&wp_repair='+encodeURIComponent(wp_repair)+'&chamber_condition='+encodeURIComponent(chamber_condition)+'&wq_maintain_by='+wq_maintain_by+'&wq_ins_date='+wq_ins_date+'&wq_depth='+wq_depth+'&wq_analysis_date='+wq_analysis_date+'&wq_last_date='+wq_last_date+'&wq_appDate='+wq_appDate+'&wq_siteSelectDate='+wq_siteSelectDate+'&wq_handOvrDate='+wq_handOvrDate+'&wq_owner_name='+encodeURIComponent(wq_owner_name)+'&wq_owner_phone='+encodeURIComponent(wq_owner_phone)+'&wq_caretaker='+encodeURIComponent(wq_caretaker)+'&caretakerPhone='+encodeURIComponent(caretakerPhone)+'&wq_select_tech='+encodeURIComponent(wq_select_tech)+'&testKitChk='+testKitChk+'&wq_ttc_cfu='+wq_ttc_cfu+'&wq_as_ppb='+wq_as_ppb+'&wq_mn_ppb='+wq_mn_ppb+'&wq_chl_ppt='+wq_chl_ppt+'&wq_chlorine='+wq_chlorine+'&wq_turb_ntu='+wq_turb_ntu+'&wq_ph='+wq_ph+'&wq_boron='+wq_boron+'&wq_ironFe='+wq_ironFe+'&wq_c_bac='+wq_c_bac+'&wq_colour='+wq_colour+'&wq_odor='+wq_odor+'&wq_nitrate='+wq_nitrate+'&wq_zinc='+wq_zinc+'&wq_condvity='+wq_condvity+'&wq_fc='+wq_fc+'&wq_tested_at='+wq_tested_at+'&wq_iron_test='+wq_iron_test+'&wq_tw_color='+wq_tw_color+'&sw_option='+encodeURIComponent(sw_option)+'&alt_option='+encodeURIComponent(alt_option)+'&sw_distance='+encodeURIComponent(sw_distance)+'&ac_taken='+encodeURIComponent(ac_taken)+'&arc_patient_yn='+arc_patient_yn+'&arc_patient='+arc_patient+'&wq_san_ins='+wq_san_ins+'&wq_inspect_date='+wq_inspect_date+'&wq_san_risk_sc='+wq_san_risk_sc+'&wq_functional='+wq_functional+'&useOfChk='+useOfChk+'&wq_potable_status='+wq_potable_status+'&wq_res_non_potable='+encodeURIComponent(wq_res_non_potable)+'&wq_no_potable_initiative_taken='+encodeURIComponent(wq_no_potable_initiative_taken)+'&wq_wab_con='+wq_wab_con+'&wq_comm_con='+wq_comm_con+'&wq_total_cost='+wq_total_cost+'&wq_do_user_pay='+wq_do_user_pay+'&wq_is_piped_W_connection='+wq_is_piped_W_connection+'&wq_all_test_complete='+wq_all_test_complete+'&wq_res_n_test='+encodeURIComponent(wq_res_n_test)+'&wq_management_committee_exist='+wq_management_committee_exist+'&wq_management_committee_ori='+wq_management_committee_ori+'&wq_management_committee_not_ori='+wq_management_committee_not_ori+'&wq_management_committee_not_new_option='+wq_management_committee_not_new_option+'&wq_caretaker_trained='+wq_caretaker_trained+'&wq_caretaker_trained_not='+wq_caretaker_trained_not+'&alt_others='+alt_others+'&wq_sample_analysis='+wq_sample_analysis+'&wq_renovation_type='+encodeURIComponent(wq_renovation_type)+'&wq_installation_done='+wq_installation_done+'&wq_photo='+imageName+'&wq_startDt='+startDtWq+'&latitude='+latitudewq+'&longitude='+longitudewq+'&asinDomainWaterQ='+asinDomainWaterQ);
		
		$.ajax({
				type: 'POST',											
				url:apipath+'submitWaterQualityData?cid=WAB&mobile_no='+localStorage.mobile_no+'&syncCode='+localStorage.sync_code+'&wq_plan_id='+wq_plan_id+'&wq_CBO_id='+wq_CBO_id+'&wq_vill='+encodeURIComponent(wq_vill)+'&provided_by='+provided_by+'&test_type_val='+test_type_val+'&type_of_wq_facility='+encodeURIComponent(type_of_wq_facility)+'&wq_ref='+encodeURIComponent(wq_ref)+'&wq_id='+encodeURIComponent(wq_id)+'&wq_plat_condition='+encodeURIComponent(wq_plat_condition)+'&drain_condition='+encodeURIComponent(drain_condition)+'&wp_repair='+encodeURIComponent(wp_repair)+'&chamber_condition='+encodeURIComponent(chamber_condition)+'&wq_maintain_by='+wq_maintain_by+'&wq_ins_date='+wq_ins_date+'&wq_depth='+wq_depth+'&wq_analysis_date='+wq_analysis_date+'&wq_last_date='+wq_last_date+'&wq_appDate='+wq_appDate+'&wq_siteSelectDate='+wq_siteSelectDate+'&wq_handOvrDate='+wq_handOvrDate+'&wq_owner_name='+encodeURIComponent(wq_owner_name)+'&wq_owner_phone='+encodeURIComponent(wq_owner_phone)+'&wq_caretaker='+encodeURIComponent(wq_caretaker)+'&caretakerPhone='+encodeURIComponent(caretakerPhone)+'&wq_select_tech='+encodeURIComponent(wq_select_tech)+'&testKitChk='+testKitChk+'&wq_ttc_cfu='+wq_ttc_cfu+'&wq_as_ppb='+wq_as_ppb+'&wq_mn_ppb='+wq_mn_ppb+'&wq_chl_ppt='+wq_chl_ppt+'&wq_chlorine='+wq_chlorine+'&wq_turb_ntu='+wq_turb_ntu+'&wq_ph='+wq_ph+'&wq_boron='+wq_boron+'&wq_ironFe='+wq_ironFe+'&wq_c_bac='+wq_c_bac+'&wq_colour='+wq_colour+'&wq_odor='+wq_odor+'&wq_nitrate='+wq_nitrate+'&wq_zinc='+wq_zinc+'&wq_condvity='+wq_condvity+'&wq_fc='+wq_fc+'&wq_tested_at='+wq_tested_at+'&wq_iron_test='+wq_iron_test+'&wq_tw_color='+wq_tw_color+'&sw_option='+encodeURIComponent(sw_option)+'&alt_option='+encodeURIComponent(alt_option)+'&sw_distance='+encodeURIComponent(sw_distance)+'&ac_taken='+encodeURIComponent(ac_taken)+'&arc_patient_yn='+arc_patient_yn+'&arc_patient='+arc_patient+'&wq_san_ins='+wq_san_ins+'&wq_inspect_date='+wq_inspect_date+'&wq_san_risk_sc='+wq_san_risk_sc+'&wq_functional='+wq_functional+'&useOfChk='+useOfChk+'&wq_potable_status='+wq_potable_status+'&wq_res_non_potable='+encodeURIComponent(wq_res_non_potable)+'&wq_no_potable_initiative_taken='+encodeURIComponent(wq_no_potable_initiative_taken)+'&wq_wab_con='+wq_wab_con+'&wq_comm_con='+wq_comm_con+'&wq_total_cost='+wq_total_cost+'&wq_do_user_pay='+wq_do_user_pay+'&wq_is_piped_W_connection='+wq_is_piped_W_connection+'&wq_all_test_complete='+wq_all_test_complete+'&wq_res_n_test='+encodeURIComponent(wq_res_n_test)+'&wq_management_committee_exist='+wq_management_committee_exist+'&wq_management_committee_ori='+wq_management_committee_ori+'&wq_management_committee_not_ori='+wq_management_committee_not_ori+'&wq_management_committee_not_new_option='+wq_management_committee_not_new_option+'&wq_caretaker_trained='+wq_caretaker_trained+'&wq_caretaker_trained_not='+wq_caretaker_trained_not+'&alt_others='+alt_others+'&wq_sample_analysis='+wq_sample_analysis+'&wq_renovation_type='+encodeURIComponent(wq_renovation_type)+'&wq_installation_done='+wq_installation_done+'&wq_photo='+imageName+'&wq_startDt='+startDtWq+'&latitude='+latitudewq+'&longitude='+longitudewq+'&asinDomainWaterQ='+asinDomainWaterQ,
				
								   
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
						$(".errorChk").text("")
						$(".sucMsg").text('Successfully Submitted');
						//$(".errorChk").text('Successfully Submited');
						$("#btn_wq_save").hide();		
						$("#btn_wq_submit").hide();	
						$("#btn_wq_lat_long").hide();
						
						
					
					}else if(result=='Failed1'){
						$(".errorChk").text('Try again after 5 minutes');	
						$("#btn_wq_submit").show();
						$("#btn_wq_save").show();
					}else if(result=='Failed2'){
						$(".errorChk").text('Authorization Error');	
						$("#btn_wq_submit").show();
						$("#btn_wq_save").show();	
					}else if(result=='Failed3'){
						$(".errorChk").text('Invalid Domain & Indicator');	
						$("#btn_wq_submit").show();
						$("#btn_wq_save").show();						
					}else if(result=='Failed4'){
						$(".errorChk").text('Facility ID Already Exists');	
						$("#btn_wq_submit").show();
						$("#btn_wq_save").show();
					}else if(result=='Failed5'){
						$(".errorChk").text('Invalid Domain & Ward Code');	
						$("#btn_wq_submit").show();
						$("#btn_wq_save").show();
					}else if(result=='Failed6'){
						$(".errorChk").text('Invalid Facility ID & Ward Code');	
						$("#btn_wq_submit").show();
						$("#btn_wq_save").show();		
					}else{
						$(".errorChk").text('Please Save and try to Submit later');
						$("#btn_wq_submit").show();
						$("#btn_wq_save").show();
						}
				 },error: function(result){
						 $(".errorChk").text('Network timeout. Please ensure you have good network signal and working Internet.');
						 $("#btn_wq_submit").show();
						 $("#btn_wq_save").show();
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
	navigator.camera.getPicture(onSuccessA, onFailA, { quality: 70,
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
	$("#achPhoto").val("");
    alert('Failed because: ' + message);
}


//------------------------------------------------------------------------------
//File upload 
function uploadPhotoAch(imageURI, imageNameAch) {	
	//winAch();
    var options = new FileUploadOptions();
    options.fileKey="upload";
//    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    options.fileName=imageNameAch;
//	options.fileName = options.fileName
    options.mimeType="image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
	options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, encodeURI("http://m.businesssolutionapps.com/welcome/wab_sync/fileUploader/"),winAch,failAch,options);
	//ft.upload(imageURI, encodeURI("http://127.0.0.1:8000/welcome/wab_sync/fileUploader/"),winAch,fail,options);
	
}

function winAch(r) {
//    console.log("Code = " + r.responseCode);
//    console.log("Response = " + r.response);
//    console.log("Sent = " + r.bytesSent);
	$(".errorChk").text('File upload Successful. Syncing Data...');
	syncDataAch();
}

function failAch(error) {
	$(".errorChk").text('Memory or Network Error. Please Save and try to Submit later');
	$("#btn_ach_submit").show();
	$("#btn_ach_save").show();
    //alert("An error has occurred: Code = " + error.code);
//    console.log("upload error source " + error.source);
//    console.log("upload error target " + error.target);
}





//===========Water Qty============
function getWaterImage() {
	navigator.camera.getPicture(onSuccessW, onFailW, { quality: 70,
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
	$("#wq_photo").val("");
    alert('Failed because: ' + message);
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
	$("#btn_wq_submit").show();
	$("#btn_wq_save").show();	
    //alert("An error has occurred: Code = " + error.code);
//    console.log("upload error source " + error.source);
//    console.log("upload error target " + error.target);
}



