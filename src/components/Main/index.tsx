import { useEffect, useRef, useState } from "react";
import { init3D } from "./init-3d";
import { init2D } from "./init-2d";
import { Button } from "antd";
import * as THREE from "three";
import { useHouseStore } from "../../store";
import { loadDoor, loadWindow } from "./utils";

function Main() {
  const container3DRef = useRef<HTMLDivElement>(null);
  const container2DRef = useRef<HTMLDivElement>(null);
  const scene3DRef = useRef<THREE.Scene>(null);
  const scene2DRef = useRef<THREE.Scene>(null);
  const [curMode, setCurMode] = useState("3d");

  useEffect(() => {
    if (!container3DRef.current) return;

    const { scene } = init3D(container3DRef.current);
    scene3DRef.current = scene;

    return () => {
      if (container3DRef.current) {
        container3DRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!container2DRef.current) return;

    const { scene } = init2D(container2DRef.current);
    scene2DRef.current = scene;
    return () => {
      if (container2DRef.current) {
        container2DRef.current.innerHTML = "";
      }
    };
  }, []);
 const loadWall = async (scene: THREE.Scene) => {
  const walls = await Promise.all(data.walls.map(async (item) => {
    const shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(0, item.height);
    shape.lineTo(item.width, item.height);
    shape.lineTo(item.width, 0);
    shape.lineTo(0, 0);

    const windowModels = [];
    for (const win of item.windows || []) {
      const path = new THREE.Path();
      const { left, bottom } = win.leftBottomPosition;
      path.moveTo(left, bottom);
      path.lineTo(left + win.width, bottom);
      path.lineTo(left + win.width, bottom + win.height);
      path.lineTo(left, bottom + win.height);
      path.lineTo(left, bottom);
      shape.holes.push(path);

      const { model, size } = await loadWindow();
      model.position.x = win.leftBottomPosition.left + win.width / 2;
      model.position.y = win.leftBottomPosition.bottom + win.height / 2;
      model.scale.set(win.width / size.x, win.height / size.y, 1);
      windowModels.push(model);
    }
    const doorModels = [];
    for (const door of item.doors || []) {
      const path = new THREE.Path();
      const { left, bottom } = door.leftBottomPosition;
      path.moveTo(left, bottom);
      path.lineTo(left + door.width, bottom);
      path.lineTo(left + door.width, bottom + door.height);
      path.lineTo(left, bottom + door.height);
      path.lineTo(left, bottom);
      shape.holes.push(path);

      const { model, size } = await loadDoor();
      model.scale.y = door.height / size.y;
      model.scale.z = door.width / size.z;
      model.rotateY(Math.PI / 2);
      model.position.x = door.leftBottomPosition.left + door.width / 2;
      model.position.y = door.leftBottomPosition.bottom + door.height / 2;

      doorModels.push(model);
    }
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: item.depth,
    });
    const material = new THREE.MeshPhongMaterial({
      color: "white",
    });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.set(item.position.x, item.position.y, item.position.z);
    wall.add(...windowModels);
    wall.add(...doorModels);
    if(item.rotationY) {
      wall.rotation.y = item.rotationY;
  }

    return wall;
  }));

  scene.add(...walls);
 }
  const { data } = useHouseStore();
  useEffect(() => {
    const scene = scene3DRef.current!;
      loadWall(scene);
  }, [data]);

  useEffect(() => {
    const scene = scene2DRef.current!;
    // const walls = data.walls.map((item) => {
    //   const shape = new THREE.Shape();
    //   shape.moveTo(item.p1.x, item.p1.z);
    //   shape.lineTo(item.p2.x, item.p2.z);
    //   shape.lineTo(item.p3.x, item.p3.z);
    //   shape.lineTo(item.p4.x, item.p4.z);
    //   shape.lineTo(item.p1.x, item.p1.z);
    //   const geometry = new THREE.ShapeGeometry(shape);
    //   const material = new THREE.MeshPhongMaterial({
    //     color: "white",
    //   });
    //   const wall = new THREE.Mesh(geometry, material);
    //   wall.rotateX(-Math.PI / 2);
    //   return wall;
    // });

    // scene.add(...walls);
  }, [data]);

  return (
    <div className="Main">
      <div
        ref={container3DRef}
        id="threejs-3d-container"
        style={{ display: curMode === "3d" ? "block" : "none" }}
      ></div>
      <div
        ref={container2DRef}
        id="threejs-2d-container"
        style={{ display: curMode === "2d" ? "block" : "none" }}
      ></div>
      <div className="mode-change-btns">
        <Button
          type={curMode === "2d" ? "primary" : "default"}
          onClick={() => setCurMode("2d")}
        >
          2D
        </Button>
        <Button
          type={curMode === "3d" ? "primary" : "default"}
          onClick={() => setCurMode("3d")}
        >
          3D
        </Button>
      </div>
    </div>
  );
}

export default Main;
