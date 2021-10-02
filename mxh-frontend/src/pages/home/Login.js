import * as React from 'react';
import {useEffect} from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Singup from "../signup/Signup";
import { Signin } from "../login/Signin";
import { Forgot } from "../forgot/Forgot";
import {useHistory} from "react-router-dom"

const Login = () => {
  const history = useHistory();

  const handleLogin = () => {};

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  useEffect(() => {
    document.title = "Login - E-Social";
  },[]);

  return (
    <div>
      <img
        src="/assets/access/wave.png"
        alt="waveimg"
        class="fixed hidden lg:block inset-0 h-full"
        style={{ zIndex: -1 }}
      />
      <div class="wr-sceen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img
          src="/assets/access/online.svg"
          alt="online"
          class="hidden lg:block w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
        />
        <div className="">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{}}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <Tab label="SIGN IN" value="1" />
                  <Tab label="SIGN UP" value="2" />
                  <Tab label="FORGOT PASSWORD" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Signin />
              </TabPanel>
              <TabPanel value="2">
                <Singup />
              </TabPanel>
              <TabPanel value="3">
                <Forgot />
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Login;
