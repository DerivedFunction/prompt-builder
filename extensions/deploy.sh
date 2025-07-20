rm -rf ../extension/*.js,*.json
rm -rf ../extension/options ../extension/scripts
mkdir ../extension/options
npm run build:extension
cp -r ./dist/*  ../extension/options
cp -r manifest.json ai-list.json background.js scripts ../extension
