import React from "react";

const Statistic = () => {
  return (
    <div className="flex items-center space-x-10 w-full mt-5">
      <p className=" font-light">
        <span className=" font-medium">1k</span> bài viết
      </p>
      <p className=" font-light">
        <span className="font-medium">100k</span> người theo dõi
      </p>
      <p className=" font-light">
        Đang theo dõi  <span className="font-medium">100</span> người dùng
      </p>
    </div>
  );
};

export default Statistic;
