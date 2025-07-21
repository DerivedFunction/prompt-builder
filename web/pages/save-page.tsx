import React, { useEffect, useState } from "react";
import new_prompt from "../src/images/new_prompt.svg";
import erase from "../src/images/erase.svg";
import {
  getSaves,
  deleteAllSaves,
  deleteSave,
  loadSaveToLocalStorage,
  addSave,
} from "../data/database";
import { blocks } from "../data/builder";

interface SaveEntry {
  data: Record<string, string>;
  timestamp: number;
  name: string;
  id: number;
}
interface Block {
  category: string;
  newLine: boolean;
  blocks: Array<{
    template: string;
    options: Array<{
      var: string;
      type: string;
      values: Array<string>;
    }>;
  }>;
}
const SavesPage: React.FC = () => {
  const [saves, setSaves] = useState<SaveEntry[]>([]);

  // Fetch saves on component mount
  useEffect(() => {
    fetchSaves();
  }, []);

  const fetchSaves = async () => {
    const savesData = await getSaves();
    setSaves(savesData);
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete all saves?")) {
      await deleteAllSaves();
      fetchSaves(); // Refresh saves after clearing
    }
  };

  const handleDeleteEntry = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this save?")) {
      await deleteSave(id);
      fetchSaves(); // Refresh saves after deleting an entry
    }
  };

  const handleLoadSave = (input: SaveEntry) => {
    try {
      loadSaveToLocalStorage(input.data);
      alert("Save loaded successfully! ");
    } catch (err) {
      console.error("Failed to load save:", err);
      alert("Failed to load save.");
    }
  };

  const handleDownload = async () => {
    try {
      const data = await getSaves();
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `saves_backup_${Date.now()}.json`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading saves:", error);
    }
  };

  const recreatePrompts = (saveData: SaveEntry[]) => {
    const results: string[] = [];
    saveData.forEach((save, index) => {
      const prompts: string[] = [];
      const map: Record<string, string> = save.data;
      // Respect block order
      (blocks as Block[]).forEach((block) => {
        let categoryOutput = "";
        let hasContent = false;

        block.blocks.forEach((b) => {
          let template = b.template;
          let blockHasContent = false;

          b.options.forEach((option) => {
            const value = map[option.var] || "";
            const placeholder = `{${option.var}}`;

            if (template.includes(placeholder)) {
              const prefix = template.slice(0, template.indexOf(placeholder));
              const suffix = template.slice(
                template.indexOf(placeholder) + placeholder.length
              );
              const cleanedPrefix = value ? prefix : prefix.replace(/\s+$/, "");
              template = `${cleanedPrefix}${value}${suffix}`;
            }

            if (value) {
              blockHasContent = true;
              hasContent = true;
            }
          });

          if (blockHasContent || template.trim()) {
            // Append template and correct trailing character
            categoryOutput += (block.newLine ? "\n" : " ") + template;
          }
        });

        if (hasContent) {
          prompts.push(categoryOutput);
        }
      });

      if (prompts.length > 0) {
        results.push(
          `SAVE #${index + 1} - ${save.name} (${new Date(
            save.timestamp
          ).toLocaleString()})\n${prompts.join("")}\n`
        );
      }
    });

    return results.join("\n");
  };

  const downloadPromptsAsTxt = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleDownloadPrompts = () => {
    const promptsText = recreatePrompts(saves);
    if (promptsText) {
      downloadPromptsAsTxt(promptsText, `prompts_${Date.now()}.txt`);
    } else {
      alert("No prompts to download.");
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const uploadedData: SaveEntry[] = JSON.parse(text);

      // Validate uploaded data
      const isValid = uploadedData.every(
        (save) =>
          typeof save.id === "number" &&
          typeof save.name === "string" &&
          typeof save.timestamp === "number"
      );

      if (!isValid) {
        alert("Invalid save data format.");
        return;
      }

      // Add each save to the database
      for (const save of uploadedData) {
        await addSave(save);
      }

      // Refresh the saves list
      await fetchSaves();
      alert("Saves imported successfully!");
    } catch (error) {
      console.error("Error importing saves:", error);
      alert("Failed to import saves. Please ensure the file is a valid JSON.");
    }

    // Reset the input to allow re-uploading the same file
    event.target.value = "";
  };
  return (
    <div className="h-full w-full text-gray-900 dark:text-gray-100">
      <div className="flex gap-2 mb-4">
        <label
          onClick={() => handleUpload}
          className="p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs"
        >
          Import Data
          <input
            type="file"
            accept=".json"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
        <button
          onClick={handleDownload}
          className="p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs"
        >
          Export Data
        </button>
        <button
          onClick={handleDownloadPrompts}
          title="Download Prompts as text"
          className="p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs"
        >
          Download Text
        </button>
        <button
          onClick={handleClearAll}
          title="Download Prompts as text"
          className="p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs"
        >
          Delete All
        </button>
      </div>
      <div className="p-4 border-2 border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Saved Prompts
        </h1>

        {/* Saves Table */}
        <div className="gap-2 text-xs">
          {saves.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold">
                    <th className="p-1 text-left w-[10%]">Timestamp</th>
                    <th className="p-1 text-left min-w-[200px] w-[70%]">
                      Save Name
                    </th>
                    <th className="p-1 text-center min-w-[100px]"></th>
                  </tr>
                </thead>
                <tbody>
                  {saves.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-1 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    >
                      <td className="p-3">
                        {new Date(entry.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3">{entry.name}</td>
                      <td className="pt-3 flex gap-1 items-center justify-center">
                        <button
                          onClick={() => handleLoadSave(entry)}
                          className="p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          title="Load this save"
                        >
                          <img
                            className="w-3.5 aspect-square dark:invert"
                            src={new_prompt}
                            alt="Load Save"
                            height={20}
                            width={20}
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className="p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          title="Delete this save"
                        >
                          <img
                            className="w-3.5 aspect-square dark:invert"
                            src={erase}
                            alt="Delete Save"
                            height={20}
                            width={20}
                          ></img>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 text-center text-xs">
              No saved prompts found. Click on the save button on the left
              sidebar to save a prompt.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavesPage;
