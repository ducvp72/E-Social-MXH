import React from "react";
import { useEffect } from "react";

export const Inbox = () => {
  useEffect(() => {
    document.title = "Inbox - Direct";
  }, []);
  return (
    <div className="bg-black">
      <p className="">IB here !</p>
    </div>
  );
};
