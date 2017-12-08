const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const User = require('../models/User');
const uploadS3 = require('../config/aws3profile');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
//uploadS3(file, callback)

const checkIDParam = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({
      message: 'Specified id is not valid'
    });
  }
  next();
};

  const router = express.Router();
  /* List all Users */
  router.get('/', (req, res, next) => {
    User.find()
      .then(list => res.json(list))
      .catch(e => res.json(e));
  });

  /* GET a single User. */
  router.get('/:id', checkIDParam, (req, res) => {
    User.findById(req.params.id)
      .then(o => res.json(o))
      .catch(e => res.json(e));
  });

  /* EDIT a User. */
  router.post('/:id', upload.single('picture'), (req, res) => {
    const file = req.file;
    uploadS3(file, function (err, data) {
  		if (err) {
  			callback(err);
  		} else {
        const user_properties = {
          username: req.body.username,
          lastname: req.body.lastname,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
          city: req.body.city,
          about: req.body.about,
          picture: data.Location
        };
        console.log(data);
    User.findByIdAndUpdate(req.params.id, user_properties, {
        new: true
      })
      .then(o => res.json(o))
      .catch(e => res.json(e));
    }});
  });

  /* DELETE a User. */
  router.delete('/:id/delete', checkIDParam, (req, res) => {

    User.remove({
        _id: req.params.id
      })
      .then(o => res.json({
        message: 'User has been removed!'
      }))
      .catch(e => res.json(e));
  });

module.exports = router;
