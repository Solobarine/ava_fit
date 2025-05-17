import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Html } from "@react-three/drei";
import { useDropzone } from "react-dropzone";
import { setModel, store } from "../store";
import { useSnapshot } from "valtio";

const ModelUploadForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [modelUrl, setModelUrl] = useState<string | null>(null);
  const { model } = useSnapshot(store);

  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    const fileMap: { [key: string]: File } = {};
    const droppedFiles: File[] = [];

    for (const file of acceptedFiles) {
      droppedFiles.push(file);
      const path = file.relativePath || file.name;
      fileMap[path] = URL.createObjectURL(file);
    }

    console.log(fileMap);
    setFiles(droppedFiles);
  };

  useEffect(() => {
    const file = files.find(
      (file) => file.name.endsWith(".gltf") || file.name.endsWith(".glb")
    );
    console.log(file);
    if (file) {
      setModelUrl(URL.createObjectURL(file));
      setModel(file);
    }
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Html style={{ textWrap: "nowrap" }}>
      <div
        {...getRootProps()}
        style={{
          padding: "20px",
          backgroundColor: "red",
        }}
      >
        {isDragActive ? (
          <Typography>Drop the folder here...</Typography>
        ) : (
          <Typography>
            Drag and drop a folder here, or click to select
          </Typography>
        )}
        <input {...getInputProps()} />
      </div>
      {files[3] && <img src={URL.createObjectURL(files[3])} />}
    </Html>
  );
};

export default ModelUploadForm;
