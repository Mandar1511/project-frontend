import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CircularAnimation from "./CircularAnimation";
import axios from "axios";
import LinkIcon from "@mui/icons-material/Link";
const columns = [
  {
    field: "id",
    headerName: "Link",
    width: 100,
    renderCell: (params) => (
      <a href={"jobs/" + params.row._id} color="#ffffff">
        <LinkIcon />
      </a>
    ),
  },
  { field: "job_title", headerName: "Job Title", width: 200 },
  { field: "company_name", headerName: "Company name", width: 180 },
  {
    field: "post_date",
    headerName: "Posted On",
    type: "Date",
    width: 100,
  },
  {
    field: "applied_date",
    headerName: "Applied On",
    type: "Date",
    width: 100,
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
      <div>
        <Typography
          variant="h4"
          mt={2.2}
          position="relative"
          align="center"
          mb={2}
          color={"#002E94"}
          style={{ textShadow: "1px 1px 2px gray" }}
        >
          Job Applications
        </Typography>
        <CircularAnimation />
        <DataGrid
          sx={{
            ".MuiDataGrid-virtualScroller::-webkit-scrollbar": {
              height: "9px",
              width: "18px",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb": {
              backgroundColor: "#242F9B",
              borderRadius: "10px",
              width: "24px",
            },
            "& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover": {
              background: "#001D6E",
              scrollbarWidth: "10px",
              width: "10px",
            },
          }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 6]}
          style={{ background: "#F3F8FF", color: "#071952" }}
        />
      </div>
    </>
  );
}
