import { useContext, useEffect, useRef } from "react";
import { PomodoroContext } from "../utils/PomodoroContext";
import PomodoroControls from "./PomodoroControls";
import PomodoroSettings from "./PomodoroSettings";

const PomodoroWidget = () => {
  const {
    play,
    setPlay,
    togglePlay,
    remainingSeconds,
    isRunning,
    setIsRunning,
    // resetTimer,
    handleWorkTimeChange,
    handleBreakTimeChange,
    // handleSettingsSubmit,
    setRemainingSeconds,
    // pomodoroRef,
    onBreak,
    setOnBreak,
    workTime,
    breakTime,
    toggleSettings,
    showSettings,
    showTimer,
    toggleTimer,
  } = useContext(PomodoroContext);
  const pomodoroRef = useRef(null);
  const intervalIdRef = useRef(null);
  let alarm = new Audio("/kitchen-timer.wav");

  useEffect(() => {
    if (pomodoroRef.current) {
      pomodoroRef.current.style.setProperty("--progress", "100%");
    }
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalIdRef.current);
            alarm.play();

            if (!onBreak) {
              // If work timer ends, start break timer
              setOnBreak(true);
              setPlay(true);
              setIsRunning(false);
              setRemainingSeconds(breakTime * 60);
              pomodoroRef.current.style.setProperty("--progress", "100%");
            } else {
              // If break timer ends, reset the cycle
              setOnBreak(false);
              setIsRunning(false);
              setPlay(true);
              setRemainingSeconds(workTime * 60);
              pomodoroRef.current.style.setProperty("--progress", "100%");
            }

            return 0;
          }

          // Calculate percentage of time remaining
          const percentage =
            ((prev - 1) / (onBreak ? breakTime * 60 : workTime * 60)) * 100;
          const duration = workTime * 60;
          // Set the --progress CSS property based on the percentage
          if (pomodoroRef.current) {
            pomodoroRef.current.style.setProperty(
              "--progress",
              `${percentage}%`
            );
            // pomodoroRef.current.style.setProperty("--duration", `${duration}%`);
            // pomodoroRef.current.setAttribute("data-active", "true");
          }
          // if (pomodoroRef.current) {
          //   pomodoroRef.current.style.setProperty("--duration", `${duration}%`);
          // }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalIdRef.current);
    }

    return () => clearInterval(intervalIdRef.current);
  }, [isRunning, onBreak]);

  const resetTimer = () => {
    setRemainingSeconds(workTime * 60);
    if (pomodoroRef.current) {
      pomodoroRef.current.style.setProperty("--progress", "100%");
    }
    setPlay(true);
    setIsRunning(false);
    setOnBreak(false);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    setPlay(true);
    setIsRunning(false);
    setRemainingSeconds(workTime * 60);
    if (pomodoroRef.current) {
      pomodoroRef.current.style.setProperty("--progress", "100%");
    }
  };
  const showStyling = showTimer ? "show" : "hide";
  return (
    <div className={`pomodoro-widget-container ${showStyling}`}>
      <i
        className="fa-solid fa-chevron-right arrow-border"
        onClick={toggleTimer}
      ></i>
      <div
        ref={pomodoroRef}
        className="pomodoro-container"
        aria-valuenow={formatTime(remainingSeconds)}
        data-break={onBreak}
      ></div>
      <PomodoroControls
        play={play}
        onClick={togglePlay}
        onResetClick={resetTimer}
        toggleSettings={toggleSettings}
      />
      {showSettings && (
        <PomodoroSettings
          workTime={workTime}
          breakTime={breakTime}
          handleWorkTimeChange={handleWorkTimeChange}
          handleBreakTimeChange={handleBreakTimeChange}
          handleSettingsSubmit={handleSettingsSubmit}
        />
      )}

      {/* <div
        ref={pomodoroRef}
        className="pomodoro-container"
        aria-valuenow={formatTime(remainingSeconds)}
        data-break={onBreak}
      ></div>
      <PomodoroControls
        play={play}
        onClick={togglePlay}
        onResetClick={resetTimer}
        toggleSettings={toggleSettings}
      />
      {showSettings && (
        <PomodoroSettings
          workTime={workTime}
          breakTime={breakTime}
          handleWorkTimeChange={handleWorkTimeChange}
          handleBreakTimeChange={handleBreakTimeChange}
          handleSettingsSubmit={handleSettingsSubmit}
        />
      )} */}
    </div>
  );
};

export default PomodoroWidget;
