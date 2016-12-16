API="http://localhost:4741"
URL_PATH="/pastorders"
TOKEN="9f8ExMPTSoxbcr/B5svJeEGku9QaiYu/ZPgZjoZllhs=--IZDz4Cxf8wmEKzQKNLkW3LgIBPSoPg+z+xp9sy20VQA="

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json"

  echo
