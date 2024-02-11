import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
    BufferGeometry,
    Material,
    Mesh,
    NormalBufferAttributes,
    Object3DEventMap,
} from "three";
import ModelViewer from "./ModelViewer";
import { Billboard, Html, Text } from "@react-three/drei";
import UareHere from "/src/assets/Models/others/location2.glb";

const RotatingMesh = () => {
    const meshRef =
        useRef<
            Mesh<
                BufferGeometry<NormalBufferAttributes>,
                Material | Material[],
                Object3DEventMap
            >
        >(null);

    useFrame((state: { clock: { elapsedTime: number } }, delta: any) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.05;

            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.8 + 5;
        }
    });

    return (
        <>
            <mesh ref={meshRef} position={[7, 0, 30]}>
                <ModelViewer
                    position={[0, 2, 0]}
                    modelPath={UareHere}
                    mesh={meshRef.current}
                />
            </mesh>
            <Billboard follow position={[7, 11, 30]}>
                <Text
                    fontSize={1.5}
                    outlineColor="#000000"
                    outlineOpacity={1}
                    outlineWidth="20%"
                >
                    You are here
                </Text>
            </Billboard>
        </>
    );
};

export default RotatingMesh;