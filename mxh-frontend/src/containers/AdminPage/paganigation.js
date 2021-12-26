import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Container,
  Box,
  Avatar,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from "@mui/icons-material/Search";
import { useStyles } from "./paganigationStyle";
import Swal from "sweetalert2";
import EditUser from "./userdashboard/editUser";

export const Paganigation = () => {
  const [pageSize, setPageSize] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const onClose = () => {
    setOpenDialog(false);
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <EditUser openDialog={openDialog} onClose={onClose} />
      <Container maxWidth="xl" style={{ padding: "1rem" }}>
        {/* Top and Search */}
        <Box>
          <Card variant="outlined">
            <CardContent>
              <Box sx={{ maxWidth: 400, minHeight: 30 }}>
                <TextField
                  className={classes.searchForm}
                  placeholder="Search..."
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  id="search-manage-course"
                  name="search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="medium" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
        {/* Data Body */}
        <div
          className={classes.dataGridContainer}
          style={{
            height: "550px",
            width: "100%",
            marginTop: "10px",
          }}
        >
          <DataGrid
            columns={[
              {
                field: "avatar",
                headerName: "Avatar",
                width: 120,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                  return (
                    <Avatar
                      src={params.row.avatar}
                      alt={"avatar"}
                      className={classes.avatar}
                    ></Avatar>
                  );
                },
              },
              {
                field: "username",
                headerName: "Username",
                minWidth: 120,
                flex: 1,
                headerAlign: "center",
                align: "center",
              },
              {
                field: "gender",
                headerName: "Gender",
                minWidth: 60,
                flex: 1,
                headerAlign: "center",
                align: "center",
                // renderCell: (params) => {
                //   return <>{params.row.price + "$"}</>;
                // },
              },
              {
                field: "dob",
                headerName: "Dob",
                minWidth: 160,
                flex: 1,
                headerAlign: "center",
                align: "center",
                // renderCell: (params) => {
                //   return (
                //     <Box>
                //       {params.row.courseCreators[0].firstName +
                //         " " +
                //         params.row.courseCreators[0].lastName}
                //     </Box>
                //   );
                // },
              },
              {
                field: "action",
                headerName: "Action",
                width: 120,
                flex: 1,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                  return (
                    <Box className={classes.actionBox}>
                      <div className="flex items-center justify-center space-x-1">
                        <div className="cursor-pointer flex items-center justify-center hover:bg-gray-200 hover:shadow rounded-full w-10 h-10">
                          <InfoIcon
                            color="info"
                            onClick={() => {
                              setOpenDialog(true);
                            }}
                          />
                        </div>
                        <div className="cursor-pointer flex items-center justify-center mr-5 hover:bg-gray-200 hover:shadow rounded-full w-10 h-10">
                          <DeleteOutlineIcon
                            className="cursor-pointer"
                            onClick={() => {
                              handleDelete();
                            }}
                            color="error"
                          />
                        </div>
                      </div>
                    </Box>
                  );
                },
              },
            ]}
            // rows={userList ? userList : []}
            rows={[
              {
                id: 1,
                avatar: "/assets/image/defaultAvatar.png",
                username: "Duc",
                dob: "7/2/2000",
                gender: "Male",
              },
              {
                id: 10,
                avatar: "/assets/person/duc.jpeg",
                username: "Duc",
                dob: "7/2/2000",
                gender: "Male",
              },
              {
                id: 11,
                avatar: "1",
                username: "Duc",
                dob: "7/2/2000",
                gender: "Male",
              },
              {
                id: 12,
                avatar: "1",
                username: "Duc",
                dob: "7/2/2000",
                gender: "Male",
              },
              {
                id: 3,
                avatar: "1",
                username: "Duc",
                dob: "7/2/2000",
                gender: "Male",
              },
              {
                id: 4,
                avatar: "1",
                username: "Duc",
                dob: "7/2/2000",
                gender: "Male",
              },
              {
                id: 5,
                avatar: "1",
                username: "Duc",
                dob: "7/2/2000",
                gender: "Male",
              },
              {
                id: 6,
                avatar: "1",
                username: "Duc",
                dob: "7/2/2000",
                gender: "Male",
              },
              {
                id: 7,
                avatar: "1",
                username: "Duc",
                dob: "7/2/2000",
                gender: "Male",
              },
              {
                id: 8,
                avatar: "1",
                username: "Duc2",
                dob: "7/2/2000",
                gender: "Male",
              },
            ]}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            // loading={true}
          />
        </div>
      </Container>
    </>
  );
};
