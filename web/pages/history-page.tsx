import React, { useEffect, useState } from "react";
import copy from "@/images/copy.svg";
import erase from "@/images/erase.svg";
import {
  getHistory,
  deleteAllHistory,
  deleteHistoryEntry,
} from "../data/database";

interface HistoryEntry {
  id: number;
  prompt: string;
    timestamp: number;
    url: string;
}

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const historyData = await getHistory();
    setHistory(historyData);
  };

  const handleClearAll = async () => {
    if (window.confirm("Are you sure you want to delete all history?")) {
      await deleteAllHistory();
      fetchHistory(); // Refresh history after clearing
    }
  };

  const handleDeleteEntry = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      await deleteHistoryEntry(id);
      fetchHistory(); // Refresh history after deleting an entry
    }
  };

  const handleCopyEntry = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
    } catch (err) {
      console.error("Failed to copy prompt:", err);
      alert("Failed to copy prompt.");
    }
  };

  return (
    <div className="h-full w-full text-gray-900 dark:text-gray-100">
      <div className="p-4 border-2 border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          History Logs
        </h1>

        {/* History Table */}
        <div className="gap-2">
          {history.length > 0 ? (
            <div className="overflow-x-scroll">
              <table className="w-full border-2 border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-bold">
                    <th className="p-3 text-left w-[10%]">Timestamp</th>
                    <th className="p-3 text-left min-w-[200px] w-[70%]">
                      Prompt
                    </th>
                    <th className="p-3 text-center min-w-[100px]">
                      <button
                        onClick={() => handleClearAll()}
                        className={`p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700`}
                      >
                        <img
                          className="w-3.5 aspect-square dark:invert"
                          src={erase}
                          alt=""
                          height={20}
                          width={20}
                        />
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry) => (
                    <tr
                      key={entry.id}
                      className="border-t border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                    >
                      <td className="p-3">
                        {new Date(entry.timestamp).toLocaleString()}
                      </td>
                      <td className="p-3">
                        <div>{entry.prompt}</div>
                        <button
                          className="text-xs border px-2 py-1 mt-1 rounded-xl cursor-pointer transition-colors border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => window.open(entry.url, "_blank")}
                        >
                          {`https://${new URL(entry.url).hostname.replace(
                            "www.",
                            ""
                          )}`}
                        </button>
                      </td>
                      <td className="pt-3 flex gap-1 items-center justify-center">
                        <button
                          onClick={() => handleCopyEntry(entry.prompt)}
                          className={`p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                          <img
                            className="w-3.5 aspect-square dark:invert"
                            src={copy}
                            alt=""
                            height={20}
                            width={20}
                          />
                        </button>
                        <button
                          onClick={() => handleDeleteEntry(entry.id)}
                          className={`p-2 border-1 rounded border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700`}
                        >
                          <img
                            className="w-3.5 aspect-square dark:invert"
                            src={erase}
                            alt=""
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
              No history entries found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
