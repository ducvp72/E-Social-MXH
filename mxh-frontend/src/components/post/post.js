import React from "react";
import { Header } from "./header";
import { Image } from "./image";
import { Action } from "./action";
import { Footer } from "./footer";
import { Comment } from "./comment";
import Addcomments from "./addcomments";
import Caption from "./caption";

export const Post = ({ setToggle, item }) => {
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-10 md:mr-16 sm:mr-1 lg:mr-0">
      <Header />
      <Caption item={item} />
      <Image />
      <Action setToggle={setToggle} item={item} />
      <Comment item={item} setToggle={setToggle} />

      {[1, 2].map((id) => {
        return (
          <div className="flex px-2">
            <img
              className="rounded-full h-8 w-8 flex mt-1"
              src={"/assets/image/defaultAvatar.png"}
              alt="userimg"
            />
            <Footer key={id} item={item} />
          </div>
        );
      })}

      <Addcomments />
    </div>
  );
};
