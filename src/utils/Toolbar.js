import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandArrowsAlt } from "@fortawesome/free-solid-svg-icons";
import { FaFreeCodeCamp } from "react-icons/fa";

export default function Toolbar({ title, onMaxedToggle }) {
  return (
    <div className="toolbar border shadow">
      <div className="inner-toolbar">
        <FaFreeCodeCamp onClick={onMaxedToggle} />
        <span className="title">{title}</span>
      </div>
      <div className="max-control">
        <FontAwesomeIcon icon={faExpandArrowsAlt} onClick={onMaxedToggle} />
      </div>
    </div>
  );
}
