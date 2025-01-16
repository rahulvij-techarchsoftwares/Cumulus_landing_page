const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email sending function
const sendEmail = async (formData) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465, // For SSL
            secure: true,
            auth: {
                user: "cumulus545@gmail.com", // Your email
                pass: "capr cvjb vrxf ygbt",
            },
        });

        const mailOptions = {
            from: `"${formData.username}" <${formData.email}>`,
            to: "cumulus545@gmail.com", // Replace with your email
            subject: `New Query: ${formData.selectQuery}`,
            text: `You have received a new query from ${formData.username} (${formData.email}):\n\n${formData.describeQuery}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

// POST /api/queries - Handle form submissions
router.post('/sendqueries', async (req, res) => {
    const formData = req.body;

    try {
        await sendEmail(formData);
        res.status(200).json({ message: 'Query submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting query. Please try again later.' });
    }
});

module.exports = router;
