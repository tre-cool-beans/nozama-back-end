'use strict';

module.exports = require('lib/wiring/routes')

// create routes

// what to run for `GET /`
.root('root#root')

// standards RESTful routes
.resources('examples')

// Nozama general resources routes
.resources('products', { only: ['index', 'show', 'create'] })
.resources('pastorders', { only: ['index', 'create', 'update', 'destroy'] })

// Nozama explicit routes
.patch('/update-cart/:id', 'users#updateCart')

// users of the app have special requirements
.post('/sign-up', 'users#signup')
.post('/sign-in', 'users#signin')
.delete('/sign-out/:id', 'users#signout')
.patch('/change-password/:id', 'users#changepw')
.resources('users', { only: ['index', 'show'] })

// all routes created
;
