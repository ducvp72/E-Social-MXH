import React from "react";
import { Link } from "react-router-dom";

const UserThumbnail = (props) => {
  const { item } = props;
  return (
    <>
      <div className=" border w-full hover:shadow-none relative flex items-center rounded-md mx-auto shadow-lg m-2">
        <div className="w-full flex m-3 ml-4 text-white ">
          <img
            className="w-16 h-16 p-1 bg-white rounded-full"
            src={`https://mxhld.herokuapp.com/v1/image/${item?.avatar}`}
            alt=""
          />
          <div className=" mt-1 ml-3 font-bold flex flex-col">
            <div className=" text-black font-medium text-base">
              <Link to={`/profile/${item?.fullname}`}>{item?.fullname} </Link>
            </div>
            <div className="text-mygrey font-normal text-xs italic">
              {/* Following */}
              <br />
            </div>
            <div className=" mt-2">
              <i className="fas fa-user-friends text-mygrey mr-1 "></i>
              <span className=" font-normal text-mygrey">{item?.id}</span>
            </div>
          </div>
        </div>
        <div className="flex font-boldtext-xs space-x-0 mr-3">
          <div className="h-8 w-8 flex items-center justify-center border rounded-full bg-gray-200 border-gray-300  cursor-pointer hover:bg-gray-300">
            <i className=" fab fa-lg fa-facebook-messenger text-black"></i>
            {/* <i class="fas fa-user-plus"></i> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserThumbnail;
