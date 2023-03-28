import { useRef, useState, useEffect } from "react";

function Button({ power, keyTrigger, audioUrl, soundLevel }) {
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

  const playSound = () => {
    setHit(true);
    setTimeout(() => setHit(false), 100);

    if (power === "R") {
      const audioEl = audioRef.current;
      audioEl.currentTime = 0;
      audioEl.play();
    }
  };

  return (
    <div className={`button${hit ? " hit" : ""}`} onClick={playSound}>
      {keyTrigger}
      <audio src={audioUrl} ref={audioRef}></audio>
    </div>
  );
}

export default Button;
