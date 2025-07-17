import { useState } from "react";
import Sidebar from "components/sidebar";
import PromptBox from "components/prompt-box";
import menu from "@/images/menu.svg";
import "./App.css";

function App() {
  const [expand, setExpand] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
        />
        <main
          className={`flex-1 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
            expand ? "md:ml-64" : "md:ml-12"
          }`}
        >
          <div className="flex flex-col items-start justify-center p-4 flex-1 overflow-y-auto">
            <div className="w-full space-y-3 py-4">{}</div>
          </div>
          <div className="pb-6 mr-2 ml-2 flex w-full justify-center">
            <PromptBox />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
