import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonUserThumbnail = () => {
  return (
    <div>
      <div className=" border w-full hover:shadow-none relative flex items-center rounded-md mx-auto shadow-lg m-2">
        <div className="w-full flex m-3 ml-4 ">
          <Skeleton circle={true} height={55} width={55} />
          <div className=" mt-1 ml-3 font-bold flex flex-col">
            <div className="">
              <Skeleton height={15} width={55} />
            </div>
            <div className="">
              <Skeleton height={15} width={55} />
            </div>
            <div className=" mt-2">
              <Skeleton height={15} width={55} />
            </div>
          </div>
        </div>
        <div className="flex space-x-0 mr-3">
          <div className="h-8 w-8 flex items-center justify-center   cursor-pointer ">
            <Skeleton circle={true} height={30} width={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonPost = () => {
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-10 md:mr-16 sm:mr-1 lg:mr-0">
      <div className="flex items-center m-3 ml-4 w-full">
        <Skeleton circle={true} height={55} width={55} />
        <div className=" mt-1 ml-3 font-bold flex flex-col">
          <div className="">
            <Skeleton height={15} width={55} />
          </div>
          <div className="">
            <Skeleton height={15} width={55} />
          </div>
        </div>
      </div>
      <div className="mb-2">
        <Skeleton height={20} enableAnimation={true} />
      </div>
      <div className=" mb-2">
        <Skeleton height={"480px"} enableAnimation={true} />
      </div>
      <div className="flex mb-2">
        <Skeleton width={60} height={20} enableAnimation={true} />
        <div className="ml-2">
          <Skeleton width={60} height={20} enableAnimation={true} />
        </div>
      </div>
      <div className="mb-2">
        <Skeleton width={60} height={20} enableAnimation={true} />
      </div>
      <div className="mb-2">
        <Skeleton width={60} height={20} enableAnimation={true} />
      </div>
    </div>
  );
};

export const SkeletonPostThumbnail = () => {
  return (
    <div className="">
      <Skeleton height={"320px"} />
    </div>
  );
};

export const SkeletonAvatarTopbar = () => {
  return (
    <div className="">
      <Skeleton circle={true} width={35} height={35} />
    </div>
  );
};

export const SkeletonHeader = () => {
  return (
    <div className="">
      <Skeleton circle={true} width={35} height={35} />
    </div>
  );
};

export const SkeletonAvatarSideBar = () => {
  return (
    <div className="">
      <Skeleton circle={true} width={44} height={44} />
    </div>
  );
};

export const SkeletonProfile = () => {
  return (
    <div
      className="w-full xl:w-4/6 lg:w-4/6 md:w-full sm:w-full overflow-x-auto overflow-y-hidden shadow-2xl rounded-lg bg-white relative transform -translate-x-1/2 left-1/2"
      style={{ top: "4.5rem" }}
    >
      <div className="grid grid-cols-3 pb-10">
        <div className="h-full flex justify-center justify-items-center">
          <div className="py-5">
            <Skeleton circle={true} width={170} height={170} />
          </div>
        </div>
        <div className="col-span-2  h-full object-fill">
          <div className="flex w-full items-center space-x-4 mt-5">
            <Skeleton width={150} height={20} />
          </div>
          <div className="flex space-x-5 mt-5">
            <Skeleton
              width={100}
              height={20}
              count={3}
              inline={true}
              style={{ marginRight: "2rem" }}
            />
          </div>
          <div className="h-full mt-5 mr-2">
            <Skeleton count={4} width={370} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonComment = () => {
  return (
    <div className="ml-2 flex gap-2">
      <Skeleton circle={true} width={35} height={35} />
      <Skeleton width={"410px"} height={35} />
    </div>
  );
};

export const SkeletonImagePost = () => {
  return (
    <div className=" h-full">
      <Skeleton height={"540px"} />
    </div>
  );
};

export const SkeletonImagePostProfile = () => {
  return (
    <div className=" h-full">
      <Skeleton height={"650px"} />
    </div>
  );
};

export const SkeletionImagePostOutSide = () => {
  return (
    <div className=" h-full">
      <Skeleton height={"500px"} enableAnimation={true} />
    </div>
  );
};

export const SkeletonConver = () => {
  return (
    <div className=" flex gap-2">
      <Skeleton circle={true} width={45} height={45} />
      <div className="mt-1">
        <Skeleton width={200} height={15} borderRadius={20} />
        <Skeleton width={200} height={15} borderRadius={20} />
      </div>
    </div>
  );
};

export const SkeletonSuggest = () => {
  return (
    <div className=" flex gap-2 mb-1">
      <Skeleton circle={true} width={44} height={44} />
      <div className=" flex-col items-center">
        <Skeleton width={150} height={15} borderRadius={20} />
        <Skeleton width={100} height={15} borderRadius={20} />
      </div>
    </div>
  );
};
