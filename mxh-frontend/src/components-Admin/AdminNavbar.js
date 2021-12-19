import { useLocation, useHistory } from "react-router-dom";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { actLogout } from "./../reducers/authReducer";

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
  const [cookies, , removeCookies] = useCookies(["auth"]);
  const currentUser = useSelector((state) => state.auth.data);
  const location = useLocation().pathname;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    try {
      dispatch(actLogout(cookies.auth.tokens.refresh.token, history));
      removeCookies("auth", { path: "/" });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="bg-light-blue-500 md:ml-64 py-6 px-3">
      <div className="h-1/2 container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
        <div className="md:hidden">
          <Button
            color="transparent"
            buttonType="link"
            size="lg"
            iconOnly
            rounded
            ripple="light"
            onClick={() => setShowSidebar("left-0")}
          >
            <Icon name="menu" size="2xl" color="white" />
          </Button>
          <div
            className={`absolute top-2 md:hidden ${
              showSidebar === "left-0" ? "left-64" : "-left-64"
            } z-50 transition-all duration-300`}
          >
            <Button
              color="transparent"
              buttonType="link"
              size="lg"
              iconOnly
              rounded
              ripple="light"
              onClick={() => setShowSidebar("-left-64")}
            >
              <Icon name="close" size="2xl" color="white" />
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center w-full">
          <h4 className="uppercase text-white text-sm tracking-wider mt-1">
            {location === "/"
              ? "User-Dashboard"
              : location.toUpperCase().replace("/", "")}
          </h4>
          {}
          <div className="flex items-center">
            <p className=" font-avatar text-lg text-white">
              Hi! {currentUser?.adminName}
            </p>
            <div className="-mr-4 ml-4">
              <Dropdown
                color="transparent"
                buttonText={
                  <img
                    src={"/assets/image/anonymous.jpg"}
                    className="rounded-full w-12 h-12"
                    alt="img"
                  />
                }
                rounded
                style={{
                  padding: 0,
                  color: "transparent",
                }}
              >
                <DropdownItem
                  onClick={() => {
                    handleLogOut();
                  }}
                  color="lightBlue"
                >
                  Log out
                </DropdownItem>
                {/* <DropdownItem color="lightBlue">Another Action</DropdownItem>
                <DropdownItem color="lightBlue">Something Else</DropdownItem> */}
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
