const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const Location = require('../models/Location');
const User = require('../models/User');
const uploadS3 = require('../config/aws3location');
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });

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
  /* Initial code */

  // router.post('/new', (req, res, next) => {
  //   const {title, city, availability, price, picture} = req.body;
  //   const obj = new Location({
  //     title,
  //     city,
  //     availability,
  //     price,
  //     picture
  //   });
  //
  router.post('/new', upload.array('picture', 20), (req, res, next) => {
    const file = req.files;
    uploadS3(file, function (err, data) {
  		if (err) {
        console.log("ERRORRRRRRRRRR");
  			callback(err);
  		} else {
    console.log(data.Location);
    const obj = new Location({
      title: req.body.title,
      city: req.body.city,
      availability: req.body.availability,
      price: req.body.price,
      picture: data.Location
    });
    console.log(obj);

    obj.save()
      .then(o => {
        User.findByIdAndUpdate(req.user._id, {$push: {locations : {_id: o._id}}})
        .then( () => {
          res.json(o);
        });
      })
      .catch(e => res.json(e));
    }});
  });

  /* GET a single Location. */
  router.get('/:id/', checkIDParam, (req, res) => {
    Location.findById(req.params.id)
      .then(o => res.json(o))
      .catch(e => res.json(e));
  });

// ARREGLAR ESTA VAINA BITCH
  /* EDIT a Location. */
 //  router.post('/:id/edit', upload.single('picture', (req, res) => {
 //    const file = req.file;
 //    uploadS3(file, function (err, data) {
 //  		if (err) {
 //  			callback(err);
 //  		} else {
 //        const location_properties = {
 //          title: req.body.title,
 //          city: req.body.city,
 //          description: req.body.description,
 //          availability: req.body.availability,
 //          price: req.body.price,
 //          type: req.body.type,
 //          activity: req.body.activity,
 //          picture: data.Location
 //       };
 //
 //    Location.findByIdAndUpdate(req.params.id, location_properties, {
 //        new: true
 //      })
 //      .then(o => res.json(o))
 //      .catch(e => res.json(e));
 //   }})
 // });

  /* DELETE a Location. */
  router.delete('/:id/delete', checkIDParam, (req, res) => {

    Location.remove({
        _id: req.params.id
      })
      .then(o => res.json({
        message: 'Location has been removed!'
      }))
      .catch(e => res.json(e));
  });

module.exports = router;