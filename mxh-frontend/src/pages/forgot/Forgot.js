import React from "react";

export const Forgot = () => {
  return (
    <div className="container">
      <form class="py-16 flex flex-col justify-center items-center">
        <img
          src="/assets/access/Forgotpassword.svg"
          alt="forgot"
          class="w-32 hover:scale-150 transition-all duration-500 transform mx-auto"
        />
        <h2 class="py-9 font-display font-bold text-2xl text-gray-700 text-center ">
          Are you forgot password? Don't worry !
        </h2>
        <div class="relative">
          <i class="fa fa-envelope absolute text-primarycolor text-xl " />
          <input
            type="text"
            placeholder="Email"
            class="pl-8 border-b-2 font-display focus: outline-none focus:border-primarycolor transition-all duration-500 capitalize text-left"
          />
        </div>
        <button
          href="#"
          class="py-3 px-20 bg-primarycolor rounded-full text-white font-bold uppercase text-lg mt-4 transform hover:translate-y-1 transition-all duration-700"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};
