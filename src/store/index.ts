import type { ChangeEvent } from "react";
import { proxy } from "valtio";

interface StoreInterface {
  colorState: boolean;
  materialState: boolean;
  defaultTexture: any;
  color: string;
  material: { loading: boolean; data: string };
  model: { loading: boolean; data: string | null };
}

export const DEFAULT_TEXTURE_PATH = "/bg.jpg";

export const DEFAULT_COLOR = "#fff";

export const store = proxy<StoreInterface>({
  colorState: false,
  materialState: true,
  defaultTexture: DEFAULT_TEXTURE_PATH,
  color: DEFAULT_COLOR,
  material: { loading: false, data: "/bg.jpg" },
  model: { loading: false, data: null },
});

export const toggleColorState = (value: boolean | null = null) => {
  if (value) {
    store.colorState = value;
  } else {
    store.colorState = !store.colorState;
  }
};

export const toggleMaterialState = (value: boolean | null = null) => {
  if (value) {
    store.materialState = value;
  } else {
    store.materialState = !store.materialState;
  }
};

export const setColor = (colorCode: string) => {
  store.colorState = true;
  store.color = colorCode;
};

export const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();

  if (file.type.startsWith("image/")) {
    reader.onload = (e) => (store.material.data = e.target?.result as "string");
    reader.readAsDataURL(file);
  }

  if (file.name.endsWith(".gltf") || file.name.endsWith(".glb")) {
    const url = URL.createObjectURL(file);
    store.model.data = url;
  }
  e.target.value = "";
};

export const setModel = (url: string) => {
  store.model.data = url;
};

export const resetScene = () => {
  store.colorState = false;
  store.materialState = false;
  store.color = DEFAULT_COLOR;
  store.material = { loading: false, data: "/bg.jpg" };
  store.model = { loading: false, data: null };
};
