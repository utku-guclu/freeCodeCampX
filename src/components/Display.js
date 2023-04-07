import { useEffect, useRef } from "react";

function Display({
  started,
  activeClock,
  setActiveClock,
  countBreak,
  countSession,
  timer,
  setTimer,
  reset,
}) {
  const audioRef = useRef();

  // play pause effect
  useEffect(() => {
    // start Timer
    function countDown() {
      setTimer((prevTimer) => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else if (prevTimer === 0) {
          setActiveClock((ac) => (ac === "S" ? "B" : "S"));
          // audio
          const audioEl = audioRef.current;
          audioEl.currentTime = 0;
          audioEl.play();

          return prevTimer;
        } else {
          throw Error(`Timer ${prevTimer} crashed!`);
        }
      });
    }
    if (started && !reset) {
      const interval = accurateInterval(countDown, 1000);

      return function cleanup() {
        interval.cancel();
      };
    }
  }, [started, setActiveClock, setTimer, reset]);

  // set Timer in seconds
  useEffect(() => {
    setTimer(countSession * 60);
  }, [countSession, setTimer, reset]);

  useEffect(() => {
    setTimer((activeClock === "S" ? countSession : countBreak) * 60);
  }, [activeClock, countBreak, countSession, setTimer]);

  function clockify() {
    const SECONDS_IN_MINUTES = 60;
    let minutes = Math.floor(timer / SECONDS_IN_MINUTES);
    let seconds = timer - minutes * SECONDS_IN_MINUTES;

    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    return minutes + ":" + seconds;
  }

  return (
    <div className={`display ${timer < 60 && "imminent"}`}>
      <div>{activeClock === "S" ? "Session" : "Break"}</div>
      <div className="time-left">{clockify()}</div>
      <audio
        id="beep"
        preload="auto"
        ref={audioRef}
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel,
  };
};

export default Display;
