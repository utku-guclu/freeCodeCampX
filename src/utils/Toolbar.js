import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';

export default function Toolbar({title, onMaxedToggle}) {
  return (
      <div className="toolbar border shadow">
        <div className="title">{title}</div>
        <div className="max-control">
        <FontAwesomeIcon icon={faExpandArrowsAlt} onClick={onMaxedToggle}/>
        </div>
      </div>
    )
}
