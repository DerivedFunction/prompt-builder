rm -rf ../extension/main
mkdir ../extension/main
npm run build:extension
cp -r ./dist/* ../extension/main
