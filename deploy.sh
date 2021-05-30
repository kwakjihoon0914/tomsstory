


#!/bin/sh
echo "Start Build And Deployment!!"


# react build
npm run-script build       

# cp build directory to another git

cp -R build/* ../kwakjihoon0914.github.io


#git remote set-url origin https://kwakjihoon0914@github.com/kwakjihoon0914/kwakjihoon0914.github.io




echo "Enter password"

cd ../kwakjihoon0914.github.io
git push 