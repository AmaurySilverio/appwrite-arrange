import Button from "./Button";

const PomodoroSettings = ({
  workTime,
  breakTime,
  handleBreakTimeChange,
  handleWorkTimeChange,
  handleSettingsSubmit,
}) => {
  return (
    <div className="settings-container">
      <h3>Settings</h3>
      <p>Time (minues)</p>
      <form className="settings-form" onSubmit={handleSettingsSubmit}>
        <div className="settings-content">
          <div className="settings-input">
            <label htmlFor="work">Work:</label>
            <input
              name="work"
              type="number"
              min="1"
              max="120"
              value={workTime}
              onChange={handleWorkTimeChange}
            />
          </div>
          <div className="settings-input">
            <label htmlFor="break">Break:</label>
            <input
              name="break"
              type="number"
              min="1"
              max="120"
              value={breakTime}
              onChange={handleBreakTimeChange}
            />
          </div>
        </div>
        <Button type="submit">Set Pomodoro</Button>
      </form>
    </div>
  );
};

export default PomodoroSettings;
