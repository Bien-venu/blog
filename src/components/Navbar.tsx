import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAppContext } from "../context/AppContext";
import { AiOutlineLogout } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";

interface UserPayload {
  userId: number;
  username: string;
  // Add other properties if necessary
}

const Navbar = () => {
  const { user } = useAppContext();

  let userDetails: UserPayload | null = null;
  if (user?.token) {
    try {
      userDetails = jwtDecode<UserPayload>(user.token);
    } catch (error) {
      console.error("Invalid token", error);
    }
  }

  // Function to handle user logout
  const logout = () => {};

  return (
    <div className="flex items-center justify-between border-b border-gray p-2 px-8 text-base font-semibold sm:px-20 xl:px-72">
      <div className="w-20">
        <img
          src="https://res.cloudinary.com/dxbeayp6k/image/upload/v1722614758/DotBlog_domain_logo_niuc95.png"
          alt=""
        />
      </div>
      <div className="flex gap-4 text-xs">
        {user === null ? (
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
          <div className="flex items-center gap-2 font-medium">
            <div className="h-6 w-6">
              <img
                src="https://res.cloudinary.com/dxbeayp6k/image/upload/v1722614661/pngwing.com_vrgzvz.png"
                alt=""
                className="h-full w-full"
              />
            </div>
            <h1 className="text-sm">{userDetails?.username}</h1>
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
        )}
      </div>
    </div>
  );
};

export default Navbar;
