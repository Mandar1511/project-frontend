import React, { useState } from "react";
import Box from "@mui/system/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { List } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ListItem } from "@mui/material";

export default function SkillForm() {
  console.log("called");
  const [skills, setSkills] = useState([]);

  const removeSkill = (skill) => {
    console.log(skill);
    setSkills(skills.filter((x) => x !== skill));
    console.log(skills);
  };

  const listItems = skills.map((skill) => (
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
      setSkills([...skills, skill]);
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
        </DialogActions>
        <List>{listItems}</List>
      </Box>
    </>
  );
}
