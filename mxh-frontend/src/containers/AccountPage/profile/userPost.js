import React from "react";

const UserPost = (props) => {
  const { setToggle, item } = props;
  return (
    <div>
      <div className="shadow-2xl cursor-pointer rounded-sm  border-white relative group">
        <img
          // src={`https://mxhld.herokuapp.com/v1/image/${item.images[0]}?w=500&h=500`}
          // src={`https://mxhld.herokuapp.com/v1/image/${item.images[0]}?w=500&h=500`}
          alt="ImgPost"
          className="rounded-sm w-full h-40 xl:h-80 sm:h-56 md-h-40 "
        />
        <div className=" absolute top-0 w-full h-full hidden group-hover:block transition delay-150 duration-500 ease-in-out ">
          <div className="bg-gray-900 h-full w-full top-0 left-0 opacity-50 absolute z-10 " />
          <div
            onClick={() => setToggle({ isShow: true, postData: {} })}
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
                3,692
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
                200
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPost;
