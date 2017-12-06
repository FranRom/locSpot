const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const Review = require('../models/Review');
const Location = require('../models/Location');

const checkIDParam = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: 'Specified id is not valid'
    });
  }
  next();
};

  const router = express.Router();
  /* List all Reviews */
  router.get('/', (req, res, next) => {
    Review.find()
      .then(list => res.json(list))
      .catch(e => res.json(e));
  });

  /* Create a new Location */
  router.post('/new', (req, res, next) => {

    const {stars, content} = req.body;
    const obj = new Location({
      stars,
      content
    });

    obj.save()
      .then(o => {
        User.findByIdAndUpdate(req.location._id, {$push: {reviews : {_id: o._id}}})
        .then( () => {
          res.json(o);
        });
      })
      .catch(e => res.json(e));
  });

  /* GET a single Location. */
  router.get('/:id', checkIDParam, (req, res) => {
    Review.findById(req.params.id)
      .then(o => res.json(o))
      .catch(e => res.json(e));
  });

  /* EDIT a Review. */
  router.post('/:id', checkIDParam, (req, res) => {
    const updates = _.pick(req.body, review_properties);
    console.log(updates);
    Review.findByIdAndUpdate(req.params.id, updates, {
        new: true
      })
      .then(o => res.json(o))
      .catch(e => res.json(e));
  });

  /* DELETE a Review. */
  router.delete('/:id', checkIDParam, (req, res) => {

    Review.remove({
        _id: req.params.id
      })
      .then(o => res.json({
        message: 'Review has been removed!'
      }))
      .catch(e => res.json(e));
  });

module.exports = router;
