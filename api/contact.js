const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                error: "Please fill out all required fields."
            });
        }

        const { error } = await resend.emails.send({
            from: "VORTX PCS <onboarding@resend.dev>",
            to: ["vortxpcs@gmail.com"],
            replyTo: email,
            subject: `VORTX Contact: ${subject || "New Message"}`,
            text: `
Name: ${name}
Email: ${email}
Subject: ${subject || "Something else"}

Message:
${message}
            `
        });

        if (error) {
            console.error(error);
            return res.status(500).json({
                error: "Failed to send email."
            });
        }

        return res.status(200).json({
            success: true
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Something went wrong."
        });
    }
};