//-------------------------------------------------------------------------------------------------
//-----------------------  VARIABLES  -------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
var args = arguments[0] || {};
var utility = require('utility');
var imagePath = null;
var currentFocus = null;
//-------------------------------------------------------------------------------------------------
//-----------------------  SAVE BUTTON CLICK  ------------------------------------------------------
//-------------------------------------------------------------------------------------------------
var save_task = function() {
	if (currentFocus) {
		currentFocus.blur();
	}
	if (OS_IOS) {
		if ($.txt_content.value == "Task Description") {
			utility.Ui.alert("Enter Task Description");
			setHintText();
			return;
		}
	}
	if ($.txt_content.value.trim().length == 0) {
		utility.Ui.alert(" Enter Task Description");
		if (OS_IOS) {
			setHintText();
		}
		return;
	}
	var listModel = Alloy.createModel("toDoList", {
		"content" : $.txt_content.value,
		"date" : getDate().date,
		"dateobject" : getDate().dateobject,
		"status" : "Pending",
		"image" : imagePath
	});
	listModel.save();
	Alloy.Globals.resetAllTask();
	$.win_add_task.close();
	imagePath = null;
};
//-------------------------------------------------------------------------------------------------
//-----------------------  PAGE SETTING  ------------------------------------------------------
//-------------------------------------------------------------------------------------------------
if (OS_IOS) {
	$.win_add_task.title = 'Add Task';
} else {
	$.navBar.leftBtn.addEventListener('click', function(e) {
		$.win_add_task.close();
	});
	$.navBar.leftBtn.backgroundImage = "/images/back.png";
	$.navBar.leftBtn.visible = true;
	$.navBar.rightBtn.visible = true;
	var prop = {
		height : 30,
		width : 70,
		backgroundColor : 'transparent',
		color : 'white',
		title : 'Save'
	};
	$.navBar.rightBtn.applyProperties(prop);
	$.navBar.rightBtn.addEventListener('click', save_task);
	$.navBar.win_title.text = 'Add Task';
}
if (OS_IOS) {
	$.txt_content.color = (OS_IOS) ? "#C9C9CF" : '#7F7F7F';
	$.txt_content.value = 'Task Description';
	$.txt_content._hintText = $.txt_content.value;
	$.txt_content.returnKeyType = Titanium.UI.RETURNKEY_DONE;
	$.txt_content.addEventListener('focus', function(e) {
		currentFocus = $.txt_content;
		if (e.source.value == e.source._hintText) {
			e.source.value = "";
		}
		$.txt_content.color = Alloy.CFG.AppColors_default.color_header;
	});
	$.txt_content.addEventListener('return', function(e) {
		if ($.txt_content.value == "" || $.txt_content.value.trim().length == 0) {
			$.txt_content.color = "#C9C9CF";
			$.txt_content.value = 'Task Description';
			$.txt_content._hintText = $.txt_content.value;
		}
	});
} else {
	$.txt_content.addEventListener('click', function(e) {
		$.txt_content.softKeyboardOnFocus = Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS;
		$.txt_content.focus();
		currentFocus = $.txt_content;
		if (e.source.value == e.source._hintText) {
			e.source.value = "";
		}
		$.txt_content.color = Alloy.CFG.AppColors_default.color_header;
	});
}
//-------------------------------------------------------------------------------------------------
//-----------------------  UTILITY FUNCTION SAVE IMAGE'S CALLBACK  --------------------------------
//-------------------------------------------------------------------------------------------------
var success_callback = function(img, path) {
	$.image_view.image = img;
	imagePath = path;
};
//-------------------------------------------------------------------------------------------------
//-----------------------OPTION DIALOG WHRN YOU CLICK ADD IMAGE  ----------------------------------
//-------------------------------------------------------------------------------------------------
var options = function() {
	var dialog = Titanium.UI.createOptionDialog({
		options : (OS_IOS) ? ['Choose From Library', 'Take New Photo', 'Cancel'] : ['Choose From Library', 'Take New Photo'],
		cancel : 2
	});
	dialog.show();
	dialog.addEventListener('click', function(e) {
		utility.Utility.saveImage(e.index, success_callback);
	});
};
//-------------------------------------------------------------------------------------------------
//-----------------------  HINT TEXT WHEN I CLICK TEXTAREA WHEN SAVE CLICK ------------------------
//-------------------------------------------------------------------------------------------------
var setHintText = function() {
	$.txt_content.color = "#C9C9CF";
	$.txt_content.value = "Task Description";
	$.txt_content._hintText = $.txt_content.value;
};
//-------------------------------------------------------------------------------------------------
//----------------------- ADD IMAGE CLICK ---------------------------------------------------------
//-------------------------------------------------------------------------------------------------
var take_image = function() {
		if (currentFocus) {
		currentFocus.blur();
	}
	options();
};
