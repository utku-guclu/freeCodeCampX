import Window from "../utils/Window";
import Toolbar from "../utils/Toolbar";

function Editor({ text, maxed, hidden, onMaxedToggle, onTextChange }) {
  return (
    <Window windowClass="editor" {...{ maxed, hidden }}>
      <Toolbar title="Editor" onMaxedToggle={onMaxedToggle} />
      <textarea
        className="document border"
        onChange={onTextChange}
        value={text}
      />
    </Window>
  );
}

export default Editor;
