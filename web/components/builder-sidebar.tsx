import React from "react";
import NavItem from "./nav-item";
import menu_close from "../src/images/menu_close.svg";
import menu_open from "../src/images/menu_open.svg";
import menu from "../src/images/menu.svg";
import command from "../src/images/categories/command.svg";
import style from "../src/images/categories/style.svg";
import roleplay from "../src/images/categories/roleplay.svg";
import define from "../src/images/categories/definition.svg";
import rules from "../src/images/categories/rules.svg";
import text from "../src/images/categories/text.svg";
import input from "../src/images/categories/input.svg";
import erase from "../src/images/erase.svg";
import copy from "../src/images/copy.svg";
import save from "../src/images/save.svg";
import { saveDataFromLocalStorage } from "../data/database";

interface SidebarProps {
  expand: boolean;
  setExpand: (expand: boolean) => void;
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
  setCategory: (category: string) => void;
  category: string;
  setInputs: (inputs: Record<string, string>) => void;
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const BuilderSidebar: React.FC<SidebarProps> = ({
  expand,
  setExpand,
  isHovered,
  setIsHovered,
  setCategory,
  setInputs,
  category,
  prompt,
  setPrompt,
}) => {
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-screen transition-all z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${
          expand
            ? "w-48 shadow-lg md:shadow-none"
            : "md:w-12 w-0 max-md:opacity-0"
        }`}
      >
        <div className="flex flex-col h-full p-1">
          <div className="md:block hidden">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer"
            >
              <img
                src={expand ? menu_close : isHovered ? menu_open : menu}
                width={20}
                height={20}
                alt="Toggle menu"
                onClick={() => setExpand(!expand)}
                className="dark:invert rotate-180"
              />
            </div>
          </div>
          <div className="md:hidden flex justify-end pr-2">
            <div className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer">
              <img
                src={menu_close}
                width={20}
                height={20}
                alt="Close menu"
                onClick={() => setExpand(false)}
                className="dark:invert rotate-180"
              />
            </div>
          </div>
          <div className="pt-10 h-full flex flex-col justify-between">
            <div className="">
              <NavItem
                image={roleplay}
                text={"Role"}
                expand={expand}
                onClick={() => {
                  setExpand(false);
                  setCategory("roleplay");
                }}
              />
              <NavItem
                image={command}
                text={"Main Action"}
                expand={expand}
                onClick={() => {
                  setExpand(false);
                  setCategory("command");
                }}
              />
              <NavItem
                image={style}
                text={"Style"}
                expand={expand}
                onClick={() => {
                  setExpand(false);
                  setCategory("style");
                }}
              />
              <NavItem
                image={rules}
                text={"Rules"}
                expand={expand}
                onClick={() => {
                  setExpand(false);
                  setCategory("rules");
                }}
              />

              <NavItem
                image={define}
                text={"Definitions"}
                expand={expand}
                onClick={() => {
                  setExpand(false);
                  setCategory("define");
                }}
              />
              <NavItem
                image={input}
                text={"Examples"}
                expand={expand}
                onClick={() => {
                  setExpand(false);
                  setCategory("example");
                }}
              />
              <NavItem
                image={text}
                text={"Input"}
                expand={expand}
                onClick={() => {
                  setExpand(false);
                  setCategory("input");
                }}
              />
            </div>
          </div>
          <NavItem
            image={copy}
            text={"Copy to Clipboard"}
            expand={expand}
            onClick={() => {
              navigator.clipboard.writeText(prompt);
              setExpand(false);
              setCategory(category);
            }}
          />
          <NavItem
            image={save}
            text={"New Save"}
            expand={expand}
            onClick={() => {
              setExpand(false);
              const input = document.getElementById(
                "save_name"
              ) as HTMLInputElement;
              const saveName = input.value;
              saveDataFromLocalStorage(saveName);
              if (input.value.startsWith("save_"))
                input.value = `save_${Date.now()}`;
              setCategory(category);
            }}
          />
          <NavItem
            image={erase}
            text={"Clear All"}
            expand={expand}
            onClick={() => {
              setExpand(false);
              localStorage.removeItem("input");
              setCategory("clear");
              setInputs({});
              setPrompt("");
              setCategory("roleplay");
            }}
          />
        </div>
      </div>
      {/* Overlay for mobile */}
      {expand && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setExpand(false)}
        />
      )}
    </>
  );
};

export default BuilderSidebar;
