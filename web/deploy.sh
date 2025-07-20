rm -rf extension
mkdir extension
npm run build:extension
cp -r ./dist/* extension
cp -r manifest.json ai-list.json background.js scripts extension
