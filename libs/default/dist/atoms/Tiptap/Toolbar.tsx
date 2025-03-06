"use client";
import React from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
  Heading1,
} from "lucide-react";

import { Icon } from '@example/default'
import { Form } from 'react-bootstrap';
type Props = {
  editor: Editor;
  content: string;
};

const supportedColors = [
  { name: 'Purple', value: '#958DF1' },
  { name: 'Red', value: '#F98181' },
  { name: 'Orange', value: '#FBBC88' },
  { name: 'Yellow', value: '#FAF594' },
  { name: 'Blue', value: '#70CFF8' },
  { name: 'Teal', value: '#94FADB' },
  { name: 'Green', value: '#B9F18D' },
];

const supportedFontFamilies = [
  'Arial',
  'Courier New',
  'Georgia',
  // 'Inter',
  'Times New Roman',
  'Verdana',
];


const fontSizes = [
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
  '24',
  '28',
  '32'
]

const Toolbar = ({ editor, content }: Props) => {
  if (!editor) return null;

  return (
    <div className="p-2 border border-gray-400 rounded-top d-flex flex-wrap align-items-start justify-content-between w-100">
      <div className="d-flex flex-wrap align-items-center justify-content-start w-100 w-lg-75 gap-0">
        {/* Toolbar Buttons */}
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={`btn ${editor.isActive("bold") ? "btn-gray-400" : "border-none"
            }`}
        >
          {/* <Bold className="me-1" /> */}
          <Icon className="" type="bootstrap" size="20px" name="TypeBold" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={`btn ${editor.isActive("italic") ? "btn-gray-400" : "border-none"
            }`}
        >
          <Icon className="" type="bootstrap" size="20px" name="TypeItalic" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={`btn ${editor.isActive("underline") ? "btn-gray-400" : "border-none"}`}
        >

          <Icon className="" type="bootstrap" size="20px" name="TypeUnderline" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={`btn ${editor.isActive("strike") ? "btn-gray-400" : "border-none"}`}
        >

          <Icon className="" type="bootstrap" size="20px" name="TypeStrikethrough" />
        </button>
        <div className="vr"></div>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={`btn ${editor.isActive("heading", { level: 1 }) ? "btn-gray-400" : "border-none"}`}
        >

          <Icon className="" type="bootstrap" size="20px" name="TypeH1" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={`btn ${editor.isActive("heading", { level: 2 }) ? "btn-gray-400" : "border-none"}`}
        >
          <Icon className="" type="bootstrap" size="20px" name="TypeH2" />
        </button>


        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={`btn ${editor.isActive("heading", { level: 3 }) ? "btn-gray-400" : "border-none"}`}
        >
          <Icon className="" type="bootstrap" size="20px" name="TypeH3" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 4 }).run();
          }}
          className={`btn ${editor.isActive("heading", { level: 4 }) ? "btn-gray-400" : "border-none"}`}
        >
          <Icon className="" type="bootstrap" size="20px" name="TypeH4" />
        </button>


        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 5 }).run();
          }}
          className={`btn ${editor.isActive("heading", { level: 5 }) ? "btn-gray-400" : "border-none"}`}
        >
          <Icon className="" type="bootstrap" size="20px" name="TypeH5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 6 }).run();
          }}
          className={`btn ${editor.isActive("heading", { level: 6 }) ? "btn-gray-400" : "border-none"}`}
        >
          <Icon className="" type="bootstrap" size="20px" name="TypeH6" />
        </button>
        <div className="vr"></div>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={`btn ${editor.isActive("bulletList") ? "btn-gray-400" : "border-none"}`}
        >

          <Icon className="" type="bootstrap" size="20px" name="ListTask" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={`btn ${editor.isActive("orderedList") ? "btn-gray-400" : "border-none"}`}
        >

          <Icon className="" type="bootstrap" size="20px" name="ListOl" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={`btn ${editor.isActive("blockquote") ? "btn-gray-400" : "border-none"}`}
        >

          <Icon className="" type="bootstrap" size="20px" name="Quote" />
        </button>

{/* !TDOD: Code not required by default */}
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={`btn ${editor.isActive("code") ? "btn-gray-400" : "border-none"}`}
        >

          <Icon className="" type="bootstrap" size="20px" name="Code" />
        </button> */}

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={`btn ${editor.isActive("undo") ? "btn-gray-400" : "border-none"}`}
        >

          <Icon className="" type="bootstrap" size="20px" name="ArrowCounterclockwise" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={`btn ${editor.isActive("redo") ? "btn-gray-400" : "border-none"}`}
        >
          <Icon className="" type="bootstrap" size="20px" name="ArrowClockwise" />
        </button>

        {/* <div className=" d-flex gap-3" >
          <Form.Select
            onChange={(event) => {
              const selectedColor = event.target.value;
              editor.chain().focus().setColor(selectedColor).run();

            }}
            value={editor.getAttributes('textStyle').color || ''}
            className="outline-primary"

          >
            <option value="">Select a color</option>
            {supportedColors.map((color, index) => (
              <option key={index} value={color.value}>
                {color.name}
              </option>
            ))}
          </Form.Select>


          <Form.Select
            onChange={(event) => {
              editor.chain().focus().setFontFamily(event.target.value || '').run();
            }}
            value={editor.getAttributes('textStyle').fontFamily || ''}
          >
            <option value="">Select a font</option>
            {supportedFontFamilies.map((font, index) => (
              <option key={index} value={font}>
                {font}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
            defaultValue=""
          >
            <option value="" disabled>
              Font Size
            </option>
            {fontSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Form.Select>
          
        </div> */}


      </div>
      {/* {content && (
        <button type="submit" className="btn btn-success mt-3 mt-lg-0">
          Add
        </button>
      )} */}
    </div>
  );
};

export default Toolbar;
