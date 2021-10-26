import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SuggestionsProfiles = () => {
  const [followed, setFollowed] = useState(false);
  return (
    <div className="w-full flex items-center align-items space-x-24 md:space-x-24 xl:space-x-28">
      <div className="flex items-center">
        <img
          className="rounded-full w-8 flex mr-3"
          src="/assets/person/karl.jpg"
          alt=""
        />
        <Link to={"/p/${username}"}>
          <p className="font-bold text-sm">username</p>
        </Link>
      </div>
      <div className="">
        <button
          className="text-xs font-bold text-blue-medium"
          type="button"
          onClick={() => console.log("Following !")}
        >
          Follow
        </button>
      </div>
    </div>
  );
};
