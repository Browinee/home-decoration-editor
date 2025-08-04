import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';

// 創建場景和基本設置
const createScene = () => {
    const scene = new THREE.Scene();

    // 添加坐標軸輔助器
    const axesHelper = new THREE.AxesHelper(5000);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(
        100000,
        500,
        'white',
        'white'
    );

    scene.add(gridHelper);
    gridHelper.position.y = -100;

    return scene;
};

// 設置燈光
const setupLights = (scene: THREE.Scene) => {
    // 方向光
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 1500, 0);
    scene.add(directionalLight);

    // 環境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);
};

// 創建相機
const createCamera = () => {
    const width = window.innerWidth;
    const height = window.innerHeight - 60;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 20000);
    camera.position.set(10000, 1500, 10000);

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
    renderer.setClearColor('skyblue');

    return renderer;
};

// 設置渲染循環
const setupRenderLoop = (renderer: THREE.WebGLRenderer, scene: THREE.Scene, camera: THREE.Camera, wallsVisibilityCalc: () => void) => {
    const render = () => {
        renderer.render(scene, camera);
        wallsVisibilityCalc();
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
    const controls = new MapControls(camera, renderer.domElement);
    // controls.enableRotate = false;
    return controls;
};

const GLOBAL_CLICKED_EDGES:THREE.Line[] = [];
const setupEdgeClick = (renderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene) => {
    renderer.domElement.addEventListener('click', (event) => {
        const y = -((event.offsetY / window.innerHeight) * 2 - 1);
        const x = (event.offsetX / window.innerWidth) * 2 - 1;

        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);
        const intersections = rayCaster.intersectObjects(scene.children);

        GLOBAL_CLICKED_EDGES.forEach(edge => {
            edge.parent?.remove(edge);
        })

        if(intersections.length) {
            const obj = intersections[0].object as THREE.Mesh;
            if(obj.isMesh) {
                const geometry = new THREE.EdgesGeometry(obj.geometry);
                const material = new THREE.LineBasicMaterial({
                    color: 'blue'
                });
                const line = new THREE.LineSegments(geometry, material);
                obj.add(line);
                GLOBAL_CLICKED_EDGES.push(line);
            }
        }

    })
}
// 主要的初始化函數
export const init3D = (dom: HTMLElement, wallsVisibilityCalc: () => void) => {
    const scene = createScene();

    setupLights(scene);

    // 3. 創建相機
    const camera = createCamera();

    // 4. 創建渲染器
    const renderer = createRenderer();




    // 5. 設置渲染循環
    setupRenderLoop(renderer, scene, camera, wallsVisibilityCalc);

    // 6. 將渲染器添加到 DOM
    dom.append(renderer.domElement);

    // 7. 設置視窗調整
    setupWindowResize(renderer, camera);

    // 8. 設置控制器
    const controls = setupControls(camera, renderer);

    setupEdgeClick(renderer, camera, scene);
    return {
        scene,
        camera,
        renderer,
        controls
    };
};

