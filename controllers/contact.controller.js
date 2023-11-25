import lodash from 'lodash';
const {pick} = lodash;
import { Contact } from '../models/contact.model.js';
import { sendContactEmail } from '../utils/contactEmailConfig.js';

export const sendContactMessage = async(req, res) => {
    try {
        let contact = new Contact(pick(req.body, ['Names','Email','Message']))
        const time = new Date();
        contact.CreatedAt = time;
        try {
            await contact.save()
            const subject = `BICT Cyber Security Meetup: Message from ${contact.Names}`
            const html = `<body>
            <div style="width:90%;margin: -2% 2% 2% 4%;box-shadow: 2px 2px 10px rgb(196, 196, 196);background-color: #fff;border-radius: 5px;position: relative;padding-bottom: 4%;">
                <h1 style="font-family: sans-serif;font-size: 30px;font-weight: bold;text-align: center;color:teal;text-transform: uppercase;padding-top: 2%;">BICT Cyber Security Meetup</h1>
                <div style="display: flex;">
                    <p style="text-align:left;font-family:sans-serif;font-size:16px;padding:1% 2% !important;background-color: rgba(255, 255, 255, 0.185); width: 80%;resize: none;border:none;"><b>Reply email:</b> ${contact.Email} <br> <b>Message:</b> ${contact.Message}</p>
                </div>
            </div>
                <p style="background-color: teal;width: 100%;margin-top: 1%;color: #fff;text-align: center;font-family: sans-serif;padding:1% 0%;"><span style="font-weight: bold;">BICT Cyber Security Meetup </span>&copy; ${time.getFullYear()}</p>
        </body>`;
            sendContactEmail(contact.Email, subject, html) 
            return res.json({message: "successfully sent the message", status: 201})
        } catch (ex) {
            res.status(400).send(ex.message);
        }
    } catch (ex) {
        res.status(500).send(ex.message);
    }
}
