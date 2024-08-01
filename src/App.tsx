import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/(auth)/LoginForm";
import RegistrationPage from "./pages/(auth)/RegistrationForm";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<PostList />} /> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
