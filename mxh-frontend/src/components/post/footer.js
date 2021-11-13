import React from "react";

export const Footer = (props) => {
  const { cmt } = props;
  return (
    <div>
      <div className="p-4 pt-2 pb-1">
        <span className="mr-2 font-bold">username </span>
        <span className="font-normal">{cmt ? cmt.title : ""}</span>
      </div>
    </div>
  );
};
