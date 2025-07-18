import { useState } from "react";
import Sidebar from "../components/sidebar";
import PromptBox from "../components/prompt-box";
import menu from "@/images/menu.svg";
import PromptPage from "../pages/prompt-page";
import HistoryPage from "../pages/history-page"
import SavePage from "../pages/save-page"
import HomePage from "../pages/home-page"
import "./App.css";

function App() {
  const [expand, setExpand] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [prompt, setPrompt] = useState("");

  let mainPage;

  switch (currentPage) {
    case "new-prompt":
      mainPage = <PromptPage setPrompt={setPrompt} />;
      break;
    case "history":
      mainPage = <HistoryPage />;
      break;
    case "saves":
      mainPage = <SavePage />;
      break;
    default:
      mainPage = <HomePage />;
      break;
  }
  return (
    <>
      <div className="relative flex h-screen overflow-hidden w-full">
        <div className="md:hidden fixed top-1 left-1 z-[60]">
          {!expand && (
            <button
              onClick={() => setExpand(true)}
              className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-gray-500/20 transition-all duration-300"
            >
              <img src={menu} width={20} height={20} className="dark:invert" />
            </button>
          )}
        </div>
        <Sidebar
          expand={expand}
          setExpand={setExpand}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          setCurrentPage={setCurrentPage}
        />

        <main
          className={`flex-1 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
            expand ? `md:ml-64` : "md:ml-12 md:mr-12"
          }`}
        >
          <div className="flex justify-center p-3 overflow-y-auto">
            <div className={`w-full space-y-3 py-4`}>{mainPage}</div>
          </div>
          <div className="pb-6 flex w-full justify-center">
            <PromptBox prompt={prompt} setPrompt={setPrompt}/>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
