import React from "react";
import Skeleton from "react-loading-skeleton";
import { Post } from './../post/post';

export const Timeline = () => {
  const photos = true;
  return (
    <div className="container col-span-2" style={{marginTop:"6rem"}}>
      {/* {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton count={4} width={640} height={500} className="mb-5" />
          ))}
        </>
      ) : photos?.length > 0 ? (
        <Post className=""/>
      ) : ( */}
        {/* // <p className="text-center text-2xl">Following User to see</p> */}
        <Post className=""/>
        <Post className=""/>

      {/* )} */}
    </div>
  );
};
