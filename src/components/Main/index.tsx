import { useThreeRenderer } from "./useThreeRenderer";
import { init3D } from "./init-3d";
import { init2D } from "./init-2d";

function Main() {
    const { containerRef: container3DRef } = useThreeRenderer(init3D);
    const { containerRef: container2DRef } = useThreeRenderer(init2D);

    return (
        <div className="Main">
            <div ref={container3DRef} id="threejs-3d-container"></div>
            <div ref={container2DRef} id="threejs-2d-container"></div>
        </div>
    );
}

export default Main;
