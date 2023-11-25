import express from 'express'
import { sendContactMessage } from '../controllers/contact.controller.js';
const router = express.Router()
import { validateSendContactMessage } from '../validators/contact.validator.js';

router.post("/contact-us", validateSendContactMessage, sendContactMessage)

export default router;