import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight); 
const fortressURL =new URL ('../assets/benteng.glb', import.meta.url)
document.body.appendChild(renderer.domElement); 
const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(
     75, 
     window.innerWidth / window.innerHeight ,
     0.1,1000
 ); 
 renderer.setClearColor(0x999999);
 const directional =new THREE.AmbientLightProbe(0x333333,0.5)
 scene.add(directional);
const orbit = new OrbitControls(camera,renderer.domElement);
 const axesHelper = new THREE.AxesHelper(5); 
 scene.add(axesHelper); 
 camera.position.set(0,0,4) ;
 orbit.update();
const assetloader = new GLTFLoader(); 
assetloader.load(fortressURL.href,function(gltf){ 
 const model = gltf.scene; 
 scene.add (model) ;
 model.position.set(1,0,0);
}, undefined,function(error){
    console.error(error)
});
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x000000 }); 
const box = new  THREE.Mesh(boxGeometry, boxMaterial);

function animate(){ 
    box.rotation.y += 0.01; 
    renderer.render(scene,camera)
}

renderer.setAnimationLoop(animate);