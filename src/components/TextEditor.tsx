"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle, { TextStyleOptions } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const lightThemeButtonActive =
  "border border-black px-2 py-1 m-1 rounded bg-black bg-opacity-20";
const lightThemeButton = "border border-black px-2 py-1 m-1 rounded";
const disabledButton =
  "border border-zinc-300 px-2 py-1 m-1 rounded text-zinc-300";

const MenuBar = ({ editor }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-md border-2 border-black p-4 dark:border-white">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold") ? lightThemeButtonActive : lightThemeButton
        }
      >
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic") ? lightThemeButtonActive : lightThemeButton
        }
      >
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike") ? lightThemeButtonActive : lightThemeButton
        }
      >
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={
          editor.isActive("code") ? lightThemeButtonActive : lightThemeButton
        }
      >
        code
      </button>
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={lightThemeButton}
      >
        clear marks
      </button>
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={lightThemeButton}
      >
        clear nodes
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph")
            ? lightThemeButtonActive
            : lightThemeButton
        }
      >
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? lightThemeButtonActive
            : lightThemeButton
        }
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? lightThemeButtonActive
            : lightThemeButton
        }
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? lightThemeButtonActive
            : lightThemeButton
        }
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? lightThemeButtonActive
            : lightThemeButton
        }
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 })
            ? lightThemeButtonActive
            : lightThemeButton
        }
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 })
            ? lightThemeButtonActive
            : lightThemeButton
        }
      >
        h6
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? lightThemeButtonActive
            : lightThemeButton
        }
      >
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? lightThemeButtonActive
            : lightThemeButton
        }
      >
        ordered list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={
          editor.isActive("blockquote")
            ? lightThemeButtonActive
            : lightThemeButton
        }
      >
        blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={lightThemeButton}
      >
        horizontal rule
      </button>
      <button
        onClick={() => editor.chain().focus().setHardBreak().run()}
        className={lightThemeButton}
      >
        hard break
      </button>
      <div className="flex justify-between">
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={
            !editor.can().chain().focus().redo().run()
              ? disabledButton
              : lightThemeButton
          }
        >
          undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={
            !editor.can().chain().focus().redo().run()
              ? disabledButton
              : lightThemeButton
          }
        >
          redo
        </button>
      </div>
    </div>
  );
};

export default function TextEditor({ updateContent }: any) {
  const editor = useEditor({
    extensions: [
      TextStyle.configure({
        types: [ListItem.name],
      } as Partial<TextStyleOptions>),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
      }),
    ],
    content: `
      <h2>
        Hello World,
      </h2>
      <br />
      <br />
      <br />
      <br />
    `,
    onUpdate: ({ editor }) => {
      updateContent(editor.getHTML()); // Call updateContent with the new content
    },
  });

  return (
    <div className="rounded-md border border-black">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className="border-t border-black p-6" />
    </div>
  );
}
