var args = arguments[0] || {};
var ImageFactory = require('ti.imagefactory');
var blob_rn = ImageFactory.imageAsResized(args.img, {
	width : 250,
	height : 250,
});
$.img_view.image = blob_rn;
$.win_image_big.title = 'Image';
var remove = function() {
	ImageFactory = null;
	$.win_image_big.close();
};
