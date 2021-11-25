import React, { useState } from "react";
import DialogActionPost from "./dialogAction";

export const Header = () => {
  const [action, setAction] = useState(false);
  const onClose = () => {
    setAction(false);
  };

  return (
    <div className="grid grid-cols-2 pt-2">
      <DialogActionPost open={action} onClose={onClose}></DialogActionPost>
      <div className=" relative flex h-4 p-4 py-6">
        <div className="flex items-center relative">
          {/* <Link to={ROUTES.PROFILE}> */}
          <img
            className="rounded-full h-10 w-10 flex mr-3"
            src="assets/person/karl.jpg"
            alt=""
          />
          {/* </Link> */}
          <div>
            {/* <Link to={ROUTES.PROFILE}> */}
            <p className="font-medium text-base">username</p>
            {/* </Link> */}
            <p
              className="text-gray-base uppercase  cursor-pointer"
              style={{ fontSize: "0.7rem", lineHeight: "1rem" }}
            >
              5 days ago
            </p>
          </div>
        </div>
      </div>
      <div className=" flex justify-end mr-2 items-center">
        <div
          onClick={() => {
            setAction(!action);
          }}
          className=" font-black text-2xl cursor-pointer text-gray-400"
        >
          ...
        </div>
      </div>
    </div>
  );
};
