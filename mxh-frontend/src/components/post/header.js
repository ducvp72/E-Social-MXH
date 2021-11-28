import React, { useState } from "react";
import DialogActionPost from "./dialogAction";
import moment from "moment";

export const Header = (item) => {
  const [action, setAction] = useState(false);

  const onClose = () => {
    setAction(false);
  };

  return (
    <div className="grid grid-cols-2 pt-2 mb-2">
      <DialogActionPost open={action} onClose={onClose}></DialogActionPost>
      <div className=" relative flex h-4 p-4 py-6">
        <div className="flex items-center relative">
          {/* <Link to={ROUTES.PROFILE}> */}
          <img
            className="rounded-full h-12 w-12 flex mr-3 shadow-xl "
            src={`https://mxhld.herokuapp.com/v1/image/${item?.item.user.avatar}`}
            alt=""
          />
          {/* </Link> */}
          <div>
            {/* <Link to={ROUTES.PROFILE}> */}
            <p className="font-medium text-base cursor-pointer">
              {item?.item.user.fullname}
            </p>
            {/* </Link> */}
            <p
              className="text-gray-base  cursor-pointer"
              style={{ fontSize: "0.7rem", lineHeight: "1rem" }}
            >
              {moment(item?.item.createdAt).fromNow()}
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
