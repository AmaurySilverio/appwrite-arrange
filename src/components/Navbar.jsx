import { useState, useEffect } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [menuToggle, setMenuToggle] = useState(false);
  const navigate = useNavigate();
  const { user, logOutUser } = useAuth();

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
