import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Notification from "../components/Notification";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [modal, setModal] = useState(false);
  const [messageSent, setMessageSent] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY), []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: name,
          email: email,
          title: title,
          message: message,
        }
      );
      setModal(true);
      setMessageSent("We will get back to you soon.");
      setTimeout(() => {
        setModal(false);
        setMessageSent("");
      }, 5000);
      setName("");
      setEmail("");
      setTitle("");
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  return (
    <>
      <Navbar />
      <main className="reach-out-container">
        <section>
          <h1>Reach Out</h1>
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
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                name="title"
                placeholder="This feature would be great for [arr]ange!"
                required
                onChange={handleTitleChange}
                value={title}
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
            <Button className={"form-btn"} type={"submit"}>
              Send Message
            </Button>
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
