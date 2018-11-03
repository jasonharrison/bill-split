#!/bin/bash
set -e

CLEAN_BRANCH_NAME=${CIRCLE_BRANCH//\//-};

JSON=$(cat <<-EOF
{
  "type": "static",
  "static": {
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
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
