import React from "react";
import ModelViewer from "./ModelViewer";
import Cloud0 from "../../../assets/models/clouds/cloud.glb";
import Cloud1 from "../../../assets/models/clouds/cloud1.glb";
import Cloud2 from "../../../assets/models/clouds/cloud2.glb";
import Cloud3 from "../../../assets/models/clouds/cloud3.glb";
import Cloud4 from "../../../assets/models/clouds/cloud4.glb";
import Cloud5 from "../../../assets/models/clouds/cloud5.glb";


interface CloudProps {
    modelPath: string;
    position: [number, number, number];
    scale: [number, number, number];
}

const Cloud: React.FC<CloudProps> = ({ modelPath, position, scale }) => {
    return (
        <ModelViewer modelPath={modelPath} position={position} scale={scale} />
    );
};

const Clouds: React.FC = () => {
    return (
        <>
            <Cloud
                modelPath={Cloud0}
                position={[10, 20, -50]}
                scale={[0.8, 0.8, 0.8]}
            />
            <Cloud
                modelPath={Cloud1}
                position={[0, 20, 10]}
                scale={[0.8, 0.8, 0.8]}
            />
            <Cloud
                modelPath={Cloud2}
                position={[30, 20, -30]}
                scale={[0.8, 0.8, 0.8]}
            />
            <Cloud
                modelPath={Cloud3}
                position={[-10, 20, 40]}
                scale={[0.8, 0.8, 0.8]}
            />
            <Cloud
                modelPath={Cloud4}
                position={[30, 20, 30]}
                scale={[0.8, 0.8, 0.8]}
            />
            <Cloud
                modelPath={Cloud5}
                position={[-10, 20, -20]}
                scale={[0.8, 0.8, 0.8]}
            />
        </>
    );
};

export default Clouds;