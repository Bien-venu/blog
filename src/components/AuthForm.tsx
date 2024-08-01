import { useState } from "react";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (username: string, password: string, confirmPassword?: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ mode, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password, confirmPassword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="mt-1 h-10 w-full rounded font-medium"
        >
          Username
        </label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          required
          className="mt-1 h-10 px-2 w-full rounded border border-gray"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="mt-1 h-10 w-full rounded font-medium"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          className="mt-1 h-10 px-2 w-full rounded border border-gray"
        />
      </div>
      {mode === "register" && (
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="mt-1 h-10 w-full rounded font-medium "
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="mt-1 h-10 px-2 w-full rounded border border-gray"
          />
        </div>
      )}
      <button
        type="submit"
        className="w-full flex justify-center h-12 items-center border rounded-xl text-base font-medium text-white bg-btn "
      >
        {mode === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default AuthForm;
