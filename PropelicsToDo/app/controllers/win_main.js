//--------------------------------------------------------------------------------
//--------------------------------SET CENTER WINDOW TO DRAWER---------------------
//--------------------------------------------------------------------------------

var win_center = Alloy.createController('win_center_main').getView();
$.drawer.setCenterWindow(win_center);
//--------------------------------------------------------------------------------
//--------------------------------OPEN DRAWER-------------------------------------
//--------------------------------------------------------------------------------
$.drawer.open();
//--------------------------------------------------------------------------------
//--------------------------------CLOSE DRAWER WHEN APP CLOSE---------------------
//--------------------------------------------------------------------------------
function closeDrawer() {
	$.drawer.instance.close();
	$.drawer.instance = null;
	$.drawer = null;
	$.destroy();
};
//--------------------------------------------------------------------------------
//-------------------------------DRAWER BUTTON (LEFT NAVIGATION BUTTON) IN PAGE---
//--------------------------------------------------------------------------------
Alloy.Globals.ToggleLeft = function() {
	$.drawer.toggleLeftWindow();
};
function toggle(e) {
	var fn = 'toggle' + e.source.left + 'Window';
	$.drawer[fn]();
}
//-------------------------------------------------------------------------------------------------
//----------------------- LEFT DRAWER MENU OPTIONS ------------------------------------------------
//-------------------------------------------------------------------------------------------------
var getdrawer = (function() {
	var name_arr = ['All', 'Pending', 'Completed'];
	var dataitems = [];
	for (var i = 0; i < name_arr.length; i++) {
		dataitems.push({
			title_data : [i] + " " + i,
			image : {
				image : "/images/drawer/" + (i + 1) + ".png"
			},
			lbl : {
				text : name_arr[i]
			},
			view_bottom : {
				backgroundColor : 'white',
			}
		});
	}
	$.list_section.setItems(dataitems);
});
getdrawer();

if (OS_IOS) {
	$.drawer.setShouldStretchDrawer(false);
	$.drawer.setShowShadow(false);
	$.drawer.setAnimationMode($.drawer.module.ANIMATION_SLIDE_SCALE);
} else {
}
//-------------------------------------------------------------------------------------------------
//-----------------------  DRAWER CHAGE MODE  -----------------------------------------------------
//-------------------------------------------------------------------------------------------------
Alloy.Globals.changeOPenMode = function(isAll) {
	if (isAll) {
		$.drawer.setOpenDrawerGestureMode($.drawer.module.OPEN_MODE_ALL);
	} else {
		$.drawer.setOpenDrawerGestureMode($.drawer.module.OPEN_MODE_NONE);
	}
};
//-------------------------------------------------------------------------------------------------
//-----------------------  DRAWER MENU CLICK   ----------------------------------------------------
//-------------------------------------------------------------------------------------------------
$.drawer_listview.addEventListener('itemclick', function(e) {
	var inx = e.itemIndex;
	switch(inx) {
	case  0 :
		var win_center = Alloy.createController('win_center_main').getView();
		$.drawer.setCenterWindow(win_center);
		$.drawer.toggleLeftWindow();
		if (OS_IOS) {
			if (Alloy.Globals.navDrawer) {
				Alloy.Globals.navDrawer.close();
				Alloy.Globals.navDrawer = null;
			}
			Alloy.Globals.navDrawer = win_center;
		}
		break;
	case 1 :
		var win_sample2 = Alloy.createController('win_pending').getView();
		$.drawer.setCenterWindow(win_sample2);
		$.drawer.toggleLeftWindow();
		if (OS_IOS) {
			if (Alloy.Globals.navDrawer) {
				Alloy.Globals.navDrawer.close();
				Alloy.Globals.navDrawer = null;
			}
			Alloy.Globals.navDrawer = win_sample2;
		}
		break;
	case 2 :
		var win_sample1 = Alloy.createController('win_completed').getView();
		$.drawer.setCenterWindow(win_sample1);
		$.drawer.toggleLeftWindow();
		if (OS_IOS) {
			if (Alloy.Globals.navDrawer) {
				Alloy.Globals.navDrawer.close();
				Alloy.Globals.navDrawer = null;
			}
			Alloy.Globals.navDrawer = win_sample1;
		}
		break;
	}
});

