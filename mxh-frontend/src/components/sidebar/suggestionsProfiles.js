import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const SuggestionsProfiles = () => {
  const [followed, setFollowed] = useState(false);
  return (
    <div className="flex flex-row items-center align-items justify-between">
      <div className="flex items-center justify-between">
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
