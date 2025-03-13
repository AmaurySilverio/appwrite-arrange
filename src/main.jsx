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
import AuthProvider from "./utils/AuthProvider.jsx";
import PomodoroProvider from "./utils/PomodoroContext.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/board",
    element: (
      <ProtectedRoute>
        <Board />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/contacts",
    element: (
      <ProtectedRoute>
        <Contacts />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
    errorElement: <NotFound />,
  },
  {
    path: "/aboutUs",
    element: <AboutUs />,
    errorElement: <NotFound />,
  },
  {
    path: "/contact",
    element: <Contact />,
    errorElement: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PomodoroProvider>
      <RouterProvider router={router} />
    </PomodoroProvider>
  </AuthProvider>
);
