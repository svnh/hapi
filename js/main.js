var scene, camera, renderer, planetMesh, controls;

var init = function() {
    console.log('jshshs	')
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 10000);
	camera.position.z = -30;
	camera.position .y= 20;
	renderer =new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	var planetGeometry = new THREE.SphereGeometry(5, 20, 20);
	var planetMaterial = new THREE.MeshBasicMaterial({
		color: new THREE.Color(0xff00ff),
		side: THREE.DoubleSide
	})
	planetMesh = new THREE.Mesh(planetGeometry, planetMaterial);
	scene.add(planetMesh);
	console.log(planetMesh.geometry.vertices.length)


	var groundGeo = new THREE.PlaneGeometry(1000, 1000);
	var groundMesh = new THREE.Mesh(groundGeo);
	groundMesh.rotation.x = -Math.PI/2;
	scene.add(groundMesh);

	controls = new THREE.OrbitControls(camera);


	setUpPillars();

}

function setUpPillars(){
	var radius = 50;
	var numPillars = 6;

	var pillarGeo = new THREE.BoxGeometry(10, 30, 5);
	for(var i = 0; i < numPillars; i++){

		var theta = i/numPillars * Math.PI * 2;
		var x = Math.cos(theta) * radius;
		var z = Math.sin(theta) * radius;
		var pillar = new THREE.Mesh(pillarGeo);
		scene.add(pillar);
		pillar.position.set(x, 0, z);

	}
}

var animate = function() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	
    //UPD
	controls.update();

	//x, y, z
	var scaleVal = Math.sin( Math.max(.1, performance.now()/1000));

	var hue = map(scaleVal, .1, 1, 0, 0.3);
	planetMesh.scale.set(scaleVal, scaleVal, scaleVal);
	planetMesh.material.color.setHSL(hue, 0.7, 0.7);

}

init();
animate();


function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}