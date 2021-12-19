import React, { useState, useEffect } from "react";
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
import { useStyles } from "../paganigationStyle";
import Swal from "sweetalert2";
import EditPost from "./editPost";
import { useCookies } from "react-cookie";
import { adminApi } from "./../../../axiosApi/api/adminApi";

export const PostDB = () => {
  const [pageSize, setPageSize] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [cookies, ,] = useCookies(["auth"]);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [post, setPost] = useState({});
  useEffect(() => {
    fetchAllPost();
  }, []);

  const fetchAllPost = async () => {
    console.log("Data");
    setLoading(true);
    adminApi
      .getAllPost(cookies.auth.tokens.access.token)
      .then((result) => {
        console.log("Data", result.data.results);
        setData(result.data.results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const onClose = () => {
    setOpenDialog(false);
  };

  const handleEdit = async (post) => {
    setPost(post);
    setOpenDialog(true);
  };

  const handleDelete = async (postID) => {
    console.log("Post", postID);
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
        setLoading(true);
        adminApi
          .deletePost(cookies.auth.tokens.access.token, { postId: postID })
          .then((rs) => {
            //tat loading
            setLoading(false);
            //Get list user
            fetchAllPost();
            //Show success
            Swal.fire({
              icon: "error",
              title: "Post has been Delelelte",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => {
            setLoading(false);
            Swal.fire({
              icon: "error",
              title: err.response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } else
        Swal.fire({
          icon: "warning",
          title: "Cancle action",
          showConfirmButton: false,
          timer: 1500,
        });
    });
  };

  return (
    <>
      <EditPost postInfo={post} openDialog={openDialog} onClose={onClose} />
      <Container maxWidth="xl" style={{ padding: "1rem" }}>
        {/* Top and Search */}
        {/* <Box>
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
        </Box> */}
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
                field: "id",
                headerName: "ID",
                width: 90,
                headerAlign: "center",
                align: "center",
                // renderCell: (params) => {
                //   return <>{createID()}</>;
                // },
              },
              {
                field: "avatar",
                headerName: "Avatar",
                width: 120,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                  return (
                    <Avatar
                      src={`https://mxhld.herokuapp.com/v1/image/${params.row.user.avatar}`}
                      alt={"avatar"}
                      className={classes.avatar}
                    ></Avatar>
                  );
                },
              },
              {
                field: "fullname",
                headerName: "Username",
                minWidth: 120,
                flex: 1,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                  return <>{params.row.user.fullname}</>;
                },
              },
              {
                field: "likes",
                headerName: "Like",
                minWidth: 60,
                flex: 1,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                  return <>{params.row.likes}</>;
                },
              },
              {
                field: "commnents",
                headerName: "Comments",
                minWidth: 60,
                flex: 1,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                  return <>{params.row.comments}</>;
                },
              },
              {
                field: "createAt",
                headerName: "Date Create",
                minWidth: 160,
                flex: 1,
                headerAlign: "center",
                align: "center",
                renderCell: (params) => {
                  return <>{params.row.createdAt}</>;
                },
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
                              handleEdit(params.row);
                            }}
                          />
                        </div>
                        <div className="cursor-pointer flex items-center justify-center mr-5 hover:bg-gray-200 hover:shadow rounded-full w-10 h-10">
                          <DeleteOutlineIcon
                            className="cursor-pointer"
                            onClick={() => {
                              handleDelete(params.row.id);
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
            rows={data ? data : []}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            pageSize={pageSize}
            rowsPerPageOptions={[5, 10, 20]}
            pagination
            loading={loading}
          />
        </div>
      </Container>
    </>
  );
};
