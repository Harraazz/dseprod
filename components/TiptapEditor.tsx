"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Image from "@tiptap/extension-image"
import Underline from "@tiptap/extension-underline"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import React from "react"

interface TiptapEditorProps {
  value?: string
  onChange?: (value: string) => void
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ value = "", onChange }) => {
  const editor = useEditor({
    extensions: [StarterKit, Image, Underline, Bold, Italic, Image, ],
    content: value || "",
    immediatelyRender: false, // penting untuk Next.js agar tidak error SSR
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      if (onChange) onChange(html) // pastikan hanya dipanggil jika ada
    },
  })

  if (!editor) return null

  return (
    <div className="border rounded-md p-2 min-h-[200px]">
      {/* Toolbar sederhana */}
      <div className="flex flex-wrap gap-1 mb-2 border-b pb-1">
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
      <EditorContent editor={editor} className="prose max-w-none min-h-[150px]" />
    </div>
  )
}

export default TiptapEditor