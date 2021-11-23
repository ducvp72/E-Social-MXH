import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { userApi } from "./../../../axiosApi/api/userApi";
import { useParams, useLocation } from "react-router-dom";
import Statistic from "./../profile/statistic";
import Information from "./../profile/information";
import DialogAction from "./../profile/dialog";
import UserPost from "./../profile/userPost";
import { SkeletonProfile } from "../../../skeletons/Skeletons";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";

const OtherProfile = () => {
  const [following, setFollowing] = useState(false);
  const [action, setAction] = useState(false);
  const [userInfo, setUserInfo] = useState();
  const [skt, setSkt] = useState(true);
  const [cookies, ,] = useCookies(["auth"]);
  let { username } = useParams();
  const idUser = useLocation().search;
  const q = new URLSearchParams(idUser).get("id");

  useEffect(() => {
    setSkt(true);
    getUserInfo();
  }, [q]);

  const getUserInfo = () => {
    userApi
      // .getUserNameSearch(cookies.auth.tokens.access.token, rs)
      .getUserByID(cookies.auth.tokens.access.token, q)
      .then((res) => {
        console.log("res", res.data);
        setUserInfo(res.data);
        // setFollowing(res.data.results[0].isFollow);
        setFollowing(res.data.isFollow);
        setSkt(false);
      })
      .catch((err) => {
        setSkt(false);
        // console.log(err);
      });
  };

  const onClose = () => {
    setAction(false);
  };

  const handleFollow = () => {
    setFollowing(!following);
    userApi
      .userFollow(cookies.auth.tokens.access.token, userInfo?.id)
      .then(() => {
        getUserInfo();
      });
    Swal.fire({
      icon: "success",
      title: "You following this user",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleUnFollow = () => {
    setFollowing(!following);
    userApi
      .userFollow(cookies.auth.tokens.access.token, userInfo?.id)
      .then(() => {
        getUserInfo();
      });

    Swal.fire({
      icon: "success",
      title: "You not follow this user",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <Helmet>
        <title>{`${username.replaceAll(".", " ")} | Vn-Social`}</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {skt ? (
        <SkeletonProfile />
      ) : (
        <>
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
                    src={
                      userInfo
                        ? `https://mxhld.herokuapp.com/v1/image/${userInfo?.avatar}`
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
                    {userInfo ? userInfo?.fullname : "Undefined Fullname"}
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
                          handleUnFollow();
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
                        handleFollow();
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
                  <Statistic userInfo={userInfo} />
                </div>
                <div className="h-full">
                  <Information />
                </div>
              </div>
            </div>
          </div>{" "}
        </>
      )}

      <div className="py-2 w-full xl:w-4/6 lg:w-4/6 md:w-full sm:w-full shadow-2xl rounded-md mt-20 absolute transform -translate-x-1/2 left-1/2">
        <div className="grid grid-cols-3 xl:gap-4 gap-2 lg:gap-4 p-2 md:gap-4">
          <UserPost />
        </div>
      </div>
    </div>
  );
};

export default OtherProfile;
