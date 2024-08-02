import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
