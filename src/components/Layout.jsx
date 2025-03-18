import { Outlet } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import PomodoroWidget from "./PomodoroWidget";
import PomodoroProvider from "../utils/PomodoroContext";

const Layout = () => {
  const { user } = useAuth();
  return (
    <div className="layout-container">
      {user && (
        <PomodoroProvider>
          <PomodoroWidget />
        </PomodoroProvider>
      )}
      {/* <PomodoroProvider>
        <PomodoroWidget />
      </PomodoroProvider> */}
      <Outlet />
    </div>
  );
};

export default Layout;
