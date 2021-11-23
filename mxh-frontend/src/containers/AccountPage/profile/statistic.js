import React from "react";

const Statistic = (props) => {
  const { userSmr, userInfo } = props;
  // console.log("statistic", userSmr);
  return (
    <div className="flex items-center space-x-10 w-full mt-5">
      <p className=" font-light">
        <span className=" font-medium">{userInfo?.posts}</span> bài viết
      </p>
      <p className=" font-light">
        {/* <span className="font-medium">{userSmr?.countFollow?.followers}</span>{" "} */}
        <span className="font-medium">{userInfo?.followers}</span> Followers
      </p>
      <p className=" font-light">
        <span className="font-medium">{userInfo?.following}</span> Following
      </p>
    </div>
  );
};

export default Statistic;
