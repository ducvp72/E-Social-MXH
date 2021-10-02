import  React,{useState} from "react";
import * as ROUTES from "../../constants/routes";
import { Link } from "react-router-dom";
import { HOME } from "./../../constants/routes";

export const Topbar = () => {
  const [login,setLogin] = useState(true);

  const logout = () => {
    setLogin(false)
    console.log(login);
  };

  const handlelogin = () => {
    setLogin(true)
    console.log(login);
  };

  const user = 1;
  return (
    <header className="fixed shadow-md w-full h-16 bg-white border-b border-gray-primary mb-8">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.HOME} arial-label="E-Social logo">
                <img
                  src="/assets/image/logo.png"
                  alt="logo"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
            <div class="container h-2  flex justify-center items-center">
              <div class="relative justify-center items-center align-items">
                <div class="absolute top-2 left-3">
                  <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i>
                </div>
                <input
                  type="text"
                  class="h-10 w-96 pl-10 pr-20  z-0 border-2  focus:outline-none"
                  placeholder="Search anything..."
                />
                <div class="absolute right-2" style={{ top: "5px" }}>
                  <button class="h-7 w-20 text-white bg-red-500 hover:bg-red-600">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {login ? (
              <>
                <Link to={ROUTES.HOME}>
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                <Link to={ROUTES.INBOX}>
                  <svg
                   className="w-8 mr-6 text-black-light cursor-pointer"
                    aria-label="Direct"
                    xmlns="http://www.w3.org/2000/svg"
                    height="25"
                    viewBox="0 0 48 48"
                    width="22"
                    stroke="currentColor"
                  >
                    <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     strokeWidth={2}
                     d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z" />
                  </svg>
                </Link>

                <button onClick={logout} type="button" title="Sign Out">
                  <svg
                    className="w-8 mr-6 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                {user && (
                  <div className="flex items-center cursor-pointer">
                    <Link to={"/p/${user.displayName}"}>
                      <img
                        className="rounded-full h-8 w-8 flex"
                        src="/assets/person/duc.jpeg"
                        alt={"${user.displayName} profile"}
                      />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to={ROUTES.SIGNIN}>
                  <button
                    onClick={handlelogin}
                    type="button"
                    className="font-bold bg-blue-medium text-sm rounded text-white w-20 h-8"
                  >
                    Log In
                  </button>
                </Link>
                <Link to={ROUTES.SIGNUP}>
                  <button
                    type="button"
                    className="font-bold text-sm rounded text-blue-medium w-20 h-8"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
