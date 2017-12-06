const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const Location = require('../models/Location');
const User = require('../models/User');

const checkIDParam = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: 'Specified id is not valid'
    });
  }
  next();
};

  const router = express.Router();
  /* List all Locations */
  router.get('/', (req, res, next) => {
    Location.find()
      .then(list => res.json(list))
      .catch(e => res.json(e));
  });

  /* Create a new Location */
  router.post('/new', (req, res, next) => {

    const {title, city, availability, price} = req.body;
    const obj = new Location({
      title,
      city,
      availability,
      price
    });

    obj.save()
      .then(o => {
        User.findByIdAndUpdate(req.user._id, {$push: {locations : {_id: o._id}}})
        .then( () => {
          res.json(o);
        });
      })
      .catch(e => res.json(e));
  });

  /* GET a single Location. */
  router.get('/:id', checkIDParam, (req, res) => {
    Location.findById(req.params.id)
      .then(o => res.json(o))
      .catch(e => res.json(e));
  });

  /* EDIT a Location. */
  router.post('/:id', checkIDParam, (req, res) => {
    const updates = _.pick(req.body, location_properties);
    Location.findByIdAndUpdate(req.params.id, updates, {
        new: true
      })
      .then(o => res.json(o))
      .catch(e => res.json(e));
  });

  /* DELETE a Location. */
  router.delete('/:id', checkIDParam, (req, res) => {

    Location.remove({
        _id: req.params.id
      })
      .then(o => res.json({
        message: 'Location has been removed!'
      }))
      .catch(e => res.json(e));
  });

module.exports = router;
