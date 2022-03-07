function addKeyboardRotate(target){
			document.addEventListener('keydown', function(event) {
				var code = event.keyCode;
				var rig = document.getElementById(target);

				switch (code) {
					case 37:
						rig.object3D.rotation.y += .1;
						break;
					case 38:
						rig.object3D.rotation.x += .1;
						break;
					case 39:
						rig.object3D.rotation.y -= .1;
						break;
					case 40:
						rig.object3D.rotation.x -= .1;
						break;
				}
			});
		}