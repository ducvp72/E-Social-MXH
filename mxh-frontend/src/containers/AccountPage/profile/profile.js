import React, { useState, useEffect } from "react";
import Statistic from "./statistic";
import Information from "./information";
import DialogAction from "./dialog";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userApi } from "./../../../axiosApi/api/userApi";
import { NavLink, useParams } from "react-router-dom";
import UserPost from "./userPost";
import { SkeletonProfile } from "../../../skeletons/Skeletons";

const Profile = () => {
  const [following, setFollowing] = useState(false);
  const [action, setAction] = useState(false);
  const [userSmr, setUSerSmr] = useState(null);
  const currentUser = useSelector((state) => state.auth.data);
  let { userName } = useParams();
  const [skt, setSkt] = useState(true);
  const location = useLocation();
  const getSummary = async () => {
    console.log("userSummary day ne");
    try {
      const userSummary = await userApi.getUserSummary(currentUser?.id);
      console.log("userSummary", userSummary);
      setUSerSmr(userSummary);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    document.title = "Login to Vn-Social";
    getSummary();
  }, [currentUser?.id]);

  useEffect(() => {
    if (currentUser)
      setTimeout(() => {
        setSkt(false);
      }, 1000);
  }, [currentUser]);
  return (
    <div>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {skt ? (
        <SkeletonProfile />
      ) : (
        <div
          className="w-full xl:w-4/6 lg:w-4/6 md:w-full sm:w-full overflow-x-auto overflow-y-hidden shadow-2xl rounded-lg bg-white relative transform -translate-x-1/2 left-1/2"
          style={{ top: "4.5rem" }}
        >
          <div className="grid grid-cols-3 pb-10">
            <div className="h-full flex justify-center justify-items-center">
              <div className="py-5">
                <img
                  className="rounded-full h-24 w-24 md:h-44 md:w-44 "
                  src={
                    currentUser
                      ? `https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`
                      : "/assets/image/defaultAvatar.png"
                  }
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
                  {currentUser ? currentUser.fullname : "Undefined Fullname"}
                </h1>
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
      )}

      <div className="py-2 w-full xl:w-4/6 lg:w-4/6 md:w-full sm:w-full shadow-2xl rounded-md mt-20 absolute transform -translate-x-1/2 left-1/2">
        <div className="grid grid-cols-3 xl:gap-4 gap-2 lg:gap-4 p-2 md:gap-4">
          <UserPost />
          <UserPost />
          <UserPost />
          <UserPost />
        </div>
      </div>
    </div>
  );
};

export default Profile;
