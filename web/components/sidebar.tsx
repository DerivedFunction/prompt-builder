import React from "react";
import NavItem from "./nav-item";
import menu_close from "@/images/menu_close.svg";
import menu_open from "@/images/menu_open.svg";
import menu from "@/images/menu.svg";
import new_prompt from "@/images/new_prompt.svg";
import history from "@/images/history.svg";
import settings from "@/images/settings.svg";
import box from "@/images/box.svg";
import home from "@/images/home.svg";


interface SidebarProps {
  expand: boolean;
  setExpand: (expand: boolean) => void;
  isHovered: boolean;
  setIsHovered: (isHovered: boolean) => void;
  setCurrentPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  expand,
  setExpand,
  isHovered,
  setIsHovered,
  setCurrentPage,
}) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-screen transition-all z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${
          expand
            ? "w-64 shadow-lg md:shadow-none"
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
                className="dark:invert"
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
                className="dark:invert"
              />
            </div>
          </div>
          <div className="pt-10 h-full flex flex-col justify-between">
            <div className="">
              <NavItem
                image={home}
                text={"Home"}
                expand={expand}
                onClick={() => {
                  setExpand(false);
                  setCurrentPage("home");
                }}
              />
              <NavItem
                image={new_prompt}
                text={"Prompt Builder"}
                expand={expand}
                onClick={() => {
                  setExpand(false);
                  setCurrentPage("new-prompt");
                }}
              />
              <NavItem
                image={history}
                text={"View History"}
                expand={expand}
                onClick={() => {
                  setExpand(false);
                  setCurrentPage("history");
                }}
              />
              <NavItem
                image={box}
                text={"View Saved Prompts"}
                expand={expand}
                onClick={() => {
                  setExpand(false);
                  setCurrentPage("saves");
                }}
              />
            </div>
          </div>
          {/** Profile Icon on bottom */}

          <NavItem
            image={settings}
            text={"View Settings"}
            expand={expand}
            onClick={() => {
              setExpand(false);
              setCurrentPage("settings");
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

export default Sidebar;
