import { FaPlay, FaPause, FaSyncAlt } from "react-icons/fa";

function Controls({ setStarted, onReset }) {
  const handleStartStop = () => {
    setStarted((started) => !started);
  };

  return (
    <div className="controls">
      <button className="start-stop" onClick={handleStartStop}>
        <FaPlay />
        <FaPause />
      </button>
      <button className="reset">
        <FaSyncAlt onClick={onReset} />
      </button>
    </div>
  );
}

export default Controls;
