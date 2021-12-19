import React from "react";
import { Sidebar } from "../components/sidebar/sidebar";
import { Topbar } from "../components/topbar/topbar";

const SearchLayout = ({ children }) => {
  return (
    <div>
      <Topbar />
      <div className="bg-white overflow-x-auto">
        <div className="bg-white block" style={{ marginTop: "2rem" }}></div>
        <div className=" bg-white grid grid-cols-1 gap-0 md:grid-cols-3 md:gap-0 lg:gap-5 xl:grid-cols-3 xl:gap-4  mx-auto max-w-screen-lg ">
          {children}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default SearchLayout;
