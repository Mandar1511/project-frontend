import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import DialogActions from "@mui/material/DialogActions";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Worker } from "@react-pdf-viewer/core";
import { DialogContent, DialogContentText, TextField } from "@mui/material";
import { AppBar, Toolbar, IconButton, Tooltip } from "@mui/material";
import { Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import UploadIcon from "@mui/icons-material/Upload";
import PreviewIcon from "@mui/icons-material/Preview";
import axios from "axios";
import SkillForm from "./SkillForm";
import StudentApplications from "./StudentApplications";
import ResumeForm from "./ResumeForm";
import PrimarySearchAppBar from "../AppBar";

function StudentHome() {
  const preset_key = "rmn5bxrh";
  const cloud_name = "dwyarvqps";
  const [open, setOpen] = useState(false);
  const [openResune, setOpenResume] = useState(false);
  const [viewResume, setViewResume] = useState(false);
  const [openInstitute, setOpenInstitue] = useState(false);
  const [openSocial, setOpenSocial] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [institute, setInstitute] = useState("My Institute Name");
  const [graduationYear, sertGraduationYear] = useState("My graduation Year");
  const [major, setMajor] = useState("major degree");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [profileImg, setProfileImg] = useState("./userImg.png");
  const [resume, setResume] = useState("./blankpdf.pdf");
  useEffect(() => {
    fetchUser();
  }, [openResune]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickOpenResume = () => {
    setOpenResume(true);
  };
  const handleClickViewResume = () => {
    setViewResume(true);
  };
  const handleOpenInstitue = () => {
    setOpenInstitue(true);
  };
  const handleOpenSocial = () => {
    setOpenSocial(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseResume = () => {
    setOpenResume(false);
  };
  const handleCloseViewResume = () => {
    setViewResume(false);
  };
  const handleCloseInstitue = () => {
    setOpenInstitue(false);
  };
  const handleCloseSocial = () => {
    setOpenSocial(false);
  };
  const fetchUser = async () => {
    try {
      const options = {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwt_token"),
        },
      };
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/users/me",
        options
      );
      console.log("Home ", data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      if (data.education) {
        setInstitute(data.education.institute + ".");
        sertGraduationYear(data.education.graduationYear);
        setMajor(data.education.major);
      }
      if (data.socialMedia) {
        if (data.socialMedia.linkedIn) {
          setLinkedIn(data.socialMedia.linkedIn);
        }
        if (data.socialMedia.github) {
          setGithub(data.socialMedia.github);
        }
      }
      if (data.profileImg) {
        console.log("set image");
        setProfileImg(data.profileImg);
      }
      if (data.resume) {
        setResume(data.resume);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInstitueSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const institute = formData.get("institute");
    const major = formData.get("major");
    const graduationYear = formData.get("graduation");
    const education = { institute, major, graduationYear };
    const options = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    };
    const { data } = await axios.patch(
      "http://localhost:8000/api/v1/users/education",
      {
        education,
      },
      options
    );
    setInstitute(data.institute);
    sertGraduationYear(data.graduationYear);
    setMajor(data.major);
    handleCloseInstitue();
  };

  const handleSocialMediaSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const linkedIn = formData.get("linkedIn");
    const github = formData.get("github");
    const socialMedia = { linkedIn, github };
    const options = {
      headers: {
        authorization: "Bearer " + localStorage.getItem("jwt_token"),
      },
    };
    const { data } = await axios.patch(
      "http://localhost:8000/api/v1/users/socialmedia",
      {
        socialMedia,
      },
      options
    );
    setLinkedIn(data.linkedIn);
    setGithub(data.github);
    handleCloseSocial();
  };

  const handleProfileImg = async (file) => {
    if (!file) return;
    setProfileImg(file);
    console.log(file);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", preset_key);
    data.append("cloud_name", cloud_name);
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        data
      );
      const options = {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwt_token"),
        },
      };
      let image = response.data.secure_url;
      const updatedData = await axios.patch(
        "http://localhost:8000/api/v1/users/profileImg",
        { profileImg: image },
        options
      );
      console.log(updatedData.data);
      setProfileImg(image);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <PrimarySearchAppBar />
      <Box sx={{ flexGrow: 1 }} mt={1} style={{ background: "#F3F8FF" }}>
        <Grid container spacing={2}>
          <Grid xs={12} md={3} marginBottom={4} mt={3}>
            <Card
              xs={6}
              md={3}
              style={{
                background: "#F3F8FF",
                color: "#002E94",
              }}
            >
              <Button component="label">
                <input
                  type="file"
                  hidden
                  onChange={(e) => handleProfileImg(e.target.files[0])}
                />
                <Avatar
                  alt="User Image"
                  src={profileImg.toString()}
                  sx={{ width: 150, height: 150 }}
                />
              </Button>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                  {firstName} {lastName}
                </Typography>
                <Typography variant="body2" color="#083AA9">
                  {institute} {graduationYear}
                  <Tooltip title="edit">
                    <IconButton onClick={handleOpenInstitue}>
                      <ModeEditRoundedIcon
                        color="action"
                        fontSize="small"
                        style={{ color: "#1746A2" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Typography variant="body2" color="#083AA9">
                  {major}
                </Typography>
                <Typography variant="body2" mt={2}>
                  <IconButton
                    style={{ color: "#002E94" }}
                    onClick={() =>
                      window.open(linkedIn, "_blank", "noreferrer")
                    }
                  >
                    <LinkedInIcon />
                  </IconButton>

                  <span></span>
                  <IconButton
                    style={{ color: "#002E94" }}
                    onClick={() => window.open(github, "_blank", "noreferrer")}
                  >
                    <GitHubIcon />
                  </IconButton>

                  <Tooltip title="edit">
                    <IconButton onClick={handleOpenSocial}>
                      <ModeEditRoundedIcon
                        fontSize="small"
                        style={{ color: "#1746A2" }}
                      />
                    </IconButton>
                  </Tooltip>
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={2}
                ></Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  onClick={handleClickOpen}
                  fullWidth
                  style={{ color: "#002E94" }}
                >
                  Skills
                </Button>
              </CardActions>
              <CardActions>
                <Button
                  onClick={handleClickOpenResume}
                  variant="outlined"
                  fullWidth
                  style={{ color: "#002E94" }}
                >
                  <UploadIcon /> resume
                </Button>
              </CardActions>
              <CardActions>
                <Button
                  onClick={handleClickViewResume}
                  variant="outlined"
                  fullWidth
                  style={{ color: "#002E94", outlineColor: "yellow" }}
                >
                  <PreviewIcon /> resume
                </Button>
              </CardActions>
              <CardActions>
                <div>
                  <Dialog open={open} onClose={handleClose} components={Box}>
                    <DialogTitle>
                      <DialogActions>
                        <Button onClick={handleClose}>
                          <CloseIcon />
                        </Button>
                      </DialogActions>
                      Add Skills
                    </DialogTitle>
                    <SkillForm />
                  </Dialog>
                </div>
                <div>
                  <Dialog
                    open={openResune}
                    onClose={handleCloseResume}
                    components={Box}
                  >
                    <DialogTitle>
                      <DialogActions>
                        <Button onClick={handleCloseResume}>
                          <CloseIcon />
                        </Button>
                      </DialogActions>
                      Upload Resume
                    </DialogTitle>
                    <ResumeForm />
                  </Dialog>
                </div>

                <div>
                  <Dialog
                    open={viewResume}
                    onClose={handleCloseViewResume}
                    components={Box}
                    fullScreen
                  >
                    <AppBar
                      sx={{ position: "fixed" }}
                      style={{ background: "#3E64FF" }}
                    >
                      <Toolbar>
                        <IconButton
                          edge="start"
                          color="inherit"
                          onClick={handleCloseViewResume}
                          aria-label="close"
                        >
                          <CloseIcon />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                      <Viewer fileUrl={resume} />
                    </Worker>
                  </Dialog>
                </div>

                <div>
                  <Dialog
                    open={openInstitute}
                    onClose={handleCloseInstitue}
                    components={Box}
                  >
                    <Box
                      component="form"
                      onSubmit={(e) => handleInstitueSubmit(e)}
                    >
                      <DialogContent>
                        <DialogContentText visibility="hidden">
                          To subscribe to this website, please enter your email
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="institute"
                          label="Institue Name"
                          type="text"
                          name="institute"
                          fullWidth
                          required
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="graduation-year"
                          label="Graduation Year"
                          type="number"
                          name="graduation"
                          fullWidth
                          required
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="major"
                          label="Course Name"
                          type="text"
                          name="major"
                          fullWidth
                          required
                          variant="standard"
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseInstitue}>Cancel</Button>
                        <Button type="submit">Save</Button>
                      </DialogActions>
                    </Box>
                  </Dialog>
                </div>

                <div>
                  <Dialog
                    open={openSocial}
                    onClose={handleCloseSocial}
                    components={Box}
                  >
                    <Box
                      component="form"
                      onSubmit={(e) => handleSocialMediaSubmit(e)}
                    >
                      <DialogContent>
                        <DialogContentText visibility="hidden">
                          To subscribe to this website, please enter your email
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          id="linkedIn"
                          label="LinkedIn URL"
                          type="text"
                          name="linkedIn"
                          fullWidth
                          required
                          variant="standard"
                        />
                        <TextField
                          autoFocus
                          margin="dense"
                          id="github"
                          label="Github URL"
                          type="text"
                          name="github"
                          fullWidth
                          required
                          variant="standard"
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseSocial}>Cancel</Button>
                        <Button type="submit">Save</Button>
                      </DialogActions>
                    </Box>
                  </Dialog>
                </div>
              </CardActions>
            </Card>
          </Grid>
          <Grid xs={12} md={5.5} mt={3}>
            <Card xs={6} style={{ background: "#F3F8FF", color: "#002E94" }}>
              <StudentApplications />
            </Card>
          </Grid>
          <Grid xs={12} md={3.4} mt={3}>
            <Card xs={6} style={{ background: "#F3F8FF", color: "#002E94" }}>
              <Typography
                variant="h4"
                mt={2.2}
                mb={2}
                color={"#002E94"}
                style={{ textShadow: "1px 1px 2px gray" }}
                position="relative"
                align="center"
              >
                Recommended Jobs
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default StudentHome;
