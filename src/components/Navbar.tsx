import { Link } from "react-router-dom";

import { AiOutlineLogout } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between border-b border-gray p-2 px-8 text-base font-semibold sm:px-20 xl:px-72">
      <div className="w-20">
        <img
          src="https://res.cloudinary.com/dxbeayp6k/image/upload/v1722614758/DotBlog_domain_logo_niuc95.png"
          alt=""
        />
      </div>
      <div className="flex gap-4 text-xs">
        {token === null ? (
          <>
            <Link
              to="/login"
              className="flex h-8 items-center justify-center rounded-full bg-black px-4 text-white"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex h-8 items-center justify-center rounded-full bg-gray px-4"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-4 font-medium">
            <Link
              to="/add"
              className="rounded-full bg-more p-2 px-8 text-sm font-semibold text-white"
            >
              Write
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6">
                <img
                  src="https://res.cloudinary.com/dxbeayp6k/image/upload/v1722614661/pngwing.com_vrgzvz.png"
                  alt=""
                  className="h-full w-full"
                />
              </div>
              <h1 className="hidden text-sm sm:flex">{username}</h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <AiOutlineLogout size={20} onClick={logout} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Logout</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
