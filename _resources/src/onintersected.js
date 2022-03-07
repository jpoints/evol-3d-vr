function addOnIntersected(target){
			  AFRAME.registerComponent('collide', {
				init: function () {
						this.el.addEventListener('raycaster-intersected', evt => {
						  this.el.setAttribute('emissive','#7B7A79');
						});
						this.el.addEventListener('raycaster-intersected-cleared', evt => {
						   this.el.setAttribute('emissive','#000');
						});
			  }
			});
		}