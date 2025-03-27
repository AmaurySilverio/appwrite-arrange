import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../utils/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();

  const loginForm = useRef(null);

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = loginForm.current.email.value.trim();
    const password = loginForm.current.password.value;

    const userInfo = { email, password };
    // console.log("Submitting login:", userInfo);
    loginUser(userInfo);
  };
  return (
    <>
      <Navbar />
      <main className="login-container">
        <form ref={loginForm} onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-input-data-full-width">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                placeholder="john@gmail.com"
                name="email"
                required
              />
            </div>
            <div className="form-input-data-full-width">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="********"
                name="password"
                minLength="8"
                required
              />
            </div>
          </div>
          <div className="login-form-buttons">
            <Button type="submit" className={"form-btn"}>
              Log In
            </Button>
          </div>
          <p>
            Don't have an account? <Link to="/signUp">Sign Up</Link>.
          </p>
          <p>
            Or go <Link to="/">home</Link>.
          </p>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Login;
