//-------------------------------------------------------------------------------------------------
//-----------------------  VARIABLES GLobal -------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
var utility = require('utility');
var ToDos = Alloy.Collections.toDoList;
var dataitems = [];
//-------------------------------------------------------------------------------------------------
//-----------------------  DRAWR ANIMATE (WIN_MAIN.JS) --------------------------------------------
//-------------------------------------------------------------------------------------------------
var toggleDrawerLeft = function() {
	Alloy.Globals.ToggleLeft();
};
//-------------------------------------------------------------------------------------------------
//-----------------------  ADD BUTTON CLICK TO ADD NEW TASK  --------------------------------------
//-------------------------------------------------------------------------------------------------
var add_task_function = function() {
	opennav('win_add_task', '', $.NavigationWindow);
};
//-------------------------------------------------------------------------------------------------
//-----------------------  SET PAGE DATA  --------------------------------------
//-------------------------------------------------------------------------------------------------
if (OS_IOS) {
	Alloy.Globals.navDrawer = $.NavigationWindow;
} else {
	$.navBar.leftBtn.backgroundImage = '/images/drawer/drawer.png';
	$.navBar.leftBtn.addEventListener('click', function(e) {
		Alloy.Globals.ToggleLeft();
	});
	$.navBar.leftBtn.visible = true;
	$.navBar.rightBtn.visible = true;
	var prop = {
		height : 30,
		width : 70,
		backgroundColor : 'transparent',
		color : 'white',
		title : 'Add'
	};
	$.navBar.rightBtn.applyProperties(prop);
	$.navBar.rightBtn.addEventListener('click', add_task_function);
	$.navBar.win_title.text = 'All Tasks';
}

//-------------------------------------------------------------------------------------------------
//-----------------------  COLLECTION FETCH SUCCES FUNCTION  --------------------------------------
//-------------------------------------------------------------------------------------------------
var displayTasksSuccess = function() {
	dataitems = [];
	ToDos.each(function(marker) {
		var image_data = utility.Utility.getImage(marker.get('image'), false, false);
		dataitems.push({
			properties : {
				searchableText : marker.get('content')
			},
			id : marker.get('id'),
			type : 'from_center',
			image_img : {
				image : (image_data.image_thumb != null) ? image_data.image_thumb : "/appicon.png"
			},
			content_lbl : {
				text : marker.get('content')
			},
			date_lbl : {
				text : 'Last Update : ' + marker.get('date'),
			},
			check_btn : {
				title : marker.get('status'),
				backgroundColor : (marker.get('status') == 'Pending') ? Alloy.CFG.AppColors_default.color_orange : Alloy.CFG.AppColors_default.color_header
			}
		});
	});
	$.all_listview.setItems = [];
	$.listview_section.setItems(dataitems);
};
//-------------------------------------------------------------------------------------------------
//-----------------------COLLECTION FETCH ERROR----------------------------------------------------
//-------------------------------------------------------------------------------------------------
var displayTasksError = function() {
	utility.Ui.alert("Problem while fethchig list");
};
ToDos.fetch({
	success : displayTasksSuccess,
	error : displayTasksError
});
//-------------------------------------------------------------------------------------------------
//-----------------------  RESET FUNCTION WILL CALLED FROM EDIT PAGE WHEN YOU SAVE CLICK (WIN_EDIT_TASK)----------
//-------------------------------------------------------------------------------------------------
Alloy.Globals.resetAllTask = function() {
	ToDos.fetch({
		success : displayTasksSuccess,
		error : displayTasksError
	});
};
//-------------------------------------------------------------------------------------------------
//-----------------------OPEN EDITING TASK PAGE (DETAIL PAGE )-------------------------------------
//-------------------------------------------------------------------------------------------------
var openEdit = function(e) {
	var item = e.section.getItemAt(e.itemIndex);
	var id = item.id;
	var type = item.type;
	var data_pass = ToDos.get(id);
	opennav('win_edit_task', {
		data : data_pass,
		type : type,
	}, $.NavigationWindow);
};
//-------------------------------------------------------------------------------------------------
//-----------------------WINDOWS LEVEL CLICK Listeners-------------------------------------------------------
//-------------------------------------------------------------------------------------------------
$.win_center.addEventListener('androidback', function(e) {
	var activity = Titanium.Android.currentActivity;
	activity.finish();
});

