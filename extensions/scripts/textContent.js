// script.js
(async () => {
  const response = await fetch(new URL(chrome.runtime.getURL("ai-list.json")));
  if (!response.ok) {
    throw new Error("Failed to load AI list data");
  }
  const data = await response.json();
  const url = new URL(window.location.href);
  const urlHostname = url.hostname;
  SELECTORS = data["ai-list"].find((ai) =>
    ai.url.includes(urlHostname)
  ).selectors;
  aiName = ai.name;
  chrome.storage.local.get("delay").then((e) => {
    DELAY = e.delay ?? 3000;
    console.log("Delay set", DELAY);
    setTimeout(getTextInput, DELAY);
  });
})();

let SELECTORS;
let counter = 0;
let element;
let DELAY;

async function getTextInput(maxRetries = 15, retryDelay = DELAY) {
  const {
    query,
    time,
    [aiName]: curAI,
  } = await chrome.storage.local.get(["query", "time", aiName]);
  await chrome.storage.local.remove(aiName); //remove immediately off the queue
  const searchQuery = (curAI ? query : "")?.trim();
  if (!searchQuery) return;
  const curTime = Date.now();
  if (curTime > time + 1000 * 15) return;
  let attempts = 0;
  counter = 0; //reset the counter
  while (attempts < maxRetries) {
    element = document.querySelector(SELECTORS.textbox);
    console.log(`Attempt ${attempts + 1}: Injecting Query`);

    if (element) {
      element.textContent = searchQuery;
      let clicked = await clickButton();
      if (clicked) {
        return;
      } else {
        await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Wait before retry
      }
    } else {
      console.log(`Element not found. Retrying after ${retryDelay}ms.`);
      attempts++;
      if (attempts < maxRetries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Wait before retry
      }
    }
  }

  console.error(`Failed to find element after ${maxRetries} attempts.`);
}

async function clickButton() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const button = document.querySelector(SELECTORS.send);
  if (button) {
    button.click();
    console.log(`Clicked button: ${button}`);

    return true;
  } else {
    console.log(`Button not found`);
    return false;
  }
}
function update() {
  // Send a message after the button click
  chrome.runtime.sendMessage({
    buttonClicked: true,
    engine: aiName,
  });
}

async function getImage() {
  const { [aiName]: curAI } = await chrome.storage.local.get(aiName);
  const STORAGE_KEY_PREFIX = "pasted-file-";
  const fileUploadInput = document.querySelector(SELECTORS.file);
  const dataTransfer = new DataTransfer();
  if (!curAI || !fileUploadInput) return;
  // Map MIME types to file extensions
  const mimeToExtension = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/gif": ".gif",
    "image/bmp": ".bmp",
    "image/webp": ".webp",
    "image/tiff": ".tiff",
  };

  const data = await chrome.storage.local.get();

  for (const key in data) {
    if (key.startsWith(STORAGE_KEY_PREFIX)) {
      try {
        const filename = key.replace(STORAGE_KEY_PREFIX, "");
        const fileData = data[key].data; // e.g., "data:image/png;base64,iVBORw0KGgo..."

        // Extract MIME type and Base64 string
        const [, mimeType, base64String] =
          fileData.match(/^data:([^;]+);base64,(.+)$/) || [];
        if (!mimeType || !base64String) {
          console.error(`Invalid data URI format for key ${key}`);
          continue;
        }

        // Check if MIME type is an image
        if (!mimeType.startsWith("image/")) {
          console.error(`Non-image MIME type (${mimeType}) for key ${key}`);
          continue;
        }

        // Convert Base64 to binary
        let binaryString;
        try {
          binaryString = atob(base64String); // Decode raw Base64
        } catch (e) {
          console.error(`Invalid Base64 string for key ${key}`);
          continue;
        }
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        // Create Blob (reconstructed image)
        const blob = new Blob([bytes], { type: mimeType });

        // Determine file extension
        const extension = mimeToExtension[mimeType] || ".bin"; // Fallback for unknown MIME types
        const finalFilename = filename.endsWith(extension)
          ? filename
          : `${filename}${extension}`;

        // Create File
        const file = new File([blob], finalFilename, {
          type: mimeType,
          lastModified: new Date(),
        });

        // Add to DataTransfer
        dataTransfer.items.add(file);
      } catch (error) {
        console.error(`Error processing file for key ${key}:`, error);
      }
    }
  }

  // Assign files to the input
  console.log("Files assigned:", dataTransfer.files);
  if (dataTransfer.files.length > 0) {
    fileUploadInput.files = dataTransfer.files;
    // Trigger change event to notify listeners
    const event = new Event("change", { bubbles: true });
    fileUploadInput.dispatchEvent(event);
  } else {
    console.log("No valid files to assign to input");
  }
}
