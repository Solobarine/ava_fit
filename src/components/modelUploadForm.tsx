import { Typography } from "@mui/material";
import { Html } from "@react-three/drei";
import { useDropzone } from "react-dropzone";
import { setModel } from "../store";

const ModelUploadForm = () => {
  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    const url = URL.createObjectURL(acceptedFiles[0]);
    setModel(url);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Html
      style={{
        textWrap: "nowrap",
        color: "#ccc",
        borderRadius: "5px",
        borderStyle: isDragActive ? "dashed" : "hidden",
        borderColor: isDragActive ? "#06f" : "transparent",
      }}
      center
    >
      <div
        {...getRootProps()}
        style={{
          padding: "20px",
        }}
      >
        <input {...getInputProps()} type="file" />
        {isDragActive ? (
          <Typography>Drop the file here...</Typography>
        ) : (
          <Typography>Drag and drop a file here</Typography>
        )}
      </div>
    </Html>
  );
};

export default ModelUploadForm;
