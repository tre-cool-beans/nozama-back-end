'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const PastOrder = models.pastorder;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  let search = { _owner: req.currentUser._id };
  PastOrder.find(search).sort({createdAt: -1})
    .then(pastorders => res.json({ pastorders }))
    .catch(err => next(err));
};

const create = (req, res, next) => {
  let pastorder = Object.assign(req.body.pastorder, {
    _owner: req.currentUser._id,
  });
  PastOrder.create(pastorder)
    .then(pastorder => res.json({ pastorder }))
    .catch(err => next(err));
};

module.exports = controller({
  index,
  create,
}, { before: [
  { method: authenticate, except: [] },
], });
