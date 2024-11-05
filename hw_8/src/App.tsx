import { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StripePage from "./layouts/StripePage/StripePage";
import LoginPage from "./layouts/LoginPage/LoginPage";
import RegisterPage from "./layouts/RegisterPage/RegisterPage";
import HomePage from "./layouts/HomePage/HomePage";
import NewPost from "./layouts/NewPost/NewPost";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StripePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/new-post"
          element={
            <PrivateRoute>
              <NewPost />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
