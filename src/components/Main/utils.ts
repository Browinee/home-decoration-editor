import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let winModel: { model: THREE.Group, size: THREE.Vector3} | null = null;

export async function loadWindow() {
    if(winModel !== null) {
        return winModel;
    } else {
        const group = new THREE.Group();
        const loader = new GLTFLoader();
        const gltf = await loader.loadAsync("./window.glb");
        group.add(gltf.scene);

        const box = new THREE.Box3();
        box.expandByObject(gltf.scene);

        const size = box.getSize(new THREE.Vector3());
        console.log('loadWindow size', size)
        winModel =  {
            model: group,
            size
        };
        return winModel;
    }
}
