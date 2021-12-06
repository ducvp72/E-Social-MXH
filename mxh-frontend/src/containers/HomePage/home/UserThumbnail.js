import React, { useState } from "react";

import { userApi } from "./../../../axiosApi/api/userApi";
import { useCookies } from "react-cookie";
import { chatApi } from "./../../../axiosApi/api/chatApi";
import { useParams, useLocation, useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actGetMyConver } from "../../../reducers/converReducer";

const UserThumbnail = (props) => {
  const { item, updateStatus, callListApi, q } = props;
  const [followed, setFollowed] = useState();
  const [cookies, ,] = useCookies(["auth"]);
  const history = useHistory();
  const dispatch = useDispatch();
  // console.log("auth", cookies.auth.user);
  const handleFollow = async () => {
    try {
      await userApi.userFollow(cookies.auth.tokens.access.token, item.id);
      setFollowed(true);
      // updateStatus(Date.now());
      callListApi(q);
    } catch (err) {
      console.log("err follow", err);
    }
  };

  const inboxUser = async () => {
    chatApi
      .createConver(cookies.auth.tokens.access.token, item.id)
      .then(() => {
        dispatch(actGetMyConver(cookies.auth.tokens.access.token, 1, 10));
        history.push(`/user/inbox/${item.id}`);
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              <Link
                to={
                  item?.id === cookies.auth.user.id
                    ? `/user/${item?.fullname.replaceAll(" ", ".")}`
                    : `/profile/user?id=${item?.id}`
                }
              >
                {item?.fullname}{" "}
              </Link>
            </div>

            <div className="text-mygrey font-normal text-xs italic">
              {item?.isFollow ? (
                <div className=" text-base flex items-center gap-2">
                  <i className="fas fa-check-circle text-blue-400"></i>
                  Following
                </div>
              ) : null}
              <br />
            </div>
            <div className="">
              <i className="fas fa-user-friends text-mygrey mr-1 "></i>
              <span className=" font-normal text-mygrey">
                {item?.followers}
              </span>
            </div>
          </div>
        </div>
        {item?.id !== cookies.auth.user.id && (
          <div className="flex font-boldtext-xs space-x-0 mr-3">
            <div className="h-8 w-8 flex items-center justify-center border rounded-full bg-gray-200 border-gray-300  cursor-pointer hover:bg-gray-300">
              {item?.isFollow ? (
                <i
                  onClick={() => inboxUser()}
                  className=" fab fa-lg fa-facebook-messenger text-black"
                ></i>
              ) : (
                <i
                  className="fas fa-user-plus"
                  onClick={() => handleFollow()}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserThumbnail;
