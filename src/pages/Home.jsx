import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToDoList from "../components/ToDoList";
import Pomodoro from "../components/Pomodoro";
import PomodoroTitle from "../components/PomodoroTitle";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="home-container">
        <div className="pomodoro-wrapper">
          <PomodoroTitle />
          <Pomodoro />
        </div>
        <div className="to-do-list-wrapper">
          <ToDoList />
        </div>
      </main>
      {/* <div className="interactive">
        <p>
          interactive aspect where users can see how many people are 'online'
          working on their job boards. I'm not sure how it will be displayed yet
          but I want it to be something visually engaging. Maybe A piggy bank
          that fills up with 1 coin everytime someone adds a job or contact.
          Resets every 24 hours. "# people invested in their future today. Don't
          get got, go get. Keep pushing!"
        </p>
      </div> */}
      <Footer />
    </>
  );
};

export default Home;
