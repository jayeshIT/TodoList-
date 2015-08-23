//-------------------------------------------------------------------------------------------------
//-----------------------  VARIABLES globals -------------------------------------------------------------
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
//-----------------------  SET PAGE DATA  ---------------------------------------------------------
//-------------------------------------------------------------------------------------------------
if (OS_IOS) {
	Alloy.Globals.navDrawer = $.NavigationWindow;
} else {
	$.navBar.leftBtn.backgroundImage = '/images/drawer/drawer.png';
	$.navBar.leftBtn.addEventListener('click', function(e) {
		Alloy.Globals.ToggleLeft();
	});
	$.navBar.leftBtn.visible = true;
	$.navBar.rightBtn.visible = false;
	$.navBar.win_title.text = 'Completed';
}

//-------------------------------------------------------------------------------------------------
//-----------------------  COMPLETED TASK LISING  ---------------------------------------------------
//query : 'SELECT * FROM toDoList WHERE status="Completed"',
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
			type : 'from_completed',
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
				backgroundColor : Alloy.CFG.AppColors_default.color_header
			}
		});

	});
	$.all_listview.setItems = [];
	$.listview_section.setItems(dataitems);
};
//-------------------------------------------------------------------------------------------------
//-----------------------  FETCH COLLECTION ERROR  ------------------------------------------------
//-------------------------------------------------------------------------------------------------
var displayTasksError = function() {
	utility.Ui.alert("Problem while fethchig list");
};
//-------------------------------------------------------------------------------------------------
//-----------------------  FETCH COLLECTION  ------------------------------------------------------
//-------------------------------------------------------------------------------------------------
ToDos.fetch({
	query : 'SELECT * FROM toDoList WHERE status="Completed"',
	success : displayTasksSuccess,
	error : displayTasksError
});
//-------------------------------------------------------------------------------------------------
//-----------------------  RESET FUNCTION WILL CALLED FROM EDIT PAGE WHEN YOU SAVE CLICK (WIN_EDIT_TASK)----------
//-------------------------------------------------------------------------------------------------
Alloy.Globals.resetAllCompleted = function() {
	ToDos.fetch({
		query : 'SELECT * FROM toDoList WHERE status="Completed"',
		success : displayTasksSuccess,
		error : displayTasksError
	});
};
//-------------------------------------------------------------------------------------------------
//----------------------- OPEN EDIT PAGE (WIN_EDIT_TASK) ------------------------------------------
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
//----------------------- WINDOWS LEVEL EVENT -----------------------------------------------------
//-------------------------------------------------------------------------------------------------
$.win_completed.addEventListener('androidback', function(e) {
	var activity = Titanium.Android.currentActivity;
	activity.finish();
});

$.win_completed.addEventListener('close', function(e) {
});
