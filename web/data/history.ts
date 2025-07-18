import {openDB} from "idb";

export async function getDB() {
  return openDB("history-db", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("history")) {
        db.createObjectStore("history", { keyPath: "id", autoIncrement: true });
      }
    },
  });
}

export async function addHistoryEntry(prompt: string) {
  const db = await getDB();
  await db.add("history", { prompt, timestamp: Date.now() });
}

export async function getHistory() {
  const db = await getDB();
  return await db.getAll("history");
}

export async function deleteAllHistory() {
  const db = await getDB();
  await db.clear("history");
}

// delete one entry by timestamp
export async function deleteHistoryEntry(timestamp: number) {
  const db = await getDB();
  await db.delete("history", timestamp);
}