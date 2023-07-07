import React, { useState } from "react";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import styled from "@mui/system/styled";
import PrimarySearchAppBar from "../AppBar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import SkillForm from "./SkillForm";
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  border: "1px solid",
  borderColor: theme.palette.mode === "dark" ? "#444d58" : "#ced7e0",
  padding: theme.spacing(1),
  borderRadius: "4px",
  textAlign: "center",
}));

// MUI Sizes
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

function StudentHome() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <PrimarySearchAppBar />
      <Box sx={{ flexGrow: 1 }} mt={2} marginLeft={2}>
        <Grid container spacing={2}>
          <Grid xs={12} md={3} height={400}>
            <Card xs={6} md={3}>
              <Avatar
                alt="User Image"
                src="./userImg.png"
                sx={{ width: 150, height: 150 }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Student Name
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Indian Institute of Technology, Dharwad
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" onClick={() => navigate("/applications")}>
                  My Applications
                </Button>
                <Button size="medium" onClick={() => navigate("/applications")}>
                  Resume
                </Button>
              </CardActions>
              <CardActions>
                <div>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Skills
                  </Button>
                  <Dialog open={open} onClose={handleClose} components={Box}>
                    <DialogTitle>Add Skills</DialogTitle>
                    <SkillForm />
                  </Dialog>
                </div>
              </CardActions>
            </Card>
          </Grid>

          <Grid xs={12} md={3}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid xs={12} md={3}>
            <Item>xs=6 md=4</Item>
          </Grid>
          <Grid xs={12} md={3}>
            <Item>xs=6 md=4</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default StudentHome;
