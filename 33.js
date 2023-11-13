import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

      //Scene
      var scene = new THREE.Scene();
	
      //Camera
		var camera = new THREE.PerspectiveCamera( 50, 500 / 500, 1, 100 );
		camera.position.set( 0, 0, 10 );
		scene.add( camera );

      //Canvas
      var myCanvas = document.getElementById('three');

      //Renderer
      var renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: myCanvas,
		alpha: true
      });
	  renderer.setPixelRatio( window.devicePixelRatio );
	  renderer.setSize( window.innerWidth/1.2, window.innerWidth/1.2 );
	//   renderer.toneMapping = THREE.ReinhardToneMapping;

	

		//LIGHTS
		var light = new THREE.AmbientLight(0xffffff, 0.7);
		light.power = 10;  // GE Lumens @ 60W incade.
		light.decay = 2;
		light.distance = Infinity;
		light.position.set(0, 2, 0);
		light.castShadow = false;
		light.shadowCameraVisible = false;
		scene.add(light);



		scene.add( new THREE.AmbientLight( 0xffffff ) );

		const pointLight = new THREE.PointLight( 0x9649f9, 1000 );
		pointLight.position.set( 0, 15, 0);
		camera.add( pointLight );

		const pointLight2 = new THREE.PointLight( 0xda8f32, 1700 );
		pointLight2.position.set( -15, 0, 0);
		camera.add( pointLight2 );

		const pointLight3 = new THREE.PointLight( 0x0188f1, 1700 );
		pointLight3.position.set( 0, -10, 20);
		camera.add( pointLight3 );

		//OrbitControls
		const controls = new OrbitControls( camera, renderer.domElement );
		controls.target.set(0, 0, 0);
		controls.enableDamping = true;
		controls.maxPolarAngle = THREE.MathUtils.degToRad(100);
		controls.minPolarAngle = THREE.MathUtils.degToRad(80);
		controls.maxAzimuthAngle = THREE.MathUtils.degToRad(10);
		controls.minAzimuthAngle = THREE.MathUtils.degToRad(-10);
		controls.minDistance = 6;
		controls.maxDistance = 8;
		controls.enableRotate = true; 
		controls.update();
		controls.enablePan = false;

   

		
	//MODELS

const loader = new GLTFLoader();
let currentModel;
const modelPaths = [
	'muho.glb',
	'ezhovik.glb',
	'veselka.glb',
	'meitake.glb',
	'kord.glb',
	'reishi.glb'
];

let mixer;

function loadModel(index) {
	if (currentModel) {
		scene.remove(currentModel);
	}

	loader.load(modelPaths[index], function (gltf) {
		const model = gltf.scene;
		scene.add(model);
		currentModel = model;

		let animations = gltf.animations;
		if ( animations && animations.length ) {
		mixer = new THREE.AnimationMixer( model );
		for ( let i = 0; i < animations.length; i ++ ) {
		let animation = animations[ i ];
		mixer.clipAction( animation ).play(); }	}

		animate();   
	});
}

for (let i = 0; i < modelPaths.length; i++) {
	const linkId = "model" + (i + 1) + "Link"; // Construct the id
	document.getElementById(linkId).addEventListener('click', function () {
		loadModel(i);
	});
}

loadModel(0); // Load the first model initially

	//Render loop
	render();

	var delta = 0;
	var prevTime = Date.now();




	function render() {
		//exposure
//	renderer.toneMappingExposure = Math.pow(0.7, 5.0);  // -> exposure: 0.168
		
var clock;
clock = new THREE.Clock();
		
		requestAnimationFrame(render);
		
			
			//	controls.update();
			//	mesh.rotation.y += 0.001;
				
				var delta = clock.getDelta();
		
				renderer.render(scene, camera);

				if (mixer) mixer.update(clock.getDelta()*15);

				// if (mixer) mixer.update(delta);

	}
   
