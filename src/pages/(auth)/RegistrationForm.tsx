import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";
import api from "../../api";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useState } from "react";

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (
    username: string,
    password: string,
    confirmPassword?: string,
  ) => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      toast("Passwords do not match!");
      return;
    }

    try {
      await api.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/register`,
        {
          username,
          password,
        },
      );
      toast("Registration successful!");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(
          "Registration failed:",
          error.response?.data || error.message,
        );
        toast(error.response?.data.error);
      } else {
        console.error("Unexpected error:", error);
        toast("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md rounded bg-white p-8 shadow">
        <div className="mb-6 flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold text-black">Register</h1>
          <Link
            to="/"
            className="text-sm font-medium text-more hover:underline"
          >
            Navigate Back to the Blog Main Page
          </Link>
        </div>
        <AuthForm
          mode="register"
          onSubmit={handleRegister}
          loading={isLoading}
        />
        <p className="mt-4 flex items-center justify-center gap-1">
          Already have an account?
          <Link to="/login" className="font-semibold text-more">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
