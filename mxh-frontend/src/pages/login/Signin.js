import React from "react";
// import "../../css/style.css"
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

export const Signin = () => {
  return (
    <div className="container">
      <form class="py-16 flex flex-col justify-center items-center">
        <img
          src="/assets/access/avatar.svg"
          alt="avatar"
          class="w-32 hover:scale-150 transition-all duration-500 transform mx-auto"
        />
        <h2 class="py-9 font-display font-bold text-2xl text-gray-700 text-center ">
          Welcome to E-Social Network
        </h2>
        <div class="relative">
          <i class="fa fa-user absolute text-primarycolor text-xl " />
          <input
            type="text"
            placeholder="username"
            class="pl-8 border-b-2 font-display focus: outline-none focus:border-primarycolor transition-all duration-500 capitalize text-left"
          />
        </div>
        <div class="relative mt-8 ">
          <i class="fa fa-lock absolute text-primarycolor text-xl " />
          <input
            type="password"
            placeholder="password"
            class="pl-8 border-b-2 font-display focus: outline-none focus:border-primarycolor transition-all duration-500 capitalize text-left"
          />
        </div>

        {/* <a
          to="#"
          class="self-center ml-20 mt-4  text-gray-600 font-bold transform hover:translate-y-1 transition-all duration-700"
        >
          &emsp;Forgot password?
        </a> */}
        <Link  to={ROUTES.HOME} arial-label="E-Social logo>">
          <button
            href="#"
            class="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-700"
          >
            Login
          </button>
        </Link>

        {/* <a
          href="#"
          class="self-center mt-4  text-gray-600 underline  font-bold transform hover:translate-y-1 transition-all duration-700"
        >
          Don't have a E-Social Account? Sign up
        </a> */}
      </form>
    </div>
  );
};
