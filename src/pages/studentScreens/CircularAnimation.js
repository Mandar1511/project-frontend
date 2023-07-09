import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";
function CircularAnimation() {
  const [animation, setAnimation] = useState("");
  useEffect(() => {
    setAnimation(
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
    setTimeout(() => {
      setAnimation("");
    }, 750);
  }, []);
  return <>{animation}</>;
}

export default CircularAnimation;
