import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useAuth } from "../utils/AuthProvider";

const LandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);

  return (
    <>
      <div className="landing-page-container">
        <div className="landing-page-header-container">
          <h1>Welcome to [Arr]ange!</h1>
          <div className="landing-page-content">
            <div className="landing-page-text">
              <p className="landing-page-medium-text">
                Your all-in-one platform to track job applications, manage
                documents, and stay on top of your career goals.
              </p>
              <p>Job hunting, arranged your way.</p>
            </div>
            <div className="landing-page-btns">
              <Link to="/signUp">
                <Button className="landing-btns">Sign Up</Button>
              </Link>
              <Link to="/login">
                <Button className="landing-btns">Log In</Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
