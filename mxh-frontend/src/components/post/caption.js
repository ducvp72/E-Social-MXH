import React, { useState } from "react";

const Caption = (props) => {
  const { item } = props;
  const [expand, setExpand] = useState(false);
  const text = item?.body;
  return (
    <div>
      <div className="p-4 pt-2 pb-1">
        {/* <span className="mr-1 font-medium ">username </span> */}
        {text?.length > 100 ? (
          <>
            <span className=" font-normal text-gray-700 text-base">
              {/* {item ? item.body : null} */}
              {expand ? text : text.substr(0, 100)}
            </span>
            <span
              onClick={() => {
                setExpand(!expand);
              }}
              className=" cursor-pointer ml-2 font-normal text-blue-700 text-sm"
            >
              {expand ? " show less" : "...read more"}
            </span>
          </>
        ) : (
          <span className=" font-normal text-gray-700 text-base">
            {/* {item ? item.body : null} */}
            {text.substr(0, 200)}
          </span>
        )}
      </div>
    </div>
  );
};

export default Caption;
