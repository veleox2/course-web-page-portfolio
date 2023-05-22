const nodemailer = require("nodemailer");
const path = require("path");
const express = require("express");
const { assign } = require("nodemailer/lib/shared");
const bodyParser = require('body-parser');

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({limit: '5000mb', extended: true, parameterLimit: 100000000000}));

app.use(express.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get("/", (req,res)=>
{
    res.render("index");
})

app.get("/models", (req,res)=>
{
    res.render("models");
})

app.post("/form", async(req,res)=>{
    console.log(req.body);
    const {
        name,
        phone,
        text,
        email,
    }= await req.body;
    
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 456,
        secure: true,
        service: 'gmail',
        auth: {
          user: 'test.chepunyi.valerii@gmail.com',
          pass: 'qwsvqllsttgkmirx',
        },
      });
  
      const mailOptions = {
        from: 'test.chepunyi.valerii@gmail.com',
        to: 'chepurnyi.valerii@student.uzhnu.edu.ua',
        subject: 'Заявка з портфоліо',
        text: `Username: ${name}\nEmail: ${email}\nphoneNumber: ${phone}\nDescription: ${text}\n`,
      };
      
      await transporter.sendMail(mailOptions, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + result.response);
        }
      });
      res.render("index");
})
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});