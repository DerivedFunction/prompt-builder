import React from "react";
interface ModalProps {
  setModal: (modal: string) => void;
}
const ExtensionModal: React.FC<ModalProps> = ({ setModal }) => {
  const handleDoNotShowAgain = () => {
    localStorage.setItem("hidePermPopup", "true");
    setModal("");
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 dark:text-gray-400 text-gray-600">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-lg font-semibold mb-1">
          Install Extension: Tabbed
        </h3>
        <p className="mb-4 text-sm">
          Enable Experimental Features in the extension to enable scripting for
          the selected AI chatbot
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
          onClick={() => setModal("")}
          className="mt-4 w-full text-center text-sm text-gray-600 dark:text-gray-400 hover:underline"
        >
          Close
        </button>
      </div>
    </div>
  );
};
export default ExtensionModal;
