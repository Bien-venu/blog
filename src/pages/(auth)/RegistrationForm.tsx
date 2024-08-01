import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../components/AuthForm";

const RegistrationPage = () => {
  const navigate = useNavigate();

  const handleRegister = (
    email: string,
    password: string,
    confirmPassword?: string
  ) => {
    // Handle registration logic here
    // On success:
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center text-base justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-2/5 space-y-8 bg-white p-8 rounded">
        <h1 className="mt-6 text-center text-2xl font-semibold text-black">
          Register
        </h1>
        <AuthForm mode="register" onSubmit={handleRegister} />
        <p className="flex gap-1 justify-center items-center">
          Already have an account?
          <Link to="/login" className=" text-btn font-semibold tracking-tighter">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
