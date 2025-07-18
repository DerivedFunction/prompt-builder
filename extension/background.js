try {
  chrome.sidePanel
  .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error) => console.error(error));
}
catch {
  console.log("Not a Chrome browser")
}
