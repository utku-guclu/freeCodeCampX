import Window from "../utils/Window";
import Toolbar from "../utils/Toolbar";

function Editor({maxed, hidden, onMaxedToggle}) {
  return (
    <Window {...{maxed, hidden}}>
      <Toolbar title="Editor" onMaxedToggle={onMaxedToggle}/>
      <textarea className="document border">input here</textarea>
    </Window>
  );
}

export default Editor;
