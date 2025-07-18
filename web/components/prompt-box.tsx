import { useState } from "react";
import send from "@/images/send.svg";
import {aiList} from "../data/ai-list.ts";

interface PromptBoxProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptBox: React.FC<PromptBoxProps> = ({ prompt, setPrompt }) => {
  const [chatbot, setChatbot] = useState<string>(aiList[0].name); // Default to the first AI provider
  const [isDropupOpen, setIsDropupOpen] = useState<boolean>(false);

  const handleChatbotChange = (aiName: string) => {
    setChatbot(aiName);
    setIsDropupOpen(false); // Close the dropup after selection
  };

  return (
    <form
      className={`w-full bg-white dark:bg-gray-800 p-4 rounded-3xl mt-4 transition-all shadow-sm max-w-3xl`}
    >
      <textarea
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-md p-2"
        rows={2}
        placeholder={`Message ${chatbot}`}
        onChange={(e) => setPrompt(e.target.value)}
        value={prompt}
        required
      />

      <div className="flex items-center justify-between text-sm">
        <div className="relative">
          <div
            className="flex items-center gap-2 border px-2 py-1 rounded-full cursor-pointer transition-colors border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setIsDropupOpen(!isDropupOpen)}
          >
            {chatbot}
            <svg
              className="w-4 h-4 ml-1 transform rotate-180" // Rotate arrow for dropup
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>

          {isDropupOpen && (
            <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
              {aiList.map((ai) => (
                <div
                  key={ai.name}
                  className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={() => handleChatbotChange(ai.name)}
                >
                  {ai.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            className={`rounded-full p-2 transition-colors ${
              prompt.length > 0
                ? "bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-600 dark:text-gray-400"
            }`}
            disabled={prompt.length === 0}
          >
            <img
              className="w-3.5 aspect-square dark:invert"
              src={send}
              alt=""
              height={20}
              width={20}
            />
          </button>
        </div>
      </div>
    </form>
  );
};

export default PromptBox;
