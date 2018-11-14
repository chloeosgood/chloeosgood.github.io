const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Auth = require('../models/auth.js');

module.exports.mailer = function(to, cb) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'feizhouttu@gmail.com',
          pass: 'FZpmt@93'
        }
    });

    const md5Pass = crypto.createHash('md5').update(to).digest('hex');

    let mailOptions = {
        from: '"Test" <feizhouttu@gmail.com>',
        to: to,
        subject: 'Test',
        text: `${md5Pass}`,
        html: `<p>${md5Pass}</p>`
    };

    const dateExpiry = new Date();
    dateExpiry.setHours(dateExpiry.getHours() + 1);
    Auth.create({ token: md5Pass, createAt: dateExpiry }, function(err, auth) {
        if (err) console.log(err);

        console.log(auth);
    });

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) return console.log(err);
        
        cb(err, info.messageId);
    });
};