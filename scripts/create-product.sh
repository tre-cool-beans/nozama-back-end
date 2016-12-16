#!/bin/bash

API="http://localhost:4741"
URL_PATH="/products"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
      "product" : {
        "title": "buncha stupid bs",
        "description": "cool",
        "price": 90000,
        "sizes": ["S", "M", "L"],
        "image_url": "https://images.luisaviaroma.com/Medium63I/ATE/017_c6a3c249-40a0-4f31-bdc8-a8ee7dd295b5.JPG"
      }
    }'

echo
