import React, { useState, useEffect } from "react";
import * as ROUTES from "../../routes/routes";
import Card from "@mui/material/Card";
import "./topbar.css";
import { NavLink } from "react-router-dom";
import { HOME } from "../../routes/routes";
import { makeStyles } from "@mui/styles";
import { useCookies } from "react-cookie";
import { LogOut } from "../../context/actions/register";
import { useHistory } from "react-router-dom";
export const Topbar = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [login, setLogin] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies(["tokens"]);
  const history = useHistory();
  const logout = () => {
    setLogin(false);
    console.log(login);
  };

  const handlelogin = () => {
    setLogin(true);
    console.log(login);
  };

  const handlelogout = async () => {
    try {
      await LogOut(cookies.tokens.refresh.token);
      removeCookie("tokens");
      removeCookie("userId");
      // removeCookie("isVerify");
      history.push(ROUTES.SIGNIN);
    } catch (err) {
      console.log(err);
    }
  };

  const user = 1;
  return (
    <>
      <header className="fixed shadow-md w-full h-16 bg-white border-b border-gray-primary mb-8 z-40">
        <div className="container mx-auto max-w-screen-lg h-full">
          <nav className="flex justify-between h-full">
            <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
              <h1 className="flex justify-center w-full font-avatar text-xl">
                <NavLink to={ROUTES.HOME} arial-label="Vn-Social logo">
                  <p className=" font-avatar">Vn-Social</p>
                </NavLink>
              </h1>
            </div>
            <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
              <div className="container h-2  flex justify-center items-center">
                <div className="relative justify-center items-center align-items hidden md:block xl:block sm:block">
                  <div className="absolute top-2 left-3">
                    <i className="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    className="h-10 w-72 md:h-10 md:w-96 xl:h-10 xl:w-96 lg:h-10 lg:w-96 pl-10 pr-20  z-0 border-2  focus:outline-none"
                    placeholder="Search anything..."
                  />
                  <div className="absolute right-2" style={{ top: "5px" }}>
                    <button className="h-7 w-20 text-white bg-red-500 hover:bg-red-600">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-gray-700 text-center flex items-center align-items">
              {login ? (
                <>
                  <NavLink to={ROUTES.HOME} activeClassName="text-red-500">
                    <svg
                      className="w-8 mr-6 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </NavLink>
                  <div
                    className="block relative"
                    onClick={() => setShowNotification(!showNotification)}
                  >
                    <span
                      className="absolute cursor-pointer flex text-sm1 text-white items-center justify-center h-5 w-5 rounded-full bg-red-primary"
                      style={{ top: "-5px", marginLeft: "16px" }}
                    >
                      99+
                    </span>
                    <svg
                      className="w-8 mr-6 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    {showNotification && (
                      <>
                        <div className="fixed rounded-md z-10 top-1/5 mt-1 right-2/5 h-96 bg-white shadow-xl transform -translate-x-1/4">
                          <div className="py-6">
                            <div className="p-2 mb-2 border-2 border-gray-400 w-72 break-words text-left">
                              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            </div>
                            <div className="border-2 border-gray-400 p-2 w-72 break-words text-left">
                              aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="relative">
                    <NavLink to={ROUTES.INBOX} activeClassName="text-red-500">
                      <svg
                        className="w-8 mr-6 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        height="25"
                        viewBox="0 0 48 48"
                        width="22"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          fill="currentColor"
                          d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"
                        />
                      </svg>
                    </NavLink>
                    {/* <div className="group-hover:block hidden absolute z-10 h-12 bg-black text-white">
                    aaaaaaaaaaaaaaaa
                  </div> */}
                  </div>

                  <button onClick={logout} type="button" title="Sign Out">
                    <svg
                      className="w-8 mr-6 text-black-light cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                  </button>
                  {user && (
                    // <div className="flex items-center cursor-pointer">
                    <div className="dropdown">
                      <img
                        className="rounded-full h-8 w-8 flex"
                        src="/assets/person/duc.jpeg"
                        alt={"${user.displayName} profile"}
                      />

                      <div className="dropdown-content">
                        <NavLink
                          to={ROUTES.PROFILE}
                          activeClassName="text-red-500"
                        >
                          <span className="">Trang cá nhân</span>
                        </NavLink>

                        <NavLink to={ROUTES.ACCOUNT}>
                          <span className="">Cài đặt</span>
                        </NavLink>

                        <div className="w-100 bg-gray-300 h-0.5"></div>
                        <div className="">
                          <span onClick={() => handlelogout()} className="">
                            Đăng xuất
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <NavLink to={ROUTES.SIGNIN}>
                    <button
                      onClick={handlelogin}
                      type="button"
                      className="font-bold bg-blue-medium text-sm rounded text-white w-20 h-8"
                    >
                      Log In
                    </button>
                  </NavLink>
                  <NavLink to={ROUTES.SIGNUP}>
                    <button
                      type="button"
                      className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                    >
                      Sign Up
                    </button>
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
