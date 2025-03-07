import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="hero-container">
        <div className="pomodoro">
          Pomodoro that turns into a widget that follows you from page to page.
        </div>
        <div className="to-do-list">To-do list</div>
      </div>
      <div className="interactive">
        <p>
          interactive aspect where users can see how many people are 'online'
          working on their job boards. I'm not sure how it will be displayed yet
          but I want it to be something visually engaging. Maybe A piggy bank
          that fills up with 1 coin everytime someone adds a job or contact.
          Resets every 24 hours. "# people invested in their future today. Don't
          get got, go get. Keep pushing!"
        </p>
      </div>

      {/* <h5>100Devs Job tracking application. Keep track of employers,</h5> */}
    </>
  );
};

export default Home;
