import React from "react";

const PomodoroControls = ({ play, onClick, onResetClick, toggleSettings }) => {
  const playToggle = play ? "fa-play" : "fa-pause";
  const colorToggle = play ? "green" : "red";
  return (
    <>
      <div className="controls-container">
        <i
          className={`fa-solid ${playToggle} size`}
          style={{ color: `${colorToggle}` }}
          onClick={onClick}
        ></i>
        {/* <i
          className="fa-solid fa-stop size"
          style={{ color: "#7d7d7d" }}
          onClick={onStopClick}
        ></i> */}
        <i
          className="fa-solid fa-rotate-left size"
          style={{ color: "blue" }}
          onClick={onResetClick}
        ></i>
        <i
          className="fa-solid fa-gear size"
          style={{ color: "#7D7D7D" }}
          onClick={toggleSettings}
        ></i>
      </div>
    </>
  );
};

export default PomodoroControls;
