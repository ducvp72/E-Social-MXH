import React, { useState, useEffect } from "react";
import CarouselElement from "./../../../Carousel/index";
const UserPost = (props) => {
  const { item, otherItem, getUserPost, getSummary } = props;
  const [popup, setPopup] = useState(false);
  const [state, setState] = useState();

  useEffect(() => {
    checkState();
    return () => {
      setState(null);
    };
  }, []);

  const checkState = () => {
    if (item) {
      setState(item);
      // console.log("My USerpost", item);
    } else {
      setState(otherItem);
      // console.log("Other Profile", otherItem);
    }
  };

  const handleShowPopup = () => {
    setPopup(true);
  };

  const handleCloseCaro = () => {
    setPopup(false);
  };

  const checkFile = () => {
    if (state) {
      if (state?.fileTypes === "IMAGE") {
        return (
          <>
            <div
              className="flex  items-center justify-center cursor-pointer"
              style={{ border: "1px solid #efefef" }}
              onClick={() => setPopup(true)}
            >
              <img
                src={`https://mxhld.herokuapp.com/v1/file/${state?.file}`}
                alt="userpost"
                className="w-full object-cover"
                style={{
                  height: " 250px",
                }}
              />
            </div>
          </>
        );
      }
      if (state?.fileTypes === "VIDEO") {
        return (
          <div className="flex  items-center justify-center cursor-pointer bg-black ">
            <video
              onClick={() => setPopup(true)}
              className="w-full outline-none h-full object-cover"
              controls
            >
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${state?.file}`}
              />
            </video>
          </div>
        );
      }
      if (state?.fileTypes === "AUDIO") {
        return (
          <div
            className=" items-center justify-center cursor-pointer"
            onClick={() => setPopup(true)}
          >
            <img
              src="/assets/image/audio.png"
              className="h-full p-10"
              alt="nocaption"
            />
          </div>
        );
      }
    }
    return (
      <>
        <div
          className=" items-center justify-center cursor-pointer"
          onClick={() => setPopup({ ...popup, isShow: true })}
        >
          <img
            src="/assets/image/no-pictures.png"
            className="h-full p-10"
            alt="nocaption"
          />
        </div>
      </>
    );
  };

  return (
    <div>
      {popup && (
        <CarouselElement
          otherItem={otherItem}
          item={item}
          setPopup={setPopup}
          popup={popup}
          getUserPost={getUserPost}
          getSummary={getSummary}
          handleCloseCaro={handleCloseCaro}
        />
      )}
      <div className="shadow-2xl cursor-pointer rounded-sm border-white relative group">
        <div
          className="flex items-center justify-center"
          style={{ height: "300px" }}
        >
          {checkFile()}
        </div>

        <div className=" absolute top-0 w-full h-full hidden group-hover:block transition delay-150 duration-500 ease-in-out ">
          <div className="bg-gray-900 h-full w-full top-0 left-0 opacity-50 absolute z-10 " />
          <div
            onClick={() => {
              handleShowPopup();
            }}
            className=" absolute z-20 flex justify-center items-center space-x-2 md:space-x-7 lg:space-x-7 w-full h-full"
          >
            <div className="flex space-x-1">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-red-500"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    strokeWidth={2}
                    fill="currentColor"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  />
                </svg>
              </span>
              <p className="text-sm md:text-xl lg:text-xl font-medium text-white">
                {state?.likes}
              </p>
            </div>

            <div className="flex space-x-1">
              <span className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:w-6 md:h-6 lg:w-6 lg:h-6 text-white"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    strokeWidth={2}
                    fill="currentColor"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  />
                </svg>
              </span>
              <p className=" text-sm md:text-xl lg:text-xl font-medium text-white">
                {state?.comments}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
