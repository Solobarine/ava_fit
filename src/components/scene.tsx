import { Suspense } from "react";
import { Typography } from "@mui/material";
import { useSnapshot } from "valtio";
import { Canvas } from "@react-three/fiber";
import { Html, PerspectiveCamera, OrbitControls } from "@react-three/drei";

import { store } from "../store";
import Model from "./model";
import Loader from "./loader";
import ModelUploadForm from "./modelUploadForm";

const Scene = () => {
  const { model } = useSnapshot(store);

  return (
    <Canvas
      shadows
      fallback={<Typography>WebGL not Supported on Your Device</Typography>}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#222",
      }}
    >
      <PerspectiveCamera
        makeDefault
        position={[7.77, 13.33, 73.56]}
        fov={75}
        near={0.01}
        far={10000}
      />
      {!model.data ? (
        <ModelUploadForm />
      ) : (
        <Suspense fallback={<Loader />}>{<Model />}</Suspense>
      )}
      <ambientLight intensity={1} />
      <directionalLight
        intensity={2}
        position={[5, 10, 5]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[0, 0, 75]} intensity={6} />
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
