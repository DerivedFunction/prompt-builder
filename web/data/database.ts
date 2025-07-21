import { openDB } from "idb";
interface SaveEntry {
  id?: number;
  name: string;
  timestamp: number;
  data: Record<string, unknown>;
}
export async function getDB() {
  return openDB("history-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("history")) {
        db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
      }
      if (!db.objectStoreNames.contains("saves")) {
        db.createObjectStore("saves", { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

// --- History Functions ---

export async function addHistoryEntry(prompt: string, url: string) {
  const db = await getDB();
  await db.add("history", { prompt, timestamp: Date.now(), url });
}

export async function getHistory() {
  const db = await getDB();
  return (await db.getAll("history")).reverse();
}

export async function deleteAllHistory() {
  const db = await getDB();
  await db.clear("history");
}

export async function deleteHistoryEntry(id: number) {
  const db = await getDB();
  try {
    await db.delete("history", id);
  } catch (error) {
    console.error("Error deleting history entry:", error);
    throw new Error(`Failed to delete entry with id ${id}`);
  }
}

// --- Saves Functions ---

// Function to save data from localStorage to IndexedDB
export async function saveDataFromLocalStorage(name: string) {
  // Retrieve and parse the data from localStorage
  const data = JSON.parse(localStorage.getItem("input") || "");

  const db = await getDB();
  await db.add("saves", {
    data,
    timestamp: Date.now(),
    name,
  });
}

export async function getSaves() {
  const db = await getDB();
  // Return saves in descending order (newest first)
  return (await db.getAll("saves")).reverse();
}

export async function deleteSave(id: number) {
  const db = await getDB();
  try {
    await db.delete("saves", id);
  } catch (error) {
    console.error("Error deleting save:", error);
    throw new Error(`Failed to delete save with id ${id}`);
  }
}

/**
 * Deletes all entries from the 'saves' object store.
 */
export async function deleteAllSaves() {
  const db = await getDB();
  await db.clear("saves");
}

/**
 * Loads a specific save into localStorage.
 * This function clears existing 'data' prefixed items and sets new ones from the save.
 *
 */
export function loadSaveToLocalStorage(data: Record<string, unknown>) {
  // 1. Clear all existing items with the 'input' prefix from localStorage
  localStorage.removeItem("input");

  // 2. Add the new items from the selected save to localStorage
  localStorage.setItem("input", JSON.stringify(data));
}

export const addSave = async (saveData: SaveEntry) => {
  // Validate the save data structure
  if (!saveData.name || !saveData.data) {
    throw new Error(
      "Invalid save data format: 'name' and 'data' are required."
    );
  }

  // Ensure timestamp is a valid number or default to current time
  const timestamp =
    typeof saveData.timestamp === "number" ? saveData.timestamp : Date.now();

  // Get the database instance
  const db = await getDB();

  try {
    // Create the SaveEntry object
    const save: SaveEntry = {
      name: saveData.name,
      data: saveData.data,
      timestamp,
    };

    // Add the save to the "saves" object store
    const tx = db.transaction("saves", "readwrite");
    const store = tx.objectStore("saves");
    store.add(save);

    db.close();
  } catch (error) {
    console.error("Error adding save:", error);
    throw new Error("Failed to add save to IndexedDB.");
  }
};
