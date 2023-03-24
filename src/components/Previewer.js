import Window from "../utils/Window";
import Toolbar from "../utils/Toolbar";

import DOMPurify from "dompurify";
import { marked } from "marked";

import hljs from "highlight.js";

marked.setOptions({
  breaks: true,
  highlight: (code) => hljs.highlightAuto(code).value,
});

function Previewer({ maxed, hidden, onMaxedToggle, text }) {
  return (
    <Window windowClass="previewer" {...{ maxed, hidden }}>
      <Toolbar title="Previewer" onMaxedToggle={onMaxedToggle} />
      <div
        id="preview"
        className="document border shadow"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(marked(text)),
        }}
      />
    </Window>
  );
}

export default Previewer;
