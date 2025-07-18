import { openDB } from "idb";

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
  return await db.getAll("history");
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
  const prefix = "inputs_"; // Prefix for input keys in localStorage
  const inputs = [];

  // Iterate over all keys in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    // Check if the key starts with the specified prefix
    if (key?.startsWith(prefix)) {
      try {
        // Retrieve and parse the data from localStorage
        const data = JSON.parse(localStorage.getItem(key) || "");
        inputs.push({ type: key, data });
      } catch (error) {
        console.error(`Error parsing data for key ${key}:`, error);
      }
    }
  }
  const db = await getDB();
  await db.add("saves", {
    inputs,
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
 * This function clears existing 'inputs_' prefixed items and sets new ones from the save.
 * @param inputs - The array of input objects from a save entry.
 */
export function loadSaveToLocalStorage(inputs: { type: string; data: unknown }[]) {
  // 1. Clear all existing items with the 'inputs_' prefix from localStorage
  Object.keys(localStorage)
    .filter((key) => key.startsWith("inputs_"))
    .forEach((key) => localStorage.removeItem(key));

  // 2. Add the new items from the selected save to localStorage
  inputs.forEach((input) => {
    localStorage.setItem(input.type, JSON.stringify(input.data));
  });
}
