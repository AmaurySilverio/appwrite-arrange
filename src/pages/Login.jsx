import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../utils/AuthProvider";
import Navbar from "../components/Navbar";

const Login = () => {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();

  const loginForm = useRef(null);

  useEffect(() => {
    if (user === true) {
      console.log(user);
      navigate("/");
    }
  }, [user, navigate]);

  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");

  const onEmailInputChange = (e) => {
    setEmailInputValue(e.target.value);
  };
  const onPasswordInputChange = (e) => {
    setPasswordInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;

    const userInfo = { email, password };
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
                value={emailInputValue}
                onChange={onEmailInputChange}
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
                value={passwordInputValue}
                onChange={onPasswordInputChange}
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
