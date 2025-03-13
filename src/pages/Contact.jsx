import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Notification from "../components/Notification";
import { useState } from "react";

const Contact = () => {
  const [modal, setModal] = useState(false);
  const [messageSent, setMessageSent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    setName("");
    setEmail("");
    setMessage("");

    setModal(true);
    setMessageSent("We will get back to you soon.");
    setTimeout(() => {
      setModal(false);
      setMessageSent("");
    }, 5000);
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      <Navbar />
      <main className="reach-out-container">
        <section>
          <h2>Reach Out</h2>
          <p>
            I would love to hear about your experience on [arr]ange. Please fill
            out the form below or email me at{" "}
            <a href="mailto:amaurycodes@gmail.com">amaurycodes@gmail.com</a>.
          </p>
          <form onSubmit={handleFormSubmit} className="reach-out-form">
            <div className="reach-out-form-width">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Joan Baez"
                required
                onChange={handleNameChange}
                value={name}
              />
            </div>
            <div className="reach-out-form-width">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                placeholder="Joan@gmail.com"
                required
                onChange={handleEmailChange}
                value={email}
              />
            </div>
            <div className="reach-out-form-width">
              <label htmlFor="message">Message:</label>
              <textarea
                type="text"
                name="message"
                rows="6"
                placeholder="Message here"
                required
                onChange={handleMessageChange}
                value={message}
              />
            </div>
            <Button>Send Message</Button>
          </form>
        </section>
      </main>
      <Notification
        openModal={modal}
        closeModal={() => setModal(false)}
        message={messageSent}
        title="Message Sent"
      />
      <Footer />
    </>
  );
};

export default Contact;
