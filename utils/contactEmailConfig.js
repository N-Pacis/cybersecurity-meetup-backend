import { createTransport } from "nodemailer"

export function sendContactEmail(from,subject,html){
    let transporter = createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        service:"gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    let mailOptions = {
        to: process.env.EMAIL_USER,
        from: from,
        subject: subject,
        html: html
    }

    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
            return "Unable to send email"
        }
    })
}
