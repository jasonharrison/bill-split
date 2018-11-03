#!/bin/bash
set -e

CLEAN_BRANCH_NAME=${CIRCLE_BRANCH//\//-};

JSON=$(cat <<-EOF
{
  "name": "$CIRCLE_PROJECT_REPONAME-$CLEAN_BRANCH_NAME",
  "type": "static",
  "static": {
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "alias": "$CLEAN_BRANCH_NAME.ci.bill-split.com",
  "name": "$CIRCLE_PROJECT_REPONAME-$CLEAN_BRANCH_NAME",
  "type": "npm",
  "forwardNpm": true,
  "alias": [
      "$CLEAN_BRANCH_NAME.ci.bill-split.com"
  ]
}
EOF
)

echo $JSON > .now/now.feature.json
