API="http://localhost:4741"
URL_PATH="/users"
ID="58540b008ca87d133565419b"
TOKEN="sZQGBZQxcIuQ8Ood1TTqCd7lUZGGNeyUjrVVwaNW+P0=--elT5w9AiPP/0Bc8rZdddwAg2NCbPcGi1ZeDHEKsHBdw="

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
        "cart": [
          {
            "title": "New cool thing",
            "description": "Cool thing that is cool",
            "price": 3.50,
            "size": "S",
            "image_url": "https://images.luisaviaroma.com/Medium63I/ATE/017_c6a3c249-40a0-4f31-bdc8-a8ee7dd295b5.JPG"
          }
        ]
    }'

echo
