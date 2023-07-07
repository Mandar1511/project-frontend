import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
// import LinkIcon from '@mui/icons-material/Link';
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";

import PrimarySearchAppBar from "../AppBar";
import axios from "axios";
const columns = [
  {
    field: "id",
    headerName: "Sr. No",
    width: 100,
    renderCell: (params) => (
      <a href={"jobs/" + params.row._id}>{params.row.id}</a>
    ),
  },
  { field: "job_title", headerName: "Job Title", width: 200 },
  { field: "company_name", headerName: "Company name", width: 180 },
  {
    field: "post_date",
    headerName: "Posted On",
    type: "Date",
    width: 200,
  },
  {
    field: "applied_date",
    headerName: "Applied On",
    type: "Date",
    width: 200,
  },
];

export default function StudentHome() {
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
        temp = [
          ...temp,
          {
            _id: ele._id,
            id: i,
            job_title: ele.title,
            company_name: ele.company,
            post_date: ele.createdAt,
            applied_date: data[i].appliedAt,
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
      <PrimarySearchAppBar />
      <div style={{ height: 400, width: "100%" }}>
        <h1>My Applications</h1>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
        <ToastContainer />
      </div>
    </>
  );
}
