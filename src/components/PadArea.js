import Button from "./Button";

import bankOne from "../assets/bankOne";
import bankTwo from "../assets/bankTwo";

function PadArea({ power, soundLevel, bankStatus }) {
  const pads =
    bankStatus === "L" ? bankOne : bankStatus === "R" ? bankTwo : undefined;
  return (
    <div className="pad-area">
      <div className="grid">
        {pads.map(({ keyTrigger, id, url: audioUrl }) => (
          <Button key={id} {...{ power, keyTrigger, audioUrl, soundLevel }} />
        ))}
      </div>
    </div>
  );
}

export default PadArea;
