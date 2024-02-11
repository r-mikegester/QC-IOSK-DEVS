import { OrbitControls, useBounds } from "@react-three/drei";

function SelectToZoom({ children }: any) {
    const api = useBounds();
    return (
        <group
            onClick={(e) => (
                e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit()
            )}
            onPointerMissed={(e) => e.button === 0 && api.refresh().fit()}
        >
            {children}
            <OrbitControls makeDefault/>
        </group>
    );
}

export default SelectToZoom;