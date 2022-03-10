$.fn.blogPagination = function(path,conditions, limit){
	var x = $(this);	
	x.data("page",0);
	x.data("posts",$.ajax({type:"POST",url:"/_resources/scripts/blog/listing.php",data:{action:"acquire",path:path,conditions:conditions},global:false,async:false,})
		.done(function(data){return data;}).responseText);
	if(x.data("posts")){
		x.data("maxPage",Math.ceil(eval(x.data("posts")).length / limit) ); //+ ((eval(x.data("posts")).length % limit == 0) ? -1 : 0));
	} else { x.data("maxPage",0); }
	$(".pagination a[href='#prev']").addClass("hide");
	if(x.data("maxPage") == 1){$(".pagination a[href='#next']").addClass("hide");console.log("test");}
	$("#pageNum label").append(" of " + x.data("maxPage"));
	dupeCheck();

	$(".pagination a").click(function(e){
		e.preventDefault();
		var page = x.data("page");

		switch($(this).attr("href").substring($(this).attr("href").indexOf("#")+1)){
			case "next" : if(page + 1 < x.data("maxPage")) x.data("page",page + 1); break;
			case "prev" : if(page != 0) x.data("page",page - 1); break;
		}
		updatePage(x.data("page"),limit,x.data("posts"));
	});
	
	$(".pagination #pageNum").submit(function(e){
		e.preventDefault();
		x.data("page", ($(this).find("input").val() - 1 < x.data("maxPage")) ? $(this).find("input").val() - 1 : x.data("maxPage"));
				
		updatePage(x.data("page"),limit,x.data("posts"));
		
	});
	
	function updatePage(pageNum, limit, posts){
		$.ajax({ type:"POST", url:"/_resources/scripts/blog/listing.php", data:{action:"display", page:pageNum, limit:limit, posts:posts}})
			.done(function( msg ) { 
				x.html(msg); 
				dupeCheck();
				$(".pagination #pageNum input").val(pageNum+1); 
				if(pageNum < 1){ $(".pagination a[href='#prev']").addClass("hide"); } else { $(".pagination a[href='#prev']").removeClass("hide"); }
				if(pageNum + 1 == x.data("maxPage")){ $(".pagination a[href='#next']").addClass("hide"); } else { $(".pagination a[href='#next']").removeClass("hide"); }
				$(window).scrollTop(0);
			});
	}
	
	function dupeCheck(){
		var fLink = $(".featured h5 a").attr("href");
		if(fLink){
			$(".post .read-more a[href='"+fLink+"'").parents(".post").hide();
		}
	}
	
}
