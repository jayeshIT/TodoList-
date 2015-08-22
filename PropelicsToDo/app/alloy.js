// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
// Napp drawer is used i this app it has 3 options
// When you add task it goes in pending bucket
//Option 1 : All  - All task that are with status last added/edited is on first
//Option 2 : Pending - Pending task yet to over eith latest added/edited
//Option 3 : comepted -Comepted task whic you mark lastest as competed
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
// GLOBAL COLLECTION INSTANCE
Alloy.Collections.toDoList = Alloy.createCollection('toDoList');
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//OPEN WINDOW FROM NAVIGATION AND IF ANDROID THAN OPEN
var opennav = function(windowName, param, NavigationWindow) {
	var win = null;
	if (windowName) {
		if (param == undefined && param == 'undefined') {
			win = Alloy.createController(windowName).getView();
		} else {
			win = Alloy.createController(windowName, param).getView();
		}

		if (OS_IOS) {
			NavigationWindow.openWindow(win, {
				animated : true
			});

		} else {
			win.open();
		}
	}
};
//------------------------------------------------------------------------------------
//---------------------------------------GET DATE GLOBAL FUNCTION---------------------
//------------------------------------------------------------------------------------
var getDate = function() {
	var currentTime = new Date();
	var hours = currentTime.getHours();
	var minutes = currentTime.getMinutes();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	return {
		date : month + "/" + day + "/" + year + " -  " + hours + ":" + minutes,
		dateobject : currentTime
	};
};
//------------------------------------------------------------------------------------
//---------------------------------------GLOBAL FUNCTION FOR INDICATORS---------------
//------------------------------------------------------------------------------------
var indWin = null;
var msglbl = null;
var showIndicator = null;
var hideIndicator = null;
if (OS_IOS) {
	var indicator_iphone = require("indicator_iphone");
	indWin = new indicator_iphone();
	showIndicator = function(message) {
		indWin.children[1].children[1].text = (message != "" && message != null) ? message : 'Loading...';
		if (indWin != null) {
			indWin.close({
				opacity : 0,
				duration : 450
			});
		}
		indWin.open({
			opacity : 1,
			duration : 200
		});
	};
	hideIndicator = function(message) {
		if (indWin != null) {
			indWin.close({
				opacity : 0,
				duration : 450
			});
		}
	};
} else {
	Alloy.Globals.activityIndicator_android = Ti.UI.Android.createProgressIndicator({
		location : Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
		type : Ti.UI.Android.PROGRESS_INDICATOR_INDETERMINANT
	});
	showIndicator = function(message) {
		Alloy.Globals.indHideen = false;
		Alloy.Globals.activityIndicator_android.show();
		if ( typeof message != 'undefined') {
			message = (message != "" && message != null) ? message : 'Loading...';
		} else {
			message = 'Loading...';
		}
		Alloy.Globals.activityIndicator_android.message = message;
	};
	hideIndicator = function() {
		if (Alloy.Globals.indHideen == false) {
			Alloy.Globals.indHideen = true;
			Alloy.Globals.activityIndicator_android.hide();
		}
	};
}

