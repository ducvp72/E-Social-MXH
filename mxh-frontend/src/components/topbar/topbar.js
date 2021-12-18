import React, { useEffect, useState, useRef } from "react";
import "./topbar.css";
import { NavLink } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actLogout } from "./../../reducers/authReducer";
import Loading from "./../../containers/LoadingPage/index";
import { SkeletonAvatarTopbar } from "../../skeletons/Skeletons";
import SearchText from "./autoComplete";
import Box from "@mui/material/Box";
import { useOnClickOutside } from "./../../utils/handleRefresh";
import { Status } from "@chatscope/chat-ui-kit-react";
import { setDialogAction } from "../../reducers/createPostDialog";
import { actLogoutConver } from "./../../reducers/converReducer";
import { actLogoutMess } from "./../../reducers/messageReducer";
import { postApi } from "./../../axiosApi/api/postApi";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";

export const Topbar = () => {
  const [skt, setSkt] = useState(true);
  // const myNotify = useSelector((state) => state.myNotify.data);
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const [loading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.data);
  const [active, setActive] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const [post, setPost] = useState([]);
  const [loadNotifi, setLoadNotifi] = useState(true);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [total, setTotal] = useState(null);
  const [ring, setRing] = useState(true);
  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(buttonRef, modalRef, () => setActive(false));

  useEffect(() => {
    // console.log("Notify", myNotify);
    getFirstList();
    setSkt(true);
  }, []);

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    } else document.body.style.overflow = "auto";
  }, [active]);

  const getFirstList = () => {
    postApi
      .getMyNotification(cookies.auth.tokens.access.token, 1, 5)
      .then((rs) => {
        setLoadNotifi(false);
        setPost(rs.data.results);
        setTotal(rs.data.totalResults);
        setnoMore(true);
        setPage(2);
      })
      .catch((err) => {
        setLoadNotifi(false);
        console.log(err);
      });
  };

  const handleFetchPosts = () => {
    return new Promise((resolve, reject) => {
      postApi
        .getMyNotification(cookies.auth.tokens.access.token, page, 5)
        .then((rs) => {
          resolve(rs.data.results);
        })
        .catch((err) => {
          console.log("errPromise", err);
          reject(err);
        });
    });
  };
  const fetchData = async () => {
    const postsFromServer = await handleFetchPosts();
    setPost([...post, ...postsFromServer]);
    if (postsFromServer.length < 5) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  useEffect(() => {
    setSkt(true);
    setTimeout(() => {
      if (currentUser) setSkt(false);
    }, 1500);
  }, [currentUser]);

  const handlelogout = () => {
    try {
      dispatch(actLogout(cookies.auth.tokens.refresh.token, history));
      dispatch(actLogoutConver());
      dispatch(actLogoutMess());
      removeCookie("auth", { path: "/" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteNotify = () => {
    postApi
      .deleteAllNotify(cookies.auth.tokens.access.token)
      .then((rs) => {
        // console.log(rs);
        setLoadNotifi(true);
        getFirstList();
      })
      .catch((err) => {
        console.log(err);
      });
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
                  <div className="flex gap-2 justify-center items-center">
                    <img
                      src={"/assets/image/vni-logo.png"}
                      alt="logo"
                      className=" w-8 h-8"
                    />
                    <p className=" font-avatar">Vn-Social</p>
                  </div>
                </NavLink>
              </h1>
            </div>

            <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
              <div className="container h-2  flex justify-center items-center">
                <SearchText />
              </div>
            </div>
            <div className="text-gray-700 text-center flex items-center align-items">
              <NavLink to={`/user/home`} activeClassName="text-red-500">
                <svg
                  className="w-8 mr-2 cursor-pointer"
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
                {/* <span
                  className="absolute cursor-pointer flex  text-white items-center justify-center  rounded-full bg-red-primary"
                  style={{ top: "1px", marginLeft: "30px" }}
                >
                  <Status status="dnd" className="cursor-pointer" size="sm" />
                </span> */}

                {currentUser && (
                  <NavLink to="/user/inbox/" activeClassName="text-red-500">
                    <svg
                      className="w-8 mr-2 cursor-pointer"
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
              <div
                onClick={() => dispatch(setDialogAction(true))}
                className="relative"
              >
                <svg
                  className="w-8 mr-2 cursor-pointer"
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
              </div>
              <div className="block relative">
                <div
                  ref={buttonRef}
                  onClick={() => {
                    getFirstList();
                    setActive(!active);
                    setRing(false);
                  }}
                >
                  {total > 0 && ring && (
                    <span
                      className="absolute cursor-pointer flex text-sm1 text-white items-center justify-center h-5 w-5 rounded-full bg-red-primary"
                      style={{ top: "-5px", marginLeft: "16px" }}
                    >
                      {total < 100 ? total : "99+"}
                    </span>
                  )}

                  <svg
                    className="w-8 mr-4 cursor-pointer"
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
                </div>

                {active && (
                  <Box ref={modalRef}>
                    <div className="border-2 shadow border-gray-100 bg-white fixed rounded-md z-10 top-1/5 mt-1.5 right-2/5 h-96  transform -translate-x-1/4">
                      {loadNotifi && (
                        <div className="w-full h-full flex justify-center items-center z-50 bg-white absolute">
                          <div className="lds-ring flex items-center justify-center">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-center px-2">
                        <p className="text-gray-700 text-xl font-medium">
                          Notifications
                          <span className="text-blue-400 text-lg">
                            ({total < 100 ? total : "99+"})
                          </span>
                        </p>
                        <p
                          onClick={() => handleDeleteNotify()}
                          className="text-red-400 cursor-pointer p-2 "
                        >
                          Delete All
                        </p>
                      </div>

                      <div
                        className="py-1 overflow-y-auto post-show "
                        style={{
                          // height: "340px",
                          maxHeight: "340px",
                          height: "100%",
                        }}
                        id="scrollDiv"
                      >
                        {post?.length > 0 && (
                          <InfiniteScroll
                            scrollableTarget="scrollDiv"
                            refreshFunction
                            dataLength={post?.length}
                            next={fetchData}
                            hasMore={noMore}
                            loader={
                              <div className=" flex justify-center">
                                Loading....
                              </div>
                            }
                            endMessage={
                              <p className="flex justify-center font-thin text-sm ">
                                <b>You have seen all !</b>
                              </p>
                            }
                          >
                            {post &&
                              post?.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    id={item.id}
                                    className=" items-center gap-2 flex cursor-pointer p-2 mb-2  w-72 break-words text-left"
                                  >
                                    <img
                                      src={`https://mxhld.herokuapp.com/v1/image/${item?.other?.avatar}`}
                                      alt="logo"
                                      className=" w-10 h-10 rounded-full"
                                    />
                                    <div className="flex-col ">
                                      <Link to={`/profile/${item?.other?.id}`}>
                                        <p className="text-sm">{item?.text}</p>
                                      </Link>

                                      <p className="text-xs text-blue-400">
                                        {moment(item?.createdAt).fromNow()}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                          </InfiniteScroll>
                        )}
                      </div>
                    </div>
                  </Box>
                )}
              </div>
              <button
                onClick={() => handlelogout()}
                type="button"
                title="Sign Out"
              >
                <svg
                  className="w-8 mr-2 text-black-light cursor-pointer "
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
                          src={`https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`}
                          alt="userimg"
                        />
                      )}

                      <div className="dropdown-content">
                        <NavLink
                          to={`/user/${currentUser.fullname.replaceAll(
                            " ",
                            "."
                          )}`}
                          activeClassName="text-red-500"
                        >
                          <span className="">Your page</span>
                        </NavLink>

                        <NavLink
                          to={`/user/setting/${currentUser.fullname.replaceAll(
                            " ",
                            "."
                          )}`}
                        >
                          <span className="">Settings</span>
                        </NavLink>

                        <div className="w-100 bg-gray-300 h-0.5"></div>
                        <div className="">
                          <span onClick={() => handlelogout()} className="">
                            Log out
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
