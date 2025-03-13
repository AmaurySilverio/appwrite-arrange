import { createContext, useState, useEffect, useRef } from "react";

export const PomodoroContext = createContext();

const PomodoroProvider = ({ children }) => {
  const [play, setPlay] = useState(true);
  const [workTime, setWorkTime] = useState(45);
  const [breakTime, setBreakTime] = useState(15);
  const [remainingSeconds, setRemainingSeconds] = useState(workTime * 60);
  const [onBreak, setOnBreak] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const pomodoroRef = useRef(null);
  const intervalIdRef = useRef(null);
  let alarm = new Audio("/kitchen-timer.wav");

  // useEffect(() => {
  //   if (pomodoroRef.current) {
  //     pomodoroRef.current.style.setProperty("--progress", "100%");
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isRunning) {
  //     intervalIdRef.current = setInterval(() => {
  //       setRemainingSeconds((prev) => {
  //         if (prev <= 1) {
  //           clearInterval(intervalIdRef.current);
  //           alarm.play();

  //           if (!onBreak) {
  //             // If work timer ends, start break timer
  //             setOnBreak(true);
  //             setPlay(true);
  //             setIsRunning(false);
  //             setRemainingSeconds(breakTime * 60);
  //             pomodoroRef.current.style.setProperty("--progress", "100%");
  //           } else {
  //             // If break timer ends, reset the cycle
  //             setOnBreak(false);
  //             setIsRunning(false);
  //             setPlay(true);
  //             setRemainingSeconds(workTime * 60);
  //             pomodoroRef.current.style.setProperty("--progress", "100%");
  //           }

  //           return 0;
  //         }

  //         // Calculate percentage of time remaining
  //         const percentage =
  //           ((prev - 1) / (onBreak ? breakTime * 60 : workTime * 60)) * 100;

  //         // Set the --progress CSS property based on the percentage
  //         if (pomodoroRef.current) {
  //           pomodoroRef.current.style.setProperty(
  //             "--progress",
  //             `${percentage}%`
  //           );
  //         }
  //         return prev - 1;
  //       });
  //     }, 1000);
  //   } else {
  //     clearInterval(intervalIdRef.current);
  //   }

  //   return () => clearInterval(intervalIdRef.current);
  // }, [isRunning, onBreak]);

  // const handleSettingsSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Henny");
  //   setPlay(true);
  //   setIsRunning(false);
  //   setRemainingSeconds(workTime * 60);
  //   if (pomodoroRef.current) {
  //     pomodoroRef.current.style.setProperty("--progress", "100%");
  //   }
  // };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };
  const toggleTimer = () => {
    setShowTimer(!showTimer);
  };

  const togglePlay = () => {
    setPlay((prevPlay) => {
      const newPlay = !prevPlay;

      if (newPlay) {
        setIsRunning(false);
      } else {
        setIsRunning(true);
      }

      return newPlay; // Update play state
    });
  };

  // const resetTimer = () => {
  //   console.log("reset");
  //   setRemainingSeconds(workTime * 60);
  //   if (pomodoroRef.current) {
  //     pomodoroRef.current.style.setProperty("--progress", "100%");
  //   }
  //   setPlay(true);
  //   setIsRunning(false);
  //   setOnBreak(false);
  // };
  const handleWorkTimeChange = (e) => {
    setWorkTime(e.target.value);
  };
  const handleBreakTimeChange = (e) => {
    setBreakTime(e.target.value);
  };

  return (
    <PomodoroContext.Provider
      value={{
        play,
        setPlay,
        togglePlay,
        workTime,
        breakTime,
        setWorkTime,
        setBreakTime,
        remainingSeconds,
        setRemainingSeconds,
        isRunning,
        setIsRunning,
        onBreak,
        setOnBreak,
        // resetTimer,
        handleWorkTimeChange,
        handleBreakTimeChange,
        toggleSettings,
        showSettings,
        showTimer,
        toggleTimer,
        // handleSettingsSubmit,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

export default PomodoroProvider;
