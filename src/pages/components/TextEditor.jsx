import { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const TextEditor = ({ setText }) => {
  const editorRef = useRef(null); // To reference the DOM element
  const [editor, setEditor] = useState(null); // Store the Quill editor instance

  // Initialize Quill on component mount
  useEffect(() => {
    const quillInstance = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: {
          container: [
            [{ header: [2, 3, 4, false] }],
            ["bold", "italic", "underline", "blockquote"],
            [{ color: [] }],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
          ],
          handlers: {
            image: imageHandler,
          },
        },
        clipboard: {
          matchVisual: true,
        },
      },
      formats: [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
        "clean",
      ],
    });

    setEditor(quillInstance);

    // Handle text change events
    quillInstance.on("text-change", () => {
      let content = quillInstance.root.innerHTML;
      setText(content); // Pass the updated content to the parent component
    });

    return () => {
      // Cleanup the editor instance on unmount
      quillInstance.off("text-change");
    };
  }, [setText]);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageUrl = reader.result;
        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, "image", imageUrl, "user");
      };

      reader.readAsDataURL(file);
    };
  };

  return (
    <div className="text-editor">
      <div ref={editorRef} style={{ height: "300px" }}></div>
    </div>
  );
};

export default TextEditor;
