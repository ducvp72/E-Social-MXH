import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SkeletonAvatarSideBar } from "../../skeletons/Skeletons";
export const User = () => {
  const [skt, setSkt] = useState(true);
  const currentUser = useSelector((state) => state.auth.data);
  useEffect(() => {
    setSkt(true);
    showAvatarTimeout();

    return () => clearTimeout(showAvatarTimeout);
  }, [currentUser]);

  const showAvatarTimeout = () => {
    setTimeout(() => {
      if (currentUser) setSkt(false);
    }, 1500);
  };

  return (
    <Link
      to="'p/$/{user}'"
      className="grid grid-cols-4 gap-4 mb-6 items-center z-10"
    >
      <div className="flex items-center justify-between col-span-1">
        {skt ? (
          <SkeletonAvatarSideBar />
        ) : (
          <img
            className="rounded-full w-16 flex mr-3"
            src={
              currentUser
                ? `https://mxhld.herokuapp.com/v1/image/${currentUser?.avatar}`
                : "/assets/image/defaultAvatar.png"
            }
            alt={"user"}
          />
        )}
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">
          {currentUser ? currentUser.fullname : "Undefined Fullname"}
        </p>
        <p className="text-sm">
          {currentUser ? currentUser.email : "Undefined Email"}
        </p>
      </div>
    </Link>
  );
};
