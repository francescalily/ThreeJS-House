import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

const gui = new GUI();

const canvas = document.querySelector("canvas.webgl");

const scene = new THREE.Scene();

const fog = new THREE.Fog("#262837", 1, 15);
scene.fog = fog;

const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorMetalTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const bricksColorTexture = textureLoader.load("/textures/bricks/color.jpg");
const bricksAmbientOcclusionTexture = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const bricksNormalTexture = textureLoader.load("/textures/bricks/normal.jpg");
const bricksRoughnessTexture = textureLoader.load(
  "/textures/bricks/roughness.jpg"
);

const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

const house = new THREE.Group();
scene.add(house);

//making the walls for the house - they are then added to the house because it is part of the house group which is in the scene
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: bricksColorTexture,
    aoMap: bricksAmbientOcclusionTexture,
    normalMap: bricksNormalTexture,
    roughness: bricksRoughnessTexture,
  })
);
walls.position.y = 1.25;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = 2.5 * 1.2;
roof.rotation.y = Math.PI * 0.25;

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(1.5, 2.2, 10, 10),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    transparent: true,
    alphaMap: doorAlphaTexture,
    aoMap: doorAmbientOcclusionTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.1,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetalTexture,
    roughnessMap: doorRoughnessTexture,
  })
);
door.position.z = 2 + 0.01;
door.position.y = 1;

const bushGeometry = new THREE.SphereGeometry(1, 8, 8);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bushOne = new THREE.Mesh(bushGeometry, bushMaterial);
bushOne.scale.set(0.5, 0.5, 0.5);
bushOne.position.set(0.8, 0.2, 2.2);

const bushTwo = new THREE.Mesh(bushGeometry, bushMaterial);
bushTwo.scale.set(0.25, 0.25, 0.25);
bushTwo.position.set(1.4, 0.1, 2.1);

const bushThree = new THREE.Mesh(bushGeometry, bushMaterial);
bushThree.scale.set(0.4, 0.4, 0.4);
bushThree.position.set(-0.8, 0.1, 2.2);

const bushFour = new THREE.Mesh(bushGeometry, bushMaterial);
bushFour.scale.set(0.15, 0.15, 0.15);
bushFour.position.set(-1, 0.05, 2.6);

house.add(walls, roof, door, bushOne, bushTwo, bushThree, bushFour);

const graves = new THREE.Group();
scene.add(graves);

const trees = new THREE.Group();
scene.add(trees);

const treeGeometry = new THREE.SphereGeometry(0.4, 10, 4);
const treeMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const graveGeometry = new THREE.BoxGeometry(0.1, 2, 0.1);
const graveMaterial = new THREE.MeshStandardMaterial({ color: "#964B00" });

for (let i = 0; i < 20; i++) {
  const radius = 3 + Math.random() * 7;
  const angle = Math.random() * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  4;
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  grave.position.set(x, 0.4, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  grave.castShadow = true;
  graves.add(grave);
  const tree = new THREE.Mesh(treeGeometry, treeMaterial);
  tree.position.set(x, 1.5, z);
  tree.rotation.y = (Math.random() - 0.5) * 0.4;
  tree.rotation.z = (Math.random() - 0.5) * 0.4;
  graves.add(grave);
  trees.add(tree);
}

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.2);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight("#ffffff", 1.5);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

const doorLight = new THREE.PointLight("#ff7d46", 1, 1);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

const blueLight1 = new THREE.PointLight(0x0000ff, 4, 10);
blueLight1.position.set(-0.5, 1, 2.8);

const blueLight2 = new THREE.PointLight(0x0000ff, 4, 10);
blueLight2.position.set(0.5, 1, 2.8);
scene.add(blueLight1, blueLight2);

const birdOne = new THREE.PointLight("#ffffff", 6, 3);
const birdTwo = new THREE.PointLight("#ffffff", 6, 3);
const birdThree = new THREE.PointLight("#ff0000", 6, 3);

scene.add(birdOne, birdTwo, birdThree);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

//enabling shadows to work
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;

moonLight.castShadow = true;
doorLight.castShadow = true;
birdOne.castShadow = true;
birdTwo.castShadow = true;
birdThree.castShadow = true;

walls.castShadow = true;
bushOne.castShadow = true;
bushTwo.castShadow = true;
bushThree.castShadow = true;
bushFour.castShadow = true;

floor.receiveShadow = true;
walls.receiveShadow = true;

doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

birdOne.shadow.mapSize.width = 256;
birdOne.shadow.mapSize.height = 256;
birdOne.shadow.camera.far = 7;

birdTwo.shadow.mapSize.width = 256;
birdTwo.shadow.mapSize.height = 256;
birdTwo.shadow.camera.far = 7;

birdTwo.shadow.mapSize.width = 256;
birdTwo.shadow.mapSize.height = 256;
birdTwo.shadow.camera.far = 7;

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // const birdOneAngle = elapsedTime * 0.5;
  // birdOne.position.x = Math.cos(birdOneAngle) * 4;
  // birdOne.position.z = Math.sin(birdOneAngle) * 4;
  // birdOne.position.y = Math.sin(elapsedTime * 3);

  const blueLight1Intensity = (Math.sin(elapsedTime * 3) + 1) / 2;
  // blueLight1.position.x = Math.cos(blueLight1Angle) * 4;
  // birdOne.position.z = Math.sin(birdOneAngle) * 4;
  blueLight1.intensity = blueLight1Intensity;
  const blueLight2Intensity = (Math.cos(elapsedTime * 3) + 1) / 2;
  blueLight2.intensity = blueLight2Intensity;
  // const birdTwoAngle = -elapsedTime * 0.32;
  // birdTwo.position.x = Math.cos(birdTwoAngle) * 5;
  // birdTwo.position.z = Math.sin(birdTwoAngle) * 5;
  // birdTwo.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  // const birdThreeAngle = -elapsedTime * 0.18;
  // birdThree.position.x =
  //   Math.cos(birdThreeAngle) * (7 + Math.sin(elapsedTime * 0.32));
  // birdThree.position.z =
  //   Math.sin(birdThreeAngle) * (7 + Math.sin(elapsedTime * 0.5));
  // birdThree.position.y =
  //   Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

  controls.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
