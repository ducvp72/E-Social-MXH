import React, { useEffect, useState } from "react";
import "./topbar.css";
import { NavLink, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actLogout } from "./../../reducers/authReducer";
import Loading from "./../../containers/LoadingPage/index";
import { SkeletonAvatarTopbar } from "../../skeletons/Skeletons";
import Button from "@mui/material/Button";

import SearchText from "./autoComplet";
export const Topbar = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [skt, setSkt] = useState(true);
  const [cookies, setCookies, removeCookie] = useCookies(["auth"]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.data);

  useEffect(() => {
    setTimeout(() => {
      if (currentUser) setSkt(false);
    }, 1500);
  }, [currentUser]);

  const handlelogout = () => {
    try {
      // setLoading(true);
      // console.log(currentUser.tokens);
      dispatch(actLogout(cookies.auth.tokens.refresh.token, history));
      removeCookie("auth", { path: "/" });
      // removeCookie("role");
    } catch (err) {
      console.log(err);
    }
  };

  const user = 1;
  return (
    <>
      {loading && <Loading />}
      <header className="fixed shadow-md w-full h-16 bg-white border-b border-gray-primary mb-8 z-40">
        <div className="container mx-auto max-w-screen-lg h-full">
          <nav className="flex justify-between h-full">
            <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
              <h1 className="flex justify-center w-full font-avatar text-xl">
                <NavLink to={`/user/home`} arial-label="Vn-Social logo">
                  <p className=" font-avatar">Vn-Social</p>
                </NavLink>
              </h1>
            </div>

            {currentUser ? (
              <>
                <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                  <div className="container h-2  flex justify-center items-center">
                    <SearchText />
                  </div>
                </div>
                <div className="text-gray-700 text-center flex items-center align-items">
                  <NavLink to={`/user/home`} activeClassName="text-red-500">
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
                  <div className="relative">
                    {currentUser && (
                      <NavLink
                        to={`/user/inbox/${currentUser.fullname}`}
                        activeClassName="text-red-500"
                      >
                        <svg
                          className="w-8 mr-4 cursor-pointer"
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
                    )}
                  </div>
                  <div className="relative">
                    <svg
                      className="w-8 mr-4 cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 64 64"
                      width="40px"
                      height="64px"
                    >
                      <linearGradient
                        id="KJ7ka9GQp0CHqT_2YsWMsa"
                        x1="32"
                        x2="32"
                        y1="5.75"
                        y2="59.005"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stopColor="#1a6dff" />
                        <stop offset="1" stopColor="#c822ff" />
                      </linearGradient>
                      <path
                        fill="url(#KJ7ka9GQp0CHqT_2YsWMsa)"
                        d="M32,58C17.663,58,6,46.337,6,32S17.663,6,32,6s26,11.663,26,26S46.337,58,32,58z M32,8 C18.767,8,8,18.767,8,32s10.767,24,24,24s24-10.767,24-24S45.233,8,32,8z"
                      />
                      <linearGradient
                        id="KJ7ka9GQp0CHqT_2YsWMsb"
                        x1="32"
                        x2="32"
                        y1="5.75"
                        y2="59.005"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stopColor="#1a6dff" />
                        <stop offset="1" stopColor="#c822ff" />
                      </linearGradient>
                      <path
                        fill="url(#KJ7ka9GQp0CHqT_2YsWMsb)"
                        d="M32,52c-11.028,0-20-8.972-20-20s8.972-20,20-20s20,8.972,20,20S43.028,52,32,52z M32,14 c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S41.925,14,32,14z"
                      />
                      <linearGradient
                        id="KJ7ka9GQp0CHqT_2YsWMsc"
                        x1="32"
                        x2="32"
                        y1="21.75"
                        y2="42.538"
                        gradientUnits="userSpaceOnUse"
                        spreadMethod="reflect"
                      >
                        <stop offset="0" stopColor="#6dc7ff" />
                        <stop offset="1" stopColor="#e6abff" />
                      </linearGradient>
                      <path
                        fill="url(#KJ7ka9GQp0CHqT_2YsWMsc)"
                        d="M41,30h-7v-7c0-0.552-0.448-1-1-1h-2c-0.552,0-1,0.448-1,1v7h-7c-0.552,0-1,0.448-1,1v2 c0,0.552,0.448,1,1,1h7v7c0,0.552,0.448,1,1,1h2c0.552,0,1-0.448,1-1v-7h7c0.552,0,1-0.448,1-1v-2C42,30.448,41.552,30,41,30z"
                      />
                    </svg>
                    {/* </NavLink> */}
                  </div>
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
                              status 1
                            </div>
                            <div className="border-2 border-gray-400 p-2 w-72 break-words text-left">
                              status 2
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => handlelogout()}
                    type="button"
                    title="Sign Out"
                  >
                    <svg
                      className="w-8 mr-6 text-black-light cursor-pointer "
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
                    <div className="dropdown">
                      {currentUser && (
                        <div>
                          {skt ? (
                            <SkeletonAvatarTopbar />
                          ) : (
                            <img
                              className="rounded-full h-8 w-8 flex"
                              src={`https://mxhld.herokuapp.com/v1/image/${currentUser.avatar}`}
                              alt="userimg"
                            />
                          )}

                          <div className="dropdown-content">
                            <NavLink
                              to={`/user/${currentUser.fullname}`}
                              activeClassName="text-red-500"
                            >
                              <span className="">Trang cá nhân</span>
                            </NavLink>

                            <NavLink
                              to={`/user/setting/${currentUser.fullname}`}
                            >
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
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-gray-700 text-center flex items-center align-items space-x-2">
                <NavLink to={`/`}>
                  <Button variant="contained" color="success">
                    Login
                  </Button>
                </NavLink>
                <NavLink to={`/`}>
                  <Button variant="contained" color="primary">
                    Reigister
                  </Button>
                </NavLink>
              </div>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};
