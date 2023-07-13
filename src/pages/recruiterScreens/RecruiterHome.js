import React from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PrimarySearchAppBar from "../AppBar";
import { Select } from "@mui/material";
import { MenuItem, InputLabel, FormControl } from "@mui/material";
function RecruiterHome() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <PrimarySearchAppBar />
      <Box sx={{ flexGrow: 1 }} mt={1} style={{ background: "#F3F8FF" }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={4} marginBottom={4} mt={3} ml={2}>
            <Box
              style={{
                backgroundImage: `url("./background.avif")`,
                backgroundRepeat: "no-repeat",
                height: "82vh",
                width: "100%",
                backgroundSize: "cover",
                backgroundPosition: "center",
                textAlign: "center",
                color: "#083AA9",
              }}
            >
              <Typography gutterBottom variant="h4">
                Employ just the best
              </Typography>
              <Button
                size="large"
                style={{
                  background: "#f47168",
                  color: "white",
                  margin: "auto",
                  width: "40%",
                  marginTop: "68vh",
                }}
                onClick={handleClickOpen}
              >
                Post a Job Now
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email
                    address here. We will send updates occasionally.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label="Job Title"
                    placeholder="Add the title you are hiring for"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                    style={{ marginBottom: "10px" }}
                  />
                  <TextField
                    margin="dense"
                    id="company"
                    name="company"
                    label="Company"
                    type="text"
                    fullWidth
                    variant="standard"
                    required
                    style={{ marginBottom: "10px" }}
                  />
                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Workspace type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      name="workspaceType"
                      value=""
                      label="Workspace type"
                      required
                    >
                      <MenuItem value="remote">Remote</MenuItem>
                      <MenuItem value="onsite">Onsite</MenuItem>
                      <MenuItem value="hybrid">Hybrid</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth style={{ marginBottom: "10px" }}>
                    <InputLabel id="demo-simple-select-label2">
                      Job type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label2"
                      id="demo-simple-select2"
                      name="employmentType"
                      value=""
                      label="Job type"
                      required
                    >
                      <MenuItem value="Full-time">Full-time</MenuItem>
                      <MenuItem value="Internship">Internship</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    margin="dense"
                    id="location"
                    name="location"
                    label="Job location"
                    type="text"
                    fullWidth
                    variant="standard"
                    style={{ marginBottom: "10px" }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Subscribe</Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default RecruiterHome;
