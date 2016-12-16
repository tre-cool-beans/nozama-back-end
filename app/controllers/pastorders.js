'use strict';

const controller = require('lib/wiring/controller');
const models = require('app/models');
const PastOrder = models.pastorder;

const authenticate = require('./concerns/authenticate');

const index = (req, res, next) => {
  let search = { _owner: req.currentUser._id };
  PastOrder.find(search)
    .then(pastorders => res.json({ pastorders }))
    .catch(err => next(err));
};

// const show = (req, res, next) => {
//   PastOrder.findById(req.params.id)
//     .then(pastorder => pastorder ? res.json({ pastorder }) : next())
//     .catch(err => next(err));
// };

const create = (req, res, next) => {
  let pastorder = Object.assign(req.body.pastorder, {
    _owner: req.currentUser._id,
  });
  PastOrder.create(pastorder)
    .then(pastorder => res.json({ pastorder }))
    .catch(err => next(err));
};

const update = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  PastOrder.findOne(search)
    .then(pastorder => {
      if (!pastorder) {
        return next();
      }

      delete req.body._owner;  // disallow owner reassignment.
      pastorder.comment = req.body.comment;
      return pastorder.save();
    })
    .then(() => res.sendStatus(200))
    .catch(err => next(err));
};

const destroy = (req, res, next) => {
  let search = { _id: req.params.id, _owner: req.currentUser._id };
  PastOrder.findOne(search)
    .then(pastorder => {
      if (!pastorder) {
        return next();
      }

      return pastorder.remove()
        .then(() => res.sendStatus(200));
    })
    .catch(err => next(err));
};

module.exports = controller({
  index,
  // show,
  create,
  update,
  destroy,
}, { before: [
  { method: authenticate /*, except: ['index', 'show'] */},
], });
