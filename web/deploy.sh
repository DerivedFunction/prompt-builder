rm -rf extension
mkdir extension
npm run build:extension
cp -r ./dist/* extension
cp manifest.json extension
cp background.js extension
