// script.js Thanks to https://github.com/facebook/react/issues/11488#issuecomment-347775628
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
      // Simulate input for React compatibility
      let lastValue = element.value || "";
      element.value = searchQuery;

      let event = new Event("input", { bubbles: true });
      event.simulated = true; // Hack for React 15

      // Hack for React 16+ _valueTracker
      let tracker = element._valueTracker;
      if (tracker) {
        tracker.setValue(lastValue);
      }
      element.dispatchEvent(event);
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
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
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
