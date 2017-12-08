// require('dotenv').config();
// const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
// const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
// const fs = require('fs');
// const AWS = require('aws-sdk');
// const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' });
//
// module.exports = function (file, callback) {
//
// 	var body = fs.createReadStream(file.path);
// 	var date = new Date();
// 	var key = date.getTime() + '.jpg';
// 	var s3obj = new AWS.S3({params: {Bucket: 'locspotbucket', Key: key, ContentType: 'image/jpeg', ACL: 'public-read'}});
//
// 	// Upload to S3
// 	s3obj.upload({Body: body}).on('httpUploadProgress', function(evt) {
// 		console.log(evt);
// 	}).send(function(err, data) {
// 		if (err) {
// 			console.log('uploadToS3: '+err);
// 			callback('Error occurred.');
// 		} else {
// 			// Remove file after uploaded to S3
// 			fs.unlink(file.path);
// 			callback(null, data);
// 		}
// 	});
// };
