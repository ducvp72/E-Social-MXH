import React from "react";
import { Suggestions } from "./suggestions";
import { User } from "./user";

export const Sidebar = () => {
  return (
    <div className="">
      <div className="fixed pt-16 z-10">
        <User />
        <Suggestions />
      </div>
    </div>
  );
};
