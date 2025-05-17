import { Html, useProgress } from "@react-three/drei";
import { Typography } from "@mui/material";

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <Typography
        sx={{
          fontSize: "3em",
          fontStyle: "bold",
          color: "#ccc",
          textAlign: "center",
          marginBottom: "3px",
        }}
      >
        {Math.round(progress)}
      </Typography>
      <Typography sx={{ fontSize: "2em", color: "#bbb", textAlign: "center" }}>
        Loading...
      </Typography>
    </Html>
  );
};

export default Loader;
