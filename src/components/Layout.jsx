import { Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import PomodoroWidget from "./PomodoroWidget";
import PomodoroProvider from "../utils/PomodoroContext";
import { ThemeProvider } from "../utils/ThemeContext";

const Layout = () => {
  const { user } = useAuth();
  return (
    <ThemeProvider>
      <div className="layout-container">
        {user && (
          <PomodoroProvider>
            <PomodoroWidget />
          </PomodoroProvider>
        )}
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export default Layout;
