rm -rf ../extension ../firefox
mkdir ../extension ../firefox
npm run build:extension
cp -r ./dist/* ../extension
cp manifest.json background.js ../extension
cp -r ../extension/* ../firefox
cp manifest-firefox.json ../firefox/manifest.json
rm ../firefox/background.js
cd ../extension && 7z a ../chrome.zip .
cd ../firefox && 7z a ../firefox.zip .
