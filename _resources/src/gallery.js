function setGallery(itemsJson){

		var items = itemsJson;
		var length = items.length;
		var current = 0;
		 
		 window.onload = function(){
			var sky = document.getElementById("sky");
			sky.setAttribute('material','opacity',0);

		 	var title = document.getElementById("title");
 		 	var description = document.getElementById("description");
			
			 sky.setAttribute('src',items[current].src);
			 title.setAttribute('text',"value",items[current].title);
 			 description.setAttribute('text',"value",items[current].description);
		 };
		 
		 AFRAME.registerComponent('next', {
			 init: function () {
				 this.el.addEventListener('click', function (evt) {
					 var sky = document.getElementById("sky");
		 			 var title = document.getElementById("title");
					 current = (current + 1) % length;
					 sky.setAttribute('material','opacity',0);
					 sky.setAttribute('src',items[current].src);
					 title.setAttribute('text',"value",items[current].title);
					 description.setAttribute('text',"value",items[current].description);
				 });
			 }
		 });
		 
		  AFRAME.registerComponent('previous', {
			 init: function () {
				 this.el.addEventListener('click', function (evt) {
					 var sky = document.getElementById("sky");
		 			 var title = document.getElementById("title");
					 current = (current - 1 + length) % length;
					 sky.setAttribute('material','opacity',0);
					 sky.setAttribute('src',items[current].src);
					 title.setAttribute('text',"value",items[current].title);
					 description.setAttribute('text',"value",items[current].description);
				 });
			 }
		 });
		 
		 AFRAME.registerComponent('toggledescription', {
			 init: function () {
				 let el = this.el;
				 this.el.addEventListener('click', function (evt) {
				  var isVisible = description.getAttribute('visible');
				  if(isVisible){
					el.setAttribute('text',"value","show");
				  }
				  else{
					el.setAttribute('text',"value","hide");
				  }
				  description.setAttribute('visible',!isVisible);
				 });
			 }
		 });
}