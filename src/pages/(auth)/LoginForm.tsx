import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    // Handle login logic here
    // On success:
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center text-base justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-2/5 space-y-8 bg-white p-8 rounded">
        <h1 className="mt-6 text-center text-2xl font-semibold text-black">
          Login
        </h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        <p className=" flex gap-1 justify-center items-center">
          Don't have an account?
          <Link
            to="/register"
            className=" text-btn tracking-tighter font-semibold"
          >
            Sign up for Free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
