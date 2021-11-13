import React from "react";

export const Comment = ({ setToggle, item }) => {
  return (
    <div className="p-4 pt-1 pb-4">
      <p
        className="text-sm text-gray-base mb-1 cursor-pointer"
        onClick={() => setToggle({ isShow: true, postData: item })}
      >
        View all
      </p>
    </div>
  );
};
