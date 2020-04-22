#!/usr/bin/env sh

mkdir dist
cd dist
git init
git remote add origin https://github.com/abaicus/cugetarile-tribunului
git fetch
git checkout gh-pages
cd -
npm run build

cd dist
git commit -am "Deploy"
git push origin gh-pages
cd -
