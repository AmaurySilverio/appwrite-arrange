import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToDoList from "../components/ToDoList";
import PomodoroTitle from "../components/PomodoroTitle";
import WelcomeMessage from "../components/WelcomeMessage";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="home-container">
        {/* <div className="pomodoro-wrapper">
          <PomodoroTitle />
          <Pomodoro />
        </div> */}
        <div className="home-left-content">
          <div className="pomodoro-wrapper">
            <PomodoroTitle />
          </div>
          <div className="welcome-message">
            <WelcomeMessage />
          </div>
        </div>
        <div className="to-do-list-wrapper">
          <ToDoList />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
