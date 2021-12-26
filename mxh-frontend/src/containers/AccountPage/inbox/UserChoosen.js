import React from "react";

const UserChoosen = (props) => {
  const { listUser } = props;
  return (
    <>
      <div className="flex gap-2 items-center">
        <img
          className="w-10 h-10"
          src="/assets/image/defaultAvatar.png"
          alt="User"
        />
        <p className="">{listUser.key}</p>
      </div>
    </>
  );
};

export default UserChoosen;
