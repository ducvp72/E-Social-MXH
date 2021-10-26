import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import UseStyles from "./style";
import Button from "@mui/material/Button";
import  FormControl  from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      className="w-full p-4"
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Account = () => {
  const classes = UseStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [avatar, setAvatar] = useState('')
  const fileSelected = async (e) =>
  {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_file')
    console.log(e.target.files[0]);
  };

  return (
    <>
      <Helmet>
        <title>Setting Account</title>
        <meta name="descr--iption" content="Helmet application" />
      </Helmet>
      <div
        className=" absolute left-1/2 transform -translate-x-1/2  shadow-md border-2 w-2/3 "
        style={{ marginTop: "5.5rem" }}
      >
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: 600,
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            color="secondary"
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tab}
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab label="Thông tin tài khoản" {...a11yProps(0)} />
            <Tab label="Đổi mật khẩu" {...a11yProps(1)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <div className=" grid grid-cols-3 pr-36">
              <div className="flex justify-end pr-8">
                <img
                  className="rounded-full h-8 w-8 md:h-12 md:w-12 "
                  src="/assets/person/duc.jpeg"
                  alt="anh2"
                />
              </div>
              <div className="col-span-2">
                <p className=" font-normal">Username</p>
                  <input className="font-medium text-blue-500 text-sm cursor-pointer" placeholder="Thay đổi ảnh đại diện" type="file" onChange={fileSelected} />
              </div>

              <div className="flex justify-end pr-10 mt-6">
                <p className=" font-medium">Tên</p>
              </div>
              <div className="col-span-2 mt-4">
                <input
                  className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                />
              </div>

              <div className="flex justify-end pr-10 mt-6">
                <p className=" font-medium">Tên người dùng</p>
              </div>
              <div className="col-span-2 mt-4">
                <input
                  className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                />
              </div>

              <div className="flex justify-end pr-10 mt-6">
                <p className=" font-medium">Facebook</p>
              </div>
              <div className="col-span-2 mt-4">
                <input
                  className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                />
              </div>

              <div className="flex justify-end pr-10 mt-6">
                <p className=" font-medium">Tiểu sử</p>
              </div>
              <div className="col-span-2 mt-4">
                <input
                  className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                />
              </div>

              <div className="flex justify-end pr-10 mt-6">
                <p className=" font-medium">Số điện thoại</p>
              </div>
              <div className="col-span-2 mt-4">
                <input
                  className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                />
              </div>
              <div className="flex justify-end pr-10 mt-6">
                <p className=" font-medium">Giới tính</p>
              </div>
              <div className="col-span-2 mt-4">
                <FormControl component="fieldset">
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="flex justify-end items-center space-x-2 mt-2">
              <Button variant="contained" color="success">
                Save
              </Button>
              <Button variant="outlined" color="error" className=" bg-red-600">
                Cancel
              </Button>
            </div>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <div className="grid grid-cols-3">
              <div className="">
                <div className="grid gap-y-7">
                  <p className=" font-medium mt-3">Mật khẩu cũ</p>
                  <p className=" font-medium ">Mật khẩu mới</p>
                  <p className=" font-medium ">Xác nhận mật khẩu mới</p>
                </div>
              </div>
              <div className="col-span-2">
                <div className="">
                  <input
                    className="  mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                  />
                  <input
                    className=" mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                  />
                  <input
                    className=" mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center space-x-2 mt-2">
              <Button variant="contained" color="success">
                Save
              </Button>
              <Button variant="outlined" color="error" className=" bg-red-600">
                Cancel
              </Button>
            </div>
            <div className="flex justify-end mt-4">
              <p className=" font-medium text-blue-500 cursor-pointer">
                Quên mật khẩu?
              </p>
            </div>
          </TabPanel>
        </Box>
      </div>
    </>
  );
};

export default Account;
