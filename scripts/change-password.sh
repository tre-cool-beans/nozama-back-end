#!/bin/bash

API="http://localhost:4741"
URL_PATH="/change-password"
ID="58540799db076b102036f05d"
TOKEN="dKwOGTdEMeyfqmdPpikWV3QWMhoZXPwik5+92Vqucqw=--3hF6oVRVk7Grat9ZDG1X0Bg8DN5RCnwkptr191rtBEA="

OLDPW="test"
NEWPW="tester"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "passwords": {
      "old": "'"${OLDPW}"'",
      "new": "'"${NEWPW}"'"
    }
  }'

echo
