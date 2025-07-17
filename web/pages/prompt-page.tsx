import { useState } from "react";
import BuilderSidebar from "../components/builder-sidebar";
import menu from "@/images/menu.svg";
import { blocks } from "../data/builder";

// Define the type for blocks to ensure TypeScript compatibility
interface Block {
  category: string;
  label: string;
  blocks: Array<{
    type: string;
    template: string;
    options: Array<{
      var: string;
      type: string;
      values: Array<string>;
    }>;
  }>;
}

const PromptPage = () => {
  const [expand, setExpand] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [category, setCategory] = useState("command");
  // Ensure blocks is treated as an array
  const findCategory = (category: string) => {
    const block = (blocks as Block[]).find(
      (item) => item.category === category
    );
    if (!block) return null;
    let beforeBlock = block.blocks.map((b) => (
      <div
        key={b.type}
        className="p-3 border-2 border-gray-300 rounded-md mb-2 bg-white dark:bg-gray-800 dark:border-gray-600"
      >
        {b.template}
        {Array.from(b.options).map((o) => {
          console.log(o);
          return <div>{buildType(o.type, o.values)}</div>;
        })}
      </div>
    ));
    let afterBlock = beforeBlock; // Find the {options} and move the elements to them
    return afterBlock;
  };
  const buildType = (type: string, values: Array<string>) => {
    let x = null;
    switch (type) {
      case "dropdown":
        x = (
          <select
            defaultValue={values[0]}
            className="w-full p-2 border-2 border-gray-300 rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {values.map((label) => {
              return (
                <option key={label} value={label}>
                  {label}
                </option>
              );
            })}
          </select>
        );
        break;
      case "text_input":
        x = (
          <input
            type="text"
            placeholder={values[0]}
            className="w-full p-2 border-2 border-gray-300 rounded-md bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
        break;
      default:
        break;
    }
    return x;
  };
  return (
    <div className="flex flex-col h-full w-full text-gray-900 dark:text-gray-100">
      <div className="md:hidden fixed top-1 right-1 z-[60]">
        {!expand && (
          <button
            onClick={() => setExpand(true)}
            className="flex items-center justify-center h-9 w-9 rounded-lg hover:bg-gray-500/20 transition-all duration-300"
          >
            <img
              src={menu}
              width={20}
              height={20}
              className="dark:invert rotate-180"
              alt="Menu"
            />
          </button>
        )}
      </div>
      <BuilderSidebar
        expand={expand}
        setExpand={setExpand}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        setCategory={setCategory}
        category={category}
      />

      <h1 className="text-2xl font-bold mb-4">Prompt Builder Playground</h1>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 w-full sm:flex-row">
          {/* Left Box */}
          <div className="flex-1 p-4 border-2 border-gray-300 rounded-md min-h-[200px]">
            <p className="text-gray-700">{findCategory(category)}</p>
          </div>
          {/* Right Box */}
          <div className="flex-1 p-4 border-2 border-gray-300 rounded-md min-h-[200px]">
            <p className="text-gray-700">Output (not implemented)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptPage;
