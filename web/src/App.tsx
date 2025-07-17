import { useState } from "react";
import Sidebar from "../components/sidebar";
import PromptBox from "../components/prompt-box";
import menu from "@/images/menu.svg";
import PromptPage from "../pages/prompt-page";
import "./App.css";

function App() {
  const [expand, setExpand] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  let mainPage;

  switch (currentPage) {
    case "new-prompt":
      mainPage = <PromptPage />;
      break;
    case "history":
      mainPage = <div>History Page</div>;
      break;
    case "settings":
      mainPage = <div>Settings Page</div>;
      break;
    default:
      mainPage = <div>Home Page</div>;
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
            expand ? "md:ml-64 md:mr-12" : "ml-12 mr-12"
          }`}
        >
          <div className="flex items-start justify-center p-4 flex-1 overflow-y-auto">
            <div className={`w-full space-y-3 py-4`}>{mainPage}</div>
          </div>
          {x(false)}
        </main>
      </div>
    </>
  );
}
const x = (show: boolean) => {
  if (!show) return null;
  return (
    <div className="pb-6 mr-2 ml-2 flex w-full justify-center">
      <PromptBox />
    </div>
  );
};

export default App;
