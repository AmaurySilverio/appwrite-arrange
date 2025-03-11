import { useState, useEffect, useRef } from "react";
import PomodoroControls from "./PomodoroControls";
import PomodoroSettings from "./PomodoroSettings";

const Pomodoro = () => {
  const [play, setPlay] = useState(true);
  const [workTimer, setWorkTimer] = useState("00:45:00");
  const [breakTimer, setBreakTimer] = useState("00:15:00");
  const [workTime, setWorkTime] = useState(45);
  const [breakTime, setBreakTime] = useState(15);
  const pomodoroRef = useRef(null);

  useEffect(() => {
    if (pomodoroRef.current) {
      pomodoroRef.current.style.setProperty("--progress", "100%");
    }
  }, []);
  const formatTime = (minutes) => {
    const timeParts = [
      Math.floor(minutes / 60), // Hours
      minutes % 60, // Minutes
      0, // Seconds
    ].map((unit) => String(unit).padStart(2, "0"));

    return timeParts.join(":");
  };
  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    console.log("Henny");

    setWorkTimer(formatTime(workTime));
    setBreakTimer(formatTime(breakTime));
    // if (pomodoroRef.current) {
    //   pomodoroRef.current.style.setProperty("--progress", "100%");
    // }
    // pomodoro-contianer.style.setProperty("--progress", workTime + "%")
  };

  const togglePlay = () => {
    setPlay(!play);
    // if (pomodoroRef.current) {
    //   pomodoroRef.current.style.setProperty("--progress", workTime + "%");
    // }
  };
  const onStopClick = () => {
    console.log("Holla");
  };
  const handleWorkTimeChange = (e) => {
    setWorkTime(e.target.value);
  };
  const handleBreakTimeChange = (e) => {
    setBreakTime(e.target.value);
  };

  return (
    <>
      <div
        ref={pomodoroRef}
        className="pomodoro-container"
        aria-valuenow={workTimer}
      ></div>
      <PomodoroControls
        play={play}
        onClick={togglePlay}
        onStopClick={onStopClick}
      />
      <PomodoroSettings
        workTime={workTime}
        breakTime={breakTime}
        handleWorkTimeChange={handleWorkTimeChange}
        handleBreakTimeChange={handleBreakTimeChange}
        handleSettingsSubmit={handleSettingsSubmit}
      />
    </>
  );
};

export default Pomodoro;
