import * as React from "react";
import { useEffect } from "react";
import { Topbar } from "../../../components/topbar/topbar";
import { Helmet } from "react-helmet-async";
import Chat from './chat';


const Inbox = () => {
  return (
    <div className=" absolute left-1/2 transform -translate-x-1/2  shadow-md border-2 w-2/3 top-20">
      <Helmet>
        <title>Inbox - Direct</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className=" w-full h-full">
       <Chat/>
      </div>
    </div>
  );
};

export default Inbox;
