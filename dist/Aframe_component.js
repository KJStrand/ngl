/**
 * Register Aframe Component
 * Color and structure representations can be found in NGL documentation:
 * http://nglviewer.org/ngl/api/manual/usage/molecular-representations.html
 */

AFRAME.registerComponent('ngl-mol', {
	schema: {
		mol_entry: {type: 'string', default: "rcsb://1crn"},
		representation: {type: 'string', default: "default"},
		color: {type: 'string', default: "atomindex"}
	},
	
	init: function () {
		var div = document.createElement("div");
		div.id = 'viewport';
		div.style.width = "0px";
		div.style.height = "0px";
		document.body.appendChild(div);
	},

	update: function () {
	
		var el = this.el;
		var a_scene = new THREE.Object3D();// = this.el.sceneEl.object3D;  // THREE.Scene
		console.log("Passing the new object: ", a_scene)
		
		stage = new NGL.Stage("viewport", a_scene);
		el.setObject3D('mesh', a_scene);

		if (this.data.representation == "default"){
			stage.loadFile(this.data.mol_entry, {defaultRepresentation: true});
		}

		else {
			console.log("hello " + this.data.representation);
			var mol_rep = this.data.representation
			var mol_color = this.data.color

			stage.loadFile(this.data.mol_entry).then(function (o) {
				o.addRepresentation(mol_rep, { color: mol_color });
			});
		}
	}
});