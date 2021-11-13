import React from "react";

const Caption = (props) => {
  const { item } = props;
  return (
    <div>
      <div className="p-4 pt-2 pb-1">
        {/* <span className="mr-2 font-bold">LamTV</span> */}
        <span className="font-normal text-base">{item ? item.body : null}</span>
      </div>
    </div>
  );
};

export default Caption;
