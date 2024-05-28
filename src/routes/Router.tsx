import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import AuthenticatedLayout from "../templates/AuthenticatedLayout";
import NotAuthenticatedLayout from "../templates/NotAuthenticatedLayout";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import Profile from "../pages/Profile";
import RecoverPassword from "../pages/RecoverPassword";
import Tasks from "../pages/Tasks";
import { TimeKeeping } from "../pages/TimeKeeping";
import KanbanBoard from "../pages/KanbanBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <AuthenticatedLayout />,
        children: [
          { path: "/", element: <Home /> },
          { path: "/profile", element: <Profile /> },
          { path: "/tasks", element: <Tasks /> },
          { path: "/time-keeping", element: <TimeKeeping /> },
          { path: "/kanban-board", element: <KanbanBoard /> },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <PublicRoute />,
    children: [
      {
        path: "",
        element: <NotAuthenticatedLayout />,
        children: [{ path: "", element: <Login /> }],
      },
    ],
  },
  {
    path: "/register",
    element: <NotAuthenticatedLayout />,
    children: [{ path: "/register", element: <Register /> }],
  },
  {
    path: "/recover-password",
    element: <NotAuthenticatedLayout />,
    children: [{ path: "/recover-password", element: <RecoverPassword /> }],
  },
  {
    path: "*",
    element: <NotFound />,
    children: [{ path: "not-found", element: <NotFound /> }],
  },
]);

const Routes: React.FC = () => <RouterProvider router={router} />;

export default Routes;
