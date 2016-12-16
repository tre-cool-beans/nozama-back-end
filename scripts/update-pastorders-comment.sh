#!/bin/bash

API="http://localhost:4741"
URL_PATH="/pastorders"
TOKEN="9f8ExMPTSoxbcr/B5svJeEGku9QaiYu/ZPgZjoZllhs=--IZDz4Cxf8wmEKzQKNLkW3LgIBPSoPg+z+xp9sy20VQA="
ID="58541946f46e83ed4030d000"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "comment": "Updated Comment"
  }'

echo
