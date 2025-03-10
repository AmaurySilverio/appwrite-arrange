import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useAuth } from "../utils/AuthProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SignUp = () => {
  const registerForm = useRef(null);
  const { user, registerUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = registerForm.current.firstName.value.trim();
    const lastName = registerForm.current.lastName.value.trim();
    const name = `${firstName} ${lastName}`;
    const email = registerForm.current.email.value.trim();
    const password1 = registerForm.current.password1.value;
    const password2 = registerForm.current.password2.value;
    if (password1 !== password2) {
      alert("Passwords do not Match!");
    }
    const userInfo = { name, email, password1, password2 };
    registerUser(userInfo);
  };
  return (
    <>
      <Navbar />
      <main className="sign-up-container">
        <form ref={registerForm} onSubmit={handleSubmit}>
          <div className="form-content">
            <div className="form-top">
              <div className="form-input-data-half-width">
                <label htmlFor="first-name">First Name:</label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="Amaury"
                  name="firstName"
                  required
                />
              </div>
              <div className="form-input-data-half-width">
                <label htmlFor="last-name">Last Name:</label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Silverio"
                  name="lastName"
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
                name="password1"
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
                name="password2"
                minLength="8"
                required
              />
            </div>
          </div>
          <div className="login-form-buttons">
            <Button type="submit">Sign Up</Button>
          </div>
          <p>
            Already have an account? <Link to="/login">Log In</Link>.
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

export default SignUp;
