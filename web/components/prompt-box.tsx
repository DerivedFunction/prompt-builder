import { useState, useEffect } from "react";
import send from "../src/images/send.svg";
import { aiList } from "../data/ai-list.ts";
import { addHistoryEntry } from "../data/database.ts";

interface PromptBoxProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptBox: React.FC<PromptBoxProps> = ({ prompt, setPrompt }) => {
  const [chatbot, setChatbot] = useState<string>(() => {
    // Retrieve the chatbot from localStorage on initial load
    return localStorage.getItem("selectedChatbot") || aiList[0].name;
  });
  const [isDropupOpen, setIsDropupOpen] = useState<boolean>(false);

  useEffect(() => {
    // Save the selected chatbot to localStorage whenever it changes
    localStorage.setItem("selectedChatbot", chatbot);
  }, [chatbot]);

  const handleChatbotChange = (aiName: string) => {
    setChatbot(aiName);
    setIsDropupOpen(false);
  };

  async function handleSendClick() {
    const selectedAI = aiList.find((ai) => ai.name === chatbot);
    if (!selectedAI) return;
    let url = selectedAI.url;
    const limit = prompt.length > 8000;
    const copy = localStorage.getItem("copy") === "true";
    const suppress = localStorage.getItem("supress") === "true";
    const sameTab = localStorage.getItem("sameTab") === "true";
    url =
      selectedAI.needsPerm || copy
        ? selectedAI.home ?? `https://${new URL(selectedAI.url).hostname}`
        : `${selectedAI.url}${encodeURIComponent(prompt)}`;
    navigator.clipboard.writeText(prompt);
    addHistoryEntry(prompt, url);
    if (!suppress && (limit || selectedAI.needsPerm || copy)) {
      window.alert(
        `${
          selectedAI.needsPerm || copy ? `` : `Prompt exceeds 8000 chars.`
        } Prompt copied to clipboard. Paste the prompt in ${chatbot}`
      );
    }
    window.open(url, sameTab ? "_self" : "_blank"); // Open the URL in a new tab
    setPrompt("");
  }

  return (
    <>
      <form
        className={`w-full bg-white dark:bg-gray-800 p-4 rounded-3xl transition-all shadow-sm max-w-3xl mr-2 ml-2`}
      >
        <textarea
          className="outline-none w-full resize-none overflow-y-auto break-words bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 rounded-md p-2"
          rows={2}
          placeholder={`Message ${chatbot}`}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <div className="relative">
            <div className="flex-row gap-2 items-center">
              <div
                className="flex items-center border px-2 py-1 rounded-full cursor-pointer transition-colors border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setIsDropupOpen(!isDropupOpen)}
              >
                <span className="hidden sm:flex mr-1">{chatbot}</span>
                <svg
                  className="w-4 h-4 transform rotate-180" // Rotate arrow for dropup
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
              onClick={() => {
                handleSendClick();
              }}
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
    </>
  );
};

export default PromptBox;
