import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const AboutUs = () => {
  return (
    <>
      <Navbar />
      <main className="about-us-container">
        <section>
          <p>
            Hello, My name is{" "}
            <a href="https://amaurycodes.onrender.com/" target="_blank">
              Amaury
            </a>
            , the engineer behind [arr]ange. The idea for [arr]ange first took
            root during a hackathon with{" "}
            <a href="https://100devs.org/about" target="_blank">
              100Devs
            </a>
            . The challenge was simple: build something awesome using{" "}
            <a href="https://appwrite.io/" target="_blank">
              Appwrite
            </a>
            .
          </p>
          <p>
            I set out to create something useful for the 100Devs community — a
            tool to make the daunting job search process a little less
            overwhelming. That’s how [arr]ange, a simple and effective job
            application tracker, was born.
          </p>
          <p>
            While originally designed for 100Devs, my hope is that [arr]ange
            helps anyone who needs it. If you’re currently on the hunt, I hope
            this tool makes the process smoother and less stressful. Good luck —
            I’m rooting for you!
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
