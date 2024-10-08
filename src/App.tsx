import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/(auth)/LoginForm";
import RegistrationPage from "./pages/(auth)/RegistrationForm";
import BlogList from "./pages/blog/BlogList";
import Layout from "./pages/Layout";
import AuthLayout from "./pages/(auth)/AuthLayout";
import BlogDetails from "./pages/blog/BlogDetails";
import Add from "./components/Add";
import Edit from "./components/Edit";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<BlogList />} />
          <Route path="/blog/:cardId" element={<BlogDetails />} />
          <Route path="/add" element={<Add />} />
          <Route path="/edit/:cardId" element={<Edit />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
