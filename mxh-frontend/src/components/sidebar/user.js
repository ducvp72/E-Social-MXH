import React from "react";
import { Link } from "react-router-dom";

export const User = () => {
  return (
    <Link
      to="'p/$/{user}'"
      className="grid grid-cols-4 gap-4 mb-6 items-center"
    >
      <div className="flex items-center justify-between col-span-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src="/assets/person/karl.jpg"
          alt="logo"
        />
      </div>
      <div className="col-span-3">
          <p className="font-bold text-sm">username</p>
          <p className="text-sm">fullname</p>
      </div>
    </Link>
  );
};
