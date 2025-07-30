import box from "../src/images/box.svg";
import { suggestions } from "../data/suggestions";
import type { JSX } from "react";
import { loadSaveToLocalStorage } from "../data/database";

interface SaveEntry {
  name: string;
  data: Record<string, unknown>;
  id: number;
}

interface Props {
  setCurrentPage: (page: string) => void;
}

const HomePage: React.FC<Props> = ({ setCurrentPage }) => {
  /**
   * Renders suggestion buttons based on the `suggestions` array.
   * @returns {JSX.Element[]} An array of button elements.
   */
  const renderSuggestionButtons = (): JSX.Element[] => {
    return suggestions.sort().map((suggestion) => (
      <button
        key={suggestion.id}
        onClick={() => {
          handleLoadSave(suggestion);
        }}
        className="p-2 w-[75px] text-center border rounded-xl border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs cursor-pointer"
      >
        {suggestion.name}
      </button>
    ));
  };
  const handleLoadSave = (input: SaveEntry) => {
    try {
      loadSaveToLocalStorage(input.data);
      setCurrentPage("new-prompt");
    } catch (err) {
      console.error("Failed to load save:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="w-full h-full flex-col flex">
      {/* Logo and Title Section */}
      <div className="flex items-center gap-3 justify-center">
        <img src={box} alt="logo icon" className="h-16 dark:invert" />
        <h1 className="text-2xl font-medium">AI Prompt Builder</h1>
      </div>
      <div className="flex-1"></div>
      {/* Suggestion Buttons */}
      <div className="w-full flex justify-center">
        <div className="flex-wrap overflow-x-auto gap-2 justify-center max-w-2xl flex">
          {renderSuggestionButtons()}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
