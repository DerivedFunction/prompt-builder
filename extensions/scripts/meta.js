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
let aiName;
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
  const searchQuery = (curAI ? query : "")?.trim();
  await chrome.storage.local.remove(aiName);
  if (!searchQuery) return;
  const curTime = Date.now();
  if (curTime > time + 1000 * 15) return;
  let attempts = 0;
  counter = 0; //reset the counter
  while (attempts < maxRetries) {
    element = document.querySelector(SELECTORS.textbox);
    getListener();
    console.log(`Attempt ${attempts + 1}: Injecting Query`);

    if (element) {
      element.focus();
      const beforeInputEvent = new InputEvent("beforeinput", {
        inputType: "insertText",
        data: searchQuery,
        bubbles: true,
        cancelable: true,
      });

      element.dispatchEvent(beforeInputEvent);
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
        // Check 'stop' condition here
        await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Wait before retry
      }
    }
  }

  console.error(`Failed to find element after ${maxRetries} attempts.`);
  return;
}

function getListener() {
  element?.addEventListener("beforeinput", (event) => {
    if (event.inputType === "insertText") {
      event.preventDefault(); //Prevent the default behaviour
      const newText = event.data;
      const selection = window.getSelection();

      if (selection && selection.rangeCount) {
        const range = selection.getRangeAt(0);
        // Remove selected text (if any)
        range.deleteContents();

        // Insert the new text
        range.insertNode(document.createTextNode(newText));

        // Update selection (if desired)
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        element.appendChild(document.createTextNode(newText));
      }
    }
  });
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
