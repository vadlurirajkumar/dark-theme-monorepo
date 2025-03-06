"use client";
import React, { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import Toolbar from "./Toolbar";

type TiptapProps = {
  onChange: (newContent: string) => void;
  content: string;
};

const Tiptap = ({ onChange, content }: TiptapProps) => {
  const [editorContent, setEditorContent] = useState(content || ""); // Fallback to empty string

  const handleChange = (newContent: string) => {
    setEditorContent(newContent);
    onChange(newContent); // Optionally pass the new content to the parent
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      Underline,
      Color,
    ],
    editorProps: {
      attributes: {
        class:
          "d-flex flex-column px-3 py-3 justify-content-start border border-gray-400 text-secondary align-items-start w-100 gap-0 fw-medium text-16 pt-3 rounded-bottom outline-none",
      },
    },
    content: content || "", // Fallback to empty string
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="w-100">
      <Toolbar editor={editor} content={editorContent || ""} /> {/* Ensure content is always a string */}
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default Tiptap;
