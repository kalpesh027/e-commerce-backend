const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
    
    // create reusable transporter object using the default SMTP transport
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT, // 
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,  // Use the App Password here
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL, // sender address
        to: options.email, // list of receivers  
        subject: options.subject, // Subject line
        text: options.message, // plain text body
    };

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
