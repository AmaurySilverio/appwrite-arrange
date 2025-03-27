import { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";
import { useTheme } from "../utils/ThemeContext";

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  // const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { user, logOutUser } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  const accountClicked = () => {
    setShowDropDown(!showDropDown);
  };
  const handleMenuToggle = () => setMenuToggle(!menuToggle);

  useEffect(() => {
    if (menuToggle) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [menuToggle]);

  useEffect(() => {
    if (location.pathname === "/profile") {
      setHighlight(true);
    } else {
      setHighlight(false);
    }
  }, [location.pathname]);

  const handleLogOut = () => {
    logOutUser(() => navigate("/login"));
  };

  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };
  return (
    <>
      {user ? (
        <div className="navbar-container">
          <Link
            to="/home"
            className="logo"
            onClick={() => setMenuToggle(false)}
          >
            <h1>[arr]ange</h1>
          </Link>
          <div className="menu-icon" onClick={handleMenuToggle}>
            <i className={menuToggle ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <div className="navbar-items">
            <ul className={menuToggle ? "nav-menu active" : "nav-menu"}>
              {/* {navItems.map((item) => (
              <NavLink
                key={item.length}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) => {
                  return isActive ? "highlight" : "";
                }}
              />
            ))} */}
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  !menuToggle && isActive ? "highlight" : ""
                }
                onClick={() => setMenuToggle(false)}
              >
                <li className="item">Home</li>
              </NavLink>
              <NavLink
                to="/board"
                className={({ isActive }) =>
                  !menuToggle && isActive ? "highlight" : ""
                }
                onClick={() => setMenuToggle(false)}
              >
                <li className="item">Board</li>
              </NavLink>
              <NavLink
                to="/contacts"
                className={({ isActive }) =>
                  !menuToggle && isActive ? "highlight" : ""
                }
                onClick={() => setMenuToggle(false)}
              >
                <li className="item">Contacts</li>
              </NavLink>

              <NavLink
                to="/profile"
                className="hide-nav-items"
                onClick={() => setMenuToggle(false)}
              >
                <li className="item">Profile</li>
              </NavLink>
              <div
                className="pointer mode hide-nav-items item"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <>
                    <li>Light Mode</li>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="icon icon-tabler icons-tabler-filled icon-tabler-sun cursor mb02"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                      <path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" />
                      <path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                      <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                      <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                      <path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" />
                      <path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                      <path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                      <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                    </svg>
                  </>
                ) : (
                  <>
                    <li>Dark Mode</li>
                    <i className="fa-solid fa-moon cursor moonAlignment mb02"></i>
                  </>
                )}
              </div>
              <span className="pointer hide-nav-items" onClick={handleLogOut}>
                <li className="item">Log Out</li>
              </span>

              <div
                className="account-wrapper hide-account"
                onMouseLeave={() => setShowDropDown(false)}
              >
                <li
                  className={`item cursor ${
                    !menuToggle && highlight ? "highlight" : ""
                  }`}
                  onClick={accountClicked}
                >
                  Account
                  {showDropDown && (
                    <div className="account-dropdown-container">
                      <Link to="/profile" className="dropdown-item">
                        <span className="item">Profile</span>
                      </Link>
                      <div
                        className="dropdown-item mode"
                        onClick={toggleDarkMode}
                      >
                        {isDarkMode ? (
                          <>
                            <span>Light Mode</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="icon icon-tabler icons-tabler-filled icon-tabler-sun cursor"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M12 19a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                              <path d="M18.313 16.91l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.218 -1.567l.102 .07z" />
                              <path d="M7.007 16.993a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                              <path d="M4 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                              <path d="M21 11a1 1 0 0 1 .117 1.993l-.117 .007h-1a1 1 0 0 1 -.117 -1.993l.117 -.007h1z" />
                              <path d="M6.213 4.81l.094 .083l.7 .7a1 1 0 0 1 -1.32 1.497l-.094 -.083l-.7 -.7a1 1 0 0 1 1.217 -1.567l.102 .07z" />
                              <path d="M19.107 4.893a1 1 0 0 1 .083 1.32l-.083 .094l-.7 .7a1 1 0 0 1 -1.497 -1.32l.083 -.094l.7 -.7a1 1 0 0 1 1.414 0z" />
                              <path d="M12 2a1 1 0 0 1 .993 .883l.007 .117v1a1 1 0 0 1 -1.993 .117l-.007 -.117v-1a1 1 0 0 1 1 -1z" />
                              <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>Dark Mode</span>
                            <i className="fa-solid fa-moon cursor moonAlignment"></i>
                          </>
                        )}
                      </div>
                      <div className="dropdown-item" onClick={handleLogOut}>
                        <span className="item">Log Out</span>
                      </div>
                    </div>
                  )}
                </li>
              </div>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-container">
          <Link to="/" className="logo">
            <h1>[arr]ange</h1>
          </Link>
        </div>
      )}
    </>
  );
};

export default Navbar;
