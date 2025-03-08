import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../utils/AuthProvider";
import Navbar from "../components/Navbar";

const Login = () => {
  const { user, loginUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const loginForm = useRef(null);

  // useEffect(() => {
  //   if (!isLoading && user) {
  //     console.log("Navigating to home...");
  //     navigate("/");
  //   }
  // }, [user, navigate, isLoading]);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = loginForm.current.email.value.trim();
    const password = loginForm.current.password.value;

    const userInfo = { email, password };
    console.log("Submitting login:", userInfo);
    loginUser(userInfo);
  };
  return (
    <>
      <Navbar />
      <div className="login-container">
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
            <Button type="submit">Login</Button>
          </div>
          <p>
            Don't have an account? <Link to="/signUp">Register</Link>.
          </p>
          <p>
            Or go <Link to="/landingPage">home</Link>.
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
