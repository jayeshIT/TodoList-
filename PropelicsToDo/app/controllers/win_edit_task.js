//-------------------------------------------------------------------------------------------------
//-----------------------  VARIABLES  -------------------------------------------------------------
//-------------------------------------------------------------------------------------------------

var args = arguments[0] || {};
var utility = require('utility');
var imagePath = null;
var currentFocus = null;
var id = args.data.get('id');
var content = args.data.get('content');
var status = args.data.get('status');
var image_data_name = args.data.get('image');
var from = args.type;
var ToDos = Alloy.Collections.toDoList;
var image_data = utility.Utility.getImage(image_data_name, false, false);
var imagePath = image_data.image_thumb;
var emailDialog;
//-------------------------------------------------------------------------------------------------
//-----------------------  SET IMAGE TO IMAGEVIEW---------------------------------------------------
//-------------------------------------------------------------------------------------------------
$.image_view.image = (image_data.image_thumb != null) ? image_data.image_thumb : "/appicon.png";
//-------------------------------------------------------------------------------------------------
//-----------------------  SET BUTTON STATUS AND COLOR AS FROM ARGS DATA --------------------------
//-------------------------------------------------------------------------------------------------

var bigImage = function() {

	var image_blog = utility.Utility.getImage(image_data_name, true, false);
	if (image_blog.image_full_share == null) {
		alert('Please select image');
		return;
	}
	var win_image_big_win = Alloy.createController('win_image_big', {
		"img" : image_blog.image_full_share
	}).getView().open();

};
if (status == 'Pending') {
	$.status_button.backgroundColor = Alloy.CFG.AppColors_default.color_orange;
	$.status_button.title = status;
} else {
	$.status_button.backgroundColor = Alloy.CFG.AppColors_default.color_header;
	$.status_button.title = status;
}
//-------------------------------------------------------------------------------------------------
//-----------------------  SAVE COLLEVTION (SAVE IT AND PAGE WILL CLOSE)---------------------------
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
		id : id
	});
	listModel.set({
		"content" : $.txt_content.value,
		"date" : getDate().date,
		"dateobject" : getDate().dateobject,
		"status" : $.status_button.title,
		"image" : imagePath
	});
	listModel.save();
	resetCollections();
	$.win_edit_task.close();
};
//-------------------------------------------------------------------------------------------------
//----------------------- SET PAGE DATA -----------------------------------------------------------
//-------------------------------------------------------------------------------------------------
if (OS_IOS) {
	$.txt_content.value = content;
	$.win_edit_task.title = 'Edit Task';
} else {
	$.txt_content.value = content;
	$.navBar.leftBtn.addEventListener('click', function(e) {
		$.win_edit_task.close();
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
	$.navBar.win_title.text = 'Edit Task';
}

if (OS_IOS) {
	$.txt_content.color = Alloy.CFG.AppColors_default.color_header;
	$.txt_content._hintText = $.txt_content.value;
	$.txt_content.returnKeyType = Titanium.UI.RETURNKEY_DONE;
	$.txt_content.addEventListener('focus', function(e) {
		currentFocus = $.txt_content;
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
//----------------------- saveImage SUCCESS CALL BACK FUNCTION ------------------------------------
//-----------------------   IMAGE AND PATH --------------------------------------------------------
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
//-----------------------WHEN NO DATA IN TEXT AREA THIS FUNCTION SET HINT TEXT --------------------
//----------------------------------------IOS HAS NO HINT TEXT FOR TEXT AREA-----------------------
//-------------------------------------------------------------------------------------------------
var setHintText = function() {
	$.txt_content.color = "#C9C9CF";
	$.txt_content.value = "Task Description";
	$.txt_content._hintText = $.txt_content.value;
};
//-------------------------------------------------------------------------------------------------
//-----------------------SAVE PAGE AND IT REFRESH ALL LLISTING-------------------------------------
//-------------------------------------------------------------------------------------------------
var resetCollections = function() {
	if (from == 'from_center') {
		Alloy.Globals.resetAllTask();
	} else if (from == 'from_pending') {
		Alloy.Globals.resetPending();
	} else if (from == 'from_completed') {
		Alloy.Globals.resetAllCompleted();
	}
};
//-------------------------------------------------------------------------------------------------
//-----------------------TAKE IMAG AVCALLED--------------------------------------------------------
//-------------------------------------------------------------------------------------------------
var take_image = function() {
	if (currentFocus) {
		currentFocus.blur();
	}
	options();
};
//-------------------------------------------------------------------------------------------------
//-----------------------STTUS BUTTON CLICK (PENDNG/COMPELETED)------------------------------------
//-------------------------------------------------------------------------------------------------
var change_status = function() {
	if ($.status_button.title == 'Pending') {
		$.status_button.title = 'Completed';
		$.status_button.backgroundColor = Alloy.CFG.AppColors_default.color_header;
	} else {
		$.status_button.title = 'Pending';
		$.status_button.backgroundColor = Alloy.CFG.AppColors_default.color_orange;
	}
};
//-------------------------------------------------------------------------------------------------
//-----------------------DELETE MODE FROM COLLECTION AND RESET LISTING ----------------------------
//-------------------------------------------------------------------------------------------------
var delete_model = function() {
	var listModel = Alloy.createModel("toDoList", {
		id : id
	});
	listModel.destroy();
	var image_data = utility.Utility.getImage(image_data_name, false, true);
	resetCollections();
	$.win_edit_task.close();
};
//-------------------------------------------------------------------------------------------------
//-----------------------SHARE BUTTON CLICK -------------------------------------------------------
//-------------------------------------------------------------------------------------------------
var share_model = function() {
	var image_object_share = null;
	if (image_data_name != null) {
		var image_data_share = utility.Utility.getImage(image_data_name, true, false);
		image_object_share = image_data_share.image_full_share;
	} else {
		image_object_share = null;
	}
	var alertdialog = Titanium.UI.createAlertDialog();

	emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.subject = 'Properlics App';
	emailDialog.messageBody = "This is image i shared via TODO Lsit app";
	emailDialog.toRecipients = ['jnj.idr@gmail.com'];
	if (OS_IOS) {
		emailDialog.setBarColor('teal');
	}
	emailDialog.addAttachment(image_object_share);
	if (!emailDialog.isSupported()) {
		alertdialog.title = "Properlics app error";
		alertdialog.message = 'Plese configure Email';
		alertdialog.buttonNames = ['OK'];
		alertdialog.show();
		return;
	}
	emailDialog.addEventListener('complete', function(e) {
		Ti.API.info('------e.success:' + e.success);
		Ti.API.info('------e.success:' + e.result);
		if (e.success && e.result == 2) {
			alertdialog.title = "Properlics Success";
			alertdialog.message = 'Email send successfull';
			alertdialog.buttonNames = ['OK'];
			alertdialog.show();
		} else if (e.result == emailDialog.FAILED) {
			alertdialog.title = "Share error";
			alertdialog.message = 'Problme in sednign image,Please try later';
			alertdialog.buttonNames = ['OK'];
			alertdialog.show();
		} else if (e.result == emailDialog.CANCELED) {

		}
		emailDialog = null;
	});
	emailDialog.open();
};
//-------------------------------------------------------------------------------------------------
//-----------------------WINDOW CLICK -------------------------------------------------------------
//-------------------------------------------------------------------------------------------------
$.win_edit_task.addEventListener('androidback', function(e) {
	if (emailDialog != null) {
		emailDialog.hide();
		emailDialog = null;
	} else {
		$.win_edit_task.close();
	}
});

