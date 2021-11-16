import React from "react";
import UserThumbnail from "./UserThumbnail";
import { SkeletonUserThumbnail } from "./../../../skeletons/Skeletons";

const ListUserSearch = () => {
  return (
    <div className="  mt-14 bg-white md:col-span-2 mb-10 px-5 ">
      <div className="flex">
        <div className="grid grid-cols-1 w-full ">
          <SkeletonUserThumbnail />
          <UserThumbnail />
          <UserThumbnail />
          <UserThumbnail />
          <UserThumbnail />
          <UserThumbnail />
          <UserThumbnail />
          <UserThumbnail />
          <UserThumbnail />
        </div>
      </div>
    </div>
  );
};

export default ListUserSearch;
