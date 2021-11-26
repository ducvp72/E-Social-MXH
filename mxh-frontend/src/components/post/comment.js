import React from "react";

export const Comment = ({ setToggle, item }) => {
  return (
    <div className=" px-4 py-2">
      <p
        className="text-sm text-gray-base  cursor-pointer"
        onClick={() => setToggle({ isShow: true, postData: item })}
      >
        View all 100 comments
      </p>
    </div>
  );
};
