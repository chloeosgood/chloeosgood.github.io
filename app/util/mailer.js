const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Auth = require('../models/auth.js');

module.exports.mailer = function(to, cb) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'InkPotForumProject@gmail.com',
          pass: 'FlyingMongooses12'
        }
    });

    const md5Pass = crypto.createHash('md5').update(to).digest('hex');

    let mailOptions = {
        from: '"Validate Your Password" <InkPotForumProject@gmail.com>',
        to: to,
        subject: 'Validation Code',
        text: `${md5Pass}`,
        html: `<p>${md5Pass}</p>`
    };

    const dateExpiry = new Date();
    dateExpiry.setHours(dateExpiry.getHours() + 1);
    Auth.create({ token: md5Pass, createAt: dateExpiry ,email:to}, function(err, auth) {
        if (err) console.log(err);

        console.log(auth);
    });

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return console.log(err);
        
        cb(err, info.messageId);
    });
};