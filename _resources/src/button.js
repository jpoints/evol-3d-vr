		AFRAME.registerComponent('button', {
			init: function () {
				// Use events to figure out what raycaster is listening so we don't have to
				// hardcode the raycaster.
				this.el.addEventListener('raycaster-intersected', evt => {
				  this.el.setAttribute('emissive','#7B7A79');
				});

				this.el.addEventListener('raycaster-intersected-cleared', evt => {
				   this.el.setAttribute('emissive','#000');
				});
		  }
		});