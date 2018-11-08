#!/bin/bash
set -e

CLEAN_BRANCH_NAME=${CIRCLE_BRANCH//\//-};
CIRCLE_SHA1=${CIRCLE_SHA1//\//-};

sed -i -e "s/null; \/\/ for CircleCI/\"$CLEAN_BRANCH_NAME ${CIRCLE_SHA1:0:7}\";/" src/App.tsx
sed -i -e "s/<meta charset/<p hidden style=\"display:none\"\>Version: $CLEAN_BRANCH_NAME $CIRCLE_SHA1<\/p\>\\n    <meta charset/" public/index.html