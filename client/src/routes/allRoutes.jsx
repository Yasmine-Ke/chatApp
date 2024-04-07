import Chat from "../pages/Chat";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";
import Register from "../pages/Register";
const authProtectedRoutes = [
  {
    component: <Chat />,
    path: "/chat",
  },

  {
    path: "/",
    exact: true,
    component: <Navigate to="/chat" />,
  },
];

const publicRoutes = [
  {
    path: "/",
    exact: true,
    component: <Navigate to="/login" />,
  },
  { component: <Login />, path: "/login" },
  { component: <Register />, path: "/register" },
];
export { authProtectedRoutes, publicRoutes };
