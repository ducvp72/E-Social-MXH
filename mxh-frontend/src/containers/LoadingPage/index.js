import React from "react";
import "./style.css";
import CircularStatic from "./upfileLoading";
const Loading = (props) => {
  const { process } = props;
  return (
    <>
      <div
        className="post-show opacity-50 fixed w-full h-screen z-40 top-0 left-0 flex justify-end items-start"
        style={{ background: "#fff" }}
      >
        <div className=" flex justify-center items-center justify-items-center rounded-full bg-none "></div>
      </div>

      <div className="fixed z-50 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
        {process ? (
          <CircularStatic process={process} />
        ) : (
          <section className="stage">
            <figure className="ball bubble"></figure>
          </section>
        )}
      </div>
    </>
  );
};

export default Loading;
