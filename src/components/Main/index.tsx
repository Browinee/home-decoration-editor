import { useEffect, useRef } from "react";
import { init3D } from "./init-3d";

function Main() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const { scene } = init3D(containerRef.current);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        }
    }, []);

    return <div className="Main">
         <div ref={containerRef}></div>
    </div>
}

export default Main;
