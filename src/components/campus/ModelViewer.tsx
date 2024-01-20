import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader, GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Billboard, Text } from "@react-three/drei";
import {
    BufferGeometry,
    Material,
    Mesh,
    NormalBufferAttributes,
    Object3DEventMap,
} from "three";

interface ModelViewerProps {
    name?: string;
    modelPath: string;
    position?: [number, number, number];
    scale?: [number, number, number];
    textPosition?: [number, number, number];
    onClick?: () => void;
    mesh?: Mesh<
        BufferGeometry<NormalBufferAttributes>,
        Material | Material[],
        Object3DEventMap
        > | null;
}

const ModelViewer: React.FC<ModelViewerProps> = ({
    name,
    modelPath,
    position = [0, 0, 0],
    scale = [1, 1, 1],
    textPosition = [0, 0, 0],
    onClick,
}) => {
    const group = useRef<THREE.Group>();
    const gltf: GLTF = useLoader(GLTFLoader, modelPath);

    return (
        <group>
            <primitive
                object={gltf.scene}
                ref={group}
                position={position}
                scale={scale}
                onClick={onClick}
            />
            <Billboard follow position={textPosition}>
                <Text
                    fontSize={1}
                    outlineColor="#000000"
                    outlineOpacity={1}
                    outlineWidth="20%"
                >
                    {name}
                </Text>
            </Billboard>
        </group>
    );
};

export default ModelViewer;