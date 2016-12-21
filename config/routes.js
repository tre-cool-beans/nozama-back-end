'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')

// Nozama general resources routes
.resources('products', { only: ['index', 'show'/*, 'create'*/] })

// Nozama explicit routes

// Cart
.post('/cart/:id', 'users#createCartProduct')
.patch('/cart/:id', 'users#updateCartProduct')
.delete('/cart/:id', 'users#destroyCartProduct')
.delete('/empty-cart/:id', 'users#emptyCart')

// Stripe Card Charge
.post('/stripe', 'users#chargeCard')

// PastOrders
.get('/pastorders', 'pastorders#index')
.post('/pastorders', 'pastorders#create')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
;
