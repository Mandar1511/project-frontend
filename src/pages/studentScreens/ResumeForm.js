import React, { useState } from "react";
import Box from "@mui/system/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import FileUploadIcon from "@mui/icons-material/FileUpload";
export default function ResumeForm() {
  const preset_key = "rmn5bxrh";
  const cloud_name = "dwyarvqps";

  const [resume, setResume] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resume) return;
    const data = new FormData();
    data.append("file", resume);
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
      let file = response.data.secure_url;
      const updatedData = await axios.patch(
        "http://localhost:8000/api/v1/users/resume",
        { resume: file },
        options
      );
      toast.success("resume uploaded successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
      console.log(updatedData.data);
    } catch (err) {
      toast.error("something went wrong", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
      console.log(err);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={(e) => handleSubmit(e)}>
        <DialogContent>
          <DialogContentText visibility="hidden" height={0}>
            To subscribe to this website, please enter your email address here.
          </DialogContentText>
          <label htmlFor="upload-resume">
            <input
              style={{ display: "none" }}
              id="upload-resume"
              name="upload-resume"
              type="file"
              required
              onChange={(e) => setResume(e.target.files[0])}
            />
            <Button component="span">
              <FileUploadIcon />
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Save Changes</Button>
        </DialogActions>
        <ToastContainer />
      </Box>
    </>
  );
}
