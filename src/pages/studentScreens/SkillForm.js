import React, { useEffect, useState } from "react";
import Box from "@mui/system/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { List } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItem } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import CircularAnimation from "./CircularAnimation";
export default function SkillForm({ isOpen }) {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    console.log("called");
    fetchSkills();
  }, [isOpen]);

  const saveSkillsToDB = async () => {
    try {
      const options = {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwt_token"),
        },
      };
      await axios.patch(
        "http://localhost:8000/api/v1/users/myskills",
        skills,
        options
      );
      // console.log(data);
      toast.success("skills saved", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
      toast.error("something went wrong", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const fetchSkills = async () => {
    try {
      const options = {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwt_token"),
        },
      };
      const { data } = await axios.get(
        "http://localhost:8000/api/v1/users/myskills",
        options
      );
      console.log(data);
      setSkills(data);
    } catch (err) {
      console.log("couldn't fetch skills");
    }
  };

  const removeSkill = (skill) => {
    console.log(skill);
    setSkills(skills.filter((x) => x !== skill));
    console.log(skills);
  };

  let listItems;
  listItems = skills.map((skill) => (
    <ListItem
      dense
      style={{
        backgroundColor: "#e6f7fa",
        borderColor: "#d3eef2",
        borderStyle: "solid",
        borderBottom: "0",
      }}
      key={skill}
    >
      <Button onClick={() => removeSkill(skill)}>
        <DeleteIcon />
      </Button>
      {skill}
    </ListItem>
  ));

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const skill = data.get("skill");
    if (skills.indexOf(skill) === -1) {
      setSkills([skill, ...skills]);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={(e) => handleSubmit(e)}>
        <DialogContent>
          <DialogContentText visibility="hidden" height={0}>
            To subscribe to this website, please enter your email address here.
          </DialogContentText>
          <TextField
            required
            autoFocus
            margin="dense"
            id="skill"
            label="Skill"
            type="skill"
            name="skill"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit">Add</Button>
          <Button onClick={saveSkillsToDB}>Save Changes</Button>
        </DialogActions>
        <CircularAnimation />
        <List>{listItems}</List>
        <ToastContainer></ToastContainer>
      </Box>
    </>
  );
}
