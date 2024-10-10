import { useEffect, useRef, useMemo } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = ({ setText }) => {
  const editorRef = useRef(null); // To reference the DOM element for Quill

  // Memoize the toolbar options to prevent re-creation on every render
  const toolbarOptions = useMemo(
    () => [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ align: [] }],
      ["clean"], // remove formatting button
    ],
    []
  );

  // Initialize Quill on component mount
  useEffect(() => {
    const quillInstance = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });

    // Handle text changes and update parent component
    const handleTextChange = () => {
      const content = quillInstance.root.innerHTML;
      setText(content);
    };

    quillInstance.on("text-change", handleTextChange);

    // Cleanup on component unmount
    return () => {
      quillInstance.off("text-change", handleTextChange);
    };
  }, [setText, toolbarOptions]);

  return (
    <div className="text-editor ql-editor">
      <div
        ref={editorRef}
        style={{ height: "200px" }}
        aria-label="Rich text editor"
      ></div>
    </div>
  );
};

export default TextEditor;
