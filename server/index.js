

const express = require("express");
const sgMail = require("@sendgrid/mail");
const APIKEY="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";

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.post("/sendEmail", (req, res) => {
    sgMail.setApiKey(APIKEY);
    console.log(req.body);

    const {from,to,subject,body}=req.body;
    const msg = {
      to: to, // Change to your recipient
      from: from, // Change to your verified sender
      subject: subject,
      text: body,
      html: body,
    };
    sgMail.send(msg).then(()=>{
        res.json({ message: "email sent" });
    })
  
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });