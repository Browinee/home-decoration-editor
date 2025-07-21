import { useEffect, useRef } from "react";

type InitFunction = (dom: HTMLElement) => { scene: any; [key: string]: any };

export const useThreeRenderer = (initFunction: InitFunction) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const threeInstance = initFunction(containerRef.current);

        return () => {
            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, [initFunction]);

    return { containerRef };
};