import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import nodemailer from "nodemailer"

dotenv.config();
const app = express()


const port = 3000

app.use(cors())
app.use(express.json())

app.post('/', async (req, res) => {
  console.log("BODY RECEIVED:", req.body); 
  const { name, email, message } = req.body;


  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const mailOptions = {
      from: 'email',
      to: process.env.EMAIL_USER,
      subject: `New contact form submission from ${email}`,
      text: `You have a new message on your portfolio:
    Name: ${name},
    Email: ${email},
    Message: ${message} `,
    }

    await transporter.sendMail(mailOptions);
    res.status(200).send("Message sent successfully.");
  } catch (error) {
    console.log("Error sending message. ", error)
    res.status(500).send("Something went wrong. Message not sent.")
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})