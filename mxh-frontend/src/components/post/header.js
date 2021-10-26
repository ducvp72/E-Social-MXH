import { RouterSharp } from "@mui/icons-material";
import React from "react";
import * as ROUTES from "../../routes/routes";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="grid grid-cols-2 pt-2">
      <div className=" relative flex h-4 p-4 py-6">
        <div className="flex items-center relative">
          <Link to={ROUTES.PROFILE}>
            <img
              className="rounded-full h-10 w-10 flex mr-3"
              src="assets/person/karl.jpg"
              alt=""
            />
          </Link>
            <div>
              <Link to={ROUTES.PROFILE}>
                <p className="font-medium text-base">username</p>
              </Link>
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
        <p className="font-black text-2xl cursor-pointer text-gray-400">...</p>
      </div>
    </div>
  );
};
