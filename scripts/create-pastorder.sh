API="http://localhost:4741"
URL_PATH="/pastorders"
TOKEN="oeA0hiLUEnHBEG9T2FAojru9nnzqKowXGO7hFhh+a3A=--sh1mfRWHHX5jtbRg/lZhLQ+fZwO9KRwaA2TVjHBD74o="

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Authorization: Token token=$TOKEN" \
  --header "Content-Type: application/json" \
  --data '{
        "pastorder": {
            "comment": "These are the silliest clothes! :3",
            "products": [
              {
                "title": "NOT THE THING SHIRT",
                "description": "cool",
                "price": 90000,
                "sizes": "L",
                "image_url": "https://images.luisaviaroma.com/Medium63I/ATE/017_c6a3c249-40a0-4f31-bdc8-a8ee7dd295b5.JPG"
              },
              {
                "title": "BANGAJANGA WING TANG FLANGA",
                "description": "really nice wool short shorts",
                "price": 0.01,
                "sizes": "S",
                "image_url": "https://images.luisaviaroma.com/Medium63I/ATE/017_c6a3c249-40a0-4f31-bdc8-a8ee7dd295b5.JPG"
              }
            ],
            "purchased_on": 903148576,
            "total_price": 90000.01
        }
    }'

echo
