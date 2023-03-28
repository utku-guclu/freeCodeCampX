import { useState } from "react";
import Display from "./Display";
import Switch from "./Switch";
import Volume from "./Volume";

function Controls({ power, setPower, soundLevel, setSoundLevel, bankStatus, setBankStatus }) {
  const [message, setMessage] = useState("");

  const handleSetBankStatus = (value) => {
    setBankStatus(value);

    power === "R" &&
      setMessage(
        value === "L"
          ? "Heater Kit"
          : value === "R"
          ? "Smooth Piano Kit"
          : "Unknown"
      );
  };

  const handleSetPowerStatus = (value) => {
    setPower(value);

    setMessage(value === "L" ? "OFF" : value === "R" ? "ON" : "");
    setTimeout(() => setMessage(""), 1000);
  };

  const handleSetLevel = (value) => {
    setSoundLevel(value);

    setMessage(`Volume: ${Math.round(value * 100)}`);
    setTimeout(() => setMessage(""), 1000);
  };

  return (
    <div className="controls">
      <Switch label="Power" status={power} setStatus={handleSetPowerStatus} />
      <Display {...{ message }} />
      <Volume {...{ power, level: soundLevel, setLevel: handleSetLevel }} />
      <Switch
        label="Bank"
        status={bankStatus}
        setStatus={handleSetBankStatus}
      />
    </div>
  );
}

export default Controls;
