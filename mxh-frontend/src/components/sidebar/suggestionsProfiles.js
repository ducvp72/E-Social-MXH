import React from "react";

export const SuggestionsProfiles = (props) => {
  const { item } = props;
  return (
    <div className="w-full mb-2 flex items-center gap-2 ">
      <img
        className="rounded-full w-10 h-10"
        src={`https://mxhld.herokuapp.com/v1/image/${item?.avatar}`}
        alt="img"
      />
      <div className="flex justify-between items-center  w-full">
        <div>
          {/* <Link to={"/p/${username}"}> */}
          <p className="font-bold text-sm cursor-pointer">{item?.fullname}</p>
          {/* </Link> */}
        </div>
        <div className="">
          <button
            className="text-xs font-bold text-blue-medium focus:outline-none"
            type="button"
            onClick={() => console.log("Following !")}
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};
