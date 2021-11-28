import React, { useEffect } from "react";

export const Comment = (props) => {
  const { setPopup, popup } = props;

  return (
    <div className=" px-4 py-2">
      <p
        className="text-sm text-gray-base  cursor-pointer"
        // onClick={() => setToggle({ isShow: true, postData: item })}
        onClick={() => setPopup({ ...popup, isShow: true })}
      >
        View all 101 comments
      </p>
    </div>
  );
};
