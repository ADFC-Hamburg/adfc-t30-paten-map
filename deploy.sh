#!/bin/bash
ver=version$(grep version package.json |sed -e 's/\s*"version":\s"\(.*\)",/\1/')
if [ -d "dist" ] ; then
    rm -rf dist
fi
parcel build index.html &&
    git tag $ver &&
    git push origin $ver &&
    rsync -r --delete -v dist/ root@tools:/var/www/html/t30-paten/map/${ver} &&
    yarn version --patch
