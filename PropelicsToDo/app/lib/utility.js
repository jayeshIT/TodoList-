(function() {
	var Myfolder = null;

	//CHECK FOR FOLDER GENERATED TO SAVE IMAGE THUM AND BG IMAGA
	//GET SAVED IMAGE
	if (OS_IOS) {
		Myfolder = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), 'media');
	} else {
		if (Ti.Filesystem.isExternalStoragePresent() == true) {
			Myfolder = Ti.Filesystem.getFile(Titanium.Filesystem.getExternalStorageDirectory(), 'media');
		} else {
			Myfolder = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, 'media');
		}
	}
	if (!Myfolder.exists()) {
		Myfolder.createDirectory();
	}
	//ALERT
	exports.Ui = {
		alert : function(_message) {
			Ti.UI.createAlertDialog({
				title : "Test App",
				message : _message,
				buttonNames : ['OK']
			}).show();
		},
	};
	//SAVE IMAGE TAKE IMAGE FROM CAMERA AND RETURN
	exports.Utility = {
		saveImage : function(number, imageCallback) {
			current_time = new Date().getTime();
			if (number == 0) {
				Titanium.Media.openPhotoGallery({
					success : function(event) {
						if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
							showIndicator();
							try {
								file = null;
								var imageDir = Titanium.Filesystem.getFile(Myfolder.resolve(), "photos");
								var tmp_currentTime = null;
								tmp_currentTime = current_time;

								if (!imageDir.exists()) {
									imageDir.createDirectory();
									file = Titanium.Filesystem.getFile(imageDir.resolve(), tmp_currentTime + 'camera_photo.png');
									file.write(event.media);
								} else {
									file = Titanium.Filesystem.getFile(imageDir.resolve(), tmp_currentTime + 'camera_photo.png');
									file.write(event.media);
								}
								var ImageFactory = require('ti.imagefactory');
								var origimg = null;
								var blob_rn = null;
								blob_rn = ImageFactory.imageAsResized(file.read(), {
									width : 100,
									height : 100,
								});
								ImageFactory = null;
								var thumbDir = Titanium.Filesystem.getFile(Myfolder.resolve(), "thumb");
								if (!thumbDir.exists()) {
									thumbDir.createDirectory();
									file = Titanium.Filesystem.getFile(thumbDir.resolve(), tmp_currentTime + 'camera_photo.png');
									file.write(blob_rn);
								} else {
									file = Titanium.Filesystem.getFile(thumbDir.resolve(), tmp_currentTime + 'camera_photo.png');
									file.write(blob_rn);
								}
								hideIndicator();
								imageCallback(event.media, file.nativePath);
								file = null;
								blob_rn = null;
								tmp_currentTime = null;
							} catch(ex) {
								hideIndicator();
							}
						} else {
							exports.Ui.alert('Videos not accepted.');
						}
					},
					cancel : function(e) {
					},
					error : function(error) {
					},
					allowEditing : true,
					mediaTypes : [Ti.Media.MEDIA_TYPE_PHOTO]
				});
			} else if (number == 1) {
				Titanium.Media.showCamera({
					success : function(event) {
						if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
							try {
								showIndicator();
								file = null;
								var imageDir = Titanium.Filesystem.getFile(Myfolder.resolve(), "photos");
								var tmp_currentTime = null;
								tmp_currentTime = current_time;
								if (!imageDir.exists()) {
									imageDir.createDirectory();
									file = Titanium.Filesystem.getFile(imageDir.resolve(), tmp_currentTime + 'camera_photo.png');
									file.write(event.media);
								} else {
									file = Titanium.Filesystem.getFile(imageDir.resolve(), tmp_currentTime + 'camera_photo.png');
									file.write(event.media);
								}
								var ImageFactory = require('ti.imagefactory');
								var origimg = null;
								var blob_rn = null;
								blob_rn = ImageFactory.imageAsResized(file.read(), {
									width : 100,
									height : 100,
								});
								ImageFactory = null;
								var thumbDir = Titanium.Filesystem.getFile(Myfolder.resolve(), "thumb");
								if (!thumbDir.exists()) {
									thumbDir.createDirectory();
									file = Titanium.Filesystem.getFile(thumbDir.resolve(), tmp_currentTime + 'camera_photo.png');
									file.write(blob_rn);
								} else {
									file = Titanium.Filesystem.getFile(thumbDir.resolve(), tmp_currentTime + 'camera_photo.png');
									file.write(blob_rn);
								}
								hideIndicator();
								imageCallback(event.media, file.nativePath);
								file = null;
								blob_rn = null;
								tmp_currentTime = null;
							} catch(exx) {
								hideIndicator();
							}
						} else {
							exports.Ui.alert('Videos not accepted.');
						}
					},
					cancel : function(e) {
					},
					error : function(error) {
						if (error.code == Titanium.Media.NO_CAMERA) {
							exports.Ui.alert('No Camera detcted.');
						}
					},
					allowEditing : true,
					mediaTypes : Ti.Media.MEDIA_TYPE_PHOTO,
				});
			}
		},
		getImage : function(path, share, remove) {
			try {
				var thumb_path = null;
				var full_path = null;
				var thumb_oject = null;
				var full_oject = null;
				if (path != null) {
					var name = path.split("/");
					var name = name[name.length - 1];
					var thumbdir = Titanium.Filesystem.getFile(Myfolder.resolve(), "thumb");
					var photodir = Titanium.Filesystem.getFile(Myfolder.resolve(), "photos");
					var photo_thumb = Titanium.Filesystem.getFile(thumbdir.resolve(), name);
					var photo_obj = Titanium.Filesystem.getFile(photodir.resolve(), name);
					if (photo_thumb.exists()) {
						if (remove == true) {
							var success = photo_thumb.deleteFile();
							Ti.API.info((success == true) ? 'success' : 'fail');
						} else {
							thumb_path = photo_thumb.nativePath;
							thumb_oject = photo_thumb.read();
						}
					}
					if (photo_obj.exists()) {
						if (remove == true) {
							var success_obj = photo_obj.deleteFile();
							Ti.API.info((success_obj == true) ? 'success' : 'fail');
						} else {
							full_path = photo_obj.nativePath;
							full_oject = photo_obj.read();
						}
					}
				} else {
				}
				if (share == true) {
					return {
						image_thumb_share : thumb_oject,
						image_full_share : full_oject
					};
				} else {
					return {
						image_thumb : thumb_path,
						image_full : full_path
					};
				}
			} catch(ex) {
			}
		}
	};

})();
