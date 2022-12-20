const express = require("express")
const app = express();
const port = 5000;
require("dotenv").config();
const bodyParser = require("express").json;
app.use(bodyParser());
//node mailer config
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "mail.nikitarawat.site",
    port: 465,
    secure: true,
    auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
    },
});

//testing nodemailer success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for messages");
        console.log(success);
    }
})

app.post("/sendmail", (req, res) => {
    const { subject, to, message } = req.body;
    const mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: to,
        subject: subject,
        text: message
    }

    transporter.sendMail(mailOptions)
        .then(() => {
            res.json({
                status: "SUCCESS",
                message: "Message sent successfully."
            })
        })
        .catch((err) => {
            console.log(err)
            res.json({
                status: "FAILED",
                message: "An error occured"
            })
        })
})
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})
