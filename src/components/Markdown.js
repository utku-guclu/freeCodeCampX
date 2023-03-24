import { useState } from "react";

import Editor from "./Editor";
import Previewer from "./Previewer";

function Markdown({ defaultText }) {
  const [editorMaxed, setEditorMaxed] = useState(false);
  const [previewerMaxed, setPreviewerMaxed] = useState(false);
  const [text, setText] = useState(defaultText);

  function handleEditorMaxedToggle() {
    setEditorMaxed(!editorMaxed);
  }

  function handlePreviewerMaxedToggle() {
    setPreviewerMaxed(!previewerMaxed);
  }

  function handleTextChange(event) {
    setText(event.target.value);
  }

  return (
    <div>
      <Editor
        text={text}
        maxed={editorMaxed}
        hidden={previewerMaxed}
        onMaxedToggle={handleEditorMaxedToggle}
        onTextChange={handleTextChange}
      />
      <Previewer
        text={text}
        maxed={previewerMaxed}
        hidden={editorMaxed}
        onMaxedToggle={handlePreviewerMaxedToggle}
      />
    </div>
  );
}

export default Markdown;
