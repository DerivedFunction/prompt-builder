import { useEffect, useState } from "react";
import box from "../src/images/box.svg";
const SettingsPage: React.FC = () => {
  const [copy, setCopy] = useState(true);
  useEffect(() => {
    setCopy(localStorage.getItem("copy") === "true");
    const quickSuggestions = localStorage.getItem("quickSuggestions");
    if (!quickSuggestions) localStorage.setItem("quickSuggestions", "true");
  }, []);
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 justify-center">
        <img src={box} alt="logo icon" className="h-16 dark:invert" />
        <p className="text-2xl font-medium ">Settings</p>
      </div>
      <div className="w-full flex text-md mt-2 p-4 justify-center border-2 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400">
        <legend>Quick Suggestions: </legend>
        <select
          className="bg-[var(--background)]"
          defaultValue={localStorage.getItem("quickSuggestions") || "true"}
          onChange={(e) => {
            localStorage.setItem("quickSuggestions", e.target.value);
          }}
          id="quick-suggestions-form"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="w-full flex text-md mt-2 p-4 justify-center border-2 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400">
        <legend>Copy Prompt Instead: </legend>
        <select
          className="bg-[var(--background)]"
          defaultValue={localStorage.getItem("copy") || "false"}
          onChange={(e) => {
            localStorage.setItem("copy", e.target.value);
            setCopy(e.target.value === "true");
          }}
          id="copy-form"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div
        className={`${
          copy ? "hidden" : ""
        } w-full flex text-md mt-2 p-4 justify-center border-2 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400`}
      >
        <legend>
          Use Parameter <code className="font-mono">prompt?=%s</code>:
        </legend>
        <select
          className="bg-[var(--background)]"
          defaultValue={localStorage.getItem("prompt") || "false"}
          onChange={(e) => {
            localStorage.setItem("prompt", e.target.value);
          }}
          id="prompt-form"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="w-full flex text-md mt-2 p-4 justify-center border-2 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400">
        <legend>Suppress Copy Alerts: </legend>
        <select
          className="bg-[var(--background)]"
          defaultValue={localStorage.getItem("supress") || "false"}
          onChange={(e) => {
            localStorage.setItem("supress", e.target.value);
          }}
          id="supress-form"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="w-full flex text-md mt-2 p-4 justify-center border-2 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400">
        <legend>Open In Same Tab (Web/Firefox only): </legend>
        <select
          className="bg-[var(--background)]"
          defaultValue={localStorage.getItem("sameTab") || "false"}
          onChange={(e) => {
            localStorage.setItem("sameTab", e.target.value);
          }}
          id="open-links-form"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>
  );
};
export default SettingsPage;
