import React from "react";
import { Topbar } from "../components/topbar/topbar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Topbar />
      {children}
    </div>
  );
};

export default DefaultLayout;
