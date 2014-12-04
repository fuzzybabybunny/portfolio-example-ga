Template.layout.rendered = function(){

	var scripts = '\
  <!-- Plugin JavaScript -->\
  <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>\
  <script src="/js/classie.js"></script>\
  <script src="/js/cbpAnimatedHeader.js"></script>\
  \
  <!-- Contact Form JavaScript -->\
  \
  <!-- Custom Theme JavaScript -->\
  <script src="/js/agency.js"></script>\
  <script src="/js/highstocks/highstock.js"></script>\
  <script src="/js/jquery-serialize-object.js"></script>\
  <script src="/js/highstocks/themes/dark-unica.js"></script>\
	';

	$('body').append(scripts);
	console.log("layout rendered");
};