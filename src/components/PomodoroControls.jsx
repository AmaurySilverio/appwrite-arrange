import React from "react";

const PomodoroControls = ({ play, onClick, onStopClick }) => {
  const playToggle = play ? "fa-play" : "fa-pause";
  return (
    <>
      <div className="controls-container">
        <i
          className={`fa-solid ${playToggle} size`}
          style={{ color: "#7d7d7d" }}
          onClick={onClick}
        ></i>
        <i
          className="fa-solid fa-stop size"
          style={{ color: "#7d7d7d" }}
          onClick={onStopClick}
        ></i>
        <i
          className="fa-solid fa-rotate-left size"
          style={{ color: "#7d7d7d" }}
          onClick={onStopClick}
        ></i>
      </div>
    </>
  );
};

export default PomodoroControls;
