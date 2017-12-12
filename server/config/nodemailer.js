require('dotenv').config();
const nodemailer = require('nodemailer');

  //Nodemailer gmail petititon.
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'MAIL',
        pass: 'MAIL_P'
    },
  });

  let options = {
      from: '"locSpot" <locspotapp@gmail.com>', // sender address (who sends)
      to: user.email, // list of receivers (who receives)
      subject:  "locSpot message",// Subject line
      text:"Hello world" // plaintext body
  };

  transport.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      }
      console.log(`Message sent: ${info.response}`);
  });
