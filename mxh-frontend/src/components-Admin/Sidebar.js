import { useState } from "react";
import { NavLink } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { actLogout } from "./../reducers/authReducer";
export default function Sidebar() {
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const [showSidebar, setShowSidebar] = useState("-left-64");
  const history = useHistory();
  const dispatch = useDispatch();
  const handlelogout = () => {
    try {
      dispatch(actLogout(cookies.auth.tokens.refresh.token, history));
      removeCookie("auth", { path: "/" });
      // history.push("/auth");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <AdminNavbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div
        className={`h-screen fixed top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
      >
        <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
          <div className=" flex justify-center">
            <img
              src={"/assets/person/administrator.png"}
              className="rounded-sm w-20 h-20"
              alt="img"
            />
          </div>

          <div className="flex flex-col">
            <hr className="my-4 min-w-full" />

            <ul className="flex-col min-w-full flex list-none">
              <li className="rounded-lg mb-4 ">
                <NavLink
                  exact
                  to="/admin"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <i className="fas fa-2x fa-users" />
                  Users
                </NavLink>
              </li>
              <li className="rounded-lg mb-4">
                <NavLink
                  to="/admin/post-dashboard"
                  exact
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <i className="fas fa-2x fa-poll-h mr-2"></i>
                  Posts
                </NavLink>
              </li>

              {/* <li className="rounded-lg mb-2">
                <NavLink
                  to="/admin/groupchat-dashboard"
                  className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                  activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                >
                  <i className="fas fa-2x fa-comments"></i>
                  Chats
                </NavLink>
              </li> */}
            </ul>

            <ul className="flex-col min-w-full flex list-none absolute bottom-0">
              <li className=" cursor-pointer bg-gradient-to-tr from-light-blue-500 to-light-blue-700 px-4 rounded-lg text-white mb-2">
                <NavLink to="/admin/admin-changepassword">
                  <div className="flex items-center gap-4 text-sm font-light py-3">
                    <i className="fas fa-lock fa-2x"></i>
                    Change Password
                  </div>
                </NavLink>
              </li>
              <li
                onClick={() => {
                  handlelogout();
                }}
                className=" cursor-pointer bg-gradient-to-tr from-red-500 to-red-700 px-4 rounded-lg text-white"
              >
                <div className="flex items-center justify-center gap-4 text-sm font-light py-3">
                  Log Out
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
