#!/usr/bin/env sh

mkdir ../dist
cd ../dist
git init && git remote add origin https://github.com/abaicus/cugetarile-tribunului
git fetch && git checkout gh-pages
cd -
npm run build
rsync -r dist/ ../dist
cd ../dist
git add *
git commit -m "Deploy"
git push
cd -
rm -rf ../dist
