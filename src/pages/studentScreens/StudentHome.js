import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import Grid from "@mui/system/Unstable_Grid";
import DialogActions from "@mui/material/DialogActions";
import PrimarySearchAppBar from "../AppBar";
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
import SkillForm from "./SkillForm";
import axios from "axios";
import StudentApplications from "./StudentApplications";

function StudentHome() {
  const preset_key = "rmn5bxrh";
  const cloud_name = "dwyarvqps";
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [institute, setInstitute] = useState("My Institute Name");
  const [graduationYear, sertGraduationYear] = useState("My graduation Year");
  const [major, setMajor] = useState("major degree");
  const [linkedIn, setLinkedIn] = useState("https://www.linkedin.com/");
  const [github, setGithub] = useState("http://localhost:3000/");
  const [profileImg, setProfileImg] = useState("");
  useEffect(() => {
    fetchUser();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      setFirstName(data.firstName);
      setLastName(data.lastName);
      if (data.education) {
        setInstitute(data.education.institute + ".");
        sertGraduationYear(data.education.graduationYear);
        setMajor(data.education.major);
      }
      if (data.socialMedia.linkedIn) {
        setLinkedIn(data.socialMedia.linkedIn);
      }
      if (data.socialMedia.github) {
        setGithub(data.socialMedia.github);
      }
      if (data.profileImg) {
        setProfileImg(data.profileImg);
      }
      // console.log(data);
    } catch (err) {
      console.log(err);
    }
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
      <Box sx={{ flexGrow: 1 }} mt={2} marginLeft={2}>
        <Grid container spacing={2}>
          <Grid xs={12} md={3} marginBottom={7}>
            <h1>Profile</h1>
            <Card xs={6} md={3}>
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
                <Typography gutterBottom variant="h5" component="div">
                  {firstName} {lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {institute} {graduationYear}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={2}>
                  {major}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={2}>
                  <LinkedInIcon
                    onClick={() =>
                      window.open(linkedIn, "rel=noopener noreferrer")
                    }
                  />
                  <GitHubIcon
                    onClick={() =>
                      window.open(github, "rel=noopener noreferrer")
                    }
                  />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="medium" variant="outlined">
                  Resume
                </Button>
                <Button variant="outlined" onClick={handleClickOpen}>
                  Skills
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
              </CardActions>
            </Card>
          </Grid>

          <Grid xs={12} md={9}>
            <StudentApplications />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default StudentHome;
