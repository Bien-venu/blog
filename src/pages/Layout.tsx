import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen gap-4">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
