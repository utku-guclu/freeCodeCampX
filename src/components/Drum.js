import PadArea from "./PadArea";
import Controls from "./Controls";
import { useState } from "react";

function Drum() {
  const [power, setPower] = useState("R");
  const [soundLevel, setSoundLevel] = useState(0.3);
  const [bankStatus, setBankStatus] = useState("L");

  return (
    <div className="drum">
      <PadArea {...{power, soundLevel, bankStatus}}/>
      <Controls {...{power, setPower, soundLevel, setSoundLevel, bankStatus, setBankStatus}}/>
    </div>
  );
}

export default Drum;
