'use strict';

const debug = require('debug')('nozama-api:users');

const controller = require('lib/wiring/controller');
const models = require('app/models');
const User = models.user;

const crypto = require('crypto');

const authenticate = require('./concerns/authenticate');

const HttpError = require('lib/wiring/http-error');

const MessageVerifier = require('lib/wiring/message-verifier');

// Get Stripe; careful with those secrets!
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const encodeToken = (token) => {
  const mv = new MessageVerifier('secure-token', process.env.SECRET_KEY);
  return mv.generate(token);
};

const getToken = () =>
  new Promise((resolve, reject) =>
    crypto.randomBytes(16, (err, data) =>
      err ? reject(err) : resolve(data.toString('base64'))
    )
  );

const userFilter = { passwordDigest: 0, token: 0 };

const makeErrorHandler = (res, next) =>
  error =>
    error && error.name && error.name === 'ValidationError' ?
      res.status(400).json({ error }) :
    next(error);

const index = (req, res, next) => {
  User.find({}, userFilter)
    .then(users => res.json({ users }))
    .catch(err => next(err));
};

const show = (req, res, next) => {
  User.findById(req.params.id, userFilter)
    .then(user => user ? res.json({ user }) : next())
    .catch(err => next(err));
};

// For now I'm putting Stripe charging in here but it, as well
// should be stripped out and put into it's own file.
// Seperation of concerns!

const chargeCard = (req, res, next) => {
  return new Promise((resolve, reject) => {
    stripe.charges.create({
      amount: req.body.amount,
      currency: "usd",
      source: req.body.token,
      description: "Nozama Charge"
    }, function(err, charge) {
      if (err /*&& err.type === 'StripeCardError'*/) {
        reject(err);
      } else {
        resolve(charge);
      }
    });
  })
  .then(charge => {
    res.json({ charge });
  })
  .catch(err => next(err));
};

// All these CartProduct actions should be stripped and moved
// into their own file; users.js is getting pretty hefty

const createCartProduct = (req, res, next) => {
  // Find the user that we want to update
  User.findOne({
    _id: req.params.id,
    token: req.currentUser.token,
  }).then(user => {
    // Push the new cart object onto the found user's cart
    user.cart.push(req.body);
    // Save the new user data in our database
    return user.save();
  }).then((user) => {
    // Send just the user's cart back for frontend data update
    let cart = user.cart;
    res.json({ cart });
  }).catch(makeErrorHandler(res, next));
};

const updateCartProduct = (req, res, next) => {
  // Get the _id of the CartProduct we want to PATCH
  let cart_product_id = req.body._id;
  // Delete the _id key of the request so we don't
  // accidentily PATCH it when we update CartProduct
  delete req.body._id;
  // Get all the keys of the PATCH request body.
  let req_keys = Object.keys(req.body);

  User.findOne({
    _id: req.params.id,
    token: req.currentUser.token,
  }).then(user => {
    // Find the CartProduct in the user's cart
    let cart_product = user.cart.id(cart_product_id);
    // For every request key, PATCH the related
    // CartProduct key with the new value
    for (let i = 0; i < req_keys.length; i++) {
        cart_product[req_keys[i]] = req.body[req_keys[i]];
    }
    // Save the new user cart data in our database
    return user.save();
  }).then((user) => {
    // Send the user's updated cart back for frontend data update
    let cart = user.cart;
    res.json({ cart });
  }).catch(makeErrorHandler(res, next));
};

const destroyCartProduct = (req, res, next) => {
  // Get the _id of the CartProduct we want to DELETE
  let cart_product_id = req.body._id;

  User.findOne({
    _id: req.params.id,
    token: req.currentUser.token,
  }).then(user => {
    // Find the CartProduct in the user's cart
    let cart_product = user.cart.id(cart_product_id);
    // Remove the CartProduct
    cart_product.remove();
    // Save the new user cart data in our database
    return user.save();
  }).then((user) => {
    // Send the user's updated cart back for frontend data update
    let cart = user.cart;
    res.json({ cart });
  }).catch(makeErrorHandler(res, next));
};

const emptyCart = (req, res, next) => {

  User.findOne({
    _id: req.params.id,
    token: req.currentUser.token,
  }).then(user => {
    // Get the user's cart
    let cart = user.cart;
    // Remove every CartProduct in the user's cart
    // Have to move from the end of the array to the
    // beginning because the length of the array changes
    // as elements are removed.
    for (let i = cart.length - 1; i >= 0; i--) {
      cart[i].remove();
    }
    // Save the new user cart data in our database
    return user.save();
  }).then((user) => {
    // Send the user's updated cart back for frontend data update
    let cart = user.cart;
    res.json({ cart });
  }).catch(makeErrorHandler(res, next));
};

const signup = (req, res, next) => {
  let credentials = req.body.credentials;
  let user = { email: credentials.email, password: credentials.password };
  if(credentials.password===credentials.password_confirmation){
    getToken().then(token =>
      user.token = token
    ).then(() =>
      new User(user).save()
    ).then(newUser => {
      let user = newUser.toObject();
      delete user.token;
      delete user.passwordDigest;
      res.json({ user });
    })
    .catch(makeErrorHandler(res, next));
  }
  else {
    let error = {name: 'ValidationError' };
    makeErrorHandler(res, next)(error);
  }
};

const signin = (req, res, next) => {
  let credentials = req.body.credentials;
  let search = { email: credentials.email };
  User.findOne(search
  ).then(user =>
    user ? user.comparePassword(credentials.password) :
          Promise.reject(new HttpError(404))
  ).then(user =>
    getToken().then(token => {
      user.token = token;
      return user.save();
    })
  ).then(user => {
    user = user.toObject();
    delete user.passwordDigest;
    user.token = encodeToken(user.token);
    res.json({ user });
  }).catch(makeErrorHandler(res, next));
};

const signout = (req, res, next) => {
  getToken().then(token =>
    User.findOneAndUpdate({
      _id: req.params.id,
      token: req.currentUser.token,
    }, {
      token,
    })
  ).then((user) =>
    user ? res.sendStatus(200) : next()
  ).catch(next);
};

const changepw = (req, res, next) => {
  User.findOne({
    _id: req.params.id,
    token: req.currentUser.token,
  }).then(user =>
    user ? user.comparePassword(req.body.passwords.old) :
      Promise.reject(new HttpError(404))
  ).then(user => {
    user.password = req.body.passwords.new;
    return user.save();
  }).then((/* user */) =>
    res.sendStatus(200)
  ).catch(makeErrorHandler(res, next));
};

module.exports = controller({
  index,
  show,
  chargeCard,
  createCartProduct,
  updateCartProduct,
  destroyCartProduct,
  emptyCart,
  signup,
  signin,
  signout,
  changepw,
}, { before: [
  { method: authenticate, except: ['signup', 'signin'] },
], });
