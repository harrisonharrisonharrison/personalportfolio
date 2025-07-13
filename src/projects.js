import * as TWEEN from '@tweenjs/tween.js';
import "./style.css"

import * as THREE from 'three';
import { PointLight } from "three";

import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from "three/examples/jsm/Addons.js";

import { getFresnelMat } from './getFresnelMat.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
renderer.render( scene, camera );

const backgroundTexture = new THREE.TextureLoader().load('A$.png');
scene.background = backgroundTexture;

//projects main planet
let projects;
const gltfLoader = new GLTFLoader();
gltfLoader.load('projectsmain.glb', (gltf) => {
  projects = gltf.scene;
  gltf.scene.position.set(0, 0, 0);
  gltf.scene.scale.set(10, 10, 10);
  scene.add(gltf.scene);
});

//projects fresnelmat
const projGeo = new THREE.SphereGeometry(10.1,10,10)
const projectsFresnelMat = getFresnelMat({ rimHex: 0xf6b26b});
const projectsGlowMesh = new THREE.Mesh(projGeo, projectsFresnelMat)
projectsGlowMesh.scale.setScalar(1.01);
scene.add(projectsGlowMesh);

let starD;
const gltfLoader2 = new GLTFLoader();
gltfLoader2.load('starD.glb', (gltf1) => {
  starD = gltf1.scene;
  gltf1.scene.position.set(10, 32, -1000);
  gltf1.scene.scale.set(.1, .1, .1);
  gltf1.scene.rotation.y = -Math.PI/2;
  gltf1.scene.rotation.x = .52;
  scene.add(gltf1.scene);
});

let starD2;
const gltfLoader3 = new GLTFLoader();
gltfLoader3.load('starD.glb', (gltf2) => {
  starD2 = gltf2.scene;
  gltf2.scene.position.set(-20, 32, -1000);
  gltf2.scene.scale.set(.1, .1, .1);
  gltf2.scene.rotation.y = -Math.PI/2;
  gltf2.scene.rotation.x = .52;
  scene.add(gltf2.scene);
});

let arc;
const gltfLoader4 = new GLTFLoader();
gltfLoader4.load('arc.glb', (gltf3) => {
  arc = gltf3.scene;
  gltf3.scene.position.set(-50, 17, -1000);
  gltf3.scene.scale.set(10, 10, 10  );
  gltf3.scene.rotation.y = Math.PI/8;
  gltf3.scene.rotation.x = .7;
  scene.add(gltf3.scene);
});

let laat;
const gltfLoader5 = new GLTFLoader();
gltfLoader5.load('laat.glb', (gltf4) => {
  laat = gltf4.scene;
  gltf4.scene.position.set(20, 0, -1000);
  gltf4.scene.scale.set(.01, .01, .01  );
  gltf4.scene.rotation.y = Math.PI/1.1;
  scene.add(gltf4.scene);
});

const tween = new TWEEN.Tween({y:1000, z: -1000 })
  .to({z:-42, y:32},1500)
  .onUpdate((coords) => {
    starD.position.z = coords.z;
    starD.position.y = coords.y;
  })
  .delay(1000)
  .easing(TWEEN.Easing.Bounce.In
);
const tween2 = new TWEEN.Tween({y:1000, z: -1000 })
  .to({z:-42, y:20},1500)
  .onUpdate((coords) => {
    starD2.position.z = coords.z;
    starD2.position.y = coords.y;
  })
  .delay(1300)
  .easing(TWEEN.Easing.Bounce.In
);
const tween3 = new TWEEN.Tween({y:1000, z: -1000 })
  .to({z:-20, y:17},3500)
  .onUpdate((coords) => {
    arc.position.z = coords.z;
    arc.position.y = coords.y;
  })
  .delay(200)
  .easing(TWEEN.Easing.Bounce.In
);
const tween4 = new TWEEN.Tween({y:1000, z: -1000 })
  .to({z:0, y:0},3500)
  .onUpdate((coords) => {
    laat.position.z = coords.z;
    laat.position.y = coords.y;
  })
  .delay(500)
  .easing(TWEEN.Easing.Bounce.In
);
tween.start()
tween2.start()
tween3.start()
tween4.start()
const starTween = new TWEEN.Group(tween,tween2,tween3,tween4);

//const controls = new OrbitControls(camera, renderer.domElement);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize );

//responsive speech bubble positions
function updateSpeechBubblePosition() {

  const speechBubbleDiv = document.querySelector('.speech-bubble-projects');
  speechBubbleDiv.style.left = `${window.innerWidth/6}px`;
  speechBubbleDiv.style.top = `${window.innerHeight/3}px`;
  const crosswalkDiv = document.querySelector('#crosswalk');
  crosswalkDiv.style.left = `${window.innerWidth/3}px`;
  crosswalkDiv.style.top = `${window.innerHeight/8}px`;
  const stellarDiv = document.querySelector('#stellarship');
  stellarDiv.style.left = `${window.innerWidth/10}px`;
  stellarDiv.style.top = `${window.innerHeight/8}px`;
  const cineDiv = document.querySelector('#cinemaker');
  cineDiv.style.left = `${window.innerWidth/5}px`;
  cineDiv.style.top = `${window.innerHeight/8}px`;
  const wDiv = document.querySelector('#website');
  wDiv.style.left = `${window.innerWidth/1.3}px`;
  wDiv.style.top = `${window.innerHeight/3}px`;

}

const sun = new THREE.DirectionalLight(0xffffff, 5); 
sun.position.set(100, 100, 40);
const ambience = new THREE.AmbientLight(0xffffff, .4)
scene.add(sun, ambience);


// const lightHelper = new THREE.PointLightHelper(sun)
// scene.add(lightHelper);

function animate(){    
    updateSpeechBubblePosition()  
    if (projects) {
        projects.rotation.y -= .01;
        projectsGlowMesh.rotation.y -= .01;
    }

    requestAnimationFrame( animate );
    starTween.update();
    renderer.render(scene, camera);
}

animate();

const canvas = renderer.domElement;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('click', (event) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(projects);
  if (intersects.length > 0) {
    const speechBubble = document.querySelector('.speech-bubble-projects');
    if (speechBubble) {
      speechBubble.style.display = 'block';
    }
  } else {
    const speechBubble = document.querySelector('.speech-bubble-projects');
    if (speechBubble) {
      speechBubble.style.display = 'none';
    }
  }

  const intersectsCW = raycaster.intersectObject(starD);
  if (intersectsCW.length > 0) {
    const cwBubble = document.querySelector('#crosswalk');
    if (cwBubble) {
      cwBubble.style.display = 'block';
    }
  } else {
    const cwBubble = document.querySelector('#crosswalk');
    if (cwBubble) {
      cwBubble.style.display = 'none';
    }
  }

  const intersectsSS = raycaster.intersectObject(starD2);
  if (intersectsSS.length > 0) {
    const ssBubble = document.querySelector('#stellarship');
    if (ssBubble) {
      ssBubble.style.display = 'block';
    }
  } else {
    const ssBubble = document.querySelector('#stellarship');
    if (ssBubble) {
      ssBubble.style.display = 'none';
    }
  }

  const intersectsCM = raycaster.intersectObject(arc);
  if (intersectsCM.length > 0) {
    const cmBubble = document.querySelector('#cinemaker');
    if (cmBubble) {
      cmBubble.style.display = 'block';
    }
  } else {
    const cmBubble = document.querySelector('#cinemaker');
    if (cmBubble) {
      cmBubble.style.display = 'none';
    }
  }

  const intersectsW = raycaster.intersectObject(laat);
  if (intersectsW.length > 0) {
    const wBubble = document.querySelector('#website');
    if (wBubble) {
      wBubble.style.display = 'block';
    }
  } else {
    const wBubble = document.querySelector('#website');
    if (wBubble) {
      wBubble.style.display = 'none';
    }
  }

});