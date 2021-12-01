import React from "react";

export const Comment = (props) => {
  const { setPopup, popup, item } = props;

  return (
    <div className=" px-4 py-2">
      {item?.comments >= 1 && (
        <p
          className="text-sm text-gray-base  cursor-pointer"
          // onClick={() => setToggle({ isShow: true, postData: item })}
          onClick={() => setPopup({ ...popup, isShow: true })}
        >
          View all {item?.comments} comments
        </p>
      )}
    </div>
  );
};
