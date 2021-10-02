import React from "react";

export const Image = ({src}) => {
  return (
    <div>
      <img src={src} alt="userpost" className="w-full h-cus"/>
    </div>
  );
};
