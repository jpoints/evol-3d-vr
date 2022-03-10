function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

$(function(){
	oup_cookie = getCookie("ou_personalization_class");
	if(oup_cookie){
		$(".oup_container").hide();
		$(".oup_container." + oup_cookie).show();
	}
});