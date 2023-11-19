import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let camera;
let composer, renderer, mixer, clock;


   // Get references to the loading screen, progress bar, and container elements
   const loadingScreen = document.getElementById('loading-screen');
   const progressBarContainer = document.getElementById('progress-bar-container');
   const progressBar = document.getElementById('progress-bar');
   const container = document.getElementById('container');


//    container.appendChild( renderer.domElement );

const params = {
threshold: 1,
strength: 0.2,
radius: 0.1,
exposure: 1
};

init();

function init() {

const container = document.getElementById( 'three' );


clock = new THREE.Clock();

renderer = new THREE.WebGLRenderer( {
antialias: true,
canvas: container,
alpha: true 
} );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth/1.2, window.innerWidth/1.2 );



// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.toneMappingExposure = -0.4;

const scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 50, 500 / 500, 1, 100 );
camera.position.set( 0, 0, 10 );
scene.add( camera );




// const textureLoader = new THREE.TextureLoader();
// const tex = textureLoader.load('./GRID.png');

// const hydraCanvas = document.getElementById('synth');
// const hydraTexture = new THREE.CanvasTexture(hydraCanvas);



// const planeGeometry = new THREE.PlaneGeometry(10, 10);
// const planeMaterial = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
// const hydraPlane = new THREE.Mesh(planeGeometry, planeMaterial);


// hydraPlane.position.z = -2.7;



// //scene.add(hydraPlane);



// function updateTexture() {
// hydraTexture.needsUpdate = true;
// requestAnimationFrame(updateTexture);
// }

// updateTexture();








//ORBIT CONTROLS
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
//	controls.enableZoom = false;

// controls.addEventListener('end', () => {
// controls.reset();
// });

// LIGHTS
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


const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1, 0.1, 0.8 );
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;



const outputPass = new OutputPass();

composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );
composer.addPass( outputPass );

new RGBELoader().load( './sky.hdr', function ( texture ) {

		texture.mapping = THREE.EquirectangularReflectionMapping;
        
        
		//scene.background = texture;
		scene.environment = texture;
        
		render(); });








    // Create a LoadingManager
    const loadingManager = new THREE.LoadingManager(
        // OnProgress callback is called for each loaded item
        (item, loaded, total) => {
          // Calculate the loading progress percentage
          const progress = loaded / total;
          // Update the width of the progress bar
          progressBar.style.width = `${progress * 100}%`;
        },
        // OnLoad callback is called when all resources are loaded
        () => {
          // Hide the loading screen and progress bar
          loadingScreen.style.display = 'none';
          progressBarContainer.style.display = 'none';
          // Show the container
          container.style.display = 'block';
        }
      );











const loader = new GLTFLoader(loadingManager);
        let currentModel;
        const modelPaths = [
            'muho.glb',
            'ezhovik.glb',
            'veselka.glb',
            'meitake.glb',
            'kord.glb',
            'reishi.glb'
        ];

        function loadModel(index) {
            if (currentModel) {
                scene.remove(currentModel);
            }

            loader.load(modelPaths[index], function (gltf) {
                const model = gltf.scene;
                scene.add(model);
                currentModel = model;


                model.position.set (0, 1, -1);
                model.scale.set (0.5, 0.5, 0.5);

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




// SINGLE MODEL LOADER

// new GLTFLoader().load( './icons.glb', function ( gltf ) {
// const model2 = gltf.scene;
// scene.add( model2 );
// } );

new GLTFLoader(loadingManager).load( './frame.glb', function ( gltf ) {
    const model3 = gltf.scene;
    scene.add( model3 );
    
    // let animations = gltf.animations;
    // if ( animations && animations.length ) {
    // mixer = new THREE.AnimationMixer( model );
    // for ( let i = 0; i < animations.length; i ++ ) {
    // let animation = animations[ i ];
    // mixer.clipAction( animation ).play(); }	}
    
    // animate();
    
    } );

    new GLTFLoader(loadingManager).load( './glass.glb', function ( gltf ) {

      
        const model4 = gltf.scene;
        scene.add( model4 );
        
        // let animations = gltf.animations;
        // if ( animations && animations.length ) {
        // mixer = new THREE.AnimationMixer( model4 );
        // for ( let i = 0; i < animations.length; i ++ ) {
        // let animation = animations[ i ];
        // mixer.clipAction( animation ).play(); }	}
        
        animate();
        
        } );

// const gui = new GUI();

// const bloomFolder = gui.addFolder( 'bloom' );

// bloomFolder.add( params, 'threshold', 0.0, 1.0 ).onChange( function ( value ) {

// 	bloomPass.threshold = Number( value );

// } );

// bloomFolder.add( params, 'strength', 0.0, 3.0 ).onChange( function ( value ) {

// 	bloomPass.strength = Number( value );

// } );

// gui.add( params, 'radius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {

// 	bloomPass.radius = Number( value );

// } );

// const toneMappingFolder = gui.addFolder( 'tone mapping' );

// toneMappingFolder.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {

// 	renderer.toneMappingExposure = Math.pow( value, 4.0 );

// } );

window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

const width = window.innerWidth;
const height = window.innerHeight;

camera.aspect = width / height;
camera.updateProjectionMatrix();

renderer.setSize( width, height );
composer.setSize( width, height );

}

function animate() {

requestAnimationFrame( animate );

const delta = clock.getDelta();



mixer.update( delta );

composer.render();

}
