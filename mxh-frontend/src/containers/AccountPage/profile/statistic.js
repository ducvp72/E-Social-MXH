import React from "react";

const Statistic = (props) => {
  const { userSmr } = props;
  console.log("statistic", userSmr);
  return (
    <div className="flex items-center space-x-10 w-full mt-5">
      <p className=" font-light">
        <span className=" font-medium">{userSmr?.countPosts}</span> bài viết
      </p>
      <p className=" font-light">
        <span className="font-medium">{userSmr?.countFollow?.followers}</span>{" "}
        Followers
      </p>
      <p className=" font-light">
        <span className="font-medium">{userSmr?.countFollow?.following}</span>{" "}
        Following
      </p>
    </div>
  );
};

export default Statistic;
