import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";

const SignUp = () => {
  const [firstNameInputValue, setFirstNameInputValue] = useState("");
  const [lastNameInputValue, setLastNameInputValue] = useState("");
  const [emailInputValue, setEmailInputValue] = useState("");
  const [passwordInputValue, setPasswordInputValue] = useState("");
  const [confirmPasswordInputValue, setConfirmPasswordInputValue] =
    useState("");

  const onFirstNameInputChange = (e) => {
    setFirstNameInputValue(e.target.value);
  };
  const onLastNameInputChange = (e) => {
    setLastNameInputValue(e.target.value);
  };
  const onEmailInputChange = (e) => {
    setEmailInputValue(e.target.value);
  };
  const onPasswordInputChange = (e) => {
    setPasswordInputValue(e.target.value);
  };
  const onConfirmPasswordInputChange = (e) => {
    setConfirmPasswordInputValue(e.target.value);
  };
  return (
    <>
      <Navbar />
      <div className="sign-up-container">
        <form>
          <div className="form-content">
            <div className="form-top">
              <div className="form-input-data-half-width">
                <label htmlFor="first-name">First Name:</label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="Amaury"
                  value={firstNameInputValue}
                  onChange={onFirstNameInputChange}
                  required
                />
              </div>
              <div className="form-input-data-half-width">
                <label htmlFor="last-name">Last Name:</label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Silverio"
                  value={lastNameInputValue}
                  onChange={onLastNameInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-input-data-full-width">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                placeholder="john@gmail.com"
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
                value={passwordInputValue}
                onChange={onPasswordInputChange}
                minLength="8"
                required
              />
            </div>
            <div className="form-input-data-full-width">
              <label htmlFor="confirm-password">Confirm Password:</label>
              <input
                type="password"
                id="confirm-password"
                placeholder="********"
                value={confirmPasswordInputValue}
                onChange={onConfirmPasswordInputChange}
                minLength="8"
                required
              />
            </div>
          </div>
          <div className="login-form-buttons">
            <Button type="submit">Sign Up</Button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <p>
            Or go <Link to="/landingPage">home</Link>.
          </p>
        </form>
      </div>
    </>
  );
};

export default SignUp;
