#!/bin/bash

API="http://localhost:4741"
URL_PATH="/products"

curl "${API}${URL_PATH}${}" \
  --include \
  --request GET \
  --header "Content-Type: application/json" \
  --data '{
      "product" : {
        "title": "My TEST PRODUCT AAAAAAAAA",
        "description": "A really nice mauve sweater",
        "price": 3.50,
        "sizes": ["S", "M", "L"],
        "image_url": "https://images.luisaviaroma.com/Medium63I/ATE/017_c6a3c249-40a0-4f31-bdc8-a8ee7dd295b5.JPG"
      }
    }'

echo
