import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementCounterA,
  decrementCounterA,
  incrementCounterB,
  decrementCounterB,
  resetCounterA,
  resetCounterB,
} from "../redux/store";

// Clock.js
import Display from "./Display";
import Controls from "./Controls";
import LengthSetter from "./LengthSetter";

function Clock() {
  const countBreak = useSelector((state) => state.counterA.count);
  const countSession = useSelector((state) => state.counterB.count);

  const [activeClock, setActiveClock] = useState("S");
  const [started, setStarted] = useState(false);

  const [timer, setTimer] = useState(countSession);

  const [reset, setReset] = useState(false);

  const dispatch = useDispatch();

  const handleBreakIncrement = () => {
    !started && countBreak < 60 && dispatch(incrementCounterA());
  };

  const handleBreakDecrement = () => {
    !started && countBreak > 1 && dispatch(decrementCounterA());
  };

  const handleSessionIncrement = () => {
    !started && countSession < 60 && dispatch(incrementCounterB());
  };

  const handleSessionDecrement = () => {
    !started && countSession > 1 && dispatch(decrementCounterB());
  };

  const handleReset = () => {
    dispatch(resetCounterA());
    dispatch(resetCounterB());
    // reset
    setActiveClock("S");
    setTimer(countSession * 60);
    setReset(true);

    setTimeout(() => {
      setReset(false);
      setStarted(false);
    }, 1000);
  };
  return (
    <div className="clock">
      <div className="title">25 + 5 Clock</div>
      <div className="length-setters">
        <LengthSetter
          type="break"
          label="Break Length"
          length={countBreak}
          onIncrement={handleBreakIncrement}
          onDecrement={handleBreakDecrement}
        />
        <LengthSetter
          type="session"
          label="Session Length"
          length={countSession}
          onIncrement={handleSessionIncrement}
          onDecrement={handleSessionDecrement}
        />
      </div>
      <Display
        {...{
          started,
          activeClock,
          setActiveClock,
          countBreak,
          countSession,
          timer,
          setTimer,
          onReset: handleReset,
          reset,
        }}
      />
      <Controls {...{ setStarted, onReset: handleReset }} />
      <div className="author">
        Designed and Coded by
        <br />
        <span>Utku Güçlü</span>
      </div>
    </div>
  );
}

export default Clock;
