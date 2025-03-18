import ReactDOM from "react-dom/client";
import Board from "./pages/Board.jsx";
import Contacts from "./pages/Contacts.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFound from "./pages/NotFound.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import Layout from "./components/Layout.jsx";
import AuthProvider from "./utils/AuthProvider.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <LandingPage /> },
      { path: "/login", element: <Login /> },
      { path: "/signUp", element: <SignUp /> },
      { path: "/aboutUs", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/board",
        element: (
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contacts",
        element: (
          <ProtectedRoute>
            <Contacts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
