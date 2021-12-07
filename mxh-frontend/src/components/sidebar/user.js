import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const User = () => {
  const currentUser = useSelector((state) => state.auth.data);
  return (
    <>
      <Link to={`/user/${currentUser?.fullname.replaceAll(" ", ".")}`}>
        <div className="grid grid-cols-4 gap-4 items-center z-10 cursor-pointer">
          <div className="flex items-center justify-between col-span-1">
            {/* {skt ? (
              <SkeletonAvatarSideBar />
            ) : ( */}
            <img
              className="rounded-full w-16 flex mr-3"
              src={
                currentUser
                  ? `https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`
                  : "/assets/image/defaultAvatar.png"
              }
              alt={"user"}
            />
            {/* )} */}
          </div>
          <div className="col-span-3">
            <p className="font-bold text-sm">
              {currentUser ? currentUser.fullname : "Undefined Fullname"}
            </p>
            <p className="text-sm">
              {currentUser ? currentUser.email : "Undefined Email"}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};
