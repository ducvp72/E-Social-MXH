import React from "react";
import { Header } from "./header";
import { Image } from "./image";
import { Action } from './action';
import { Footer } from "./footer";
import { Comment } from "./comment";

export const Post = () => {
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-12 mr-16">
      <Header />
      <Image src="assets/person/lam5.png" />
      <Action/>
      <Footer/>
      <Comment/>
    </div>
  );
};
