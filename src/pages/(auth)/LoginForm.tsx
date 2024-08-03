import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import api from "../../api";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const LoginPage = () => {
    const { setUser } = useAppContext();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  // Function to handle user login
  const handleLogin = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/login`,
        {
          username,
          password,
        }
      );
      setIsLoading(false);
      toast("Login successful!");
      
      setUser({ token: response.data.token, loginTime: new Date() });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Login failed:", error.response?.data || error.message);
        toast(error.response?.data.error || "Login failed. Please try again.");
        setIsLoading(false);
      } else {
        console.error("Unexpected error:", error);
        toast("An unexpected error occurred. Please try again.");
        setIsLoading(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <div className="flex items-center flex-col gap-2 mb-6">
          <h1 className="text-2xl font-semibold text-black">Login</h1>
          <Link
            to="/"
            className="text-sm hover:underline text-more font-medium"
          >
            Navigate Back to the Blog Main Page
          </Link>
        </div>
        <AuthForm mode="login" onSubmit={handleLogin} loading={isLoading} />
        <p className="flex gap-1 justify-center items-center mt-4">
          Don't have an account?
          <Link to="/register" className="text-more font-semibold">
            Sign up for Free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
