require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const Location = require('../models/Location');
const User = require('../models/User');
const multer  = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
const nodemailer = require('nodemailer');

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});


var app = express();

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'folder-name',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    photo = new Date().getTime();
    cb(undefined, photo);
  }
});

var upload = multer({ storage: storage });

//A W S
// aws.config.update({
//   secretAccessKey: AWS_SECRET_ACCESS_KEY,
//   accessKeyId: AWS_ACCESS_KEY_ID,
//   region: 'eu-west-2'
// });
//
// const s3 = new aws.S3();
//
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: 'lspot',
//     key: function (req, file, cb) {
//       file.originalname = new Date().getTime() + '.jpg';
//       console.log("FILE", file);
//       // superPhotos.push(file.originalname);
//       cb(null, file.originalname);
//     }
//   })
// });

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
      .then(list => {
        forDate = list.reverse();
        res.json(forDate);
      })
      .catch(e => res.json(e));
  });

  router.post('/addPhoto', upload.single('image'), (req, res, next) => {
  if (req.file) {
    console.log("BACK");
    console.log(" LOG", req.file.url);
    res.status(200).json(req.file.url);
  } else {
    res.status(500).json("some error");
  }
  console.log(req.file);
});


  router.post('/new',  (req, res, next) => {

    const obj = new Location({
      title: req.body.title,
      city: req.body.city,
      availability: req.body.availability,
      price: req.body.price,
      tags: req.body.tags,
      picture: req.body.photo
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
  router.get('/:id/', checkIDParam, (req, res) => {
    Location.findById(req.params.id)
      .then(o => res.json(o))
      .catch(e => res.json(e));
  });

// ARREGLAR ESTA VAINA para editar location
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

//Booking Email from Location Detail
  router.post('/email', (req, res, next) => {
    console.log(req.body);

    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // use SSL
      auth: {
          user: `${process.env.MAIL}`,
          pass:  `${process.env.MAIL_P}`
      },
    });
    var text = `${req.body.availability}` `${req.body.availability}`;

    let options = {
        from: `${process.env.MAIL}`, // sender address (who sends)
        to: `${process.env.MAIL}`, // list of receivers (who receives)
        subject: "locSpot message",// Subject line
        text: text // plaintext body
    };

    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
        }
        console.log(`Message sent: Jesus`);
    });

});

module.exports = router;
