import * as React from "react";
import { Timeline } from "../../components/timeline/timeline";
import { Topbar } from "../../components/topbar/topbar";
import { Sidebar } from "./../../components/sidebar/sidebar";

const Home = () => {
  return (
    <div className="bg-gray-background">
      <Topbar />
      <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
