import {
  AppBar,
  Box,
  Button,
  Container,
  Tooltip,
  IconButton,
  Card,
  Typography,
} from "@mui/material";
import ColorLens from "@mui/icons-material/ColorLens";
import Layers from "@mui/icons-material/Layers";
import Refresh from "@mui/icons-material/Refresh";
import { useSnapshot } from "valtio";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import WallpaperIcon from "@mui/icons-material/Wallpaper";

import Scene from "./components/scene";
import {
  store,
  handleFileChange,
  toggleColorState,
  toggleMaterialState,
  setColor,
  resetScene,
} from "./store";

const App = () => {
  const snap = useSnapshot(store);
  console.log(snap.colorState);
  console.log(snap.material);
  console.log(snap.model);

  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "transparent", px: 4, py: 2 }}
      >
        <Typography
          variant="h5"
          component="a"
          href="/"
          sx={{ textDecoration: "none", color: "#444" }}
        >
          AvaFit
        </Typography>
      </AppBar>
      <Box
        sx={{
          position: "relative",
          p: 2,
          flexGrow: 1,
        }}
      >
        <Scene />
        <Card
          sx={{
            position: "absolute",
            left: 16,
            display: "flex",
            flexDirection: "column",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "#ffffff",
            borderRadius: 2,
            p: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            zIndex: 2,
          }}
        >
          <Tooltip title="Upload Model">
            <IconButton component="label" color="primary" sx={{ mb: 1 }}>
              <InsertDriveFileIcon fontSize="small" />
              <input type="file" hidden onChange={handleFileChange} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Upload Material">
            <IconButton component="label" color="secondary" sx={{ mb: 1 }}>
              <WallpaperIcon fontSize="small" />
              <input type="file" hidden onChange={handleFileChange} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Select Color">
            <input
              type="color"
              onChange={(e) => setColor(e.target.value)}
              style={{
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                cursor: "pointer",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                border: "none",
                marginLeft: "6px",
                padding: 0,
                backgroundColor: "transparent",
              }}
            />
          </Tooltip>
        </Card>
        <Container
          sx={{
            position: "absolute",
            display: "flex",
            width: "fit-content",
            justifyContent: "center",
            gap: 1.5,
            padding: "8px 16px",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            zIndex: 2,
          }}
        >
          <Tooltip title="Toggle Material" arrow>
            <Button
              onClick={() => toggleMaterialState()}
              startIcon={<Layers />}
              sx={{ textTransform: "none", padding: "6px 16px" }}
            >
              Material
            </Button>
          </Tooltip>
          <Tooltip title="Toggle Color" arrow>
            <Button
              onClick={() => toggleColorState()}
              startIcon={<ColorLens />}
              sx={{ textTransform: "none", padding: "6px 16px" }}
            >
              Color
            </Button>
          </Tooltip>
          <Tooltip title="Reset Scene" arrow>
            <Button
              onClick={() => resetScene()}
              startIcon={<Refresh />}
              sx={{ textTransform: "none", padding: "6px 16px" }}
            >
              Reset
            </Button>
          </Tooltip>
        </Container>
      </Box>
    </Box>
  );
};

export default App;
