import React, { useEffect, useState } from "react";
import copy from "@/images/copy.svg"; // This icon will be used for "Load"
import erase from "@/images/erase.svg";
import {
  getSaves,
  deleteAllSaves,
  deleteSave,
  loadSaveToLocalStorage,
} from "../data/database";

// Interface for a single save entry
interface SaveEntry {
  id: number;
  name: string;
  timestamp: number;
  inputs: { type: string; data: unknown }[];
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

  const handleLoadSave = (inputs: { type: string; data: unknown }[]) => {
    try {
      loadSaveToLocalStorage(inputs);
      alert(
        "Save loaded successfully! The page will now reload to apply changes."
      );
      // Reload the page to ensure all components re-read from localStorage
      window.location.reload();
    } catch (err) {
      console.error("Failed to load save:", err);
      alert("Failed to load save.");
    }
  };

  return (
    <div className="flex flex-col h-full w-full text-gray-900 dark:text-gray-100">
      <div className="flex-1 p-4 border-2 border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Saved States
        </h1>

        {/* Saves Table */}
        <div className="flex flex-col gap-2">
          {saves.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold">
                    <th className="p-3 text-left w-[20%]">Timestamp</th>
                    <th className="p-3 text-left w-[60%]">Save Name</th>
                    <th className="p-3 text-center w-[12%]">
                      <button
                        onClick={handleClearAll}
                        className="p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                        title="Delete all saves"
                      >
                        <img
                          className="w-3.5 aspect-square dark:invert"
                          src={erase}
                          alt="Delete All"
                          height={20}
                          width={20}
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {saves.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-t border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    >
                      <td className="p-3">
                        {new Date(entry.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3">{entry.name}</td>
                      <td className="pt-3 flex gap-1 items-center justify-center">
                        <button
                          onClick={() => handleLoadSave(entry.inputs)}
                          className="p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          title="Load this save"
                        >
                          <img
                            className="w-3.5 aspect-square dark:invert"
                            src={copy}
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
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 text-center">
              No saved states found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavesPage;
