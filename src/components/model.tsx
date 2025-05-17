import { Center, useGLTF } from "@react-three/drei";
import { useSnapshot } from "valtio";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import { store, DEFAULT_COLOR } from "../store";

const Model = () => {
  const { material, model, color, materialState, colorState, defaultTexture } =
    useSnapshot(store);
  const { scene } = useGLTF(model.data as string);
  const modelRef = useRef(null);

  // Apply Textures
  useEffect(() => {
    const texture = new THREE.TextureLoader().load(
      materialState ? material.data : defaultTexture
    );

    // Apply the texture to all mesh materials
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => {
            mat.map = texture;
            mat.needsUpdate = true;
          });
        } else {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [material.data, scene, materialState]);

  // Load color
  useEffect(() => {
    const mesh = modelRef.current;
    if (!mesh) return;

    mesh.traverse((child) => {
      if (child.isMesh && colorState) {
        child.material.color.set(color);
        child.material.needsUpdate = true;
      } else if (child.isMesh && !colorState) {
        child.material.color.set(DEFAULT_COLOR);
        child.material.needsUpdate = true;
      }
    });
  }, [color, scene, colorState]);

  return (
    <Center>
      <primitive ref={modelRef} object={scene} />
    </Center>
  );
};

export default Model;
