"use client";
import Markdown from "react-markdown";

export default function StoryText({ text }: { text: string }) {
  return (
    <Markdown className="w-full border border-gray-100 bg-gray-50 py-2 px-4 rounded-md mt-2">
      {text}
    </Markdown>
  );
}
