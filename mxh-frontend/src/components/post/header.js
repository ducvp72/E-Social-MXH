import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={"/p/${username}"} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src="assets/person/karl.jpg"
            alt=""
          />
          <p className="font-blod">username</p>
        </Link>
      </div>
    </div>
  );
};
