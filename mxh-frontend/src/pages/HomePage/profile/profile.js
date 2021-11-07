import React, { useState, useEffect } from "react";
import Statistic from "./statistic";
import Information from "./information";
import DialogAction from "./dialog";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";

const Profile = () => {
  const [following, setFollowing] = useState(false);
  const [action, setAction] = useState(false);
  const currentUser = useSelector((state) => state.auth.data);
  const onClose = () => {
    setAction(false);
  };

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
              {following ? (
                <>
                  <button
                    className="border-gray-300 font-normal p-1 rounded-sm"
                    style={{ borderWidth: "1px" }}
                  >
                    Nhắn tin
                  </button>
                  <button
                    onClick={() => {
                      setFollowing(false);
                    }}
                    className="border-gray-300 font-normal p-1 rounded-sm bg-red-500 text-white"
                    style={{ borderWidth: "1px" }}
                  >
                    Bỏ theo dõi
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setFollowing(true);
                  }}
                  className="bg-blue-500 p-1 font-normal text-white rounded-sm"
                >
                  Theo dõi
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
              <Statistic />
            </div>
            <div className="h-full">
              <Information />
            </div>
          </div>
        </div>
      </div>
      <div className="py-2 w-full xl:w-4/6 lg:w-4/6 md:w-full sm:w-full shadow-2xl rounded-md mt-20 absolute transform -translate-x-1/2 left-1/2">
        <div className="grid grid-cols-3 xl:gap-4 gap-2 lg:gap-4 p-2 md:gap-4">
          <div className="shadow-2xl cursor-pointer rounded-sm  border-white relative group">
            <img
              src={"/assets/person/lam5.png"}
              alt="ImgPost"
              className="rounded-sm w-full h-40 xl:h-80 sm:h-56 md-h-40 "
            />
            <div className=" absolute top-0 w-full h-full hidden group-hover:block transition delay-150 duration-500 ease-in-out ">
              <div className="bg-gray-900 h-full w-full top-0 left-0 opacity-50 absolute z-10 " />
              <div className=" absolute z-20 flex justify-center items-center space-x-2 md:space-x-7 lg:space-x-7 w-full h-full">
                <div className="flex space-x-1">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-red-500"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        strokeWidth={2}
                        fill="currentColor"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      />
                    </svg>
                  </span>
                  <p className="text-sm md:text-xl lg:text-xl font-medium text-white">
                    3,692
                  </p>
                </div>

                <div className="flex space-x-1">
                  <span className="flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        strokeWidth={2}
                        fill="currentColor"
                        d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      />
                    </svg>
                  </span>
                  <p className=" text-sm md:text-xl lg:text-xl font-medium text-white">
                    200
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
