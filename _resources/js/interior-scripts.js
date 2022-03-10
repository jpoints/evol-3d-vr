function ounav(filePath){
	var ext = filePath.split(".").pop();
	var indexPath = filePath.split("/").slice(0,-1).join("/") + "/index." + ext;	
	$(".sidenav").find("a[href='"+indexPath+"']").parent().append($(".subnav"));
	//$(".subnav").each(function(){ $(this).siblings(".sidenav").find("a[href='"+indexPath+"']").parent().append($(this)); });
	$(".sidenav a[href='"+filePath+"']").addClass("active");
}

