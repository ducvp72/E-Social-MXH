import React, { useState, useEffect } from "react";

const Information = (props) => {
  const { currentUser, userInfo } = props;
  const [state, setState] = useState({
    story: null,
    fb: null,
    phone: null,
  });

  useEffect(() => {
    checStatus();
  }, []);

  const checStatus = () => {
    if (currentUser) {
      setState({
        ...state,
        story: currentUser?.story,
        fb: currentUser?.facebook,
        phone: currentUser?.phone,
      });
    } else
      setState({
        ...state,
        story: userInfo?.story,
        fb: userInfo?.facebook,
        phone: userInfo?.phone,
      });
  };

  return (
    <>
      <div className="mt-5 overflow-hidden">
        <p className=" font-normal text-gray-700">
          {" "}
          {state ? state?.story : null}
        </p>
        <td
          onClick={() => {
            window.open(`${state?.fb}`, "_blank");
          }}
          className="font-medium"
          style={{ color: "#00376b" }}
        >
          {state ? state?.fb : null}
        </td>
        <p className=" font-medium"> {state ? state?.phone : null}</p>
      </div>
    </>
  );
};

export default Information;
