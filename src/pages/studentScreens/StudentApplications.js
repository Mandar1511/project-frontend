import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CircularAnimation from "./CircularAnimation";
import axios from "axios";
const columns = [
  {
    field: "id",
    headerName: "Link",
    width: 100,
    renderCell: (params) => <a href={"jobs/" + params.row._id}>view</a>,
  },
  { field: "job_title", headerName: "Job Title", width: 200 },
  { field: "company_name", headerName: "Company name", width: 180 },
  {
    field: "post_date",
    headerName: "Posted On",
    type: "Date",
    width: 250,
  },
  {
    field: "applied_date",
    headerName: "Applied On",
    type: "Date",
    width: 250,
  },
];

export default function StudentApplications() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const options = {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwt_token"),
        },
      };
      let { data } = await axios.get(
        "http://localhost:8000/api/v1/users/myjobs",
        options
      );
      console.log(data);
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        let ele = data[i].jobs;
        let appliedDate = new Date(data[i].appliedAt).toLocaleDateString();
        let createdAt = new Date(ele.createdAt).toLocaleDateString();
        temp = [
          ...temp,
          {
            _id: ele._id,
            id: i,
            job_title: ele.title,
            company_name: ele.company,
            post_date: createdAt,
            applied_date: appliedDate,
          },
        ];
      }
      setRows(temp);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <Typography variant="h4" mt={2.2} mb={2}>
          Job Applications
        </Typography>
        <CircularAnimation />
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 6]}
        />
      </div>
    </>
  );
}
