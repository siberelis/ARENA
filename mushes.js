import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let camera;
let renderer, mixer, clock;


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
renderer.toneMapping = THREE.ReinhardToneMapping;
//	container.appendChild( renderer.domElement );

const scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera( 50, 500 / 500, 1, 100 );
camera.position.set( 0, 0, 10 );
scene.add( camera );




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

// SINGLE MODEL LOADER

new GLTFLoader().load( './icons.glb', function ( gltf ) {
const model2 = gltf.scene;
scene.add( model2 );

} );




window.addEventListener( 'resize', onWindowResize );

}




function onWindowResize() {

const width = window.innerWidth;
const height = window.innerHeight;

camera.aspect = width / height;
camera.updateProjectionMatrix();

renderer.setSize( width, height );

}

function animate() {

requestAnimationFrame( animate );



const delta = clock.getDelta();
mixer.update( delta );



renderer.render( scene, camera );

}
