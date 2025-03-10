import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const [locationStyling, setLocationStyling] = useState("footer-wrapper");

  useEffect(() => {
    if (location.pathname === "/") {
      setLocationStyling("landing-page-footer-wrapper");
    }
  }, [location.pathname]);

  return (
    <>
      <div className={locationStyling}>
        <div className="footer-container">
          <div className="footer-links-container">
            <ul className="footer-links">
              <Link to="/AboutUs">
                <li>About Us</li>
              </Link>
              <Link to="/Contact">
                <li>Contact</li>
              </Link>
            </ul>
          </div>
          <span>© {new Date().getFullYear()} Arrange</span>
        </div>
      </div>
    </>
  );
};

export default Footer;
