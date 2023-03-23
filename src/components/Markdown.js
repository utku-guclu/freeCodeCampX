import { useState } from "react";

import Editor from "./Editor";
import Previewer from "./Previewer";

function Markdown() {
  const [editorMaxed, setEditorMaxed] = useState(true);
  const [previewerMaxed, setPreviewerMaxed] = useState(false);

  function handleEditorMaxedToggle() {
    setEditorMaxed(!editorMaxed);
  }

  function handlePreviewerMaxedToggle() {
    setPreviewerMaxed(!previewerMaxed);
  }

  return (
    <div>
      <Editor maxed={editorMaxed} hidden={previewerMaxed} onMaxedToggle={handleEditorMaxedToggle}/>
      <Previewer maxed={previewerMaxed} hidden={editorMaxed} onMaxedToggle={handlePreviewerMaxedToggle}/>
    </div>
  );
}

export default Markdown;
