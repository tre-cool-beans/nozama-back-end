## Introduction

An Express and MongoDB API made to store the Nozame e-commerce site database. It allows users to register as users of the API, add products to a cart, and then "purchase" their cart.

[Deployed Front End](https://tre-cool-beans.github.io/nozama-front-end/)

[Back End Repo](https://github.com/tre-cool-beans/nozama-back-end)<br>
[Front End Repo](https://github.com/tre-cool-beans/nozama-front-end)

## API Routes

| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out/:id`        | `users#signout`   |
| PATCH  | `/change-password/:id` | `users#changepw`  |
| GET    | `/products`            | `products#index`  |
| POST   | `/products`            | `products#create` |
| GET    | `/products/:id`        | `products#show`   |
| PATCH  | `/cart/:id`            | `users#updateCartProduct`  |
| POST   | `/cart/:id`            | `users#createCartProduct` |
| DELETE | `/cart/:id`            | `users#destroyCartProduct`   |
| DELETE | `/empty-cart/:id`      | `users#emptyCart`   |
| POST   | `/stripe`              | `users#chargeCard` |
| GET    | `/pastorders`          | `pastorders#index`  |
| POST   | `/pastorders`          | `pastorders#create` |

All data returned from API actions is formatted as JSON.
