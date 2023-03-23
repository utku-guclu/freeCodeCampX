import Window from "../utils/Window";
import Toolbar from "../utils/Toolbar";

function Previewer({maxed, hidden, onMaxedToggle}) {
  return (
    <Window {...{maxed, hidden}}>
      <Toolbar title="Previewer" onMaxedToggle={onMaxedToggle}/>
      <div className="document border shadow">preview here</div>
    </Window>
  );
}

export default Previewer;
