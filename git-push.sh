MSG="$1"
cd server/fed-plugin
git add .
git commit -m "$MSG"
git push
cd ../..
git add .
git commit -m "$MSG"
git push