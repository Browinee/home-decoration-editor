import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


export async function loadWindow() {
    const group = new THREE.Group();
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync("./window.glb");
    group.add(gltf.scene);

    const box = new THREE.Box3();
    box.expandByObject(gltf.scene);

    const size = box.getSize(new THREE.Vector3());
    const winModel = {
      model: group,
      size,
    };
    return winModel;
}


export async function loadDoor() {
    const group = new THREE.Group();
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync("./door.glb");
    group.add(gltf.scene);

    const box = new THREE.Box3();
    box.expandByObject(gltf.scene);

    const size = box.getSize(new THREE.Vector3());
    // console.log('size', size)
    const doorModel = {
      model: group,
      size,
    };
    return doorModel;
}


export  function loadFloorTexture(textureUrl?: string) {
    const textureLoader = new THREE.TextureLoader();
    const floorTexture = textureLoader.load(textureUrl || "./floor-texture.png");
    floorTexture.colorSpace = THREE.SRGBColorSpace;
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(0.002, 0.002);
    return floorTexture;
}
