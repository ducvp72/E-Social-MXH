import React from "react";
import { Header } from "./header";
import { Image } from "./image";
import { Action } from "./action";
import { Footer } from "./footer";
import { Comment } from "./comment";
import Addcomments from "./addcomments";
import Caption from "./caption";

const comment = [
  {
    cmts: "Qua pro",
  },
  {
    cmts: "Han quoc nha",
  },
  {
    cmts: "Ban 10d",
  },
  {
    cmts: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida libero rhoncus ut. Maecenas imperdiet felis nisi, fringilla luctus felis hendrerit sit amet. Pellentesque interdum, nisl nec interdum maximus, augue diam porttitor lorem, et sollicitudin felis neque sit amet",
  },
  {
    cmts: "Ngầu lòi",
  },
  {
    cmts: "Devops",
  },
  {
    cmts: "LamPC",
  },
  {
    cmts: "gắt",
  },
  {
    cmts: "dam!!!!!!!!!!!!!!",
  },
];

export const Post = ({ setToggle, item }) => {
  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-10 md:mr-16 sm:mr-1 lg:mr-0">
      <Header />
      <Caption item={item} />
      <Image src="/assets/person/lam5.png" />
      <Action />
      <Footer item={item} />
      <Comment item={item} setToggle={setToggle} />
      <Addcomments />
    </div>
  );
};
