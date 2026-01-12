"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Underline from "@tiptap/extension-underline"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import React from "react"

interface TiptapEditorProps {
  value?: string
  onChange?: (value: string) => void
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ value = "", onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Image,
      Underline,
      Bold,
      Italic,
    ],
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (onChange) onChange(html)
    },
  })

  if (!editor) return null

  return (
    <div className="border rounded-md p-2 min-h-[200px]">
      {/* Toolbar sederhana */}
      <div className="flex flex-wrap gap-1 mb-2 border-b pb-1 prose prose-lg prose-berita max-w-none">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("bold") ? "bg-gray-200" : ""
          }`}
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("italic") ? "bg-gray-200" : ""
          }`}
        >
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`px-2 py-1 rounded ${
            editor.isActive("underline") ? "bg-gray-200" : ""
          }`}
        >
          <u>U</u>
        </button>
      </div>

      {/* Area editor */}
      <EditorContent editor={editor} className="
      prose
      prose-berita
      max-w-none
      min-h-[150px]
      px-1 py-2
      [&_.ProseMirror]:min-h-[260px]
      [&_.ProseMirror]:outline-none" />
    </div>
  )
}

export default TiptapEditor
