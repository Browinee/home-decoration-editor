import * as THREE from 'three';
import {
    OrbitControls,
} from 'three/addons/controls/OrbitControls.js';
import { MapControls } from 'three/addons/controls/MapControls.js';

// 創建場景和基本設置
const createScene = () => {
    const scene = new THREE.Scene();

    // 添加坐標軸輔助器
    const axesHelper = new THREE.AxesHelper(500);
    scene.add(axesHelper);

    return scene;
};

// 設置燈光
const setupLights = (scene: THREE.Scene) => {
    // 方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(500, 400, 300);
    scene.add(directionalLight);

    // 環境光
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
};

// 創建相機
const createCamera = () => {
    const width = window.innerWidth;
    const height = window.innerHeight - 60;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(200, 500, -100);
    camera.lookAt(200, 0, -100);

    return camera;
};

// 創建渲染器
const createRenderer = () => {
    const width = window.innerWidth;
    const height = window.innerHeight - 60;

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);
    renderer.setClearColor('lightblue');

    return renderer;
};

// 設置渲染循環
const setupRenderLoop = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, controls: OrbitControls) => {
    const render = () => {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    };

    render();
};

// 設置視窗調整
const setupWindowResize = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
    window.onresize = function () {
        const width = window.innerWidth;
        const height = window.innerHeight - 60;

        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };
};

// 設置控制器
const setupControls = (camera: THREE.Camera, renderer: THREE.WebGLRenderer) => {
    // const controls = new OrbitControls(camera, renderer.domElement);
    const controls = new MapControls(camera, renderer.domElement);
    controls.enableRotate = false;
    return controls;
};

// 主要的初始化函數
export function init2D(dom: HTMLElement) {
  // 1. 創建場景
  const scene = createScene();

  // 2. 設置燈光
  setupLights(scene);

  // 3. 創建相機
  const camera = createCamera();

  // 4. 創建渲染器
  const renderer = createRenderer();

  // 5. 設置控制器
  const controls = setupControls(camera, renderer);

  // 6. 設置渲染循環
  setupRenderLoop(renderer, scene, camera, controls);

  // 7. 將渲染器添加到 DOM
  dom.append(renderer.domElement);

  // 8. 設置視窗調整
  setupWindowResize(renderer, camera);

  return {
    scene,
    camera,
    renderer,
    controls,
  };
}
