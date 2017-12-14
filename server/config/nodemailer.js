require('dotenv').config();
const nodemailer = require('nodemailer');




  //Nodemailer gmail petititon.
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: `${process.env.MAIL}`,
        pass:  `${process.env.MAIL_P}`
    },
  });

  let options = {
      from: `${process.env.MAIL}`, // sender address (who sends)
      to: `${process.env.MAIL}`, // list of receivers (who receives)
      subject: "locSpot message",// Subject line
      text:"req.mail.message" // plaintext body
  };

  transport.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
      }
      console.log(`Message sent: ${info.response}`);
  });
