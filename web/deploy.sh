rm -rf ../chrome ../firefox
mkdir ../chrome ../firefox 
rm -rf dist/* 
npm update
npm run build
cp -r dist/* ../chrome
cp -r dist/* ../firefox
cp ../extension/* ../chrome
cp ../extension/* ../firefox

