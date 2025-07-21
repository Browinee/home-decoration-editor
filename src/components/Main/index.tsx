import { useEffect, useRef, useState } from "react";
import { init3D } from "./init-3d";
import { init2D } from "./init-2d";
import { Button } from "antd";

function Main() {
  const container3DRef = useRef<HTMLDivElement>(null);
  const container2DRef = useRef<HTMLDivElement>(null);
  const [curMode, setCurMode] = useState("2d");
  useEffect(() => {
    if (!container3DRef.current) return;

    const { scene } = init3D(container3DRef.current);

    return () => {
      if (container3DRef.current) {
        container3DRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!container2DRef.current) return;

    const { scene } = init2D(container2DRef.current);

    return () => {
      if (container2DRef.current) {
        container2DRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="Main">
      <div ref={container3DRef} id="threejs-3d-container" style={{display: curMode ==='3d' ? 'block': 'none'}}></div>
      <div ref={container2DRef} id="threejs-2d-container" style={{display: curMode ==='2d' ? 'block': 'none'}}></div>
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
