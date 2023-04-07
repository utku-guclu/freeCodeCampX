import { FaArrowUp, FaArrowDown } from "react-icons/fa";

function LengthSetter({ label, length, onIncrement, onDecrement }) {
  return (
    <div className="length-setter">
      <div className="label">{label}</div>
      <button onClick={onDecrement}>
        <FaArrowDown size="25"/>
      </button>
      {length}
      <button onClick={onIncrement}>
        <FaArrowUp size="25" />
      </button>
    </div>
  );
}

export default LengthSetter;
