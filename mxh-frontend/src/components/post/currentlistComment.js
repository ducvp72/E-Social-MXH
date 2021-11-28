import React, { useState, useEffect } from "react";
import DialogActionPost from "./dialogAction";

export const CurrentComment = (props) => {
  const { item } = props;
  useEffect(() => {
    // console.log("fake", item?.text);
  }, [item]);
  const [expand, setExpand] = useState(false);
  const [action, setAction] = useState(false);
  const onClose = () => {
    setAction(false);
  };
  const text = item?.text;
  return (
    <div className="flex px-2">
      <img
        className="rounded-full h-8 w-8 flex mt-1"
        src={"/assets/image/defaultAvatar.png"}
        alt="userimg"
      />
      <div className="group flex items-center">
        <DialogActionPost open={action} onClose={onClose}></DialogActionPost>
        <div className="py-4 pl-1 pt-1 pb-1 flex items-center w-full ">
          <div className=" bg-gray-200 rounded-xl px-2">
            <div className="">
              <span className="mr-1 font-medium block"> {item?.name} </span>
              {text?.length > 100 ? (
                <>
                  <span className="font-normal  text-gray-700 text-base">
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
                <span className="font-normal text-gray-700 text-base">
                  {text?.substr(0, 200)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className=" flex items-center w-10 justify-center">
          <div
            onClick={() => {
              setAction(!action);
            }}
            className="hidden group-hover:flex justify-center items-center justify-items-center font-black cursor-pointer text-gray-700 rounded-full text-base"
          >
            <p className="">...</p>
          </div>
        </div>
      </div>
    </div>
  );
};
