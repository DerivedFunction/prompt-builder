rm -rf ../chrome ../firefox
mkdir chrome firefox 
rm -rf dist/* 
npm update
npm run build
cp -r dist/* chrome
cp -r dist/* firefox
cp ../extension/* chrome
cp ../extension/* firefox
rm chrome/manifest-firefox.json
mv firefox/manifest-firefox.json firefox/manifest.json
7z a chrome-pb.zip chrome
7z a firefox-pb.zip firefox
mv *.zip ../