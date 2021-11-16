import React, { useState, useEffect } from "react";

import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userApi } from "./../../../axiosApi/api/userApi";
import { NavLink, useParams } from "react-router-dom";
import Statistic from "./../profile/statistic";
import Information from "./../profile/information";
import DialogAction from "./../profile/dialog";
import UserPost from "./../profile/userPost";

const OtherProfile = () => {
  const [following, setFollowing] = useState(false);
  const [action, setAction] = useState(false);
  const [userSmr, setUSerSmr] = useState(null);
  //   const currentUser = useSelector((state) => state.auth.data);
  let { userId } = useParams();
  const onClose = () => {
    setAction(false);
  };
  const location = useLocation();
  const getSummary = async () => {
    console.log("userSummary day ne");
    try {
      //   const userSummary = await userApi.getUserSummary(currentUser?.id);
      //   setUSerSmr(userSummary);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  //   useEffect(() => {
  //     getSummary();
  //   }, [currentUser?.id]);

  useEffect(() => {
    document.title = "Login to Vn-Social";
  }, []);
  return (
    <div>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <DialogAction open={action} onClose={onClose}></DialogAction>
      <div
        className="w-full xl:w-4/6 lg:w-4/6 md:w-full sm:w-full overflow-x-auto overflow-y-hidden shadow-2xl rounded-lg bg-white relative transform -translate-x-1/2 left-1/2"
        style={{ top: "4.5rem" }}
      >
        <div className="grid grid-cols-3 pb-10">
          <div className="h-full flex justify-center justify-items-center">
            <div className="py-5">
              <img
                className="rounded-full h-24 w-24 md:h-44 md:w-44 "
                // src={
                //   currentUser
                //     ? `https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`
                //     : "/assets/image/defaultAvatar.png"
                // }
                alt="userimg"
              />
            </div>
          </div>
          <div className="col-span-2  h-full object-fill">
            <div className="flex w-full items-center space-x-4 mt-5">
              <h1
                className="font-sans font-light text-3xl hover:text-blue-500 cursor-pointer"
                style={{ color: "#818181" }}
              >
                {/* {currentUser ? currentUser.fullname : "Undefined Fullname"} */}
              </h1>
              {following ? (
                <>
                  <button
                    className="border-gray-300 font-normal p-1 rounded-sm"
                    style={{ borderWidth: "1px" }}
                  >
                    Inbox
                  </button>
                  <button
                    onClick={() => {
                      setFollowing(false);
                    }}
                    className="border-gray-300 font-normal p-1 rounded-sm bg-red-500 text-white"
                    style={{ borderWidth: "1px" }}
                  >
                    UnFollow
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setFollowing(true);
                  }}
                  className="bg-blue-500 p-1 font-normal text-white rounded-sm"
                >
                  Follow
                </button>
              )}

              <div className="items-center cursor-pointer relative">
                <p
                  className="font-black text-2xl mb-2"
                  onClick={() => {
                    setAction(!action);
                  }}
                >
                  ...
                </p>
              </div>
            </div>
            <div>
              <Statistic userSmr={userSmr?.data} />
            </div>
            <div className="h-full">
              <Information />
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 w-full xl:w-4/6 lg:w-4/6 md:w-full sm:w-full shadow-2xl rounded-md mt-20 absolute transform -translate-x-1/2 left-1/2">
        <div className="grid grid-cols-3 xl:gap-4 gap-2 lg:gap-4 p-2 md:gap-4">
          <UserPost />
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
