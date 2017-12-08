require('dotenv').config();
const multerS3 = require('multer-s3');
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const User = require('../models/User');
const multer  = require('multer');
const aws = require('aws-sdk');
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

aws.config.update({
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  accessKeyId: AWS_ACCESS_KEY_ID,
  region: 'eu-west-2'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'locspotbucket',
    key: function (req, file, cb) {
      file.originalname = new Date().getTime() + '.jpg';
      console.log("FILE", file);
      cb(null, file.originalname);
    }
  })
});

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
    console.log(req.file.originalname);
        const user_properties = {
          username: req.body.username,
          lastname: req.body.lastname,
          email: req.body.email,
          phone: req.body.phone,
          password: req.body.password,
          city: req.body.city,
          about: req.body.about,
          picture: req.file.originalname
        };
    User.findByIdAndUpdate(req.params.id, user_properties, {
        new: true
      })
      .then(o => res.json(o))
      .catch(e => res.json(e));
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
