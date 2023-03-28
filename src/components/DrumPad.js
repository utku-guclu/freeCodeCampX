import { useRef, useState, useEffect } from "react";

function DrumPad({
  power,
  instrumentName,
  keyTrigger,
  keyCode,
  audioUrl,
  soundLevel,
  setMessage,
}) {
  const [hit, setHit] = useState(false);
  const audioRef = useRef();

  useEffect(() => {
    const audioEl = audioRef.current;
    audioEl.volume = soundLevel;
  }, [soundLevel]);

  useEffect(() => {
    if (power === "L") {
      const audioEl = audioRef.current;
      audioEl.pause();
      audioEl.currentTime = 0;
    }
  }, [power]);

  useEffect(() => {
    function handleKeydown(event) {
      if (event.keyCode === keyCode) {
        playSound();
      }
    }
    document.addEventListener("keydown", handleKeydown);

    return function cleanup() {
      document.removeEventListener("keydown", handleKeydown);
    };
  });

  const playSound = () => {
    setHit(true);
    setTimeout(() => setHit(false), 100);

    if (power === "R") {
      setMessage(instrumentName);
      const audioEl = audioRef.current;
      audioEl.currentTime = 0;
      audioEl.play();
    }
  };

  return (
    <div
      id={keyTrigger}
      className={`drum-pad${
        hit && power === "R"
          ? " power-on hit"
          : power === "L" && hit
          ? " hit"
          : ""
      }`}
      onClick={playSound}
    >
      {keyTrigger}
      <audio
        id={keyTrigger}
        className="clip"
        src={audioUrl}
        ref={audioRef}
      ></audio>
    </div>
  );
}

export default DrumPad;
