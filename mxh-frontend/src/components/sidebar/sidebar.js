import React, { memo } from "react";
import { Suggestions } from "./suggestions";
import { User } from './user';
import { whyDidYouRender } from '@welldone-software/why-did-you-render';

export const Sidebar = () => {
  return (
    <div className="">
      <div className="fixed pt-16 z-10">
        <User/>
        <Suggestions/>
      </div>
    </div>
  );
};

