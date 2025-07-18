import { openDB } from "idb";

export async function getDB() {
  return openDB("history-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("history")) {
        db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function addHistoryEntry(prompt: string, url: string) {
  const db = await getDB();
  await db.add("history", { prompt, timestamp: Date.now(),url });
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
