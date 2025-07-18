import { useState, useEffect } from "react";
import send from "@/images/send.svg";
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
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    // Save the selected chatbot to localStorage whenever it changes
    localStorage.setItem("selectedChatbot", chatbot);
  }, [chatbot]);

  const handleChatbotChange = (aiName: string) => {
    setChatbot(aiName);
    setIsDropupOpen(false);
    if (
      aiList.find((ai) => ai.name === aiName)?.needsPerm &&
      !localStorage.getItem("hidePermPopup")
    ) {
      setIsPopupOpen(true);
    }
  };

  async function handleSendClick() {
    const selectedAI = aiList.find((ai) => ai.name === chatbot);
    if (!selectedAI) return;
    let url = selectedAI.url;
    if (selectedAI.needsPerm) {
      url = `${selectedAI.url}?prompt=${encodeURIComponent(prompt)}`;
    } else {
      url = `${selectedAI.url}${encodeURIComponent(prompt)}`;
    }
    window.open(url, "_blank"); // Open the URL in a new tab
    await addHistoryEntry(prompt, url);
    setPrompt("");
  }

  const handleDoNotShowAgain = () => {
    localStorage.setItem("hidePermPopup", "true");
    setIsPopupOpen(false);
  };

  const browserLinks = [
    {
      name: "Chrome",
      url: "https://chromewebstore.google.com/detail/tabbed-ai-chatbot-in-new/jbpmodbjedoloelbepnpfhjoohjjkand",
    },
    {
      name: "Firefox",
      url: "https://addons.mozilla.org/en-US/firefox/addon/tabbed/",
    },
  ];

  return (
    <>
      <form
        className={`w-full bg-white dark:bg-gray-800 p-4 rounded-3xl transition-all shadow-sm max-w-3xl mr-2 ml-2`}
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
            <div className="flex flex-row gap-2 items-center">
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
              onClick={() => handleSendClick()}
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
      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 dark:text-gray-400 text-gray-600">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-1">
              Install Extension: Tabbed
            </h3>
            <p className="mb-4 text-sm">
              Enable Experimental Features in the extension to enable scripting
              for the selected AI chatbot
            </p>
            <div className="flex flex-col gap-2">
              {browserLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center border px-4 py-2 rounded-full cursor-pointer transition-colors border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={handleDoNotShowAgain}
                className="flex items-center justify-center border px-4 py-2 rounded-full cursor-pointer transition-colors border-gray-300  dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Do not show again
              </button>
            </div>
            <button
              onClick={() => setIsPopupOpen(false)}
              className="mt-4 w-full text-center text-sm text-gray-600 dark:text-gray-400 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PromptBox;
