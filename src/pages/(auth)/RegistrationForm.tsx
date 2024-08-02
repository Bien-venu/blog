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
    confirmPassword?: string
  ) => {
    setIsLoading(true);
    if (password !== confirmPassword) {
      toast("Passwords do not match!");
      return;
    }

    try {
      const response = await api.post(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/auth/register`,
        {
          username,
          password,
        }
      );
      console.log("Registration successful:", response.data);
      toast("Registration successful!");
      navigate("/login");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(
          "Registration failed:",
          error.response?.data || error.message
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <div className="flex items-center flex-col gap-2 mb-6">
          <h1 className="text-2xl font-semibold text-black">Register</h1>
          <Link
            to="/"
            className="text-sm hover:underline text-more font-medium"
          >
            Navigate Back to the Blog Main Page
          </Link>
        </div>
        <AuthForm
          mode="register"
          onSubmit={handleRegister}
          loading={isLoading}
        />
        <p className="flex gap-1 justify-center items-center mt-4">
          Already have an account?
          <Link to="/login" className="text-more font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
