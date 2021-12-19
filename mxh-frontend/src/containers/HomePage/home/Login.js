import * as React from "react";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useLocation } from "react-router-dom";
import Forgot from "./../../AuthPage/forgot/Forgot";
import Signin from "./../../AuthPage/signin/Signin";
import Signup from "./../../AuthPage/signup/Signup";

const Login = () => {
  const [value, setValue] = React.useState("1");

  const location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    document.title = "Login to Vn-Social";
    switch (location.pathname) {
      case "/login":
        setValue("1");
        break;
      default:
        setValue("2");
        break;
    }
  }, []);

  return (
    <div>
      <img
        src="/assets/access/wave.png"
        alt="waveimg"
        className="fixed hidden lg:block inset-0 h-full"
        style={{ zIndex: -1 }}
      />
      <div className="wr-sceen h-screen flex flex-col justify-center items-center lg:grid lg:grid-cols-2">
        <img
          src="/assets/access/online.svg"
          alt="online"
          className="hidden lg:block  w-1/2 hover:scale-150 transition-all duration-500 transform mx-auto"
        />
        <div className="bg-white">
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{}}>
                <div className="flex justify-center items-center  justify-items-center">
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="SIGN IN" value="1" />
                    <Tab label="SIGN UP" value="2" />
                    <Tab label="FORGOT PASSWORD" value="3" />
                  </TabList>
                </div>
              </Box>
              <TabPanel value="1">
                <Signin />
              </TabPanel>
              <TabPanel value="2">
                <Signup />
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
