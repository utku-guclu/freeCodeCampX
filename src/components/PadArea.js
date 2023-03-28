import bankOne from "../assets/bankOne";
import bankTwo from "../assets/bankTwo";
import DrumPad from "./DrumPad";

function PadArea({ power, soundLevel, bankStatus, setMessage }) {
  const pads =
    bankStatus === "L" ? bankOne : bankStatus === "R" ? bankTwo : undefined;
  return (
    <div className="pad-area">
      <div className="grid">
        {pads.map(
          ({ keyCode, keyTrigger, id: instrumentName, url: audioUrl }) => (
            <DrumPad
              key={instrumentName}
              {...{
                power,
                instrumentName,
                keyTrigger,
                keyCode,
                audioUrl,
                soundLevel,
                setMessage,
              }}
            />
          )
        )}
      </div>
    </div>
  );
}

export default PadArea;
