import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleFormSubmit = () => {
    console.log("hello");
  };
  return (
    <>
      <Navbar />
      <main className="about-us-container">
        <section>
          <h3>Reach Out</h3>
          <p>
            I would love to hear about your experience on [arr]ange. Please fill
            out the form below or email me at{" "}
            <a href="mailto:amaurycodes@gmail.com">amaurycodes@gmail.com</a>.
          </p>
          <form onSubmit={handleFormSubmit} className="reach-out-form">
            <label htmlFor="name">Name:</label>
            <input type="text" name="name" placeholder="Joan Baez" />
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" placeholder="Joan@gmail.com" />
            <label htmlFor="message">Message:</label>
            <textarea
              type="text"
              name="message"
              rows="6"
              placeholder="Message here"
            />
            <Button>Submit</Button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
