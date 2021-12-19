import React, { useState, useEffect } from "react";
import DialogActionPost from "./dialogAction";
import moment from "moment";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  setDialogAction2,
  setDialogCloseAll,
} from "./../../reducers/changePostDialog";

export const Header = (props) => {
  const { item } = props;
  const [cookies, ,] = useCookies("auth");

  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-2 pt-2 mb-2">
      <div className=" relative flex h-4 p-4 py-6">
        <div className="flex items-center relative">
          <Link
            to={
              item?.id === cookies?.auth.user.id
                ? `/user/${item?.fullname.replaceAll(" ", ".")}`
                : `/profile/user?id=${item?.id}`
            }
          >
            <img
              className="rounded-full h-12 w-12 flex mr-3 shadow-xl cursor-pointer "
              src={`https://mxhld.herokuapp.com/v1/image/${item?.user.avatar}`}
              alt="avater"
            />
          </Link>

          <div>
            <Link
              to={
                item?.user.userId === cookies.auth.user.id
                  ? `/user/${item?.user.fullname.replaceAll(" ", ".")}`
                  : `/profile/user?id=${item?.user.userId}`
              }
            >
              <p className="font-medium text-base cursor-pointer">
                {item?.user.fullname}
              </p>
            </Link>
            <p
              className="text-gray-base  cursor-pointer"
              style={{ fontSize: "0.7rem", lineHeight: "1rem" }}
            >
              {moment(item?.createdAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
      <div className=" flex justify-end mr-2 items-center">
        <div
          onClick={() => {
            dispatch(setDialogAction2(true, item));
          }}
          className=" font-black text-2xl cursor-pointer text-gray-400"
        >
          ...
        </div>
      </div>
    </div>
  );
};
