import React, { memo } from "react";
import { Suggestions } from "./suggestions";
import { User } from './user';
import { whyDidYouRender } from '@welldone-software/why-did-you-render';

export const Sidebar = () => {
  return (
    <div className="">
      <p className="fixed p-5 mt-20" style={{width:"20rem"}}>
        <User/>
        <Suggestions/>
      </p>
    </div>
  );
};

